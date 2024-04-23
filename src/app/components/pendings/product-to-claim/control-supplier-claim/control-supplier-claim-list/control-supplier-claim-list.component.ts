/*Core imports */
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

/*Selectors Imports*/
import {controlSupplierClaimListSelectors} from '@appSelectors/pendings/product-to-claim/control-supplier-claim';

/*Actions imports*/
import {
  controlSupplierClaimActions,
  controlSupplierClaimListActions,
} from '@appActions/pendings/product-to-claim/control-supplier-claim';

/*Models imports*/
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

/* Tools Imports */
import {debounce} from 'lodash-es';

import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-control-supplier-claim-list',
  templateUrl: './control-supplier-claim-list.component.html',
  styleUrls: ['./control-supplier-claim-list.component.scss'],
})
export class ControlSupplierClaimListComponent {
  sortOptions$: Observable<Array<DropListOption>> = this.store.select(
    controlSupplierClaimListSelectors.selectSortOptions,
  );
  sortSelected$: Observable<DropListOption> = this.store.select(
    controlSupplierClaimListSelectors.selectSortSelected,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    controlSupplierClaimListSelectors.selectTabs,
  );
  tabSelected$: Observable<ITabOption> = this.store.select(
    controlSupplierClaimListSelectors.selectSelectedTab,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store, private router: Router) {}

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(controlSupplierClaimListActions.SET_SEARCH_TERM({searchTerm}));
  }

  itemSelected(): void {
    this.store.dispatch(controlSupplierClaimActions.SET_IS_IN_DETAILS_VIEW({detailsMode: true}));
    this.store.dispatch(
      controlSupplierClaimActions.SET_ALLOWED_TO_DETAILS({
        allowToDetails: true,
      }),
    );
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.controlSupplierClaim.controlSupplierClaim,
      appRoutes.controlSupplierClaim.details,
    ]);
  }

  setSort(sort: DropListOption): void {
    this.store.dispatch(controlSupplierClaimListActions.SET_SORT_SELECTED({sort}));
  }

  setTab(tab: ITabOption): void {
    this.store.dispatch(controlSupplierClaimListActions.SET_TAB_SELECTED({tab}));
  }
}
