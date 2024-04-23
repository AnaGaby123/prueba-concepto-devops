import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {
  regulatoryResearchDetailsSelectors,
  regulatoryResearchSelectors,
} from '@appSelectors/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-index';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {IPqfTabOption} from '@appModels/shared-components/pqf-tab-options';
import {
  regulatoryResearchActions,
  regulatoryResearchDetailsActions,
} from '@appActions/pendings/new-product-existing-supplier/regulatory-research';
import {debounce} from 'lodash-es';
import {
  ProductRatificationExtended,
  ProductRatificationExtendedList,
} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.models';
import {GET_CAT_MONEDA_LOAD} from '@appActions/catalogs/catalogos.actions';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-regulatory-research-details',
  templateUrl: './regulatory-research-details.component.html',
  styleUrls: ['./regulatory-research-details.component.scss'],
})
export class RegulatoryResearchDetailsComponent implements OnInit, OnDestroy {
  searchTerm$: Observable<string> = this.store.select(
    regulatoryResearchDetailsSelectors.selectSearchTerm,
  );
  filterOptions$: Observable<Array<FilterOptionPqf>> = this.store.select(
    regulatoryResearchDetailsSelectors.selectFilterOptions,
  );
  tabOptions$: Observable<Array<IPqfTabOption>> = this.store.select(
    regulatoryResearchDetailsSelectors.selectTabOptions,
  );
  enableEdit$: Observable<boolean> = this.store.select(
    regulatoryResearchSelectors.selectEnableEdit,
  );
  productList$: Observable<ProductRatificationExtendedList> = this.store.select(
    regulatoryResearchDetailsSelectors.selectProductList,
  );
  hasChangesOnProduct$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.hasChangesOnProduct,
  );
  hasRestrictionsAndRegularizations$: Observable<any> = this.store.select(
    regulatoryResearchDetailsSelectors.hasRestrictionsAndRegularizations,
  );
  selectedTabOption$: Observable<IPqfTabOption> = this.store.select(
    regulatoryResearchDetailsSelectors.selectedTabOption,
  );

  validations$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.selectValidations,
  );
  isValidFinish$: Observable<boolean> = this.store.select(
    regulatoryResearchDetailsSelectors.isValidFinish,
  );

  handleKeySearch = debounce((data) => this.setSearchTerm(data), DEFAULT_TIME_DEBOUNCE_SEARCH);
  index = 0;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(GET_CAT_MONEDA_LOAD());
  }

  ngOnDestroy() {
    this.store.dispatch(regulatoryResearchDetailsActions.RESET_DETAILS_STATE());
    this.store.dispatch(regulatoryResearchActions.SET_ENABLE_EDIT({enableEdit: false}));
  }

  handleDownloadFile() {
    this.store.dispatch(regulatoryResearchDetailsActions.SET_DOWNLOAD_FILE());
  }

  setFilters(filterOptions: Array<FilterOptionPqf>) {
    this.store.dispatch(regulatoryResearchDetailsActions.SET_FILTER_OPTIONS({filterOptions}));
  }

  setSearchTerm(searchTerm: string) {
    this.store.dispatch(regulatoryResearchDetailsActions.SET_SEARCH_TERM({searchTerm}));
  }

  setTabOptions(tabOptions: Array<IPqfTabOption>) {
    this.store.dispatch(regulatoryResearchDetailsActions.SET_TAB_OPTIONS({tabOptions}));
  }

  handleEnableEdit(state = false) {
    if (!state) {
      this.store.dispatch(regulatoryResearchDetailsActions.RESTORE_BACK_UP_PRODUCT());
    }
    this.store.dispatch(regulatoryResearchActions.SET_ENABLE_EDIT({enableEdit: state}));
  }

  saveProduct(): void {
    this.store.dispatch(regulatoryResearchDetailsActions.SET_SAVE_PRODUCT());
    this.store.dispatch(regulatoryResearchActions.SET_ENABLE_EDIT({enableEdit: false}));
  }

  finishResearch(): void {
    this.store.dispatch(regulatoryResearchDetailsActions.SAVE_REGULATION_DATA());
  }

  selectItem(item: ProductRatificationExtended, index: number): void {
    if (index === this.index) {
      return;
    }

    this.index = index;
    this.store.dispatch(
      regulatoryResearchDetailsActions.SET_NEW_PRODUCT_RATIFICATION({selectedProduct: item, index}),
    );
  }
}
