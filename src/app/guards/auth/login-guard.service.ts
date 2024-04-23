import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {lastValueFrom} from 'rxjs';
import {selectAuth} from '@appSelectors/auth/auth.selectors';
import {AppState} from '@appCore/core.state';
import {appRoutes} from '@appHelpers/core/app-routes';
import {AuthState} from '@appModels/store/auth/auth.models';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canActivate() {
    const authState: AuthState = await lastValueFrom(this.store.pipe(select(selectAuth), take(1)));

    if (authState && authState.isAuthenticated) {
      await this.router.navigate([appRoutes.protected]);
      return authState.isAuthenticated;
    }

    return true;
  }
}
