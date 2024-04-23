import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {selectUser} from '@appSelectors/auth/auth.selectors';
import {take} from 'rxjs/operators';
import {
  selectMainMenuOptions,
  selectMainMenuOptionsByUserPermissions,
} from '@appSelectors/utils/utils.selectors';
import {drop, take as _take, isEmpty, intersection, findIndex, forEach} from 'lodash-es';
import {IMenuOption} from '@appModels/store/utils/utils.model';
import {menuObject} from '@appUtil/util';
import {SET_ACTIVE_A_MENU_OPTION} from '@appActions/utils/utils.action';
import {AuthService} from '@appServices/auth/auth.service';
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';
import {UserInfo} from '@appModels/auth/user-info.model';

@Injectable({
  providedIn: 'root',
})
export class GeneralRouteGuard implements CanLoad {
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private authService: AuthService,
  ) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const accessProcessed = await this.processAccess();
    if (!accessProcessed.access) {
      await this.router.navigate([...accessProcessed.returnRoutes]);
    }
    return accessProcessed.access;
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const accessProcessed = await this.processAccess();
    if (!accessProcessed.access) {
      await this.router.navigate([...accessProcessed.returnRoutes]);
    }
    return accessProcessed.access;
  }

  async processAccess() {
    const accessProcessed = {
      returnRoutes: [],
      access: true,
    };
    // DOCS: Obtenemos las funciones y roles del usuario
    const userInfo: UserInfo = await lastValueFrom(this.store.pipe(select(selectUser), take(1)));

    const urlSegments: Array<string> = drop(this.authService.attemptedUrl.split('/'), 2);

    // DOCS: Recorremos los segmentos de la ruta
    for (let i = 0; i < urlSegments.length; i++) {
      // DOCS: Obtenemos el menu de opciones actualizado con los permisos del usuario
      const userMenuOptions = await lastValueFrom(
        this.store.pipe(select(selectMainMenuOptionsByUserPermissions), take(1)),
      );
      // DOCS: Obtenemos el objeto del menu que le corresponde al segmento de la ruta
      const selectedSegmentMenuObject = menuObject(userMenuOptions, urlSegments[i]);

      // DOCS: Armar la ruta predecesora
      accessProcessed.returnRoutes = [appRoutes.protected, ..._take(urlSegments, i)];

      // DOCS: Si no existe el objeto redirigimos a la ruta predecesora
      if (!selectedSegmentMenuObject) {
        accessProcessed.access = false;
        return accessProcessed;
      }

      // DOCS: Leer las funciones y roles del menu item
      const interFunctions = intersection(
        userInfo.Funciones,
        selectedSegmentMenuObject.allowedFunctions,
      );
      const interRoles = intersection(userInfo.Roles, selectedSegmentMenuObject.allowedRoles);

      // DOCS: Si no coincide la función y el rol redirigimos a la ruta predecesora
      if (isEmpty(interFunctions) || isEmpty(interRoles)) {
        accessProcessed.access = false;
        return accessProcessed;
      }

      // DOCS: Cambiamos la propiedad de active a true para guardarla en el State
      const setActiveAMenuOption = (options) =>
        forEach(options, (option: IMenuOption) => {
          if (option.url === urlSegments[i]) {
            // DOCS: Si es el segmento actual lo activamos
            option.active = true;
          } else {
            if (
              option.containOptions &&
              findIndex(option.childRoutes, (o) => o === urlSegments[i]) !== -1
            ) {
              // DOCS: Si es el padre de la ruta actual lo activamos
              option.active = true;
            } else if (findIndex(_take(urlSegments, i + 1), (o) => o === option.url) === -1) {
              // DOCS: Unicamente si no se encuentra dentro de ningunos de los segmentos actual o pasados se desactiva
              option.active = false;
            }
            if (option.containOptions) {
              // DOCS: Si tiene opcines continua la recursividad
              setActiveAMenuOption(option.options);
            }
          }
        });

      // DOCS: Obtiene la lista original de opciones
      const mainMenuOptions = await lastValueFrom(
        this.store.pipe(select(selectMainMenuOptions), take(1)),
      );
      // DOCS: Devuelve las opciones del menú con la sección activa
      const finalMainMenuOptions = JSON.parse(JSON.stringify([...mainMenuOptions]));
      setActiveAMenuOption(finalMainMenuOptions);

      // DOCS: Guardamos el menu actualizado
      this.store.dispatch(SET_ACTIVE_A_MENU_OPTION({mainMenuOptions: finalMainMenuOptions}));

      // DOCS: Si es el primer nivel, abrimos el submenu en caso de que aplique
      /*      if (i === 0) {
        this.store.dispatch(SET_SUBMENU_IS_OPEN({isOpen: selectedSegmentMenuObject.showSubmenu}));
      }*/
    }
    return accessProcessed;
  }
}
