import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

//  Selectors
import * as providersSelectors from '@appSelectors/forms/providers/providers.selectors';

import {AppState} from '@appCore/core.state';
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class AddEditProvidersGuardService implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAddEditComponent: boolean = await lastValueFrom(
      this.store.pipe(select(providersSelectors.selectAddEditComponent), take(1)),
    );

    // Si el estado del componente es false se redirige a la lista de usuarios
    if (!isAddEditComponent) {
      await this.router.navigate([
        '/protected/catalogs/providers/',
        appRoutes.catalogs.providers.listProviders,
      ]);
    }
    return isAddEditComponent;
  }
}
