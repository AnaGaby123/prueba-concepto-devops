/* Core Imports */
import {Component} from '@angular/core';

/* Store Imports */
import {Store} from '@ngrx/store';

/* Actions Imports */
import {loadMissingListActions} from '@appActions/pendings/imports/load-missing';

/* Tools Imports */
import {debounce} from 'lodash-es';

/* Models Imports */
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-load-missing-list',
  templateUrl: './load-missing-list.component.html',
  styleUrls: ['./load-missing-list.component.scss'],
})
export class LoadMissingListComponent {
  agents = [
    {
      Index: 1,
      nombre: 'Abc',
      ordenes: 3,
      proveedores: 10,
      certificados: 4,
      cartas: 1,
    },
    {
      Index: 2,
      nombre: 'Giacinti',
      ordenes: 1,
      proveedores: 10,
      certificados: 4,
      cartas: 24,
    },
    {
      Index: 3,
      nombre: 'Midvia',
      ordenes: 3,
      proveedores: 1,
      certificados: 4,
      cartas: 24,
    },
    {
      Index: 4,
      nombre: 'Palos Garza',
      ordenes: 3,
      proveedores: 10,
      certificados: 4,
      cartas: 1,
    },
  ];
  listAgentsScrollItems = [];
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );

  constructor(private store: Store) {}

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(loadMissingListActions.SET_SEARCH_TERM({searchTerm}));
  }

  fetchMore(event: IPageInfo): void {}

  setAgent(agent: any): void {}
}
