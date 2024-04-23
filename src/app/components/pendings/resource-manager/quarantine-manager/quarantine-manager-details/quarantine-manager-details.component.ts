import {Component, OnInit} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {debounce} from 'lodash-es';

/* Selectors Imports */
import {quarantineManagerDetailsSelectors} from '@appSelectors/pendings/resource-manager/quarantine-manager';
import {quarantineManagerDetailsActions} from '@appActions/pendings/resource-manager/quarantine-manager';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-quarentine-manager-details',
  templateUrl: './quarantine-manager-details.component.html',
  styleUrls: ['./quarantine-manager-details.component.scss'],
})
export class QuarantineManagerDetailsComponent implements OnInit {
  front: boolean;
  up: boolean;
  down: boolean;
  filterOptions$: Observable<DropListOption[]> = this.store.select(
    quarantineManagerDetailsSelectors.selectFilters,
  );
  filterSelected$: Observable<DropListOption> = this.store.select(
    quarantineManagerDetailsSelectors.filterSelected,
  );
  searchOC$: Observable<string> = this.store.select(
    quarantineManagerDetailsSelectors.selectSearchOC,
  );
  searchTerm$: Observable<string> = this.store.select(
    quarantineManagerDetailsSelectors.selectSearchTerm,
  );

  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  handleKeySearchOC = debounce(
    (value: string) => this.changeSearchTermOC(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.front = true;
    this.up = false;
    this.down = false;
  }

  setFilter(filter: DropListOption): void {
    this.store.dispatch(quarantineManagerDetailsActions.SET_FILTER_SELECTED({filter}));
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(quarantineManagerDetailsActions.SET_SEARCH_TERM({searchTerm}));
  }

  changeSearchTermOC(searchOC: string): void {
    this.store.dispatch(quarantineManagerDetailsActions.SET_SEARCH_OC({searchOC}));
  }

  selectImage(value: string): void {
    this.up = false;
    this.front = false;
    this.down = false;
    this[value] = true;
  }
}
