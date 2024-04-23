import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Store} from '@ngrx/store';
import {debounce} from 'lodash-es';

/* Selectors Imports */
import {confirmProductToClaimDetailsSelectors} from '@appSelectors/pendings/product-to-claim/product-to-claim';

/* Actions Import */
import {productToClaimDetailsActions} from '@appActions/pendings/product-to-claim/product-to-claim';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-product-to-claim-details',
  templateUrl: './product-to-claim-details.component.html',
  styleUrls: ['./product-to-claim-details.component.scss'],
})
export class ProductToClaimDetailsComponent implements OnInit {
  front: boolean;
  up: boolean;
  down: boolean;
  filterOptions$: Observable<Array<DropListOption>> = this.store.select(
    confirmProductToClaimDetailsSelectors.selectFilters,
  );
  filterSelected$: Observable<DropListOption> = this.store.select(
    confirmProductToClaimDetailsSelectors.filterSelected,
  );
  searchTerm$: Observable<string> = this.store.select(
    confirmProductToClaimDetailsSelectors.selectSearchTerm,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.front = true;
    this.up = false;
    this.down = false;
  }

  setFilter(filter: DropListOption): void {
    this.store.dispatch(productToClaimDetailsActions.SET_FILTER_SELECTED({filter}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(productToClaimDetailsActions.SET_SEARCH_TERM({searchTerm}));
  }

  selectImage(value: string): void {
    this.up = false;
    this.front = false;
    this.down = false;
    this[value] = true;
  }
}
