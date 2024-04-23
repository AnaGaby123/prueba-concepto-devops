// CORE
import {Component, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
// MODELS
import {VCliente} from 'api-catalogos';
/*SELECTORS*/
import {clientsDetailsSelectors, clientsSelectors} from '@appSelectors/forms/clients-form';
/*ACTIONS*/
import * as clientsListActions from '@appActions/forms/client-form/clients-list-form/clients-list-form.actions';

/*UTILS*/
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnDestroy {
  title$: Observable<string> = this.store.select(clientsSelectors.selectTitle);
  editMode$: Observable<boolean> = this.store.select(clientsSelectors.selectEditMode);
  enableEdit$: Observable<boolean> = this.store.select(clientsSelectors.selectEnableEdit);
  selectedClient$: Observable<VCliente> = this.store.select(clientsDetailsSelectors.selectedClient);
  isInDetails$: Observable<boolean> = this.store.select(clientsSelectors.selectIsInDetails);

  constructor(private location: Location, private store: Store<AppState>, private router: Router) {}

  returnMainPage(): void {
    this.router.navigate([appRoutes.protected, appRoutes.catalogs.catalogs]);
    this.store.dispatch(clientsListActions.CLEAN_STATE());
  }

  goBack(): void {
    this.router.navigate([
      appRoutes.protected,
      appRoutes.catalogs.catalogs,
      appRoutes.catalogs.clients.clients,
    ]);
  }

  downloadClients(): void {
    this.store.dispatch(clientsListActions.DOWNLOAD_CSV_CLIENTS_FILE_LOAD());
  }

  ngOnDestroy(): void {
    this.store.dispatch(clientsListActions.CLEAN_STATE());
  }
}
