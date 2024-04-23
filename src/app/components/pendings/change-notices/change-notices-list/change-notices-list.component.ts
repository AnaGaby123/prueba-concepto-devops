/*Core imports */
import {debounce} from 'lodash-es';
import {Component} from '@angular/core';
import {Observable} from 'rxjs';

/*Store imports */
import {Store} from '@ngrx/store';

/*Selectors imports */
import {changeNoticesListSelectors} from '@appSelectors/pendings/change-notices';

/*Model imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';

/*Actions Imports*/
import {
  changeNoticesDetailsActions,
  changeNoticesListActions,
} from '@appActions/pendings/change-notices';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-change-notices-list',
  templateUrl: './change-notices-list.component.html',
  styleUrls: ['./change-notices-list.component.scss'],
})
export class ChangeNoticesListComponent {
  filter$: Observable<DropListOption> = this.store.select(
    changeNoticesListSelectors.selectFilterByType,
  );
  filters$: Observable<Array<DropListOption>> = this.store.select(
    changeNoticesListSelectors.selectDataByType,
  );
  searchTerm$: Observable<string> = this.store.select(changeNoticesListSelectors.selectSearchTerm);
  tab$: Observable<ITabOption> = this.store.select(changeNoticesListSelectors.selectedTabOption);
  tabs$: Observable<Array<ITabOption>> = this.store.select(
    changeNoticesListSelectors.selectTabOptions,
  );
  handleKeySearch = debounce((value) => this.setSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store) {}

  setOption(filterByType: DropListOption): void {
    this.store.dispatch(changeNoticesListActions.SET_OPTION_ORDER({filterByType}));
  }

  setTab(selectedTabOption: ITabOption): void {
    this.store.dispatch(changeNoticesListActions.SET_TAB_SELECTED({selectedTabOption}));
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(changeNoticesListActions.SET_SEARCH_TERM({searchTerm}));
  }

  setSelectedClient(selectedClient: any): void {
    this.store.dispatch(changeNoticesDetailsActions.SET_SELECTED_CLIENT({selectedClient}));
  }
}
