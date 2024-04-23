import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {lastValueFrom} from 'rxjs';

import {selectAuth, selectUserRoles} from '@appSelectors/auth/auth.selectors';

import {AppState} from '@appCore/core.state';
import {SET_ACTIVE_MENUOPTIONS} from '@appActions/utils/utils.action';
import {split as _split} from 'lodash-es';

import {AuthState} from '@appModels/store/auth/auth.models';
import {authLogout} from '@appActions/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<AppState>) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authState: AuthState = await lastValueFrom(this.store.pipe(select(selectAuth), take(1)));
    // Check if currentUser is still active
    if (authState && authState.isAuthenticated) {
      const roles: string[] = await lastValueFrom(
        this.store.pipe(select(selectUserRoles), take(1)),
      );
      const urlClear = _split(state.url, '/protected/');
      this.store.dispatch(SET_ACTIVE_MENUOPTIONS({url: urlClear[1], roles}));
      // User info in storage and authorised: reset userInfo information in memory
    } else {
      // Not logged in so redirect to login page with the return url
      this.store.dispatch(authLogout());
    }
    return authState.isAuthenticated;
  }
}
