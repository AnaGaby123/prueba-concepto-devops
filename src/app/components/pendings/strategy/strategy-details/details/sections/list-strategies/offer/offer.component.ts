/* Core Imports */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {
  debounce,
  flow,
  forEach,
  isEmpty,
  isEqual,
  isFinite,
  orderBy,
  reduce,
  sumBy,
} from 'lodash-es';

/* Model Imports */
import {AppState} from '@appCore/core.state';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IPositionsPopUp} from '@appModels/popUp/pop-up.model';
import {
  IBarChart,
  IChartSegmentClicked,
  IDoughnutChart,
  IDoughnutChartDetails,
} from '@appModels/chart/chart';
import {VCliente} from 'api-catalogos';

/* Actions Imports */
import {offerActions} from '@appActions/pendings/strategy/strategy-details/details';
import {SET_FILTER_BY_BRAND} from '@appActions/pendings/strategy/strategy-details/details/offer/offer.actions';

/* Selectors Imports */
import {strategyDetailsSelectors} from '@appSelectors/pendings';
import {strategyDetailsOfferSelectors} from '@appSelectors/pendings/strategy';

/* Tools Imports */
import {fadeInBottomStrategy} from '@appUtil/animations';
import {
  CHANGE_NOTICE,
  CREDIT_NOTES,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  DELINQUENT,
  HEALTHY_DEBT,
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
import {
  FacturasPendientesClienteObj,
  TupleFccNotaCreditoCFDIDecimal,
  TupleTpProformaPedidoVFacturaClienteCalendarioCFDIDecimal,
} from 'api-finanzas';
import {EstadoTasasConversionObj, MotivosCancelacionTasaConversionObj} from 'api-logistica';
import {
  IDeliveries,
  IDetailsPopConversionRate,
  IItem,
  IPercentagesDeliveries,
} from '@appModels/store/pendings/strategy/strategy-details/details/sections/offer/offer.models';
import {offerSelectors} from '@appSelectors/pendings/strategy/strategy-details/details';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
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
  animations: [fadeInBottomStrategy],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit, DoCheck, OnDestroy {
  @ViewChild('anchor') public anchor: ElementRef;
  @ViewChild('imageElementStrategy', {static: false}) imageElement: ElementRef;
  @ViewChild('imageElementChild') imageElementChild: ElementRef;

  bandOptions$: Observable<Array<DropListOption>> = this.store.select(
    strategyDetailsOfferSelectors.selectBrandOptions,
  );
  clientData$: Observable<VCliente> = this.store.select(strategyDetailsSelectors.selectClientData);
  currency$: Observable<string> = this.store.select(strategyDetailsSelectors.selectCurrency);
  doughnutChartDataConditions$: Observable<IDoughnutChart> = this.store.select(
    offerSelectors.selectDoughnutChartDataDefaulting,
  );
  doughnutChartOptionConditionsDetails$: Observable<
    Array<IDoughnutChartDetails>
  > = this.store.select(offerSelectors.selectDoughnutChartDefaultingDetails);
  doughnutChartOptionDetailsConditionsHover$: Observable<
    Array<Array<IDoughnutChartDetails>>
  > = this.store.select(offerSelectors.selectDoughnutChartDefaultingDetailsHover);
  filterSelected$: Observable<DropListOption> = this.store.select(
    offerSelectors.selectFilterByType,
  );
  filters$: Observable<Array<DropListOption>> = this.store.select(offerSelectors.selectDataByType);
  isLoadingDataDeliveries$: Observable<boolean> = this.store.select(
    offerSelectors.selectIsLoadingListDeliveries,
  );
  isLoadingItemsQuoteSelected$: Observable<number> = this.store.select(
    strategyDetailsSelectors.selectIsLoadingItemsQuote,
  );
  isLoadingPendingInvoices$: Observable<boolean> = this.store.select(
    offerSelectors.selectIsLoadingPendingsInvoices,
  );
  selectInternalSalesItem$: Observable<InternalSalesItem[]> = this.store.select(
    strategyDetailsSelectors?.selectInternalSalesItem,
  );

  selectTotalItems$: Observable<number> = this.store.select(
    strategyDetailsSelectors.selectTotalItems,
  );
  selectColumnsHeaderConfig$: Observable<InternalSalesItem> = this.store.select(
    strategyDetailsSelectors?.selectColumnsHeaderConfig,
  );
  listCreditNotes$: Observable<Array<TupleFccNotaCreditoCFDIDecimal>> = this.store.select(
    offerSelectors.selectCreditNotes,
  );
  listDelinquentBills$: Observable<
    Array<TupleTpProformaPedidoVFacturaClienteCalendarioCFDIDecimal>
  > = this.store.select(offerSelectors.selectDelinquentBills);
  listDeliveriesChangeNotice$: Observable<Array<IDeliveries>> = this.store.select(
    offerSelectors.selectListChangeNotice,
  );
  listDeliveriesMoreThanThreeDays$: Observable<Array<IDeliveries>> = this.store.select(
    offerSelectors.selectListMoreThanThreeDay,
  );
  listDeliveriesOneDay$: Observable<Array<IDeliveries>> = this.store.select(
    offerSelectors.selectListOneDay,
  );
  listDeliveriesThreeDays$: Observable<Array<IDeliveries>> = this.store.select(
    offerSelectors.selectListThreeDay,
  );
  listDeliveriesTwoDays$: Observable<Array<IDeliveries>> = this.store.select(
    offerSelectors.selectListTwoDay,
  );
  listHealthyDebtBills$: Observable<
    Array<TupleTpProformaPedidoVFacturaClienteCalendarioCFDIDecimal>
  > = this.store.select(offerSelectors.selectHealthyDebtBills);
  listTypesOfSearch$: Observable<Array<DropListOption>> = this.store.select(
    strategyDetailsOfferSelectors.selectListTypesOfSearch,
  );
  paymentConditions$: Observable<string> = this.store.select(
    offerSelectors.selectPaymentConditions,
  );
  pendingInvoices$: Observable<FacturasPendientesClienteObj> = this.store.select(
    offerSelectors.selectDataPendingInvoices,
  );
  percentageDeliveriesInForm$: Observable<string> = this.store.select(
    offerSelectors.selectPercentageDeliveriesInForm,
  );
  percentageDeliveriesOutOfTime$: Observable<string> = this.store.select(
    offerSelectors.selectPercentageDeliveriesOutOfTime,
  );
  percentagesChart$: Observable<IPercentagesDeliveries> = this.store.select(
    offerSelectors.selectPercentagesChart,
  );
  scrollItemsDeliveries: Array<IDeliveries> = [];
  scrollItemsPendingsInvoices:
    | Array<TupleTpProformaPedidoVFacturaClienteCalendarioCFDIDecimal>
    | Array<TupleFccNotaCreditoCFDIDecimal> = [];
  searchTerm$: Observable<string> = this.store.select(
    strategyDetailsOfferSelectors.selectSearchTerm,
  );
  selectCurrencyClient$: Observable<string> = this.store.select(
    offerSelectors.selectCurrencyClient,
  );
  selectRemains$: Observable<number> = this.store.select(offerSelectors.selectRemains);
  totalCreditNotes$: Observable<number> = this.store.select(offerSelectors.selectTotalCreditNotes);
  totalDelinquent$: Observable<number> = this.store.select(offerSelectors.selectTotalDelinquent);
  totalDeliveries$: Observable<number> = this.store.select(offerSelectors.selectTotalDeliveries);
  totalHealthy$: Observable<number> = this.store.select(offerSelectors.selectTotalCreditNotes);
  typeOfSearch$: Observable<DropListOption> = this.store.select(
    strategyDetailsOfferSelectors.selectTypeOfSearch,
  );
  valuesBarChart$: Observable<IBarChart> = this.store.select(offerSelectors.selectBarChartData);
  changeNotice = CHANGE_NOTICE;
  count = 0;
  creditNotes = CREDIT_NOTES;
  dataPopUpConditions: {top: string; left: string};
  dataPopUpConversion: {top: string; left: string};
  dataPopUpDelivers: {top: string; left: string};
  dataTargetConditions: any;
  dataTargetConversion: any;
  dataTargetDelivers: any;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  delinquent = DELINQUENT;
  errorImageNativeElement = false;
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  healthyDebt = HEALTHY_DEBT;
  imageNativeElement;
  isTypeSelected = false;
  itemsQuotationScroll: Array<InternalSalesItem> = [];
  lodashIsFinite = isFinite;
  moreThanThreeDays = MORE_THAN_THREE_DAYS;
  oneDay = ONE_DAY;
  oneYear: string;
  openMark = false;
  popUpIsOpenConditions = false;
  popUpIsOpenConversion = false;
  popUpIsOpenDelivers = false;
  positionsPopUpConditions: IPositionsPopUp;
  positionsPopUpConversion: IPositionsPopUp;
  positionsPopUpDelivery: IPositionsPopUp;
  segmentActiveChartConditions = null as IChartSegmentClicked;
  segmentActiveChartDeliveries = null as IChartSegmentClicked;
  selectedItem: IItem = {} as IItem;
  targetConditions: any = null;
  targetConversion: any = null;
  targetDelivers: any = null;
  threeDays = THREE_DAYS;
  trianglePositionConversion: 'down' | 'left';
  twoDays = TOW_DAYS;
  typeAlternative = ITEM_QUOTATION_TYPE_ALTERNATIVES;
  typeComplementary = ITEM_QUOTATION_TYPE_COMPLEMENTARY;
  typeOriginal = ITEM_QUOTATION_TYPE_ORIGINAL;
  typePromotion = ITEM_QUOTATION_TYPE_PROMOTION;
  typeSaving = ITEM_QUOTATION_TYPE_SAVING;
  viewIpad = VIEW_IPAD;
  viewMacBookAir = VIEW_MACBOOKAIR;
  viewType: string;
  textSearch = '';
  nameActionsInternalSalesItem = NameActionsInternalSalesItem;

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private appService: CoreContainerService,
  ) {}

  ngOnInit(): void {
    this.onResize();
    this.fetchPendingInvoices();
    this.fetchDataDeliveries();
    this.getOneYearBackPeriod();
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
    this.store.dispatch(offerActions.CLEAN_ALL_OFFER());
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  handleTrackByItemBy(index: number, item: InternalSalesItem): string {
    return item.data?.IdCotPartidaCotizacion;
  }
  handleAction(model: ModelEmitInternalSalesItem): void {
    switch (model.action) {
      case this.nameActionsInternalSalesItem.ConceptConversionRateAction:
        this.sendInitialDataPopUpConversion(model.target, model.data, true);
        break;
      case this.nameActionsInternalSalesItem.BrandItemRateConversionAction:
        this.sendInitialDataPopUpConversion(model.target, model.data, false);
        break;
      case this.nameActionsInternalSalesItem.UnitPriceEditNumberAction:
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

  fetchPendingInvoices(): void {
    this.store.dispatch(offerActions.FETCH_PENDING_INVOICES());
  }

  fetchDataDeliveries(): void {
    this.store.dispatch(offerActions.FETCH_DATA_DELIVERY());
  }

  setSearchType(searchType: DropListOption): void {
    this.store.dispatch(
      offerActions.SET_SEARCH_TYPE({
        searchType,
      }),
    );
    if (this.textSearch !== '') {
      this.changeSearchTerm(this.textSearch);
    }
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(offerActions.SET_SEARCH_TERM({searchTerm}));
    this.textSearch = searchTerm;
  }

  fetchMore(event: IPageInfo): void {
    this.store.dispatch(offerActions.FETCH_MORE_ITEMS_COMPONENT_EFFECT({event}));
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

  @HostListener('window:resize')
  onResize(): void {
    this.viewType =
      window.innerWidth < RESPONSIVE_MENU_WIDTH_LIMIT ? this.viewIpad : this.viewMacBookAir;
    this.setPositionsPopUps();
  }

  setPositionsPopUps(): void {
    if (this.viewType === 'iPad') {
      this.positionsPopUpConversion = {bottom: '-7px', left: '40px'};
      this.trianglePositionConversion = 'down';
      this.positionsPopUpDelivery = {bottom: '-7px', left: '160px'};
      this.positionsPopUpConditions = {bottom: '-7px', left: '40px'};
    } else {
      this.positionsPopUpConversion = {bottom: '50%', left: '-7px'};
      this.trianglePositionConversion = 'left';
      this.positionsPopUpDelivery = {bottom: '-7px', left: '50%'};
      this.positionsPopUpConditions = {bottom: '-7px', left: '250px'};
    }
  }

  setOrder(filterByType: DropListOption): void {
    this.store.dispatch(offerActions.SET_FILTER_BY_TYPE_PENDING_INVOICES({filterByType}));
  }

  errorImage(img: HTMLImageElement): void {
    img.src = this.defaultImageSource;
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

  sendInitialDataPopUpConditions(target) {
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
        this.dataTargetConditions.width !== 0
          ? (this.popUpIsOpenConditions = true)
          : (this.popUpIsOpenConditions = false);
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

  sendInitialDataPopUpDelivers(target) {
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
        this.dataTargetDelivers.width !== 0
          ? (this.popUpIsOpenDelivers = true)
          : (this.popUpIsOpenDelivers = false);
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
            popUpLeft = dataPopUp.left - 119.5;
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

  handleFilterMarkIsOpen(blur?: string) {
    if (blur === 'blur') {
      if (this.openMark) {
        this.openMark = false;
      }
    } else {
      this.openMark = !this.openMark;
    }
  }

  handleFilterMark(value: DropListOption): void {
    this.handleFilterMarkIsOpen();
    this.store.dispatch(SET_FILTER_BY_BRAND({value}));
  }

  setSegmentActive(segmentActive: IChartSegmentClicked, chart: string) {
    if (chart === 'conditions') {
      this.segmentActiveChartConditions = segmentActive.active ? segmentActive : null;
    } else if (chart === 'deliveries') {
      this.segmentActiveChartDeliveries = segmentActive.active ? segmentActive : null;
    }
  }

  getOneYearBackPeriod() {
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
  clearSearch() {
    this.changeSearchTerm('');
  }

  getElement(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement;
  }
}
