import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {Router} from '@angular/router';
import {AppState} from '@appCore/core.state';
import {Store} from '@ngrx/store';

// Models
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  AJUSTE_DE_OFERTA,
  CANCELACION,
  ESTADOS_COTIZACION,
  IItemQuotation,
  IQuotation,
  PROMESA_DE_COMPRA,
  ResumeSection,
  SEGUIMIENTO,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';

// Actions
import {closeOfferDetailsActions} from '@appActions/pendings/close-offer';

// Selectors
import {closeOfferDetailsSelector} from '@appSelectors/pendings/close-offer';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {Observable} from 'rxjs';
import {DEFAULT_TIME_DEBOUNCE_SEARCH, VIEW_IPAD, VIEW_MACBOOKAIR} from '@appUtil/common.protocols';
import {selectCatPaymentConditionsForDropDown} from '@appSelectors/catalogs/catalogs.selectors';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';
import {CatEstadoCotizacion} from 'api-catalogos';
import {quotationDetailsSelectors} from '@appSelectors/quotation';

@Component({
  selector: 'app-quotation-new',
  templateUrl: './quotation-new.component.html',
  styleUrls: ['./quotation-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationNewComponent implements AfterContentChecked {
  @ViewChild('target') target: ElementRef;
  quote$: Observable<IQuotation> = this.store.select(closeOfferDetailsSelector.selectedQuote);
  selectedQuotationStatus$: Observable<CatEstadoCotizacion> = this.store.select(
    quotationDetailsSelectors.selectedQuotationStatus,
  );
  searchOptions$: Observable<Array<DropListOption>> = this.store.select(
    closeOfferDetailsSelector.selectSearchOptions,
  );
  selectedSearchOption$: Observable<DropListOption> = this.store.select(
    closeOfferDetailsSelector.selectedDefaultSearchOption,
  );
  seeResumeActive$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.selectSeeResumeActive,
  );
  items$: Observable<Array<IItemQuotation>> = this.store.select(
    closeOfferDetailsSelector.selectItemsQuotation2,
  );
  internalSalesItem$: Observable<InternalSalesItem[]> = this.store.select(
    closeOfferDetailsSelector.selectInternalSalesItem,
  );
  searchTerm$: Observable<string> = this.store.select(
    closeOfferDetailsSelector.selectedResumeSearchTerm,
  );
  validatorForResumeButton$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.validatorForResumeButton,
  );
  validatorAcceptProcessButton$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.validatorAcceptProcessButton,
  );
  validatorSeeConfiguredButton$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.validatorForSeeConfiguredButton,
  );
  entriesApiStatus$: Observable<number> = this.store.select(
    closeOfferDetailsSelector.selectEntriesApiStatus,
  );
  configuredEntries$: Observable<number> = this.store.select(
    closeOfferDetailsSelector.selectConfiguredEntries,
  );
  paymentsConditions$: Observable<Array<DropListOption>> = this.store.select(
    selectCatPaymentConditionsForDropDown,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  resumeData$: Observable<ResumeSection> = this.store.select(
    closeOfferDetailsSelector.selectResumeSection,
  );
  selectedPaymentConditions$: Observable<DropListOption> = this.store.select(
    closeOfferDetailsSelector.selectedPaymentConditions,
  );
  selectHeaderInternalSalesItem$: Observable<InternalSalesItem> = this.store.select(
    closeOfferDetailsSelector.selectHeaderInternalSalesItem,
  );
  selectDifferentBrand$: Observable<number> = this.store.select(
    closeOfferDetailsSelector.selectDifferentBrand,
  );
  readonly FIELD_SEGUIMIENTO = SEGUIMIENTO;
  readonly FIELD_AJUSTE_DE_OFERTA = AJUSTE_DE_OFERTA;
  readonly FIELD_PROMESA_DE_COMPRA = PROMESA_DE_COMPRA;
  readonly FIELD_CANCELACION = CANCELACION;
  readonly ESTADOS_COTIZACION = ESTADOS_COTIZACION;
  items: Array<IItemQuotation>;

  lodashIsEmpty = isEmpty;
  isBrandOpen = false;
  titleHeader = '';
  targetTest: HTMLElement = null;
  itemsQuotation: Array<InternalSalesItem> = [];

  handleKeySearch = debounce((value) => this.changeSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);
  textSearch = '';

  //DOCS:
  viewType: string;
  count = 0;
  /*    TODO: REVISAR SI SE CONSERVA O ES FUNCIONALIDAD OBSOLETA
  positionsPopUpComments: IPositionsPopUp;
  trianglePositionComments: 'down' | 'left';
  dataPopUpComments: {top: string; left: string};*/
  viewIpad = VIEW_IPAD;
  viewMacBookAir = VIEW_MACBOOKAIR;
  readonly inputValidators = InputValidators;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private appService: CoreContainerService,
  ) {
    this.targetTest = null;
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  navigateToResume(): void {
    this.store.dispatch(closeOfferDetailsActions.CLASSIFY_ENTRIES_LOAD());
  }

  changeQuoteStatus(): void {
    /*
    this.store.dispatch(closeOfferDetailsActions.CHANGE_COT_COTIZACION_LOAD());
*/
    this.store.dispatch(
      closeOfferDetailsActions.SEND_ENTRIES_TO_PURCHASE_PROMISE_LOAD({
        typeProcess: 'adjustment',
      }),
    );
  }

  setSeeResume(value: boolean): void {
    this.store.dispatch(closeOfferDetailsActions.CLOSE_ALL_ENTRIES_POPS());
    setTimeout(
      () => this.store.dispatch(closeOfferDetailsActions.SET_SEE_RESUME({seeResumeActive: value})),
      200,
    );
  }

  handlePopUp(item: IItemQuotation, node: string, value: boolean): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_ENTRY_POP_UP_IS_OPEN({
        itemId: item.IdCotPartidaCotizacion,
        isChild: item.isChild,
        node,
        isOpen: value,
      }),
    );
  }

  getElement(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement;
  }

  handleCheck(item: IItemQuotation, field: string, value: boolean): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_CHECK_BOX_VALUE({
        itemId: item.IdCotPartidaCotizacion,
        isChild: item.isChild,
        field,
        value,
      }),
    );
  }

  handleAllCheck(field: string, value: boolean): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_ALL_CHECKED({
        field,
        value,
      }),
    );
  }

  addToQuotation(item: IItemQuotation): void {
    this.store.dispatch(
      closeOfferDetailsActions.ADD_TO_QUOTATION({
        item,
      }),
    );
  }

  deleteConfiguration(item: IItemQuotation): void {
    if (item.Cancelacion) {
      this.store.dispatch(
        closeOfferDetailsActions.DELETE_ENTRIES_CANCEL_LOAD({
          item,
        }),
      );
    }
    if (item.PromesaDeCompra) {
      this.store.dispatch(
        closeOfferDetailsActions.DELETE_ENTRIES_PROMISE_LOAD({
          item,
        }),
      );
    }
    if (item.Seguimiento) {
      this.store.dispatch(
        closeOfferDetailsActions.DELETE_ENTRIES_FOLLOW_LOAD({
          item,
        }),
      );
    }
    if (item.AjusteDeOferta) {
      this.store.dispatch(
        closeOfferDetailsActions.DELETE_ENTRIES_ADJUSTMENT_LOAD({
          item,
        }),
      );
    }
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_SEARCH_TERM({
        searchTerm,
        node: 'defaultSearchTerm',
      }),
    );
    this.textSearch = searchTerm;
  }

  setSearchOption(searchOption: DropListOption, node: string): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_SEARCH_OPTION({
        searchOption,
        node,
      }),
    );
    if (this.textSearch !== '') {
      this.changeSearchTerm(this.textSearch);
    }
  }

  getCancelReason(id: string): Observable<string> {
    return this.store.select(closeOfferDetailsSelector.selectCatMotivoCancelacionById(id));
  }

  getFollowReason(id: string): Observable<string> {
    return this.store.select(closeOfferDetailsSelector.selectCatMotivoSeguimientoById(id));
  }

  handleModalIsOpenSendQuotation(value: boolean): void {
    this.store.dispatch(closeOfferDetailsActions.SHOW_SEND_EMAIL_DIALOG({isShow: value}));
  }

  handleFilterBrandIsOpen(blur?: string): void {
    if (blur === 'blur') {
      if (this.isBrandOpen) {
        this.isBrandOpen = false;
      }
    } else {
      this.isBrandOpen = !this.isBrandOpen;
    }
  }

  handleTrackByItemBy(index: number, item: InternalSalesItem): string {
    return item.data?.IdCotPartidaCotizacion;
  }

  handleTrackByItemByxx(index: number, item: IItemQuotation): string {
    return item.Index.toString();
  }

  handleCheckAdjustment(value: boolean, node: string): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_FREIGHT_CHECK_VALUE({
        value,
        node,
      }),
    );
  }

  setJustification(value: string, node: string): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_JUSTIFICATION_VALUE({
        justification: value,
        node,
      }),
    );
  }

  setPaymentCondition(value: DropListOption): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_PAYMENT_CONDITIONS({
        value,
      }),
    );
  }

  setAdditionalDays(value: string): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_ADDITIONAL_DAYS({
        value: Number(value),
      }),
    );
  }

  sendToPurchasePromise(typeProcess: string): void {
    this.store.dispatch(
      closeOfferDetailsActions.SEND_ENTRIES_TO_PURCHASE_PROMISE_LOAD({
        typeProcess,
      }),
    );
  }

  globalHeaderItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.CheckBoxFollowingHeaderAction:
        this.handleAllCheck(this.FIELD_SEGUIMIENTO, event.value as boolean);
        break;
      case NameActionsInternalSalesItem.CheckBoxAdjustmentOfferHeaderAction:
        this.handleAllCheck(this.FIELD_AJUSTE_DE_OFERTA, event.value as boolean);
        break;
      case NameActionsInternalSalesItem.CheckBoxPurchasePromiseHeaderAction:
        this.handleAllCheck(this.FIELD_PROMESA_DE_COMPRA, event.value as boolean);
        break;
      case NameActionsInternalSalesItem.CheckBoxCancelHeaderAction:
        this.handleAllCheck(this.FIELD_CANCELACION, event.value as boolean);
        break;
    }
  }

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.CheckBoxFollowingItemAction:
        this.handleCheck(
          event.data as IItemQuotation,
          this.FIELD_SEGUIMIENTO,
          event.value as boolean,
        );
        break;
      case NameActionsInternalSalesItem.CheckBoxAdjustmentOfferItemAction:
        this.handleCheck(
          event.data as IItemQuotation,
          this.FIELD_AJUSTE_DE_OFERTA,
          event.value as boolean,
        );
        break;
      case NameActionsInternalSalesItem.CheckBoxPurchasePromiseItemAction:
        this.handleCheck(
          event.data as IItemQuotation,
          this.FIELD_PROMESA_DE_COMPRA,
          event.value as boolean,
        );
        break;
      case NameActionsInternalSalesItem.CheckBoxCancelItemAction:
        this.handleCheck(
          event.data as IItemQuotation,
          this.FIELD_CANCELACION,
          event.value as boolean,
        );
        break;
      case NameActionsInternalSalesItem.SeeCommentsResumeAction:
        this.handlePopUp(event.data as IItemQuotation, 'commentsPop', event.value as boolean);
        break;
      case NameActionsInternalSalesItem.DeleteAction:
        this.deleteConfiguration(event.data as IItemQuotation);
        break;
      case NameActionsInternalSalesItem.AddItemToQuotationAction:
        this.addToQuotation(event.data as IItemQuotation);
        break;
      case NameActionsInternalSalesItem.SeeNotesItemAction:
        this.store.dispatch(
          SET_POP_UP_NOTES_DATA({
            notes: event.dataInternal.columnNotes,
            modalIsOpen: event.value,
          }),
        );
        this.appService.setTarget(event.target);
        break;
    }
  }
}
