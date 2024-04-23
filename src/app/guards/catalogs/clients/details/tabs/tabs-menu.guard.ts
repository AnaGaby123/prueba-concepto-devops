import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {lastValueFrom} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {selectUser} from '@appSelectors/auth/auth.selectors';
import {take} from 'rxjs/operators';
import {allowedPath} from '@appUtil/util';
import {selectMainMenuOptionsByUserPermissions} from '@appSelectors/utils/utils.selectors';
import {AuthService} from '@appServices/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TabsMenuGuard implements CanLoad {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService,
  ) {}

  async canLoad(route: Route, segments: UrlSegment[]) {
    // DOCS: Obtenemos las funciones y roles del usuario
    const userInfo = await lastValueFrom(this.store.pipe(select(selectUser), take(1)));
    // DOCS: Obtenemos las options de la ruta
    const userMenuOptions = await lastValueFrom(
      this.store.pipe(select(selectMainMenuOptionsByUserPermissions), take(1)),
    );

    // DOCS: Retorna si los roles y funciones del usuario son permitidos por la ruta actual.
    return allowedPath(userInfo, userMenuOptions, route.path);
  }
}
