import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {AppState} from '@appCore/core.state';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

// Models
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {
  CANCELACION,
  CustomerDetails,
  IClientTotals,
  IItemQuotation,
  IQuotation,
  ITipoAjustePrecioObj,
  PROMESA_DE_COMPRA,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';

// Actions
import {closeOfferDetailsActions} from '@appActions/pendings/close-offer';

// Selectors
import {closeOfferDetailsSelector} from '@appSelectors/pendings/close-offer';
import {selectCatPaymentConditionById} from '@appSelectors/catalogs/catalogs.selectors';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';
import {ClientsListItemForCloseOffer} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {paymentConditions} from '@appSelectors/pendings/close-offer/close-offer-details/close-offer-details.selectors';

@Component({
  selector: 'app-quotation-adjustment',
  templateUrl: './quotation-adjustment.component.html',
  styleUrls: ['./quotation-adjustment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationAdjustmentComponent implements AfterContentChecked {
  @ViewChild('imageElement') imageElement: ElementRef;

  quote$: Observable<IQuotation> = this.store.select(closeOfferDetailsSelector.selectedQuote);
  clientTotals$: Observable<IClientTotals> = this.store.select(
    closeOfferDetailsSelector.selectClientTotals,
  );
  paymentConditions: Observable<string> = this.store.select(
    closeOfferDetailsSelector.paymentConditions,
  );
  searchOptions$: Observable<Array<DropListOption>> = this.store.select(
    closeOfferDetailsSelector.selectSearchOptions,
  );
  selectedSearchOption$: Observable<DropListOption> = this.store.select(
    closeOfferDetailsSelector.selectedDefaultSearchOption,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    closeOfferDetailsSelector.selectTabOptionsForAdjustment,
  );
  selectedTabOption$: Observable<ITabOption> = this.store.select(
    closeOfferDetailsSelector.selectedTabOptionForAdjustment,
  );
  searchTerm$: Observable<string> = this.store.select(
    closeOfferDetailsSelector.selectedResumeSearchTerm,
  );
  entriesApiStatus$: Observable<number> = this.store.select(
    closeOfferDetailsSelector.selectEntriesApiStatus,
  );
  items$: Observable<Array<IItemQuotation>> = this.store.select(
    closeOfferDetailsSelector.selectItemsQuotation2,
  );
  validatorForResumeButton$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.validatorForResumeButton,
  );
  seeResumeActive$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.selectSeeResumeActive,
  );
  validatorSeeConfiguredButton$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.validatorForSeeConfiguredButton,
  );
  validatorAcceptProcessButton$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.validatorAcceptProcessButton,
  );
  configuredEntries$: Observable<number> = this.store.select(
    closeOfferDetailsSelector.selectConfiguredEntries,
  );
  itemsPriceAdjusted$: Observable<Array<ITipoAjustePrecioObj>> = this.store.select(
    closeOfferDetailsSelector.selectecPriceItemsAjusted,
  );
  isLoadingItemsAjusted: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.selectIsLoadingItemsAjusted,
  );
  itemSelected$: Observable<DropListOption> = this.store.select(
    closeOfferDetailsSelector.itemSelected,
  );
  client$: Observable<ClientsListItemForCloseOffer> = this.store.select(
    closeOfferDetailsSelector.selectClient,
  );
  clientData$: Observable<CustomerDetails> = this.store.select(
    closeOfferDetailsSelector.selectDataClient,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  selectHeaderInternalSalesItemAdjustment$: Observable<InternalSalesItem> = this.store.select(
    closeOfferDetailsSelector.selectHeaderInternalSalesItemAdjustment,
  );
  selectInternalSalesItemAdjustment$: Observable<InternalSalesItem[]> = this.store.select(
    closeOfferDetailsSelector.selectInternalSalesItemAdjustment,
  );
  selectDifferentBrand$: Observable<number> = this.store.select(
    closeOfferDetailsSelector.selectDifferentBrand,
  );
  handleChangeSearchTerm = debounce(
    (value: string) => this.setSearchTerm(value, 'defaultSearchTerm'),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  readonly FIELD_PROMESA_DE_COMPRA = PROMESA_DE_COMPRA;
  readonly FIELD_CANCELACION = CANCELACION;
  textSearch = '';
  iPageInfo: IPageInfo;
  items: InternalSalesItem[];
  lodashIsEmpty = isEmpty;
  errorImageNativeElement = false;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  imageNativeElement;

  seeAdjustmentPop = false;

  // TODO: Cambiar al estado cuando se obtengan
  twoDays = false;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private appService: CoreContainerService,
  ) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  navigateToResume() {
    this.store.dispatch(closeOfferDetailsActions.CLASSIFY_ENTRIES_LOAD());
  }

  handleTrackByItemBy(index: number, item: InternalSalesItem): string {
    return item.data?.IdCotPartidaCotizacion;
  }

  setSeeResume(value: boolean): void {
    this.store.dispatch(closeOfferDetailsActions.CLOSE_ALL_ENTRIES_POPS());
    setTimeout(
      () => this.store.dispatch(closeOfferDetailsActions.SET_SEE_RESUME({seeResumeActive: value})),
      200,
    );
  }

  changeQuoteStatus(): void {
    this.store.dispatch(
      closeOfferDetailsActions.SEND_ENTRIES_TO_PURCHASE_PROMISE_LOAD({
        typeProcess: 'adjustment',
      }),
    );
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

  vsChange(iPageInfo: IPageInfo, node: string): void {
    if (
      this.iPageInfo &&
      (this.iPageInfo.startIndex !== iPageInfo.startIndex ||
        this.iPageInfo.endIndex !== iPageInfo.endIndex)
    ) {
      this.store.dispatch(
        closeOfferDetailsActions.SET_ENTRY_POP_UP_IS_IN_RANGE({
          startIndex: iPageInfo.startIndex,
          endIndex: iPageInfo.endIndex,
          node,
          counter: -1,
        }),
      );
    }
    this.iPageInfo = iPageInfo;
  }

  selectTabOption(selectedTabOption: ITabOption): void {
    this.store.dispatch(closeOfferDetailsActions.CLOSE_ALL_ENTRIES_POPS());
    setTimeout(
      () =>
        this.store.dispatch(
          closeOfferDetailsActions.SET_ADJUSTMENT_TAB_OPTION({
            selectedTabOption,
          }),
        ),
      200,
    );
  }

  setSearchTerm(searchTerm: string, node: string): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_SEARCH_TERM({
        searchTerm,
        node,
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
      this.setSearchTerm(this.textSearch, 'defaultSearchTerm');
    }
  }

  getElement(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement;
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
  }

  getCancelReason(id: string): Observable<string> {
    return this.store.select(closeOfferDetailsSelector.selectCatMotivoCancelacionById(id));
  }

  getFollowReason(id: string): Observable<string> {
    return this.store.select(closeOfferDetailsSelector.selectCatMotivoSeguimientoById(id));
  }

  getPaymentCondition(id: string): Observable<any> {
    return this.store.select(selectCatPaymentConditionById(id));
  }
  handleModalIsOpenSendQuotation(value: boolean): void {
    this.store.dispatch(closeOfferDetailsActions.SHOW_SEND_EMAIL_DIALOG({isShow: value}));
  }
  handleSeeAdjustmentsPop(value: boolean): void {
    if (value) {
      this.store.dispatch(closeOfferDetailsActions.FETCH_PRICE_POP_UP_DATA());
      this.seeAdjustmentPop = value;
      this.cdr.detectChanges();
      this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
    }
    this.seeAdjustmentPop = value;
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
  errorImage(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImage();
  }
  handleAllCheck(field: string, value: boolean): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_ALL_CHECKED({
        field,
        value,
      }),
    );
  }

  globalHeaderItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
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
      case NameActionsInternalSalesItem.CheckBoxPurchasePromiseItemAction:
        this.handleCheck(event.data, this.FIELD_PROMESA_DE_COMPRA, event.value as boolean);
        break;
      case NameActionsInternalSalesItem.CheckBoxCancelItemAction:
        this.handleCheck(event.data, this.FIELD_CANCELACION, event.value as boolean);
        break;
      case NameActionsInternalSalesItem.ConceptCarFreightAction:
        this.handlePopUp(event.data, 'freightPop', event.value as boolean);
        break;
      case NameActionsInternalSalesItem.UnitPriceCommentsAction:
        this.handlePopUp(event.data, 'pricePop', event.value as boolean);
        break;
      case NameActionsInternalSalesItem.SeeCommentsResumeAction:
        this.handlePopUp(event.data, 'commentsPop', event.value as boolean);
        break;
      case NameActionsInternalSalesItem.DeleteAction:
        this.deleteConfiguration(event.data);
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
