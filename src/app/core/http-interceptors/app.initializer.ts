import {AuthService} from '@appServices/auth/auth.service';
import {LocalStorageService} from '@appCore/local-storage/local-storage.service';
import {AUTH_KEY} from '@appUtil/common.protocols';
import {AppSettingsService} from '@appServices/configuracion/app-settings.service';
import {Store} from '@ngrx/store';
import {selectInitializationComplete} from '@appSelectors/settings/settings.selectors';
import {SET_INITIALIZATION_COMPLETE} from '@appActions/settings/settings.actions';

export function appInitializer(
  authService: AuthService,
  localStorageService: LocalStorageService,
  appSettingsService: AppSettingsService,
  store: Store,
) {
  return () =>
    new Promise<void>((resolve, reject) => {
      // DOCS: Indica a que ambiente se conectó la app
      appSettingsService.logCurrentServer();

      // DOCS: Obtiene el navegador utilizado
      appSettingsService.setCurrentBrowser();

      // DOCS: Cargar la verison del package.json
      appSettingsService.setVersionApp();

      // DOCS: Inicio la obtención de información sobre las funciones de los usuarios
      appSettingsService.setFunctionConfigObser().subscribe((success: boolean) => {
        if (!success) {
          reject();
        }
        const packUserSessionData: any = localStorageService.getItem(AUTH_KEY);
        if (packUserSessionData?.isAuthenticated && packUserSessionData?.token?.access_token) {
          // DOCS: Si existe la sesión, se actualiza el token
          authService.refreshTokenFromInit(packUserSessionData);
          store.select(selectInitializationComplete).subscribe((resp) => {
            if (resp) {
              resolve();
            }
          });
        } else {
          // DOCS: Si no existe la sesión continuo con el arranque de la app
          store.dispatch(SET_INITIALIZATION_COMPLETE());
          resolve();
        }
      });
    });
}
