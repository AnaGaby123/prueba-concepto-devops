import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {LocationStrategy} from '@angular/common';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Models
import {ITabOption} from '@appModels/botonera/botonera-option';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  IFormPrice,
  IItemQuotation,
  initialFormPrice,
  IQuotation,
  ResumeSection,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {CalendarDay} from '@appModels/calendario/calendar';

// Actions
import {closeOfferDetailsActions} from '@appActions/pendings/close-offer';

// Selectors
import {closeOfferDetailsSelector} from '@appSelectors/pendings/close-offer';
import * as selectUtils from '@appSelectors/utils/utils.selectors';

// Utils
import {debounce, isEmpty, map as _map} from 'lodash-es';
import {Observable} from 'rxjs';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {calculateAmountWithoutRound, calculatePercentageWithoutRound, toRound} from '@appUtil/util';
import {VProveedor} from 'api-catalogos';
import {
  InternalSalesItem,
  ModelEmitInternalSalesItem,
  NameActionsInternalSalesItem,
} from '@appModels/table/internal-sales-item';
import {currentDateWithoutHoursUTCFormatDate} from '@appUtil/dates';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';
import {SET_POP_UP_NOTES_DATA} from '@appActions/utils/utils.action';
import {CoreContainerService} from '@appComponents/core-container/core-container.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResumeComponent implements OnInit, AfterContentChecked, AfterViewInit {
  quote$: Observable<IQuotation> = this.store.select(closeOfferDetailsSelector.selectedQuote);
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    closeOfferDetailsSelector.selectTabOptionsForResume,
  );
  selectedTabOption$: Observable<ITabOption> = this.store.select(
    closeOfferDetailsSelector.selectedResumeTabOption,
  );
  brandsOptions$: Observable<Array<BarActivityOption>> = this.store.select(
    closeOfferDetailsSelector.selectProvidersOptionsForResume,
  );
  selectedBrandsStep$: Observable<number> = this.store.select(
    closeOfferDetailsSelector.selectedBrandsStep,
  );
  searchOptions$: Observable<Array<DropListOption>> = this.store.select(
    closeOfferDetailsSelector.selectSearchOptions,
  );
  selectedSearchOption$: Observable<DropListOption> = this.store.select(
    closeOfferDetailsSelector.selectedResumeSearchOption,
  );
  searchTerm$: Observable<string> = this.store.select(
    closeOfferDetailsSelector.selectedResumeSearchTerm,
  );
  items$: Observable<Array<IItemQuotation>> = this.store.select(
    closeOfferDetailsSelector.selectItemsQuotation2,
  );
  entriesApiStatus$: Observable<number> = this.store.select(
    closeOfferDetailsSelector.selectEntriesApiStatus,
  );
  tabIsTracing$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.selectedResumeTabOptionIsTracing,
  );
  tabIsAdjustment$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.selectedResumeTabOptionIsAdjustment,
  );
  tabIsPromise$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.selectedResumeTabOptionIsBuyPromise,
  );
  tabIsCancel$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.selectedResumeTabOptionIsCancel,
  );
  validatorForFooter$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.validatorForFooterResumeSection,
  );
  validatorForFooterButton$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelector.validatorForFooterResumeSectionButton,
  );
  selectedEntries$: Observable<Array<IItemQuotation>> = this.store.select(
    closeOfferDetailsSelector.selectCheckedEntriesInResume,
  );
  // Promise
  promiseJustification$: Observable<string> = this.store.select(
    closeOfferDetailsSelector.selectPromiseJustificationForResume,
  );
  purchasePromiseDate$: Observable<Date> = this.store.select(
    closeOfferDetailsSelector.selectPurchasePromiseDateForResume,
  );
  // Following
  followingReason$: Observable<DropListOption> = this.store.select(
    closeOfferDetailsSelector.selectFollowingReasonForResume,
  );
  followingDate$: Observable<Date> = this.store.select(
    closeOfferDetailsSelector.selectFollowingDateForResume,
  );
  // Cancel
  cancelJustification$: Observable<string> = this.store.select(
    closeOfferDetailsSelector.selectCancelJustificationForResume,
  );
  cancelReason$: Observable<DropListOption> = this.store.select(
    closeOfferDetailsSelector.selectCancelReasonForResume,
  );
  // Adjustment
  adjustmentPercentage$: Observable<DropListOption> = this.store.select(
    closeOfferDetailsSelector.selectAdjustmentPercentageForResume,
  );
  adjustmentJustification$: Observable<string> = this.store.select(
    closeOfferDetailsSelector.selectAdjustmentJustificationForResume,
  );
  resumeData$: Observable<ResumeSection> = this.store.select(
    closeOfferDetailsSelector.selectResumeSection,
  );

  // Catalogs
  catFollowingReason$: Observable<Array<DropListOption>> = this.store.select(
    closeOfferDetailsSelector.selectCatMotivosSeguimientoForDropList,
  );
  catCancelReason$: Observable<Array<DropListOption>> = this.store.select(
    closeOfferDetailsSelector.selectCatMotivosCancelacionForDropList,
  );
  catPercentages$: Observable<Array<DropListOption>> = this.store.select(
    closeOfferDetailsSelector.selectCatPorcentajes,
  );
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  // Totals entries
  totalEntriesInResumeView$: Observable<number> = this.store.select(
    closeOfferDetailsSelector.selectEntriesTotalsInResumeView,
  );
  selectedProvider$: Observable<VProveedor> = this.store.select(
    closeOfferDetailsSelector.selectedProviderForResume,
  );

  selectInternalSalesItemResume$: Observable<InternalSalesItem[]> = this.store.select(
    closeOfferDetailsSelector.selectInternalSalesItemResume,
  );

  selectInternalSalesItemHeader$: Observable<InternalSalesItem> = this.store.select(
    closeOfferDetailsSelector.selectHeaderInternalSalesItemResume,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);

  readonly inputValidators = InputValidators;
  lodashIsEmpty = isEmpty;
  iPageInfo: IPageInfo;
  items: Array<IItemQuotation> = [];
  isBrandOpen = false;
  tabOption: string | number = 0;
  // DOCS Variables para el pop de ajuste de precio
  formPrice: IFormPrice = initialFormPrice;
  typePercentage = 'typePercentage';
  typeAmount = 'typeAmount';
  minPercentage = 0.1;
  maxPercentage = 20;
  controlSetTimeout;
  rangeStart = currentDateWithoutHoursUTCFormatDate();
  handleChangeSearchTerm = debounce(
    (value: string) => this.setSearchTerm(value, 'resumeSearchTerm'),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  textSearch = '';

  constructor(
    private store: Store<AppState>,
    private location: LocationStrategy,
    private cdr: ChangeDetectorRef,
    private appService: CoreContainerService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_CLIENT_PANEL_IS_OPEN({
        sendValue: true,
        clientPanelIsOpen: false,
      }),
    );
    this.store.dispatch(closeOfferDetailsActions.GET_PURCHASE_ORDERS_LOAD());
  }
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  handleTrackByItemBy(index: number, item: InternalSalesItem): string {
    return item.data?.IdCotPartidaCotizacion;
  }

  updateItems(items: InternalSalesItem[]) {
    this.items = _map(items, (o: InternalSalesItem) => {
      return o.data as IItemQuotation;
    });
  }

  changeComments = debounce(
    (item: IItemQuotation, value: string) => this.setFormPriceComments(item, value),
    DEFAULT_TIME_DEBOUNCE_SEARCH, // Before value of time was 100
  );
  setFormPriceComments(item: IItemQuotation, value: string): void {
    this.formPrice.comments = value;
  }

  goBack(): void {
    this.store.dispatch(closeOfferDetailsActions.SET_IS_IS_RESUME_VIEW({isInResumeView: false}));
    this.store.dispatch(closeOfferDetailsActions.GET_SELECTED_QUOTE_DATA_LOAD());
    this.location.back();
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
      this.setSearchTerm(this.textSearch, 'resumeSearchTerm');
    }
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

  selectResumeTabOption(selectedTabOption: ITabOption): void {
    this.store.dispatch(closeOfferDetailsActions.CLOSE_ALL_ENTRIES_POPS());
    this.store.dispatch(closeOfferDetailsActions.SET_RESTORE_RESUME_VALUES());
    this.store.dispatch(closeOfferDetailsActions.SET_RESUME_TAB_OPTION({selectedTabOption}));
    this.tabOption = selectedTabOption.id;
  }

  handleCheck(item: IItemQuotation): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_CHECK_BOX_RESUME_VALUE({
        itemId: item.IdCotPartidaCotizacion,
        isChild: item.isChild,
      }),
    );
  }

  handleDate(value, node: string): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const stringDate = date.toISOString();
    this.store.dispatch(
      closeOfferDetailsActions.SET_PURCHASE_PROMISE_FOLLOWING_DATE({
        date,
        stringDate,
        node,
      }),
    );
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

  setReason(value: DropListOption, node: string): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_REASON_VALUE({
        reason: value,
        node,
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

  selectBrand(value: number): void {
    this.store.dispatch(closeOfferDetailsActions.SET_RESTORE_RESUME_VALUES());
    this.store.dispatch(
      closeOfferDetailsActions.SET_SELECTED_BRAND_VALUE({
        value,
      }),
    );
  }

  checkAllItems(value: boolean): void {
    this.store.dispatch(
      closeOfferDetailsActions.SET_CHECK_BOX_RESUME_VALUE({
        itemId: '',
        isChild: false,
        allItems: true,
        value,
      }),
    );
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

  /// DOCS funciones para el pop de precios
  handleTrackByItem(index: number, brand: IItemQuotation): string {
    return brand?.IdCotPartidaCotizacion;
  }

  getElement(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement;
  }
  handlePopUp(item: IItemQuotation, value: boolean): void {
    if (value) {
      this.formPrice = {...item.formPrice};
    } else {
      this.formPrice = {...initialFormPrice};
    }
    this.store.dispatch(
      closeOfferDetailsActions.SET_POP_UP_ADJUST_PRICE_IS_OPEN({
        itemId: item.IdCotPartidaCotizacion,
        isOpen: value,
      }),
    );
  }
  handleValidateNumber(event: {which: number; preventDefault: () => void}, type: string): void {
    const key = String.fromCharCode(event.which);
    const regex =
      type === this.typeAmount ? /^$|^[0-9]+$|null/ : /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
    clearTimeout(this.controlSetTimeout);
    if (!regex.test(key) && key !== '.') {
      event.preventDefault();
    }
  }
  setInput(value: string, type: string): void {
    const minAmount = calculateAmountWithoutRound(this.formPrice.price, this.maxPercentage);
    if (type === this.typeAmount) {
      if (+value < minAmount) {
        this.controlSetTimeout = setTimeout(() => {
          this.formPrice.valueAmount =
            this.formPrice.valueAmount < 1
              ? ''
              : this.formPrice.valueAmount >= 1 && this.formPrice.valueAmount < minAmount
              ? minAmount
              : this.formPrice.valueAmount;
          this.formPrice.valuePercentage = calculatePercentageWithoutRound(
            this.formPrice.price,
            Number(this.formPrice.valueAmount),
          );
        }, 1500);
        return;
      }
      if (+value > this.formPrice.price) {
        this.controlSetTimeout = setTimeout(() => {
          this.formPrice.valueAmount =
            this.formPrice.valueAmount > this.formPrice.price
              ? this.formPrice.price
              : this.formPrice.valueAmount;
          this.formPrice.valuePercentage = calculatePercentageWithoutRound(
            this.formPrice.price,
            Number(this.formPrice.valueAmount),
          );
        }, 1500);
        return;
      }
      setTimeout(() => {
        this.formPrice.valuePercentage = calculatePercentageWithoutRound(
          this.formPrice.price,
          Number(this.formPrice.valueAmount),
        );
      }, 500);
    } else if (type === this.typePercentage) {
      if (value === '.') {
        return;
      }
      if (+value < 0) {
        // Este caso no sucede por la validación de solo aceptar números, pero se deja por si se require poner un limite inferior
        this.controlSetTimeout = setTimeout(() => {
          this.formPrice.valuePercentage =
            this.formPrice.valuePercentage < 1
              ? this.minPercentage
              : this.formPrice.valuePercentage;
          this.formPrice.valueAmount = calculateAmountWithoutRound(
            this.formPrice.price,
            Number(this.formPrice.valuePercentage),
          );
        }, 1000);
        return;
      }
      if (+value > this.maxPercentage) {
        this.controlSetTimeout = setTimeout(() => {
          this.formPrice.valuePercentage =
            this.formPrice.valuePercentage > this.maxPercentage
              ? this.maxPercentage
              : this.formPrice.valuePercentage;
          this.formPrice.valueAmount = calculateAmountWithoutRound(
            this.formPrice.price,
            Number(this.formPrice.valuePercentage),
          );
        }, 1000);
        return;
      }
      this.controlSetTimeout = setTimeout(() => {
        this.formPrice.valuePercentage = toRound(Number(this.formPrice.valuePercentage), 2);
        this.formPrice.valueAmount = calculateAmountWithoutRound(
          this.formPrice.price,
          this.formPrice.valuePercentage,
        );
      }, 500);
    }
  }
  saveFormPriceComments(item: IItemQuotation): void {
    this.store.dispatch(
      closeOfferDetailsActions.SAVE_FORM_PRICE({
        idItem: item.IdCotPartidaCotizacion,
        formPrice: this.formPrice,
      }),
    );
  }

  globalHeaderItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.CheckBoxHeaderBoxNormalItem:
        this.checkAllItems(event.value as boolean);
        break;
    }
  }

  globalItemEventsHandler(event: ModelEmitInternalSalesItem): void {
    switch (event.action) {
      case NameActionsInternalSalesItem.CheckBoxNormalAction:
        this.handleCheck(event.data as IItemQuotation);
        break;
      case NameActionsInternalSalesItem.UnitPriceClickNumberAction:
        this.handlePopUp(event.data as IItemQuotation, event.value as boolean);
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
