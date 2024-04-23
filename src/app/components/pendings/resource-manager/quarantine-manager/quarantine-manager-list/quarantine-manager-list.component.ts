/*Core imports */
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

/*Models imports*/
import {DropListOption} from '@appModels/drop-list/drop-list-option';

/* Selectors Imports */
import {quarantineManagerListSelectors} from '@appSelectors/pendings/resource-manager/quarantine-manager';

/*Actions imports*/
import {
  quarantineManagerActions,
  quarantineManagerListActions,
} from '@appActions/pendings/resource-manager/quarantine-manager';

/*Util imports*/
import {debounce} from 'lodash-es';

import {appRoutes} from '@appHelpers/core/app-routes';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-quarantine-manager-list',
  templateUrl: './quarantine-manager-list.component.html',
  styleUrls: ['./quarantine-manager-list.component.scss'],
})
export class QuarantineManagerListComponent {
  filterOptions$: Observable<Array<DropListOption>> = this.store.select(
    quarantineManagerListSelectors.selectFilters,
  );
  filterSelected$: Observable<DropListOption> = this.store.select(
    quarantineManagerListSelectors.filterSelected,
  );
  searchTerm$: Observable<string> = this.store.select(
    quarantineManagerListSelectors.selectSearchTerm,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store, private router: Router) {}

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(quarantineManagerListActions.SET_SEARCH_TERM({searchTerm}));
  }

  setFilter(filter: DropListOption): void {
    this.store.dispatch(quarantineManagerListActions.SET_FILTER_SELECTED({filter}));
  }

  itemSelected(): void {
    this.store.dispatch(quarantineManagerActions.SET_IS_IN_DETAILS_VIEW({detailsMode: true}));
    this.store.dispatch(quarantineManagerActions.SET_ALLOWED_TO_DETAILS({allowToDetails: true}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.quarantineManager.quarantineManager,
      appRoutes.quarantineManager.details,
    ]);
  }
}
