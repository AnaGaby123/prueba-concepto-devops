import {Component} from '@angular/core';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {priorityConsoleListSelectors} from '@appSelectors/pendings/operations-manager';
import {priorityConsoleListActions} from '@appActions/pendings/operations-manager';

/* Tools Imports */
import {debounce} from 'lodash-es';

import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-priority-console-list',
  templateUrl: './priority-console-list.component.html',
  styleUrls: ['./priority-console-list.component.scss'],
})
export class PriorityConsoleListComponent {
  filterByPriority$: Observable<DropListOption[]> = this.store.select(
    priorityConsoleListSelectors.filterByPriority,
  );
  filterByPrioritySelected$: Observable<DropListOption> = this.store.select(
    priorityConsoleListSelectors.filterByPrioritySelected,
  );
  filterByType$: Observable<DropListOption[]> = this.store.select(
    priorityConsoleListSelectors.filterByType,
  );
  filterByTypeSelected$: Observable<DropListOption> = this.store.select(
    priorityConsoleListSelectors.filterByTypeSelected,
  );
  tabOptions$: Observable<ITabOption[]> = this.store.select(
    priorityConsoleListSelectors.tabOptions,
  );
  tabOptionSelected$: Observable<ITabOption> = this.store.select(
    priorityConsoleListSelectors.tabOptionSelected,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store) {}

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(priorityConsoleListActions.SET_SEARCH_TERM({searchTerm}));
  }

  setTab(tabOptionSelected: ITabOption): void {
    this.store.dispatch(
      priorityConsoleListActions.SET_SELECTED_TAB_OPTION_SELECTED({
        tabOptionSelected,
      }),
    );
  }

  selectFilterByPriority(byPriority: DropListOption): void {
    this.store.dispatch(priorityConsoleListActions.SET_SELECTED_FILTER_BY_PRIORITY({byPriority}));
  }

  selectFilterByType(byType: DropListOption): void {
    this.store.dispatch(priorityConsoleListActions.SET_SELECTED_FILTER_BY_TYPE({byType}));
  }
}
