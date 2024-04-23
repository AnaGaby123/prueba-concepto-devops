import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {changeNoticesDetailsActions} from '@appActions/pendings/change-notices';
import {Observable} from 'rxjs';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {changeNoticesDetailsSelectors} from '@appSelectors/pendings/change-notices';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {debounce} from 'lodash-es';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-change-notices-details',
  templateUrl: './change-notices-details.component.html',
  styleUrls: ['./change-notices-details.component.scss'],
})
export class ChangeNoticesDetailsComponent {
  tabs$: Observable<Array<ITabOption>> = this.store.select(
    changeNoticesDetailsSelectors.selectTabOptions,
  );
  tab$: Observable<ITabOption> = this.store.select(changeNoticesDetailsSelectors.selectedTabOption);
  filters$: Observable<Array<DropListOption>> = this.store.select(
    changeNoticesDetailsSelectors.selectSortList,
  );
  filter$: Observable<DropListOption> = this.store.select(changeNoticesDetailsSelectors.selectSort);
  searchTermOptions$: Observable<Array<DropListOption>> = this.store.select(
    changeNoticesDetailsSelectors.selectSearchTermOptions,
  );
  selectedSearchTermOption$: Observable<DropListOption> = this.store.select(
    changeNoticesDetailsSelectors.selectedSearchTermOption,
  );
  searchTerm$: Observable<string> = this.store.select(
    changeNoticesDetailsSelectors.selectSearchTerm,
  );

  handleKeySearch = debounce((value) => this.setSearchTerm(value), DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store) {}

  setOption(filterByType: DropListOption): void {
    this.store.dispatch(changeNoticesDetailsActions.SET_SORT_SELECTED({filterByType}));
  }

  setTab(selectedTabOption: ITabOption): void {
    this.store.dispatch(changeNoticesDetailsActions.SET_SELECTED_TAB_OPTION({selectedTabOption}));
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(changeNoticesDetailsActions.SET_SEARCH_TERM({searchTerm}));
  }

  setSelectedTypeOfSearch(selectedSearchTermOption: DropListOption): void {
    this.store.dispatch(
      changeNoticesDetailsActions.SET_SEARCH_TYPE_SELECTED({
        selectedSearchTermOption,
      }),
    );
  }
}
