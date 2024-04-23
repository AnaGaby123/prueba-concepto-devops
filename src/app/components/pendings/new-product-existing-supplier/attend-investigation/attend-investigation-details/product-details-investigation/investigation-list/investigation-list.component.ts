// CORE
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
// MODELS
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
// ACTIONS
import {attendInvestigationDetailsActions} from '@appActions/pendings/attend-investigation';
// SELECTORS
import {attendInvestigationDetailsSelectors} from '@appSelectors/pendings/attend-investigation';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
// UTILS
import {debounce, isEmpty} from 'lodash-es';
import {AttendInvestigationProductsStatusKeys} from '@appModels/store/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.model';
import {IProductInvestigation} from '@appModels/store/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.model';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-investigation-list',
  templateUrl: './investigation-list.component.html',
  styleUrls: ['./investigation-list.component.scss'],
})
export class InvestigationListComponent implements OnInit {
  filterOption$: Observable<DropListOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectFilterSelected,
  );
  filterOptions$: Observable<Array<DropListOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selectFilterOptions,
  );
  tabOption$: Observable<ITabOption> = this.store.select(
    attendInvestigationDetailsSelectors.selectTabOptionSelected,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    attendInvestigationDetailsSelectors.selectTabOptions,
  );
  productInvestigationList$: Observable<Array<IProductInvestigation>> = this.store.select(
    attendInvestigationDetailsSelectors.selectProductInvestigationListFiltered,
  );
  listApiStatus$: Observable<number> = this.store.select(
    attendInvestigationDetailsSelectors.selectProductInvestigationApiStatus,
  );
  productsChecked$: Observable<Array<IProductInvestigation>> = this.store.select(
    attendInvestigationDetailsSelectors.selectProductsChecked,
  );
  enableOnlineInvestigation$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.enableOnlineInvestigattionButton,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  isAllAwaitingResponse$: Observable<boolean> = this.store.select(
    attendInvestigationDetailsSelectors.isAllAwaitingResponse,
  );
  readonly viewTypes = AppViewTypes;
  handleKeySearch = debounce(
    (value: string) => this.setSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  investigationScroll: Array<IProductInvestigation>;
  isOpenPop = false;
  lodashIsEmpty = isEmpty;
  checkAll;
  productStatus = AttendInvestigationProductsStatusKeys;
  productIndex = 0;

  constructor(private store: Store<AppState>) {
    this.checkAll = false;
  }

  ngOnInit() {
    this.store.dispatch(attendInvestigationDetailsActions.GET_PROVIDER_CONTACTS_LOAD());
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(attendInvestigationDetailsActions.SET_SEARCH_TERM({searchTerm}));
  }

  setFilterSelected(filterSelected: DropListOption): void {
    this.store.dispatch(
      attendInvestigationDetailsActions.SET_FILTER_OPTION_SELECTED({
        filterSelected,
      }),
    );
  }

  setTabOptionSelected(tabOptionSelected: ITabOption): void {
    this.store.dispatch(
      attendInvestigationDetailsActions.SET_TAB_OPTION_SELECTED({
        tabOptionSelected,
      }),
    );
  }

  setContent(product: IProductInvestigation): void {
    this.store.dispatch(attendInvestigationDetailsActions.SET_SELECTED_PRODUCT({product}));
  }

  handleOpenPop(): void {
    this.store.dispatch(
      attendInvestigationDetailsActions.SHOW_SEND_EMAIL_DIALOG({
        viewType: this.viewTypes.small,
      }),
    );
  }

  getItemMessageImg(product: IProductInvestigation) {
    if (product.selected) {
      if (product.detailsOpen) {
        return 'assets/Images/new-product-existing-supplier/attend-investigation/close-product-item.svg';
      } else {
        return 'assets/Images/new-product-existing-supplier/attend-investigation/select-product-item.svg';
      }
    } else {
      return 'assets/Images/new-product-existing-supplier/attend-investigation/selected-product-item-disable.svg';
    }
  }

  handleOpenDetails(product: IProductInvestigation) {
    if (product.selected) {
      this.store.dispatch(
        attendInvestigationDetailsActions.OPEN_PRODUCT_DETAILS({
          value: !product.detailsOpen,
          index: product.index,
          isOnlineInvestigation: false,
        }),
      );
    }
  }

  handleOnlineInvestigation() {
    this.store.dispatch(
      attendInvestigationDetailsActions.OPEN_PRODUCT_DETAILS({
        value: true,
        index: this.productIndex,
        isOnlineInvestigation: true,
      }),
    );
  }

  handleCheckAll() {
    this.checkAll = !this.checkAll;
    this.store.dispatch(
      attendInvestigationDetailsActions.CHECK_ALL_ITEMS({
        value: this.checkAll,
      }),
    );
  }

  handleClick(event, product: IProductInvestigation): void {
    this.store.dispatch(attendInvestigationDetailsActions.CHECK_ITEM({index: product.index}));
    event.stopPropagation();
  }

  handleTrackByIdInvestigation(index: number, item: IProductInvestigation): string {
    return item.IdCotPartidaCotizacionInvestigacion;
  }
}
