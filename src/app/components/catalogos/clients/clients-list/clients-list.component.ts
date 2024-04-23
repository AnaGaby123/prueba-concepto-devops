// CORE
import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
// MODELS
import {IItemCatalogData} from '@appModels/item-card-catalog/item-card-catalog';
import {VCliente} from 'api-catalogos';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';
import {Corporates, ResultCorporates} from '@appModels/store/catalogs/catalogs.models';
import {
  IClientsListForm,
  IVClient,
} from '@appModels/store/forms/clients-form/clients-list-form/clients-list-form.models';
import {clientListFormActions} from '@appActions/forms/client-form';
// ACTIONS
import * as clientsListActions from '@appActions/forms/client-form/clients-list-form/clients-list-form.actions';
// SELECTORS
import {clientsListSelectors} from '@appSelectors/forms/clients-form';
// UTILS
import {isEmpty} from 'lodash-es';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss'],
})
export class ClientsListComponent implements OnInit {
  clients$: Observable<Array<VCliente>> = this.store.select(clientsListSelectors.selectClientsList);
  totalClients$: Observable<number> = this.store.select(clientsListSelectors.selectTotalResults);
  clientsApiStatus$: Observable<number> = this.store.select(
    clientsListSelectors.selectClientsApiStatus,
  );
  corporates$: Observable<ResultCorporates> = this.store.select(
    clientsListSelectors.selectCorporates,
  );
  clientsListNode$: Observable<IClientsListForm> = this.store.select(
    clientsListSelectors.selectClientsListState,
  );
  corporatesToShow$: Observable<Array<Corporates>> = this.store.select(
    clientsListSelectors.selectCorporatesToShow,
  );
  lodashIsEmpty = isEmpty;
  timer;
  scrollItems: Array<VCliente> = [];
  corporatesScrollItems: Array<VCliente> = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(clientsListActions.INIT_LIST_COMPONENT_EFFECT());
  }

  fetchMore(event: IPageInfo): void {
    this.store.dispatch(clientsListActions.FETCH_MORE_COMPONENT_EFFECT({event}));
  }

  buildItem(client: IVClient): IItemCatalogData {
    return {
      active: client.Activo,
      categoria: client?.Categoria,
      image: client.image,
      imageHover: client.imageHover,
      nivelIngreso: client?.NivelIngreso,
      subtitle: 'Importancia: ' + client.Importancia,
      title: client.Nombre,
    };
  }

  handleShowClient(client: VCliente): void {
    this.store.dispatch(clientListFormActions.HANDLE_SHOW_CLIENT_COMPONENT_EFFECT({client}));
  }

  addClient(): void {
    this.store.dispatch(clientListFormActions.ADD_CLIENT_COMPONENT_EFFECT());
  }
}
