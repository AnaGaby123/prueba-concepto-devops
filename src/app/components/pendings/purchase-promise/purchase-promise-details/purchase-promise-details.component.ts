import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {lastValueFrom, Observable} from 'rxjs';
import {take} from 'rxjs/operators';

// Models
import {GMPartidaPromesaDeCompra, GMPretramitarPromesaDeCompra} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ICard} from '@appModels/card/card';
import {Archivo, ContactoDetalleObj} from 'api-catalogos';
import {
  IClientTotals,
  IPurchasePromiseClient,
  IPurchasePromiseOrder,
  IPurchasePromiseQuotation,
  IQuoteItem,
  IQuoteSummaryItem,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';

// Actions
import {purchasePromiseDetailsActions} from '@appActions/pendings/purchase-promise';
import {DOWLOAD_FILE_LOAD} from '@appActions/utils/utils.action';

// Selectors
import {purchasePromiseDetailsSelectors} from '@appSelectors/pendings/purchase-promise';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {
  API_REQUEST_STATUS_LOADING,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  INCIDENCE_CATALOG,
  INCIDENCE_COMMENTS,
  INCIDENCE_DESCRIPTION,
  INCIDENCE_PRESENTATION,
  INCIDENCE_PRICE,
  INCIDENCE_TEE_SHORT,
  INCIDENCE_TRADEMARK,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {ILimitLine} from '@appModels/progress-bar/limit-line';
import {resumePurchasePromise} from '@appSelectors/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {IClientContact} from '@appModels/shared/shared.models';
import {QuoteItemExtension} from '@appModels/purchase-promise/QuoteItemExtension';
import {InputValidators} from '../../../../helpers/shared/shared.helpers';
import {MatDialog} from '@angular/material/dialog';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';
import {AddItemToResumeAlertComponent} from '@appComponents/pendings/purchase-promise/purchase-promise-details/add-item-to-resume-alert/add-item-to-resume-alert.component';
import {OF_CONTRACT} from '@appHelpers/pendings/purchase-proomise/purchase-promise-detail/purchase-promise-detail.helper';
import {ShoppingCartTotalsModel} from '@appModels/quotation/ShoppingCartTotals.model';
import {IReferenceFormEdit} from '@appComponents/shared/reference-form-edit/reference-form-edit.component';

@Component({
  selector: 'app-purchase-promise-details',
  templateUrl: './purchase-promise-details.component.html',
  styleUrls: ['./purchase-promise-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchasePromiseDetailsComponent implements OnDestroy, AfterViewInit {
  @ViewChild('priceInputPP') public priceInput: ElementRef;
  @ViewChild('priceInputDispatchPP') public priceInputDispatch: ElementRef;
  @ViewChild('piecesInputPP') public piecesInput: ElementRef;
  @ViewChild('piecesInputDispatchPP') public piecesInputDispatch: ElementRef;
  readonly inputValidators = InputValidators;
  readonly REQUEST_LOADING = API_REQUEST_STATUS_LOADING;
  readonly CAS = '3';

  ocBurgerOptions$: Observable<Array<DropListOption>> = this.store.select(
    purchasePromiseDetailsSelectors.selectOcBurgerOptions,
  );
  clientTotals$: Observable<IClientTotals> = this.store.select(
    purchasePromiseDetailsSelectors.selectClientTotals,
  );
  selectedOcBurgerOption$: Observable<DropListOption> = this.store.select(
    purchasePromiseDetailsSelectors.selectedOcBurgerOption,
  );
  dateBurgerOptions$: Observable<Array<DropListOption>> = this.store.select(
    purchasePromiseDetailsSelectors.selectDateBurgerOptions,
  );
  selectedDateBurgerOption$: Observable<DropListOption> = this.store.select(
    purchasePromiseDetailsSelectors.selectedDateBurgerOption,
  );
  purchaseSearchOptions$: Observable<Array<DropListOption>> = this.store.select(
    purchasePromiseDetailsSelectors.selectPurchaseSearchOptions,
  );
  selectedPurchaseSearchOption$: Observable<DropListOption> = this.store.select(
    purchasePromiseDetailsSelectors.selectedPurchaseSearchOption,
  );
  ocSearchTerm$: Observable<string> = this.store.select(
    purchasePromiseDetailsSelectors.selectOcSearchTerm,
  );
  purchaseSearchTerm$: Observable<string> = this.store.select(
    purchasePromiseDetailsSelectors.selectPurchaseSearchTerm,
  );
  seeResumeActive$: Observable<boolean> = this.store.select(
    purchasePromiseDetailsSelectors.selectSeeResumeActive,
  );
  customer$: Observable<IPurchasePromiseClient> = this.store.select(
    purchasePromiseDetailsSelectors.selectedClient,
  );
  itemSelected$: Observable<DropListOption> = this.store.select(
    purchasePromiseDetailsSelectors.selectItemSearch,
  );
  purchaseOrderList$: Observable<Array<IPurchasePromiseOrder>> = this.store.select(
    purchasePromiseDetailsSelectors.selectPurchaseOrderList,
  );
  quotations$: Observable<Array<ICard>> = this.store.select(
    purchasePromiseDetailsSelectors.selectQuotationsForCards,
  );
  isLoadingOrders$: Observable<boolean> = this.store.select(
    purchasePromiseDetailsSelectors.selectApiStatusOrder,
  );
  orderTotals$: Observable<number> = this.store.select(
    purchasePromiseDetailsSelectors.selectPurchaseOrderTotals,
  );
  orderSelected$: Observable<IPurchasePromiseOrder> = this.store.select(
    purchasePromiseDetailsSelectors.selectPurchaseSelected,
  );
  base64$: Observable<string> = this.store.select(purchasePromiseDetailsSelectors.selectBase64);
  openPdf$: Observable<boolean> = this.store.select(
    purchasePromiseDetailsSelectors.selectOpenViewFile,
  );
  optionsProduct$: Observable<Array<DropListOption>> = this.store.select(
    purchasePromiseDetailsSelectors.selectOptionsProductSearch,
  );
  optionsLoading$: Observable<boolean> = this.store.select(
    purchasePromiseDetailsSelectors.selectLoadingOptionsSearch,
  );
  listItem$: Observable<Array<IQuoteItem>> = this.store.select(
    purchasePromiseDetailsSelectors.selectorSummaryList,
  );
  statusApiItemList$: Observable<number> = this.store.select(
    purchasePromiseDetailsSelectors.selectApiStatusItemList,
  );
  statusApiSummaryList$: Observable<number> = this.store.select(
    purchasePromiseDetailsSelectors.selectApiStatusSummaryList,
  );
  resume$: Observable<Array<GMPartidaPromesaDeCompra>> = this.store.select(
    purchasePromiseDetailsSelectors.resumePurchasePromise,
  );
  selectFleteEspressDetails$: Observable<IPurchasePromiseQuotation[]> = this.store.select(
    purchasePromiseDetailsSelectors.selectFleteEspressDetails,
  );
  listFleteExpress$: Observable<string[]> = this.store.select(
    purchasePromiseDetailsSelectors.listFleteExpress,
  );

  validatorForCloseButton$: Observable<boolean> = this.store.select(
    purchasePromiseDetailsSelectors.validatorForCloseSaleButton,
  );
  viewFileLoading$: Observable<boolean> = this.store.select(
    purchasePromiseDetailsSelectors.selectViewFileLoading,
  );
  quotesLinked$: Observable<IQuoteItem> = this.store.select(
    purchasePromiseDetailsSelectors.selectItemSelected,
  );
  clientContactData$: Observable<IClientContact> = this.store.select(
    purchasePromiseDetailsSelectors.selectContactClientData,
  );
  purchasePromise$: Observable<GMPretramitarPromesaDeCompra> = this.store.select(
    purchasePromiseDetailsSelectors.selectedPurchasePromise,
  );
  selectedPurchaseOrder$: Observable<IPurchasePromiseOrder> = this.store.select(
    purchasePromiseDetailsSelectors.selectedPurchaseOrder,
  );
  fleteAlreadySelected$: Observable<boolean> = this.store.select(
    purchasePromiseDetailsSelectors.fleteAlreadySelected,
  );
  selectedQuote$: Observable<IPurchasePromiseQuotation> = this.store.select(
    purchasePromiseDetailsSelectors.selectQuoteSelected,
  );
  isActiveAddToResume$: Observable<boolean> = this.store.select(
    purchasePromiseDetailsSelectors.isActiveAddToResume,
  );

  selectedIquoteItemDetails$: Observable<
    (GMPartidaPromesaDeCompra & QuoteItemExtension) | null
  > = this.store.select(purchasePromiseDetailsSelectors.selectedIquoteItemDetails);
  totalOrders$: Observable<number> = this.store.select(
    purchasePromiseDetailsSelectors.selectInternalSalesItemLength,
  );
  totals$: Observable<ShoppingCartTotalsModel> = this.store.select(
    purchasePromiseDetailsSelectors.selectTotals,
  );
  totalBrands$: Observable<number> = this.store.select(
    purchasePromiseDetailsSelectors.selectTotalBrands,
  );
  hasObservations$: Observable<boolean> = this.store.select(
    purchasePromiseDetailsSelectors.selectPurchaseOrderHasObservations,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  selectValueTotalInPromise$: Observable<number> = this.store.select(
    purchasePromiseDetailsSelectors.selectValueTotalInPromise,
  );
  isResumeActive$: Observable<boolean> = this.store.select(
    purchasePromiseDetailsSelectors.selectSeeResumeActive,
  );
  firstItemResume$: Observable<GMPartidaPromesaDeCompra & QuoteItemExtension> = this.store.select(
    purchasePromiseDetailsSelectors.selectFirstItemInResume,
  );

  viewTypes = AppViewTypes;
  listScrollItems: Array<IPurchasePromiseOrder> = [];
  lodashIsEmpty = isEmpty;
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  leftContainerIsOpen = false;
  handleOcSearchTerm = debounce(this.setOcSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  handleKeySearch = debounce((value) => this.changeSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);
  fileSelected: Archivo = {} as Archivo;
  fileName: string;
  isPdf = false;
  listItemScroll: Array<IQuoteItem> = [];
  selectedEntry: IQuoteSummaryItem;
  tempUnitPrice = 0;
  tempQuantity = 0;
  toolTipPop = false;
  targetPop: any;
  referencePopOpen = false;

  limitLines: Array<ILimitLine> = [
    {
      percentagePosition: 'calc(100% - 3px)',
      color: '#CC4757FF',
    },
    {
      percentagePosition: '90%',
      color: '#008894',
      tooltipText: '$13000 USD',
    },
  ];

  readonly FIELD_CATALOG = INCIDENCE_CATALOG;
  readonly FIELD_DESCRIPTION = INCIDENCE_DESCRIPTION;
  readonly FIELD_PRESENTATION = INCIDENCE_PRESENTATION;
  readonly FIELD_TRADEMARK = INCIDENCE_TRADEMARK;
  readonly FIELD_TEE = INCIDENCE_TEE_SHORT;
  readonly FIELD_UNIT_PRICE = INCIDENCE_PRICE;
  readonly FIELD_COMMENTS = INCIDENCE_COMMENTS;
  protected readonly InputValidators = InputValidators;

  @HostListener('document:click', ['$event'])
  clickOut(e?): void {
    if (this.selectedEntry && this.selectedEntry.quantityInputIsOpen && this.tempQuantity > 0) {
      if (
        this.piecesInput &&
        this.piecesInputDispatch &&
        e.target !== this.piecesInputDispatch.nativeElement &&
        e.target !== this.piecesInput.nativeElement
      ) {
        this.changeQuantity(this.selectedEntry, this.tempQuantity);
      }
    }
    if (
      this.selectedEntry &&
      this.selectedEntry.priceInputIsOpen &&
      this.tempUnitPrice >= this.selectedEntry.PrecioUnitario
    ) {
      if (
        this.priceInput &&
        this.priceInputDispatch &&
        e.target !== this.priceInputDispatch.nativeElement &&
        e.target !== this.priceInput.nativeElement
      ) {
        this.changeUnitPrice(this.selectedEntry, this.tempUnitPrice);
      }
    }
  }

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private coreContainerService: CoreContainerService,
  ) {
    this.listFleteExpress$.subscribe((res) => {});
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.store.select(resumePurchasePromise).subscribe((res) => {});
  }

  ngOnDestroy(): void {
    this.store.dispatch(purchasePromiseDetailsActions.CLEAN_ALL_DETAILS_STATE());
    this.coreContainerService.setFile();
  }

  vsUpdate(event: any): void {
    this.listItemScroll = event;
    // (vsUpdate)="listItemScroll = $event"
  }

  handleLeftContainer(): void {
    this.leftContainerIsOpen = !this.leftContainerIsOpen;
  }

  setBurgerOption(
    selectedOption: DropListOption,
    field: string,
    reloadStates: boolean = false,
  ): void {
    this.store.dispatch(
      purchasePromiseDetailsActions.SET_SELECTED_OC_BURGER_OPTION({
        selectedOption,
        field,
        reloadStates: reloadStates,
      }),
    );
  }

  setOcSearchTerm(ocSearchTerm: string): void {
    this.store.dispatch(
      purchasePromiseDetailsActions.SET_OC_SEARCH_TERM({
        ocSearchTerm,
        reloadStates: true,
      }),
    );
  }

  seeResume(seeResume: boolean = false): void {
    this.store.dispatch(
      purchasePromiseDetailsActions.SET_SEE_RESUME_ACTIVE({seeResumeActive: seeResume}),
    );
    // if (value) {
    //   this.store.dispatch(
    //     purchasePromiseDetailsActions.FETCH_SUMMARY_LIST_LOAD({
    //       ignoreLength: false,
    //     }),
    //   );
    // }
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const orders: Array<IPurchasePromiseOrder> = await lastValueFrom(
      this.store.pipe(select(purchasePromiseDetailsSelectors.selectPurchaseOrderList), take(1)),
    );

    if (event.endIndex !== orders.length - 1) {
      return;
    }
    const listStatus = await lastValueFrom(
      this.store.pipe(select(purchasePromiseDetailsSelectors.selectApiStatusOrders), take(1)),
    );
    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(purchasePromiseDetailsSelectors.selectPurchaseOrderTotals), take(1)),
    );
    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(purchasePromiseDetailsSelectors.selectCurrentPage), take(1)),
    );
    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;
      if (
        currentPage > totalPages ||
        orders.length > currentTotal ||
        listStatus === API_REQUEST_STATUS_LOADING
      ) {
        return;
      }
      this.getOrders(false);
    }
  }

  getOrders(isFirstPage: boolean): void {
    this.store.dispatch(purchasePromiseDetailsActions.FETCH_PURCHASE_ORDERS_LOAD({isFirstPage}));
  }

  selectedPurchaseOrder(order: IPurchasePromiseOrder): void {
    const value$ = this.resume$.pipe(take(1));
    const quotation$ = this.quotations$.pipe(take(1));
    const listItem$ = this.listItem$.pipe(take(1));
    value$.subscribe((resume) => {
      if (resume.length > 0) {
        return;
      }
      this.store.dispatch(purchasePromiseDetailsActions.SET_PURCHASE_ORDER_SELECTED({item: order}));
      listItem$.subscribe((list: IQuoteItem[]) => {
        //DOCS: Se obtienen las partidas de contratos
        if (list[0]?.label === OF_CONTRACT) {
          //DOCS: si existen partidas de contratos entonces se selecionará la primera cotización
          quotation$.subscribe((quotation: ICard[]) => {
            if (quotation?.length === 0) {
              //DOCS: si no hay cotizaciones solo se borraran las partidas de contratos del listado
              this.store.dispatch(purchasePromiseDetailsActions.RESET_ITEM_LIST());
              return;
            }
            //DOCS: Si hay cotizaciones se seleccionará la primera cotización
            this.selectQuotation(quotation[0]);
          });
        }
      });
    });
  }

  viewFile(file): void {
    this.store.dispatch(
      purchasePromiseDetailsActions.SET_OPEN_VIEW_FILE({
        active: true,
      }),
    );
    this.fileSelected = file;
    const splits = file.FileKey.split('.');
    const ext = splits[splits.length - 1];
    const isViewFile =
      ext === 'pdf' || ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'svg';
    this.isPdf = ext === 'pdf' || ext === 'tml';
    if (isViewFile) {
      this.store.dispatch(
        purchasePromiseDetailsActions.VIEW_FILE_LOAD({
          IdArchivo: file.IdArchivo,
          ext,
        }),
      );
    } else {
      this.download(this.fileSelected);
    }
  }

  download(file: Archivo): void {
    this.store.dispatch(DOWLOAD_FILE_LOAD({IdArchivo: file.IdArchivo, FileKey: file.FileKey}));
  }

  async addToSummary(): Promise<void> {
    // DOCS: Obtiene la validación de las monedas de partidas del resumen contra las monedas de las partidas seleccionadas.
    // Si la moneda de las partidas seleccionadas son diferentes a las del resumen dispara el dialog
    const isCurrencyValid = await lastValueFrom(
      this.store.pipe(
        select(purchasePromiseDetailsSelectors.selectCheckCurrencyFromResume),
        take(1),
      ),
    );
    if (isCurrencyValid) {
      this.store.dispatch(purchasePromiseDetailsActions.ADD_SUMMARY_PURCHASE_PROMISE());
    } else {
      this.dialog.open(AddItemToResumeAlertComponent, {
        backdropClass: 'mat-dialog-background',
        data: {},
        panelClass: 'mat-dialog-style',
      });
    }
  }

  selectQuotation(item: ICard): void {
    const quote: IPurchasePromiseQuotation = {
      IdCotCotizacion: item.value,
      Index: 0,
      isSelected: false,
      items: [],
      needsToReloadItems: false,
      contact: {} as ContactoDetalleObj,
    };
    this.store.dispatch(
      purchasePromiseDetailsActions.SET_SEE_RESUME_ACTIVE({
        seeResumeActive: false,
      }),
    );
    this.store.dispatch(purchasePromiseDetailsActions.FETCH_QUOTED_SELECT_ITEMS_LOAD({quote}));
    /*    this.store.dispatch(purchasePromiseDetailsActions.FETCH_CONTACT_LOAD({quote}));*/
    this.store.dispatch(
      purchasePromiseDetailsActions.FETCH_FREIGHT_LOAD({IdCotCotizacion: quote?.IdCotCotizacion}),
    );
  }

  setIncidenceValue(IdCotPartidaCotizacion: string, field: string, value: boolean | string): void {
    this.store.dispatch(
      purchasePromiseDetailsActions.SET_INCIDENCE_VALUE({
        IdCotPartidaCotizacion,
        field,
        value,
      }),
    );
  }

  openInput(entry: IQuoteSummaryItem, field: string): void {
    if (field === 'quantityInputIsOpen') {
      this.tempQuantity = entry.NumeroDePiezas;
      this.selectedEntry = {...entry, quantityInputIsOpen: true};
    }
    if (field === 'priceInputIsOpen') {
      this.tempUnitPrice = entry.PrecioUnitario;
      this.selectedEntry = {...entry, priceInputIsOpen: true};
    }
    this.store.dispatch(
      purchasePromiseDetailsActions.SET_INPUT_IS_OPEN({
        entryId: entry.IdPcPartidaPromesaDeCompra,
        field,
      }),
    );
  }

  changeUnitPrice(entry: IQuoteSummaryItem, unitPrice: number): void {
    const activeEntry = {
      ...entry,
      PrecioUnitario: unitPrice,
      PrecioTotal: unitPrice * entry.NumeroDePiezas,
    };
    this.dispatchPriceQuantity(activeEntry, null, unitPrice);
  }

  changeQuantity(entry: IQuoteSummaryItem, quantity: number): void {
    const activeEntry = {
      ...entry,
      NumeroDePiezas: quantity,
      PrecioTotal: quantity * entry.PrecioUnitario,
    };
    this.dispatchPriceQuantity(activeEntry, quantity, null);
  }

  dispatchPriceQuantity(
    activeEntry: IQuoteSummaryItem,
    quantity = this.tempQuantity,
    unitPrice = this.tempUnitPrice,
  ): void {
    this.store.dispatch(
      purchasePromiseDetailsActions.UPDATE_PRICE_QUANTITY_ITEM_LOAD({
        item: activeEntry,
      }),
    );
    this.store.dispatch(purchasePromiseDetailsActions.SET_INPUT_IS_CLOSE());
    this.tempQuantity = quantity;
    this.tempUnitPrice = unitPrice;
    this.selectedEntry = activeEntry;
  }

  closeSale(): void {
    this.store.dispatch(purchasePromiseDetailsActions.CLOSE_SALE_WITH_OC_LOAD());
  }

  handleTrackBy(index: number, entry: IQuoteItem): string {
    return entry?.IdCotPartidaCotizacion;
  }

  handleTrackByPcPromesa(index: number, entry: IPurchasePromiseOrder): string {
    return entry.IdPcPromesaDeCompra;
  }

  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}): void {
    event.preventDefault();
    event.stopPropagation();
  }

  openLinkedQuoted(pop: string, isOpen: boolean, item?: IQuoteSummaryItem, target?: any): void {
    if (item) {
      this.store.dispatch(purchasePromiseDetailsActions.SET_ITEM_LINKED({item}));
      if (pop === 'PDF') {
        this.store.dispatch(
          purchasePromiseDetailsActions.SET_OPEN_VIEW_FILE({
            active: true,
          }),
        );
        this.toolTipPop = false;
        this.isPdf = true;
      } else {
        this.toolTipPop = true;
        this.targetPop = target;
      }
    } else {
      this.isPdf = false;
      if (pop === 'tooltip') {
        this.toolTipPop = isOpen;
      } else {
        this.store.dispatch(
          purchasePromiseDetailsActions.SET_OPEN_VIEW_FILE({
            active: isOpen,
          }),
        );
      }
    }
  }

  openLinkedFile(IdArchivo, folio): void {
    this.fileName = 'FO-' + folio;
    this.fileSelected = null;
    this.isPdf = true;
    this.store.dispatch(purchasePromiseDetailsActions.SET_OPEN_VIEW_FILE({active: true}));
    this.store.dispatch(purchasePromiseDetailsActions.SET_ID_ARCHIVO_PDF({IdArchivo}));
    this.toolTipPop = false;
  }

  updatePurchasePromise(node: string, value: boolean | string): void {
    this.store.dispatch(
      purchasePromiseDetailsActions.UPDATE_SELECTED_PURCHASE_PROMISE({
        value,
        node,
      }),
    );
    // DOCS: SE LIMPIA EL CONTENIDO DEL INPUT DE OBERVACIONES CUANDO EL CHECK SE DESMARCA
    if (node === 'TieneObservaciones' && !value) {
      this.store.dispatch(
        purchasePromiseDetailsActions.UPDATE_SELECTED_PURCHASE_PROMISE({
          value: '',
          node: 'Observaciones',
        }),
      );
    }
  }

  //TODO: ACCIONES DEL BUSCADOR

  //DOCS: Se ejecuta al escribir sobre el buscador para obtener las sugerencias de busqueda
  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      purchasePromiseDetailsActions.FETCH_OPTIONS_OF_PRODUCTS_LOAD({
        searchTerm,
      }),
    );
  }

  // DOCS: Se ejecuta al seleccionar un elemento la sugerencia de busqueda
  handleOption(option: DropListOption): void {
    this.store.dispatch(
      purchasePromiseDetailsActions.SET_SEE_RESUME_ACTIVE({
        seeResumeActive: false,
      }),
    );
    this.store.dispatch(
      purchasePromiseDetailsActions.FETCH_QUOTES_CLIENT_OF_SEARCH({
        product: option,
        isSearch: true,
      }),
    );
  }

  //DOCS: se ejecuta al cambiar el fitro de busqueda del buscador
  setQuoteSearchOption(selectedPurchaseSearchOption: DropListOption): void {
    this.store.dispatch(
      purchasePromiseDetailsActions.SET_SELECTED_QUOTE_SEARCH_OPTION({
        selectedPurchaseSearchOption,
      }),
    );
  }

  /* DOCS: Se ejeucta cuando se escribe en el buscador y se presiona "Enter"
      Buscará dentro de los prouctos que tiene contrato
   */

  handleSearchTermSelected(searchTerm: string): void {
    setTimeout(() => {
      this.store.dispatch(purchasePromiseDetailsActions.SET_RUN_SEARCH_TERM({searchTerm}));
    }, 500);
  }

  //DOCS: Se ejecuta al presionar la X en el buscador
  clear(): void {
    this.store.dispatch(
      purchasePromiseDetailsActions.FETCH_QUOTES_CLIENT_OF_SEARCH({
        product: {} as DropListOption,
        isSearch: false,
      }),
    );
  }

  // DOCS: Actualiza la referencia o cancela el formulario de edición para la referencia de la OC
  handleReferenceAction(event: IReferenceFormEdit) {
    if (event.value) {
      this.store.dispatch(
        purchasePromiseDetailsActions.SET_UPDATE_REFERENCE_LOAD({
          reference: event.reference,
        }),
      );
    }
    this.referencePopOpen = false;
  }
}
