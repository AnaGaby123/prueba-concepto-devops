/* Core Imports */
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {forEach, isEmpty, isEqual, map as _map} from 'lodash-es';

import * as charts from 'chartjs-plugin-datalabels';
import {Chart, registerables} from 'chart.js';
/* Models Imports /*/
import * as chartsUtils from '@appModels/chart/chart';
import {
  BarChartTextSizes,
  IBarChart,
  IChartSegmentClicked,
  InitialIBarChart,
  sizesWidthAndHeightBar,
} from '@appModels/chart/chart';

/*Tools Imports*/
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {toRound} from '@appUtil/util';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() customColor = false;
  @Input() enableOnClick = false;
  @Input() fontColorBottom = '#afaeb4';
  @Input() fontSize = 12;
  @Input() graphingCurrency = false;
  @Input() maxHeight: string = '100%'; // DOCS: Utilizar Pixeles para sobreescribir esta propiedad
  @Input() maxWidth: string = '100%'; // DOCS: Utilizar Pixeles para sobreescribir esta propiedad
  @Input() nameChart = 'barChart';
  @Input() paddingTitleBottom: number = 20;
  @Input() textDataLabel: string;
  @Input() textScaleEnd: string; // DOCS: texto extra al final de cada label en la escala de Y
  @Input() textScaleStart: string; // DOCS: texto extra al inicio de cada label en la escala de Y
  @Input() title: string = '';
  @Input() totalPercentage: number;
  @Input() typeChart: number = 1;
  @Input() values: IBarChart = InitialIBarChart();

  @Output() segmentActive: EventEmitter<IChartSegmentClicked> = new EventEmitter<
    IChartSegmentClicked
  >();

  @ViewChild('canvasElement') canvasElement: ElementRef<HTMLCanvasElement>;

  @HostListener('window:resize') onResize() {
    this.barChart.update();
    this.barChart.resize();
    if (this.segment) {
      this.segment._model.borderColor = '#FFFFFF';
      this.segment._model.borderWidth = 2;
    }
  }

  barChart: Chart = {} as Chart;
  ctx: CanvasRenderingContext2D;
  renderCanvas: ElementRef<HTMLCanvasElement>;
  sameSegment = false;
  segment: any;
  sizesWidthAndHeightDoughnutMac = sizesWidthAndHeightBar;

  readonly fontFamily: string = 'Novecento-Bold';

  constructor(private renderer: Renderer2) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.renderCanvas = this.renderer
      .selectRootElement(this.canvasElement)
      .nativeElement.getBoundingClientRect();
    this.loadData(this.values);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.canvasElement &&
      this.canvasElement.nativeElement &&
      changes.values &&
      !isEqual(changes.values.currentValue, changes.values.previousValue)
    ) {
      this.loadData(changes.values.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.barChart.clear();
    this.barChart.destroy();
  }

  generateColorPalette(
    typeChart: number,
    data: chartsUtils.IDoughnutChart,
  ): chartsUtils.IBackgroundColors {
    const colorsRange: chartsUtils.IColors = this.getColorRange(typeChart);
    const colorLimit = Math.ceil(data.values.length / colorsRange.color.length);
    for (let i: any = 0; i < colorLimit; i++) {
      colorsRange.color = colorsRange.color.concat(colorsRange.color);
      colorsRange.colorHover = colorsRange.colorHover.concat(colorsRange.colorHover);
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

  loadData(data: chartsUtils.IBarChart): void {
    this.ctx = this.renderer.selectRootElement(this.canvasElement).nativeElement.getContext('2d');
    this.setSettings();
    this.prepareData(data);
  }

  prepareData(data: chartsUtils.IBarChart): void {
    let images = [];
    let plugin = [charts.default];
    if (data && data.images && data.images.length > 0) {
      images = [...data.images];
      plugin.push({
        id: 'images',
        afterDraw: (chartInstance: any) => {
          const ctx = chartInstance.ctx;
          const xAxis = chartInstance.scales['x'];
          const yAxis = chartInstance.scales['y'];
          xAxis.ticks.forEach((value, index) => {
            const x = xAxis.getPixelForTick(index);
            const image = new Image();
            image.src = images[index];
            ctx.drawImage(image, x - 12, yAxis.bottom + 10);
          });
        },
      });
    }

    const colorPalette: chartsUtils.IBackgroundColors = this.generateColorPalette(
      this.typeChart,
      data,
    );

    const widthBar = this.renderer
      .selectRootElement(this.canvasElement)
      .nativeElement.getBoundingClientRect().width;

    const heightBar = this.renderer
      .selectRootElement(this.canvasElement)
      .nativeElement.getBoundingClientRect().height;

    let toUpper = function (label) {
      return label.toUpperCase();
    };
    let labels: string[] = data.labels.map(toUpper);

    let {labelsTextSize, titleTextSize}: BarChartTextSizes = this.setSizeTitleLabels(
      widthBar,
      heightBar,
    );

    const values = [...data.values];
    if (!isEmpty(this.barChart)) {
      this.barChart.data.labels = data.labels;
      this.barChart.config.options.scales.x.ticks.display = data?.images?.length === 0;
      this.barChart.config.options.scales.x.ticks.color = data.backgroundColor;

      this.barChart.data.datasets = _map(this.barChart.data.datasets, (dataset) => ({
        ...dataset,
        data: data.values.length > 0 ? data.values : [1],
        backgroundColor: this.customColor ? colorPalette.backgroundColor : data.backgroundColor,
        datalabels: {
          color: this.customColor ? colorPalette.backgroundColor : data.backgroundColor,
        },
        hoverBackgroundColor: this.customColor
          ? colorPalette.backgroundColor
          : data.backgroundColorHover,
        maxBarThickness: 100,
      }));
      this.barChart.update();
    } else {
      this.barChart = new Chart(this.ctx, {
        plugins: plugin,
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: this.customColor
                ? colorPalette.backgroundColor
                : data.backgroundColor,
              maxBarThickness: 100,
              datalabels: {
                anchor: 'end',
                color: this.customColor ? colorPalette.backgroundColor : data.backgroundColor,
                align: 'end',
                formatter: (value) => {
                  let dataLabel;
                  if (this.graphingCurrency) {
                    dataLabel = new CurrencyFormat().transform(value, 'USD');
                  }
                  if (this.totalPercentage && this.textDataLabel && !this.graphingCurrency) {
                    const percentage = `${toRound((value * 100) / this.totalPercentage, 1)}%`;
                    dataLabel = `${percentage} · ${value} ${this.textDataLabel}`;
                  } else if (this.totalPercentage && !this.graphingCurrency) {
                    const percentage = `${toRound((value * 100) / this.totalPercentage, 1)}%`;
                    dataLabel = `${percentage} · ${value}`;
                  } else if (this.totalPercentage === 0) {
                    dataLabel = `0 ${this.textDataLabel}`;
                  } else if (this.textDataLabel) {
                    dataLabel = `${value} ${this.textDataLabel}`;
                  }
                  return dataLabel;
                },
              },
            },
          ],
        },
        options: {
          animation: {
            duration: 2100,
            easing: 'easeOutBounce',
          },
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              font: {
                size: labelsTextSize,
                family: this.fontFamily,
              },
            },
            title: {
              //DOCS: Titulo de la grafica
              display: !!this.title,
              text: this.title ? this.title.toUpperCase() : '',
              color: 'black',
              font: {
                size: titleTextSize,
                family: this.fontFamily,
              },
              padding: {
                bottom: this.paddingTitleBottom,
              },
            },
          },
          layout: {
            //DOCS: Padding general de la grafica
            padding: {
              top: 0,
              right: 0,
              left: 15,
              bottom: data?.images?.length === 0 ? 0 : 23,
            },
          },
          scales: {
            x: {
              display: true,
              ticks: {
                display: data?.images?.length === 0,
                color: this.values.backgroundColor,
                font: {
                  size: labelsTextSize,
                  family: this.fontFamily,
                  weight: 'bold',
                },
              },
              grid: {
                drawOnChartArea: false, //DOCS: ocultar las lineas verticales de la grafica
              },
            },
            y: {
              ticks: {
                stepSize: 1, //DOCS: Paso de incremento
                color: this.fontColorBottom,
                font: {
                  size: labelsTextSize,
                  family: this.fontFamily,
                  weight: 'bold',
                },
                callback: (value) => {
                  let label: number | string;
                  if (this.graphingCurrency) {
                    if (typeof value === 'number') {
                      value = new CurrencyFormat().transform(value, 'USD');
                    }
                  }
                  //DOCS: Agregar a cada label del eje (Y) un texto extra inicial y final ('texto inical' + value + 'Texto final'
                  if (this.textScaleStart && this.textScaleEnd) {
                    // DOCS: Se le esta enviando una escala personalizada
                    label = `${this.textScaleStart} ${value} ${this.textScaleEnd}`;
                  } else if (this.textScaleEnd) {
                    //DOCS: Se le está enviando una escala personalizada final y no  inicial
                    label = `${value} ${this.textScaleEnd}`;
                  } else if (this.textScaleStart) {
                    //Docs: se le está enviando una escala personalizada inicial y no la final
                    label = `${this.textScaleStart} ${value}`;
                  } else {
                    label = value;
                  }
                  return label;
                },
              },
              //DOCS: Asignar el valor maximo sugerido del eje Y de acuerdo a los valores
              suggestedMax:
                Math.max(...values) > 1000
                  ? Math.max(...values) + Math.max(...values) * 0.1 //DOCS: Cuando el valor mayor es igual o superior a 20,000 el tope será la suma del valor maximo y del valor maximo por 0.1, esto para generar un rango considerablle
                  : !Number.isInteger(Math.max(...values)) || Math.max(...values) === 0 //DOCS: Cuando el valor máximo es igual a 0, o si el valor no es un entero se agrega un tope de 10 unidades
                  ? 10
                  : Math.max(...values) + 1,
            },
          },
          onClick: (event, activeElements: Array<any>): any => {
            if (this.enableOnClick) {
              if (activeElements.length > 0) {
                if (!this.segment) {
                  this.barChart.update();
                  this.segment = activeElements[0];
                  this.segmentActive.emit({
                    label: this.segment._model.label,
                    active: true,
                  });
                  this.segment._model.borderColor = '#FFFFFF';
                  this.segment._model.borderWidth = 2;
                } else if (this.segment._index === activeElements[0]._index) {
                  if (this.sameSegment === false) {
                    this.barChart.update();
                    this.sameSegment = true;
                    this.segmentActive.emit({
                      label: this.segment._model.label,
                      active: false,
                    });
                  } else {
                    this.barChart.update();
                    this.segment._model.borderColor = '#FFFFFF';
                    this.segment._model.borderWidth = 2;
                    this.sameSegment = false;
                    this.segmentActive.emit({
                      label: this.segment._model.label,
                      active: true,
                    });
                  }
                } else if (this.segment._index !== activeElements[0]._index) {
                  this.barChart.update();
                  this.segment = activeElements[0];
                  this.segment._model.borderColor = '#FFFFFF';
                  this.segment._model.borderWidth = 2;
                  this.sameSegment = false;
                  this.segmentActive.emit({
                    label: this.segment._model.label,
                    active: true,
                  });
                }
              }
            }
          },
        },
      });
    }
  }

  getColorRange(typeChart: number): chartsUtils.IColors {
    let color: Array<chartsUtils.IColorRange>;
    let colorHover: Array<string>;
    switch (typeChart) {
      case 1:
        color = chartsUtils.colorRangeGeneral;
        colorHover = chartsUtils.colorRangeGeneralHover;
        break;
      case 2:
        color = chartsUtils.colorRangeGreens;
        colorHover = chartsUtils.colorRangeGreensHover;
        break;
      default:
        color = chartsUtils.colorRangeGeneral;
        colorHover = chartsUtils.colorRangeGeneralHover;
        break;
    }
    return {color, colorHover};
  }

  //DOCS: Ajustar el tamaño del titulo de acuerdo al tamaño de la grafica
  setSizeTitleLabels(widthBar: number, heightBar: number): BarChartTextSizes {
    let barChart: BarChartTextSizes = {
      chartWidth: 200,
      chartHeight: 200,
      titleTextSize: 24,
      labelsTextSize: 12,
    };

    //DOCS: TAMAÑO MAC

    this.sizesWidthAndHeightDoughnutMac.forEach((item) => {
      if (widthBar >= item.chartWidth && heightBar >= item.chartHeight) {
        barChart = {
          chartWidth: 200,
          chartHeight: 200,
          titleTextSize: item.titleTextSize,
          labelsTextSize: item.labelsTextSize,
        };
      }
    });

    return barChart;
  }

  setSettings(): void {
    Chart.defaults.font.family = 'Novecento-Bold';
    Chart.defaults.plugins.title.color = '$pqBlack4';
  }
}
