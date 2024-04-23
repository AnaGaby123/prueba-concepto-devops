import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

// Utils
import {debounce} from 'lodash-es';
import {
  API_REQUEST_STATUS_LOADING,
  DEFAULT_TIME_DEBOUNCE_SEARCH,
  PAGING_LIMIT,
} from '@appUtil/common.protocols';
import {lastValueFrom, Observable} from 'rxjs';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {take} from 'rxjs/operators';

/*Selectors Imports*/
import {uploadInvoiceDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/upload-invoice';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
/*Actions Imports*/
import {uploadInvoiceDetailsActions} from '@appActions/pendings/purchasing-manager/upload-invoice';
/*Models Imports*/
import {
  IInvoice,
  IPurchaseItemUploadInvoice,
  IPurchaseOrderOc,
  ITotItems,
} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-details/upload-invoice-details.models';
import {CalcularMontosImportacion} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {IProviderUpload} from '@appModels/store/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.models';
import {CalendarDay} from '@appModels/calendario/calendar';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-upload-invoice-details',
  templateUrl: './upload-invoice-details.component.html',
  styleUrls: ['./upload-invoice-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadInvoiceDetailsComponent implements AfterViewInit {
  sortList$: Observable<Array<DropListOption>> = this.store.select(
    uploadInvoiceDetailsSelectors.selectSortList,
  );
  sort$: Observable<DropListOption> = this.store.select(
    uploadInvoiceDetailsSelectors.selectSortSelected,
  );
  searchTerm$: Observable<string> = this.store.select(
    uploadInvoiceDetailsSelectors.selectSearchTerm,
  );
  purchaseOrders$: Observable<Array<IPurchaseOrderOc>> = this.store.select(
    uploadInvoiceDetailsSelectors.selectPurchaseOrders,
  );
  orderSelected$: Observable<IPurchaseOrderOc> = this.store.select(
    uploadInvoiceDetailsSelectors.selectOrderSelected,
  );
  dataInvoice$: Observable<IInvoice> = this.store.select(
    uploadInvoiceDetailsSelectors.selectInvoiceData,
  );
  items$: Observable<Array<IPurchaseItemUploadInvoice>> = this.store.select(
    uploadInvoiceDetailsSelectors.selectItemsByOrder,
  );
  provider$: Observable<IProviderUpload> = this.store.select(
    uploadInvoiceDetailsSelectors.selectProvider,
  );
  itemsInvoice$: Observable<Array<IPurchaseItemUploadInvoice>> = this.store.select(
    uploadInvoiceDetailsSelectors.selectItemsOfInvoice,
  );
  viewPop$: Observable<boolean> = this.store.select(
    uploadInvoiceDetailsSelectors.viewPopInvalidate,
  );
  importAmount$: Observable<CalcularMontosImportacion> = this.store.select(
    uploadInvoiceDetailsSelectors.selectImportAmount,
  );
  btnGenerate$: Observable<boolean> = this.store.select(
    uploadInvoiceDetailsSelectors.selectValidateBtnGenerate,
  );
  totalItems$: Observable<ITotItems> = this.store.select(
    uploadInvoiceDetailsSelectors.selectTotItems,
  );
  totalItemsInvoice$: Observable<ITotItems> = this.store.select(
    uploadInvoiceDetailsSelectors.selectTotItemsInvoice,
  );
  isLoading$: Observable<boolean> = this.store.select(
    uploadInvoiceDetailsSelectors.selectIsLoadingOrders,
  );
  isNational$: Observable<boolean> = this.store.select(
    uploadInvoiceDetailsSelectors.selectIsNational,
  );
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  providerContactSelected$: Observable<IProviderContact> = this.store.select(
    uploadInvoiceDetailsSelectors.selectedProviderContact,
  );
  selectContactsProvidersDropList$: Observable<Array<DropListOption>> = this.store.select(
    uploadInvoiceDetailsSelectors.selectContactsProviderDropList,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);

  modifiedItem: IPurchaseItemUploadInvoice = {} as IPurchaseItemUploadInvoice;
  itemsScroller: Array<IPurchaseItemUploadInvoice> = [];
  listOrdersScrollItems: Array<IPurchaseOrderOc> = [];
  popIsOpen = false;
  newPrice = null;
  rangeStart = new Date(1970, 0, 1);
  rangeEnd = new Date();
  readonly inputValidators = InputValidators;

  handleKeySearch = debounce(
    (value: string) => this.setSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  handleOpenPop(item: IPurchaseItemUploadInvoice): void {
    this.modifiedItem = item;
    this.popIsOpen = !this.popIsOpen;
  }

  handleClosePop(emit: boolean): void {
    this.popIsOpen = !this.popIsOpen;
    if (emit) {
      this.store.dispatch(
        uploadInvoiceDetailsActions.MODIFIED_PRICE_ITEM({
          item: {
            ...this.modifiedItem,
            PrecioLista: this.newPrice,
            TotalPartida: this.newPrice * this.modifiedItem.NumeroDePiezas,
          },
        }),
      );
    }
  }

  sortSelected(sort: DropListOption): void {
    this.store.dispatch(uploadInvoiceDetailsActions.SET_OPTION_SORT({sort}));
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(uploadInvoiceDetailsActions.SET_TERM_SEARCH({searchTerm}));
  }

  async fetchMore(event: IPageInfo): Promise<void> {
    const provider: Array<IPurchaseOrderOc> = await lastValueFrom(
      this.store.pipe(select(uploadInvoiceDetailsSelectors.selectPurchaseOrders), take(1)),
    );
    if (event.endIndex !== provider.length - 1) {
      return;
    }
    const listStatus = await lastValueFrom(
      this.store.pipe(select(uploadInvoiceDetailsSelectors.selectIsLoadingApi), take(1)),
    );
    const currentTotal: number = await lastValueFrom(
      this.store.pipe(select(uploadInvoiceDetailsSelectors.selectPurchaseOrdersTotal), take(1)),
    );
    const currentPage: number = await lastValueFrom(
      this.store.pipe(select(uploadInvoiceDetailsSelectors.selectCurrentPage), take(1)),
    );
    if (event.endIndex !== currentTotal - 1 && currentTotal > 0) {
      const totalPages = currentTotal >= PAGING_LIMIT ? Math.ceil(currentTotal / PAGING_LIMIT) : 0;

      if (
        currentPage > totalPages ||
        provider.length > currentTotal ||
        listStatus === API_REQUEST_STATUS_LOADING
      ) {
        return;
      }
      this.fetchOrders(false);
    }
  }

  fetchOrders(isFirstPage: boolean): void {
    this.store.dispatch(uploadInvoiceDetailsActions.FETCH_MORE_PURCHASE_ORDER({isFirstPage}));
  }

  dropItem(event: CdkDragDrop<IPurchaseItemUploadInvoice[]>): void {
    this.store.dispatch(uploadInvoiceDetailsActions.SET_ITEM_INVOICE({item: event.item.data}));
  }

  addItem(item: IPurchaseItemUploadInvoice): void {
    this.store.dispatch(uploadInvoiceDetailsActions.SET_ITEM_INVOICE({item}));
  }

  noReturnPredicate(): boolean {
    return false;
  }

  deleteItem(item: IPurchaseItemUploadInvoice): void {
    this.store.dispatch(uploadInvoiceDetailsActions.DELETE_ITEM_INVOICE({item}));
  }

  selectedOrder(order: IPurchaseOrderOc): void {
    this.store.dispatch(uploadInvoiceDetailsActions.SELECTED_PURCHASE_ORDER({order}));
  }

  closePop(status: boolean): void {
    this.store.dispatch(uploadInvoiceDetailsActions.SET_STATUS_POP_UP({active: false}));
  }

  setParamInvoice(value: string | number | File | Date, param: string): void {
    this.store.dispatch(uploadInvoiceDetailsActions.SET_PARAM_INVOICE({value, param}));
  }

  handleDate(value, param: string): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const stringDate = date.toISOString();
    this.setParamInvoice(stringDate, param);
    this.setParamInvoice(date, `${param}Date`);
  }

  generate(): void {
    this.store.dispatch(uploadInvoiceDetailsActions.UPLOAD_INVOICE_FILES_LOAD());
  }

  setContactSelectedProvider(contactSelected: DropListOption): void {
    this.store.dispatch(
      uploadInvoiceDetailsActions.SET_SELECTED_CONTACT_PROVIDER({
        contactSelected,
      }),
    );
  }
}
