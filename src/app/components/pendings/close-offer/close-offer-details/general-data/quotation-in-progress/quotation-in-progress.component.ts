import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';

// Models
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  AJUSTE_DE_OFERTA,
  CANCELACION,
  IItemQuotation,
  IQuotation,
  PROMESA_DE_COMPRA,
  SEGUIMIENTO,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {ITabOption} from '@appModels/botonera/botonera-option';

// Actions
import {closeOfferDetailsActions} from '@appActions/pendings/close-offer';

// Selectors
import {closeOfferDetailsSelector} from '@appSelectors/pendings/close-offer';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

// Utils
import {debounce, isEmpty} from 'lodash-es';
import {Observable} from 'rxjs';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-quotation-in-progress',
  templateUrl: './quotation-in-progress.component.html',
  styleUrls: ['./quotation-in-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuotationInProgressComponent implements AfterContentChecked {
  searchOptions$: Observable<Array<DropListOption>> = this.store.select(
    closeOfferDetailsSelector.selectSearchOptions,
  );
  selectedSearchOption$: Observable<DropListOption> = this.store.select(
    closeOfferDetailsSelector.selectedDefaultSearchOption,
  );
  searchTerm$: Observable<string> = this.store.select(
    closeOfferDetailsSelector.selectedDefaultSearchTerm,
  );
  items$: Observable<Array<IItemQuotation>> = this.store.select(
    closeOfferDetailsSelector.selectItemsQuotation2,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    closeOfferDetailsSelector.selectTabOptions,
  );
  selectedTabOption$: Observable<ITabOption> = this.store.select(
    closeOfferDetailsSelector.selectedInProgressTabOption,
  );
  tabIsTracing$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.selectedInProgressTabOptionIsTracing,
  );
  validatorForResumeButton$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.validatorForResumeButton,
  );
  validatorAcceptProcessButton$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.validatorAcceptProcessButton,
  );
  quote$: Observable<IQuotation> = this.store.select(closeOfferDetailsSelector.selectedQuote);
  entriesApiStatus$: Observable<number> = this.store.select(
    closeOfferDetailsSelector.selectEntriesApiStatus,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);

  selectHeaderInternalSalesItemInProgress$: Observable<InternalSalesItem> = this.store.select(
    closeOfferDetailsSelector.selectHeaderInternalSalesItemInProgress,
  );
  selectDifferentBrand$: Observable<number> = this.store.select(
    closeOfferDetailsSelector.selectDifferentBrand,
  );
  selectInternalSalesItemInProgress$: Observable<InternalSalesItem[]> = this.store.select(
    closeOfferDetailsSelector.selectInternalSalesItemInProgress,
  );
  seeResumeActive$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.selectSeeResumeActive,
  );
  validatorSeeConfiguredButton$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.validatorForSeeConfiguredButton,
  );
  configuredEntries$: Observable<number> = this.store.select(
    closeOfferDetailsSelector.selectConfiguredEntries,
  );
  readonly FIELD_SEGUIMIENTO = SEGUIMIENTO;
  readonly FIELD_AJUSTE_DE_OFERTA = AJUSTE_DE_OFERTA;
  readonly FIELD_PROMESA_DE_COMPRA = PROMESA_DE_COMPRA;
  readonly FIELD_CANCELACION = CANCELACION;

  iPageInfo: IPageInfo;
  items: Array<IItemQuotation>;
  itemsInternal: InternalSalesItem[];
  lodashIsEmpty = isEmpty;
  handleSearchTerm = debounce(this.setSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);
  textSearch = '';
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private appService: CoreContainerService,
  ) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  navigateToResume(): void {
    this.store.dispatch(closeOfferDetailsActions.SET_ALLOWED_TO_RESUME({allowedToResume: true}));
    this.store.dispatch(closeOfferDetailsActions.CLASSIFY_ENTRIES_LOAD());
  }
  changeQuoteStatus(): void {
    this.store.dispatch(closeOfferDetailsActions.SEND_ENTRIES_IN_PROCESS_STATUS_LOAD());
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

  selectInProgressTabOption(selectedTabOption: ITabOption): void {
    this.store.dispatch(closeOfferDetailsActions.CLOSE_ALL_ENTRIES_POPS());
    setTimeout(
      () =>
        this.store.dispatch(
          closeOfferDetailsActions.SET_IN_PROGRESS_TAB_OPTION({
            selectedTabOption,
          }),
        ),
      200,
    );
  }

  getCancelReason(id: string): Observable<string> {
    return this.store.select(closeOfferDetailsSelector.selectCatMotivoCancelacionById(id));
  }

  getFollowReason(id: string): Observable<string> {
    return this.store.select(closeOfferDetailsSelector.selectCatMotivoSeguimientoById(id));
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
      this.handleSearchTerm(this.textSearch, 'defaultSearchTerm');
    }
  }
  handleTrackByItemBy(index: number, item: InternalSalesItem): string {
    return item?.data?.IdCotPartidaCotizacion;
  }

  handleAllCheck(field: string, value: boolean): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_ALL_CHECKED({
        field,
        value,
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
      case NameActionsInternalSalesItem.DateLastFollowingAction:
        this.handlePopUp(event.data as IItemQuotation, 'tracingPop', true);
        break;
      case NameActionsInternalSalesItem.CommentsAction:
        this.handlePopUp(event.data as IItemQuotation, 'commentsPop', event.value as boolean);
        break;
      case NameActionsInternalSalesItem.ArrivalDateCommentsAction:
        this.handlePopUp(event.data as IItemQuotation, 'commentsPop', event.value as boolean);
        break;
      case NameActionsInternalSalesItem.SeeCommentsCancelReasonAction:
        this.handlePopUp(event.data as IItemQuotation, 'commentsPop', event.value as boolean);
        break;
      case NameActionsInternalSalesItem.SeeCommentsResumeAction:
        this.handlePopUp(event.data as IItemQuotation, 'commentsPop', event.value as boolean);
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
