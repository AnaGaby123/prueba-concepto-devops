/* Core Imports */
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

/* Model Imports */
import {AppState} from '@appCore/core.state';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IPositionsPopUp} from '@appModels/popUp/pop-up.model';
import {IChartSegmentClicked, IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {
  IGeneralData,
  IItemQuotation,
} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.model';
import {IDetailsPopConversionRate} from '@appModels/store/pendings/strategy/strategy-details/details/sections/offer/offer.models';

/* Actions Imports */
import {
  dailyMeetingDetailsActions,
  dailyMeetingDetailsOfferActions,
  dailyMeetingDetailsOfferDeliveryActions,
} from '@appActions/pendings/daily-meeting';

/* Selectors Imports */
import {
  dailyMeetingDetailsOfferDelinquentSelectors,
  dailyMeetingDetailsOfferSelectors,
  dailyMeetingDetailsSelectors,
} from '@appSelectors/pendings/daily-meeting';

/* Tools Imports */
import {debounce, flow, forEach, isEmpty, isEqual, orderBy, reduce, sumBy} from 'lodash-es';

import {
  CREDIT_NOTES,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  DELINQUENT,
  ITEM_QUOTATION_TYPE_ALTERNATIVES,
  ITEM_QUOTATION_TYPE_COMPLEMENTARY,
  ITEM_QUOTATION_TYPE_ORIGINAL,
  ITEM_QUOTATION_TYPE_PROMOTION,
  ITEM_QUOTATION_TYPE_SAVING,
  MORE_THAN_THREE_DAYS,
  ONE_DAY,
  RESPONSIVE_MENU_WIDTH_LIMIT,
  STATUS_CANCELED,
  STATUS_PURCHASE_PROMISE,
  THREE_DAYS,
  TOW_DAYS,
  VIEW_IPAD,
  VIEW_MACBOOKAIR,
} from '@appUtil/common.protocols';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {EstadoTasasConversionObj, MotivosCancelacionTasaConversionObj} from 'api-logistica';
import {IItem} from '@appModels/store/pendings/daily-meeting/daily-meeting-details/details/sections/offer/offer.model';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit, DoCheck, AfterContentChecked, OnDestroy {
  @ViewChild('imageElement') imageElement: ElementRef;
  @ViewChild('imageElementChild') imageElementChild: ElementRef;
  bandOptions$: Observable<Array<DropListOption>> = this.store.select(
    dailyMeetingDetailsOfferSelectors.selectListBrandSectionOffer,
  );

  selectColumnsHeaderConfig$: Observable<InternalSalesItem> = this.store.select(
    dailyMeetingDetailsSelectors?.selectColumnsConfig,
  );
  currency$: Observable<string> = this.store.select(dailyMeetingDetailsSelectors.selectCurrency);
  filterSelected$: Observable<DropListOption> = this.store.select(
    dailyMeetingDetailsOfferDelinquentSelectors.selectFilterByType,
  );
  filters$: Observable<Array<DropListOption>> = this.store.select(
    dailyMeetingDetailsOfferDelinquentSelectors.selectDataByType,
  );
  isLoadingItemsQuotation$: Observable<number> = this.store.select(
    dailyMeetingDetailsSelectors.selectIsLoadingItemsQuotation,
  );
  itemsQuotation$: Observable<Array<IItemQuotation>> = this.store.select(
    dailyMeetingDetailsOfferSelectors.selectItemsQuotationSectionOffer,
  );
  listTypesOfSearch$: Observable<Array<DropListOption>> = this.store.select(
    dailyMeetingDetailsOfferSelectors.selectListTypesOfSearchSectionOffer,
  );
  searchTerm$: Observable<string> = this.store.select(
    dailyMeetingDetailsOfferSelectors.selectSearchTermSectionOffer,
  );
  typeOfSearch$: Observable<DropListOption> = this.store.select(
    dailyMeetingDetailsOfferSelectors.selectTypeOfSearchSectionOffer,
  );
  userData$: Observable<IGeneralData> = this.store.select(
    dailyMeetingDetailsSelectors.selectUserData,
  );
  selectInternalSalesItem$: Observable<InternalSalesItem[]> = this.store.select(
    dailyMeetingDetailsSelectors?.selectInternalSalesItem,
  );

  creditNotes = CREDIT_NOTES;
  delinquent = DELINQUENT;
  moreThanThreeDays = MORE_THAN_THREE_DAYS;
  oneDay = ONE_DAY;
  oneYear: string;
  threeDays = THREE_DAYS;
  twoDays = TOW_DAYS;
  viewIpad = VIEW_IPAD;
  viewMacBookAir = VIEW_MACBOOKAIR;

  selectedItem: IItem = {} as IItem;
  itemsQuotationScroll: Array<InternalSalesItem> = [];
  segmentActiveChartConditions = null as IChartSegmentClicked;
  segmentActiveChartDeliveries = null as IChartSegmentClicked;
  isTypeSelected = false;
  searchTypes: Array<DropListOption> = [
    {label: 'Concepto', value: '1'},
    {label: 'Marca', value: '2'},
    {label: '#Cat', value: '3'},
  ];
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  textSearch = '';
  popUpIsOpenConversion = false;
  dataPopUpConversion: {top: string; left: string};
  targetConversion: any = null;
  dataTargetConversion: any;
  positionsPopUpConversion: IPositionsPopUp;
  trianglePositionConversion: 'down' | 'left';
  popUpIsOpenConditions = false;
  dataPopUpConditions: {top: string; left: string};
  dataTargetConditions: any;
  positionsPopUpConditions: IPositionsPopUp;
  targetConditions: any = null;
  popUpIsOpenDelivers = false;
  dataPopUpDelivers: {top: string; left: string};
  dataTargetDelivers: any;
  positionsPopUpDelivery: IPositionsPopUp;
  targetDelivers: any = null;
  count = 0;
  viewType: string;
  errorImageChildNativeElement = false;
  errorImageNativeElement = false;
  filterSelected: any = {value: 1, label: 'Más Antiguas'};
  typeOriginal = ITEM_QUOTATION_TYPE_ORIGINAL;
  typePromotion = ITEM_QUOTATION_TYPE_PROMOTION;
  typeSaving = ITEM_QUOTATION_TYPE_SAVING;
  typeAlternative = ITEM_QUOTATION_TYPE_ALTERNATIVES;
  typeComplementary = ITEM_QUOTATION_TYPE_COMPLEMENTARY;

  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  imageNativeElement;
  imageChildNativeElement;
  nameActionsInternalSalesItem = NameActionsInternalSalesItem;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private appService: CoreContainerService,
  ) {}

  ngOnInit(): void {
    this.onResize();
    this.fetchDataDeliveries();
    this.getOneYearBackPeriod();
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
    if (!!this.imageElement) {
      this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
    }
    if (!!this.imageElementChild) {
      this.imageChildNativeElement = this.renderer.selectRootElement(
        this.imageElementChild,
      ).nativeElement;
    }
  }

  ngDoCheck(): void {
    if (this.targetConversion) {
      this.callToFunction('conversion');
    }
    if (this.targetConditions) {
      this.callToFunction('conditions');
    }
    if (this.targetDelivers) {
      this.callToFunction('delivers');
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(dailyMeetingDetailsOfferActions.CLEAN_ALL_OFFER());
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewType =
      window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? this.viewIpad : this.viewMacBookAir;
    this.setPositionsPopUps();
  }

  handleTrackByItemBy(index: number, item: InternalSalesItem): string {
    return item.data?.IdCotPartidaCotizacion;
  }
  fetchMore(event: IPageInfo): void {
    this.store.dispatch(dailyMeetingDetailsActions.FETCH_MORE_ITEMS_COMPONENT_EFFECT({event}));
    // this.sendInitialDataPopUpConversion(this.targetConversion);
  }

  fetchDataDeliveries(): void {
    this.store.dispatch(dailyMeetingDetailsOfferDeliveryActions.FETCH_DATA_DELIVERY());
  }

  getOneYearBackPeriod(): void {
    const now: Date = new Date();
    const month: number = now.getMonth();
    const year: number = now.getFullYear();
    const arrMonths = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    this.oneYear = `${arrMonths[month]} ${year - 1} a ${arrMonths[month]} ${year}`;
  }

  setPositionsPopUps(): void {
    if (this.viewType === 'iPad') {
      this.positionsPopUpConversion = {bottom: '-7px', left: '40px'};
      this.trianglePositionConversion = 'down';
      this.positionsPopUpDelivery = {bottom: '-7px', left: '40px'};
      this.positionsPopUpConditions = {bottom: '-7px', left: '40px'};
    } else {
      this.positionsPopUpConversion = {bottom: '50%', left: '-7px'};
      this.trianglePositionConversion = 'left';
      this.positionsPopUpDelivery = {bottom: '-7px', left: '50%'};
      this.positionsPopUpConditions = {bottom: '-7px', left: '250px'};
    }
  }

  setSearchType(type: DropListOption): void {
    this.store.dispatch(
      dailyMeetingDetailsOfferActions.SET_SEARCH_TYPE_ITEMS_OFFER({
        searchType: type,
      }),
    );
    if (this.textSearch !== '') {
      this.changeSearchTerm(this.textSearch);
    }
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      dailyMeetingDetailsOfferActions.SET_SEARCH_TERM_ITEMS_OFFER({
        searchTerm,
      }),
    );
    this.textSearch = searchTerm;
  }

  closePopUp(refPopUp: string): void {
    if (refPopUp === 'conversion') {
      this.popUpIsOpenConversion = false;
      this.targetConversion = null;
    } else if (refPopUp === 'conditions') {
      this.popUpIsOpenConditions = false;
      this.targetConditions = null;
      this.segmentActiveChartConditions = null;
    } else if (refPopUp === 'delivers') {
      this.popUpIsOpenDelivers = false;
      this.targetDelivers = null;
      this.segmentActiveChartDeliveries = null;
    }
  }

  handlePopUp(item: IItemQuotation, node: string, value: boolean): void {
    this.store.dispatch(
      dailyMeetingDetailsOfferActions.SET_ENTRY_POP_UP_IS_OPEN({
        itemId: item.IdCotPartidaCotizacion,
        node,
        isOpen: value,
      }),
    );
  }

  callToFunction(refPopUp: string): void {
    if (refPopUp === 'conversion') {
      this.sendInitialDataPopUpConversion(
        this.targetConversion,
        this.selectedItem,
        this.isTypeSelected,
        0,
        false,
      );
    } else if (refPopUp === 'conditions') {
      this.sendInitialDataPopUpConditions(this.targetConditions);
    } else if (refPopUp === 'delivers') {
      this.sendInitialDataPopUpDelivers(this.targetDelivers);
    }
  }

  errorImageChild(): void {
    if (!this.errorImageChildNativeElement) {
      this.renderer.setAttribute(this.imageChildNativeElement, 'src', this.defaultImageSource);
      this.errorImageChildNativeElement = true;
    }
    this.setImage();
  }

  setImageChild(src?: string): string {
    if (src) {
      if (!this.errorImageChildNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    this.errorImageNativeElement = false;
    return this.defaultImageSource;
  }

  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }

  setImage(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    return this.defaultImageSource;
  }

  // callToFunction(refPopUp: string): void {
  //   if (refPopUp === 'conversion') {
  //     this.sendInitialDataPopUpConversion(this.targetConversion);
  //   }
  //   if (refPopUp === 'conditions') {
  //     this.sendInitialDataPopUpConditions(this.targetConditions);
  //   }
  //   if (refPopUp === 'delivers') {
  //     this.sendInitialDataPopUpDelivers(this.targetDelivers);
  //   }
  // }

  // sendInitialDataPopUpConversion(target): void {
  //   this.targetConversion = target;
  //   if (this.targetConversion) {
  //     const {
  //       bottom,
  //       height,
  //       left,
  //       right,
  //       top,
  //       width,
  //       x,
  //       y,
  //     } = this.targetConversion.getBoundingClientRect();
  //     const dataTargetCurrent = {
  //       bottom,
  //       height,
  //       left,
  //       right,
  //       top,
  //       width,
  //       x,
  //       y,
  //     };
  //     if (!_.isEqual(dataTargetCurrent, this.dataTargetConversion)) {
  //       this.dataTargetConversion = {...dataTargetCurrent};
  //       this.count = 0;
  //     } else {
  //       this.count++;
  //       if (this.count >= 2) {
  //         this.count = 0;
  //         const dataPopUp: DOMRect = this.dataTargetConversion;
  //         this.dataTargetConversion.width !== 0
  //           ? (this.popUpIsOpenConversion = true)
  //           : (this.popUpIsOpenConversion = false);
  //         let popUpTop;
  //         let popUpLeft;
  //
  //         if (this.viewType === 'iPad') {
  //           popUpTop = dataPopUp.top - 351 - 15;
  //           popUpLeft = dataPopUp.left;
  //         } else {
  //           popUpTop = dataPopUp.top - 603 / 2 + 17;
  //           popUpLeft = dataPopUp.left + width + 15;
  //         }
  //
  //         this.dataPopUpConversion = {
  //           top: `${popUpTop}px`,
  //           left: `${popUpLeft}px`,
  //         };
  //       }
  //     }
  //   }
  // }

  handleAction(model: ModelEmitInternalSalesItem): void {
    switch (model.action) {
      case this.nameActionsInternalSalesItem.ConceptConversionRateAction:
        this.sendInitialDataPopUpConversion(model.target, model.data, true);
        break;
      case this.nameActionsInternalSalesItem.BrandItemRateConversionAction:
        this.sendInitialDataPopUpConversion(model.target, model.data, false);
        break;
      case this.nameActionsInternalSalesItem.SeeNotesItemAction:
        this.store.dispatch(
          SET_POP_UP_NOTES_DATA({
            notes: model.dataInternal.columnNotes,
            modalIsOpen: model.value,
          }),
        );
        this.appService.setTarget(model.target);
        break;
    }
  }

  sendInitialDataPopUpConditions(target: EventTarget): void {
    this.targetConditions = target;
    if (this.targetConditions) {
      const {
        bottom,
        height,
        left,
        right,
        top,
        width,
        x,
        y,
      } = this.targetConditions.getBoundingClientRect();
      const dataTargetCurrent = {
        bottom,
        height,
        left,
        right,
        top,
        width,
        x,
        y,
      };
      if (!isEqual(dataTargetCurrent, this.dataTargetConditions)) {
        this.dataTargetConditions = {...dataTargetCurrent};
        this.count = 0;
      } else {
        this.count++;
        if (this.count >= 2) {
          this.count = 0;
          const dataPopUp: DOMRect = this.dataTargetConditions;
          this.dataTargetConditions.width !== 0
            ? (this.popUpIsOpenConditions = true)
            : (this.popUpIsOpenConditions = false);

          let popUpTop;
          let popUpLeft;

          if (this.viewType === 'iPad') {
            popUpTop = dataPopUp.top - 394 - 15;
            popUpLeft = dataPopUp.left;
          } else {
            popUpTop = dataPopUp.top - 741 - 15;
            popUpLeft = dataPopUp.left - 210;
          }

          this.dataPopUpConditions = {
            top: `${popUpTop}px`,
            left: `${popUpLeft}px`,
          };
        }
      }
    }
  }

  sendInitialDataPopUpDelivers(target: EventTarget): void {
    this.targetDelivers = target;
    if (this.targetDelivers) {
      const {
        bottom,
        height,
        left,
        right,
        top,
        width,
        x,
        y,
      } = this.targetDelivers.getBoundingClientRect();
      const dataTargetCurrent = {
        bottom,
        height,
        left,
        right,
        top,
        width,
        x,
        y,
      };
      if (!isEqual(dataTargetCurrent, this.dataTargetDelivers)) {
        this.dataTargetDelivers = {...dataTargetCurrent};
        this.count = 0;
      } else {
        this.count++;
        if (this.count >= 2) {
          this.count = 0;
          const dataPopUp: DOMRect = this.dataTargetDelivers;
          this.dataTargetDelivers.width !== 0
            ? (this.popUpIsOpenDelivers = true)
            : (this.popUpIsOpenDelivers = false);
          let popUpTop;
          let popUpLeft;
          if (this.viewType === 'iPad') {
            popUpTop = dataPopUp.top - 371 - 15;
            popUpLeft = dataPopUp.left;
          } else {
            popUpTop = dataPopUp.top - 629 - 15;
            popUpLeft = dataPopUp.left - 612 + 45;
          }

          this.dataPopUpDelivers = {
            top: `${popUpTop}px`,
            left: `${popUpLeft}px`,
          };
        }
      }
    }
  }

  setSegmentActive(segmentActive: IChartSegmentClicked, chart: string): void {
    if (chart === 'conditions') {
      this.segmentActiveChartConditions = segmentActive.active ? segmentActive : null;
    } else if (chart === 'deliveries') {
      this.segmentActiveChartDeliveries = segmentActive.active ? segmentActive : null;
    }
  }

  getElement(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement;
  }

  handleTrackItemByType(index, item: IItemQuotation): string {
    return item.popUpByType.elementId;
  }

  handleTrackItemByBrand(index, item: IItemQuotation): string {
    return item.popUpByBrand.elementId;
  }

  generateDoughnutChartDetails = (
    states: Array<EstadoTasasConversionObj>,
  ): Array<IDoughnutChartDetails> => {
    const totalPercentageByPurchasePromise = reduce(
      states,
      (percentage, state) => {
        return state.Estado === STATUS_PURCHASE_PROMISE ? state.Partidas : percentage;
      },
      0,
    );
    const totalPercentageByCanceled = reduce(
      states,
      (percentage, state) => {
        return state.Estado === STATUS_CANCELED ? state.Partidas : percentage;
      },
      0,
    );

    return [
      {label: 'Compras', value: totalPercentageByPurchasePromise.toString()},
      {label: 'No Compras', value: totalPercentageByCanceled.toString()},
    ];
  };

  generateDoughnutChart = (
    collectionCanceled: Array<MotivosCancelacionTasaConversionObj>,
    purchase: IDoughnutChartDetails,
  ): IDoughnutChart => {
    let values = [Number(purchase.value)];
    let labels = [purchase.label];
    forEach(orderBy(collectionCanceled, 'Partidas', 'desc'), (o) => {
      values = [...values, o.Partidas];
      labels = [...labels, o.catMotivoCancelacionPartidaCotizacion.Descripcion];
    });
    return {
      values,
      labels,
    };
  };

  // DOCS: DETALLES AL CENTRO DE LA DONA (EFECTO OHOVER)
  generateDoughnutChartDetailsHover = (
    states: Array<MotivosCancelacionTasaConversionObj>,
    purchase: IDoughnutChartDetails,
  ): Array<Array<IDoughnutChartDetails>> =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        let data: Array<Array<IDoughnutChartDetails>> = [];
        data = [...data, [{label: 'Partidas', value: Number(purchase.value).toString()}]];
        forEach(states, (o) => {
          let details: Array<IDoughnutChartDetails> = [];
          details = [...details, {label: 'Partidas', value: o.Partidas.toString()}];
          data = [...data, details];
        });
        return data;
      },
    ])();
  generateDetails = (
    collectionCanceled: Array<MotivosCancelacionTasaConversionObj>,
    total: number,
  ): Array<IDetailsPopConversionRate> => {
    let value: Array<IDetailsPopConversionRate> = [];
    forEach(
      orderBy(collectionCanceled, 'Partidas', 'desc'),
      (o: MotivosCancelacionTasaConversionObj) => {
        value = [
          ...value,
          {
            Partidas: o.Partidas,
            Porcentaje: (o.Partidas / total) * 100,
            Descripcion: o?.catMotivoCancelacionPartidaCotizacion?.Descripcion,
          },
        ];
      },
    );
    return value;
  };

  sendInitialDataPopUpConversion(
    target,
    item: any,
    isType: boolean,
    percentage = 0,
    isReloadData = true,
  ) {
    this.targetConversion = target;
    if (this.targetConversion) {
      if (isReloadData && !isEmpty(item)) {
        const doughnutChartOptionConversionDetails = this.generateDoughnutChartDetails(
          isType
            ? !isEmpty(item.TasasConversionObjTipo)
              ? item.TasasConversionObjTipo.Estados
              : []
            : !isEmpty(item.TasasConversionObj)
            ? item.TasasConversionObj.Estados
            : [],
        );
        const doughnutChartDataConversion = this.generateDoughnutChart(
          isType
            ? !isEmpty(item.TasasConversionObjTipo)
              ? item.TasasConversionObjTipo.CausasCancelacion
              : []
            : !isEmpty(item.TasasConversionObj)
            ? item.TasasConversionObj.CausasCancelacion
            : [],
          doughnutChartOptionConversionDetails[0],
        );

        const doughnutChartDataConversionHover = this.generateDoughnutChartDetailsHover(
          isType
            ? !isEmpty(item.TasasConversionObjTipo)
              ? item.TasasConversionObjTipo.CausasCancelacion
              : []
            : !isEmpty(item.TasasConversionObj)
            ? item.TasasConversionObj.CausasCancelacion
            : [],
          doughnutChartOptionConversionDetails[0],
        );

        const details: IDetailsPopConversionRate[] = this.generateDetails(
          isType
            ? !isEmpty(item.TasasConversionObjTipo)
              ? item.TasasConversionObjTipo.CausasCancelacion
              : []
            : !isEmpty(item.TasasConversionObj)
            ? item.TasasConversionObj.CausasCancelacion
            : [],
          Number(doughnutChartOptionConversionDetails[0].value) +
            Number(doughnutChartOptionConversionDetails[1].value),
        );

        const PorcentajeTasasConversion = sumBy(
          details,
          (item: IDetailsPopConversionRate) => item.Porcentaje,
        );

        this.selectedItem = {
          TipoPartidaCotizacion: item.TipoPartidaCotizacion,
          NombreMarca: item.NombreMarca,
          PorcentajeTasasConversion,
          total:
            Number(doughnutChartOptionConversionDetails[0].value) +
            Number(doughnutChartOptionConversionDetails[1].value),
          details,
          doughnutChartDataConversion,
          doughnutChartOptionConversionDetails,
          doughnutChartDataConversionHover,
        };
        this.isTypeSelected = isType;
      }
      const {
        bottom,
        height,
        left,
        right,
        top,
        width,
        x,
        y,
      } = this.targetConversion.getBoundingClientRect();
      const dataTargetCurrent = {
        bottom,
        height,
        left,
        right,
        top,
        width,
        x,
        y,
      };
      if (!isEqual(dataTargetCurrent, this.dataTargetConversion)) {
        this.dataTargetConversion = {...dataTargetCurrent};
        this.count = 0;
      } else {
        this.count++;
        if (this.count >= 2) {
          this.count = 0;
          const dataPopUp: DOMRect = this.dataTargetConversion;
          this.dataTargetConversion.width !== 0
            ? (this.popUpIsOpenConversion = true)
            : (this.popUpIsOpenConversion = false);
          let popUpTop;
          let popUpLeft;

          if (this.viewType === 'iPad') {
            popUpTop = dataPopUp.top - 351 - 15;
            popUpLeft = dataPopUp.left;
          } else {
            popUpTop = dataPopUp.top - 603 / 2 + 17;
            popUpLeft = dataPopUp.left + width + 15;
          }

          this.dataPopUpConversion = {
            top: `${popUpTop}px`,
            left: `${popUpLeft}px`,
          };
        }
      }
    }
  }
}
