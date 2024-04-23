import {debounce} from 'lodash-es';

import {Component} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/* Selectors Imports */
import {confirmProductToClaimListSelectors} from '@appSelectors/pendings/product-to-claim/product-to-claim';

/* Actions Import */
import {
  productToClaimActions,
  productToClaimListActions,
} from '@appActions/pendings/product-to-claim/product-to-claim';

/*Models imports */
import {Router} from '@angular/router';

/*Utils imports */
import {appRoutes} from '@appHelpers/core/app-routes';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-product-to-claim-list',
  templateUrl: './product-to-claim-list.component.html',
  styleUrls: ['./product-to-claim-list.component.scss'],
})
export class ProductToClaimListComponent {
  filterOptions$: Observable<Array<DropListOption>> = this.store.select(
    confirmProductToClaimListSelectors.selectFilters,
  );
  filterSelected$: Observable<DropListOption> = this.store.select(
    confirmProductToClaimListSelectors.filterSelected,
  );
  searchTerm$: Observable<string> = this.store.select(
    confirmProductToClaimListSelectors.selectSearchTerm,
  );

  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store, private router: Router) {}

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(productToClaimListActions.SET_SEARCH_TERM({searchTerm}));
  }

  setFilter(filter: DropListOption): void {
    this.store.dispatch(productToClaimListActions.SET_FILTER_SELECTED({filter}));
  }

  itemSelected(): void {
    this.store.dispatch(productToClaimActions.SET_IS_IN_DETAILS_VIEW({detailsMode: true}));
    this.store.dispatch(productToClaimActions.SET_ALLOWED_TO_DETAILS({allowToDetails: true}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.productToClaim.productToClaim,
      appRoutes.productToClaim.details,
    ]);
  }
}
