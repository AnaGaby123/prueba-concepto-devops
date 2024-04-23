/* Core Imports */
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {forEach, isEmpty, map, sum} from 'lodash-es';

/* Models Imports */
import * as chartsUtils from '@appModels/chart/chart';
import {
  ChartTextStyle,
  IChartSegmentClicked,
  sizesWidthAndHeightDoughnutLap,
  sizesWidthAndHeightDoughnutMac,
} from '@appModels/chart/chart';

/* Tools Imports */
import {RESPONSIVE_MENU_WIDTH_LIMIT, VIEW_IPAD, VIEW_MACBOOKAIR} from '@appUtil/common.protocols';
import {toRound} from '@appUtil/util';

interface ValidateData {
  dataValue: Array<number>;
  IsEmpty: boolean;
}

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() adjustTotals = false;
  @Input() colorCenter = '#fff';
  @Input() cutout = '70%'; // DOCS: Grosor de la gráfica
  @Input() data: chartsUtils.IDoughnutChart = chartsUtils.initialIDoughnutChart();
  @Input() enableOnClick = false;
  @Input() fontSize: 'small' | 'medium' | 'normal' = 'normal';
  @Input() maxWidth = '100%'; // DOCS: Utilizar Pixeles para sobreescribir esta propiedad
  @Input() optionDetails: Array<chartsUtils.IDoughnutChartDetails> = [];
  @Input() optionDetailsHover: Array<Array<chartsUtils.IDoughnutChartDetails>> = [];
  @Input() paddingTitleBottom = 20;
  @Input() showPercentage = true;
  @Input() title: string;
  @Input() titleDetails = '';
  @Input() typeChart = 1;

  @Output() activeHoverWithElements = false;
  @Output() segmentActive: EventEmitter<IChartSegmentClicked> = new EventEmitter<
    IChartSegmentClicked
  >();

  @ViewChild('canvasElement') canvasElement: ElementRef<HTMLCanvasElement>;

  ctx: CanvasRenderingContext2D;
  doughnutChart: Chart = {} as Chart;
  labelsDoughnut: string[] = [];
  numberLabelsHover = 0;
  renderCanvas: ElementRef<HTMLCanvasElement>;
  sameSegment = false;
  segment: any;
  sizesWidthAndHeightDoughnutMac = sizesWidthAndHeightDoughnutMac;
  sizesWidthAndHeightDoughnutLap = sizesWidthAndHeightDoughnutLap;
  viewIpad = VIEW_IPAD;
  viewMacBookAir = VIEW_MACBOOKAIR;
  viewType: string;

  constructor(private renderer: Renderer2) {
    Chart.register(...registerables);
  }

  // DOCS: SE COMENTA PORQUE OCASIONA QUE LA GRÁFICA ENTRE EN UN CICLO INFINITO AL VOLVER AL CARGAR LA INFO
  /*  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.canvasElement &&
      this.canvasElement.nativeElement &&
      changes.data &&
      changes.data.currentValue &&
      !isEqual(changes.data.currentValue, changes.data.previousValue)
    ) {
      this.loadData(changes.data.currentValue);
    }
  }*/

  @HostListener('window:resize') onResize() {
    this.setViewType();
    this.doughnutChart.update();
    this.doughnutChart.resize();
    if (this.segment) {
      this.segment._model.outerRadius += 10;
    }
  }

  ngAfterViewInit(): void {
    this.renderCanvas = this.renderer.selectRootElement(this.canvasElement).nativeElement;
    this.addItemLabelsDoughnut();
    this.loadData(this.data);
  }

  ngOnDestroy(): void {
    this.doughnutChart.clear();
    this.doughnutChart.destroy();
  }

  ngOnInit(): void {
    this.setViewType();
  }

  addItemLabelsDoughnut(): void {
    this.labelsDoughnut = [];
    this.labelsDoughnut.push(`${this.titleDetails ? this.titleDetails.toUpperCase() + ':' : ''}`);
    this.optionDetails.forEach((item, index) => {
      if (index + 1 !== this.optionDetails.length) {
        this.labelsDoughnut.push(`${item.label}: ${item.value}`);
      } else if (item.label?.toLowerCase().includes('total')) {
        //DOCS: AJUSTE AL VALOR TOTAL PARA QUE LA CANTIDAD SE MUESTRE ABAJO (ULTIMO ITEM)
        this.labelsDoughnut.push(`${item.label}: `);
        this.labelsDoughnut.push(`${item.value}`);
      } else {
        this.labelsDoughnut.push(`${item.label}: ${item.value}`);
      }
    });
  }

  addItemLabelsDoughnutHover(arraylabelsHover?: any[], index?: number): string[] {
    const labelsDoughnutHover: string[] = [];

    if (this.showPercentage) {
      const total = sum(this.data.values);
      const percentage = (this.data.values[index] * 100) / total;
      const titleDetailsSelect = !Number.isNaN(percentage)
        ? `${this.data.labels[index]} ${toRound(percentage, 2)}%`
        : `${this.data.labels[index]} 0%`;
      labelsDoughnutHover.push(titleDetailsSelect.toUpperCase());
    }

    if (arraylabelsHover !== undefined) {
      arraylabelsHover.forEach((item, index) => {
        if (index + 1 !== arraylabelsHover.length) {
          labelsDoughnutHover.push(`${item.label}: ${item.value}`);
        } else if (item.label?.toLowerCase().includes('total')) {
          //DOCS: AJUSTE AL VALOR TOTAL PARA QUE LA CANTIDAD SE MUESTRE ABAJO (ULTIMO ITEM)
          labelsDoughnutHover.push(`${item.label}: `);
          labelsDoughnutHover.push(`${item.value}`);
        } else {
          labelsDoughnutHover.push(`${item.label}: ${item.value}`);
        }
      });

      this.numberLabelsHover = labelsDoughnutHover.length;
      return labelsDoughnutHover;
    }

    return [];
  }

  //DOCS: CALCULO DESDE EL CENTRO DE LA GRAFICA POR EL TOTAL DE SEPARACIÓN
  addStyleCenterTextDoughnut(
    doughnutCenterPoint: number,
    widthDoughnut: number,
    heightDoughnut: number,
    isHover: boolean = false,
    fontFamily: string = 'Roboto-Regular',
  ): ChartTextStyle {
    let chartTextStyle: ChartTextStyle = {
      textSize: `20px ${fontFamily}`,
      doughnutCenterPoint,
      textLineHeight: 20,
    };

    const labelsLenght = isHover ? this.numberLabelsHover : this.labelsDoughnut.length;

    //DOCS: componente mediano - grande en mac
    for (let i = 0; i < this.sizesWidthAndHeightDoughnutMac.length; i++) {
      if (
        widthDoughnut >= this.sizesWidthAndHeightDoughnutMac[i].chartWidth &&
        heightDoughnut >= this.sizesWidthAndHeightDoughnutMac[i].chartHeight
      ) {
        doughnutCenterPoint =
          (labelsLenght / 2) * this.sizesWidthAndHeightDoughnutMac[i].centerTextLineHeight;
        chartTextStyle = {
          textSize: `${this.sizesWidthAndHeightDoughnutMac[i].centerTextSize} ${fontFamily}`,
          doughnutCenterPoint,
          textLineHeight: this.sizesWidthAndHeightDoughnutMac[i].centerTextLineHeight,
        };
        break;
      }
    }
    return chartTextStyle;
  }

  generateColorPalette(
    typeChart: number,
    data: chartsUtils.IDoughnutChart,
  ): chartsUtils.IBackgroundColors {
    const colorsRange: chartsUtils.IColors = this.getColorRange(typeChart);
    const colorLimit: number = Math.ceil(data?.values.length / colorsRange.color.length);
    for (let i = 0; i < colorLimit; i++) {
      if (i >= colorsRange.color.length) {
        colorsRange.color = colorsRange.color.concat(colorsRange.color);
        colorsRange.colorHover = colorsRange.colorHover.concat(colorsRange.colorHover);
      }
    }
    const colors = [];
    forEach(colorsRange.color, (o) => {
      const gradient: CanvasGradient = this.ctx.createLinearGradient(0, 0, 150, 150);
      gradient.addColorStop(0, o.start);
      gradient.addColorStop(1, o.end);
      colors.push(gradient);
    });

    return {
      backgroundColor: colors,
      hoverBackgroundColor: colorsRange.colorHover,
    };
  }

  getColorRange(typeChart: number): chartsUtils.IColors {
    let color: Array<chartsUtils.IColorRange>, colorHover: Array<string>;
    switch (typeChart) {
      case 1:
        color = chartsUtils.colorRangeGeneral;
        colorHover = chartsUtils.colorRangeGeneralHover;
        break;
      case 2:
        color = chartsUtils.colorRangeGreenAndBlue;
        colorHover = chartsUtils.colorRangeGreenAndBlueHover;
        break;
      case 3:
        color = chartsUtils.colorRangeRedPriority;
        colorHover = chartsUtils.colorRangeRedPriorityHover;
        break;
      case 4:
        color = chartsUtils.colorRangeOrangePriority;
        colorHover = chartsUtils.colorRangeOrangePriorityHover;
        break;
      case 5:
        color = chartsUtils.colorRangeGreenPriority;
        colorHover = chartsUtils.colorRangeGreenPriorityHover;
        break;
      case 6:
        color = chartsUtils.colorRangePriority;
        colorHover = chartsUtils.colorRangePriorityHover;
        break;
      case 7:
        color = chartsUtils.colorRangeVersus;
        colorHover = chartsUtils.colorRangeVersusHover;
        break;
      case 8:
        color = chartsUtils.colorRangeGray;
        colorHover = chartsUtils.colorRangeGrayHover;
        break;
      case 9:
        color = chartsUtils.colorRangeBlueAndYellow;
        colorHover = chartsUtils.colorRangeBlueAndYellowHover;
        break;
      case 10:
        color = chartsUtils.colorRangeGreenAndPinks;
        colorHover = chartsUtils.colorRangeGreenAndPinksHover;
        break;
      case 11:
        color = chartsUtils.colorRangeGreenAndBlueAndRed;
        colorHover = chartsUtils.colorRangeGreenAndBlueAndRedHover;
        break;
      case 12:
        color = chartsUtils.colorRangeGreensDull;
        colorHover = chartsUtils.colorRangeGreensDullHover;
        break;
      default:
        color = chartsUtils.colorRangeGeneral;
        colorHover = chartsUtils.colorRangeGeneralHover;
        break;
    }
    return {color, colorHover};
  }

  loadData(data: chartsUtils.IDoughnutChart): void {
    this.ctx = this.renderer.selectRootElement(this.canvasElement).nativeElement.getContext('2d');
    this.setSettings();
    this.prepareData(data);
  }

  prepareData(data: chartsUtils.IDoughnutChart): void {
    const colorPalette: chartsUtils.IBackgroundColors = this.generateColorPalette(
      this.typeChart,
      data,
    );
    const colorPaletteEmpty: chartsUtils.IBackgroundColors = this.generateColorPalette(8, data);
    const {dataValue, IsEmpty} = this.validateData(data.values);
    if (!isEmpty(this.doughnutChart)) {
      this.doughnutChart.data.labels = data.labels;
      this.doughnutChart.data.datasets = map(this.doughnutChart.data.datasets, (dataset) => ({
        ...dataset,
        data: dataValue,
        backgroundColor: !IsEmpty
          ? colorPalette.backgroundColor
          : colorPaletteEmpty.backgroundColor,
        hoverBackgroundColor: !IsEmpty
          ? colorPalette.hoverBackgroundColor
          : colorPaletteEmpty.hoverBackgroundColor,
        borderWidth: 1,
      }));
      this.doughnutChart.options = {
        ...this.doughnutChart.options,
      };
      this.doughnutChart.update();
    } else {
      const colorCenterDoughnut = {
        id: 'colorCenterDoughnut',
        colorCenter: this.colorCenter,
        beforeDraw(chart, args, options) {
          const {ctx} = chart;
          const radius = chart.getDatasetMeta(0).controller.innerRadius;
          const centerYDoughnut = chart.getDatasetMeta(0).data[0].y;
          const centerXDoughnut = chart.getDatasetMeta(0).data[0].x;
          ctx.arc(centerXDoughnut, centerYDoughnut, radius, 0, 2 * Math.PI);
          ctx.fillStyle = this.colorCenter;
          ctx.fill();
        },
      };

      const centerTextDoughnut = {
        id: 'centerTextDoughnut',
        addStyleCenterTextDoughnut: this.addStyleCenterTextDoughnut,
        addItemLabelsDoughnutHover: this.addItemLabelsDoughnutHover,
        labelsDoughnut: this.labelsDoughnut,
        labelHover: this.optionDetailsHover,
        renderCanvas: this.renderCanvas,
        titleDetails: this.titleDetails,
        showPercentage: this.showPercentage,
        sizesWidthAndHeightDoughnutMac: this.sizesWidthAndHeightDoughnutMac,
        sizesWidthAndHeightDoughnutLap: this.sizesWidthAndHeightDoughnutLap,
        data: this.data,
        afterDraw(chart, args, options) {
          const {ctx} = chart;
          let centerYDoughnut = chart.getDatasetMeta(0).data[0].y;
          const centerXDoughnut = chart.getDatasetMeta(0).data[0].x;
          const bounding = this.renderCanvas.getBoundingClientRect();
          const isHover: boolean = chart._active[0] !== undefined;

          const {textSize, doughnutCenterPoint, textLineHeight} = this.addStyleCenterTextDoughnut(
            centerYDoughnut,
            bounding.width,
            bounding.height,
            isHover,
          );

          const sizeLabel = textLineHeight + 9;
          ctx.textAlign = 'center';
          ctx.font = textSize;
          ctx.fillStyle = '#000';
          centerYDoughnut -= doughnutCenterPoint;

          if (!isHover) {
            /*DOCS: Cuando Esta sin Hover*/
            this.labelsDoughnut.forEach((label: string, index: number) => {
              const text = label;
              index === 0 && label.includes(this.titleDetails.toUpperCase())
                ? (ctx.font = 'bold ' + ctx.font)
                : (ctx.font = textSize);
              ctx.fillText(text, centerXDoughnut, centerYDoughnut);
              // bounding.width >= 630 ? (centerYDoughnut += 22) : (centerYDoughnut += 20);
              bounding.width = centerYDoughnut += sizeLabel;
            });
          } else {
            /*DOCS: Cuando se activa el Hover*/
            const index = chart._active[0].index;
            const labelsShowHover = this.labelHover[index];

            const value = this.addItemLabelsDoughnutHover(labelsShowHover, index);

            value.forEach((label: string, index: number) => {
              const text = label;
              if (index === 0 && this.showPercentage) {
                ctx.font = 'bold ' + ctx.font;
                ctx.fillText(text, centerXDoughnut, centerYDoughnut);
              } else {
                ctx.fillText(text, centerXDoughnut, centerYDoughnut);
              }
              ctx.font = textSize;
              bounding.width = centerYDoughnut += sizeLabel;
            });
          }
        },
      };

      const widthDoughnut = this.renderer
        .selectRootElement(this.canvasElement)
        .nativeElement.getBoundingClientRect().width;

      const heigthDoughnut = this.renderer
        .selectRootElement(this.canvasElement)
        .nativeElement.getBoundingClientRect().height;

      this.doughnutChart = new Chart(this.ctx, {
        type: 'doughnut',
        plugins: [colorCenterDoughnut, centerTextDoughnut],
        data: {
          labels: data.labels,
          datasets: [
            {
              data: dataValue,
              backgroundColor: !IsEmpty
                ? colorPalette.backgroundColor
                : colorPaletteEmpty.backgroundColor,
              hoverBackgroundColor: !IsEmpty
                ? colorPalette.hoverBackgroundColor
                : colorPaletteEmpty.hoverBackgroundColor,
              borderWidth: 1,
              animation: {
                duration: 300,
                easing: 'easeOutBounce',
              },
            },
          ],
        },
        options: {
          cutout: this.cutout,
          responsive: true,
          animation: {
            duration: 300,
            easing: 'easeOutBounce',
          },
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              display: false,
            },
            title: {
              display: !!this.title,
              text: this.title ? this.title.toUpperCase() : '',
              color: '#000',
              font: {
                size: this.setSizeTitle(widthDoughnut, heigthDoughnut),
              },
              padding: {
                bottom: this.paddingTitleBottom,
              },
            },
            tooltip: {
              enabled: false,
            },
          },
          onClick: (mouseEvent, activeElements: Array<any>): any => {
            if (this.enableOnClick && !IsEmpty) {
              if (activeElements.length > 0) {
                if (!this.segment) {
                  this.doughnutChart.update();
                  this.segment = activeElements[0];
                  this.segmentActive.emit({
                    label: this.segment._model.label,
                    active: true,
                  });
                  this.segment._model.outerRadius += 10;
                } else if (this.segment._index === activeElements[0]._index) {
                  if (this.sameSegment === false) {
                    this.doughnutChart.update();
                    this.sameSegment = true;
                    this.segmentActive.emit({
                      label: this.segment._model.label,
                      active: false,
                    });
                  } else {
                    this.doughnutChart.update();
                    this.segment._model.outerRadius += 10;
                    this.sameSegment = false;
                    this.segmentActive.emit({
                      label: this.segment._model.label,
                      active: true,
                    });
                  }
                } else if (this.segment._index !== activeElements[0]._index) {
                  this.doughnutChart.update();
                  this.segment = activeElements[0];
                  this.segment._model.outerRadius += 10;
                  this.sameSegment = false;
                  this.segmentActive.emit({
                    label: this.segment._model.label,
                    active: true,
                  });
                }
              }
            }
          },
          layout: {
            padding: 0,
          },
        },
      });
    }
  }

  setSettings(): void {
    Chart.defaults.font.family = 'Novecento-Bold';
    Chart.defaults.color = '#000';
    Chart.defaults.plugins.title.color = '#1a1a1a';
    Chart.defaults.plugins.title.padding = 5;
    Chart.defaults.plugins.legend.labels.color = '#000';
  }

  setSizeTitle(widthDoughnut: number, heightDoughnut: number): number {
    let sizeTextTile = 28;

    for (let i = 0; i < this.sizesWidthAndHeightDoughnutMac.length; i++) {
      if (
        widthDoughnut >= this.sizesWidthAndHeightDoughnutMac[i].chartWidth &&
        heightDoughnut >= this.sizesWidthAndHeightDoughnutMac[i].chartHeight
      ) {
        sizeTextTile = this.sizesWidthAndHeightDoughnutMac[i].titleTextSize;
        break;
      }
    }

    return sizeTextTile;
  }

  setViewType(): void {
    this.viewType =
      window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? this.viewIpad : this.viewMacBookAir;
  }

  validateData(values: number[]): ValidateData {
    let dataValue = [1];
    let isEmpty = true;
    if (values.length > 0 && sum(values) !== 0) {
      dataValue = values;
      isEmpty = false;
    }
    return {dataValue, IsEmpty: isEmpty};
  }
}
