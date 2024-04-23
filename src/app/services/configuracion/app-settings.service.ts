import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {IMenuOption} from '@appModels/store/utils/utils.model';
import {SET_ACTIVE_A_MENU_OPTION, SET_APP_VERSION} from '@appActions/utils/utils.action';
import {SET_APPLICATION_CONFIGURATION, SET_BROWSER} from '@appActions/settings/settings.actions';
import {AppSettings} from '@appModels/store/settings/settings.model';
import {exhaustMap, of} from 'rxjs';
import * as packageJson from 'package.json';
import * as servicesLogger from '@appUtil/logger';
import {NGXLogger} from 'ngx-logger';
import {catchError, map} from 'rxjs/operators';
import {browserRegexFinder, Browsers} from '@appHelpers/shared/shared.helpers';
import {environment} from '@env/environment';

const FILE_NAME = 'app.settings.service';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>,
    private loggerService: NGXLogger,
  ) {}

  setFunctionConfigObser() {
    return of('').pipe(
      exhaustMap(() => {
        return this.httpClient.get<Array<IMenuOption>>('assets/functions_structure.json').pipe(
          map((config: Array<IMenuOption>) => {
            this.loggerService.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener las funciones y roles del sistema',
              ),
              config,
            );
            this.store.dispatch(SET_ACTIVE_A_MENU_OPTION({mainMenuOptions: config}));
            return config;
          }),
          catchError((error) => {
            this.loggerService.error(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener las funciones y roles del sistema',
              ),
              error.message,
            );
            return of(false);
          }),
        );
      }),
      exhaustMap(() => {
        return this.httpClient.get<AppSettings>('assets/app-settings.json').pipe(
          map((appSettings: AppSettings) => {
            this.loggerService.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_SUCCEEDED,
                'al obtener la configuración del sistema',
              ),
              appSettings,
            );
            this.store.dispatch(
              SET_APPLICATION_CONFIGURATION({
                appSettings,
              }),
            );
            return true;
          }),
          catchError((error) => {
            this.loggerService.error(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                'al obtener la configuración del sistema',
              ),
              error.message,
            );
            return of(false);
          }),
        );
      }),
    );
  }

  setVersionApp(): void {
    const packageVersion = JSON.stringify(packageJson);
    this.store.dispatch(SET_APP_VERSION({appVersion: JSON.parse(packageVersion)?.version}));
  }

  setCurrentBrowser(): void {
    const browserMatches: RegExpExecArray = browserRegexFinder.exec(navigator?.userAgent);
    const currentBrowser: Browsers = browserMatches ? Browsers[browserMatches[0]] : Browsers.Other;
    this.store.dispatch(SET_BROWSER({currentBrowser}));
  }

  logCurrentServer(): void {
    this.loggerService.debug(
      servicesLogger.generateMessage(FILE_NAME, servicesLogger.LOG_INFO, 'Conectado al server:'),
      environment.environmentServerName,
      environment.serverUrl,
    );
  }
}
