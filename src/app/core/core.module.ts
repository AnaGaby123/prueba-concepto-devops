import {CommonModule} from '@angular/common';
import {APP_INITIALIZER, ErrorHandler, NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {environment} from '@env/environment';

import {metaReducers, reducers} from './core.state';

import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

/* All Imports Effects */
import {AuthEffects} from '@appEffects/auth/auth.effects';
import {UtilsEffects} from '@appEffects/utils/utils.effects';
import {CatalogosEffects} from '@appEffects/catalogos/catalogos.effects';
import {SettingsEffects} from '@appEffects/settings/settings.effects';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppErrorHandler} from './error-handler/app-error-handler.service';
import {CustomSerializer} from './router/custom-serializer';
import {LocalStorageService} from './local-storage/local-storage.service';
import {AuthService} from '@appServices/auth/auth.service';
import {appInitializer} from '@appCore/http-interceptors/app.initializer';
import {HttpAuthInterceptor} from './http-interceptors/http-auth.interceptor';
import {AppSettingsService} from '@appServices/configuracion/app-settings.service';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, `${environment.i18nPrefix}/assets/i18n/`, '.json');
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,
    FormsModule,

    // ngrx
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AuthEffects, UtilsEffects, CatalogosEffects, SettingsEffects]),
    // DOCS: Logger de redux ¿A partir de que ambiente es prod?
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'ProquifaNET',
          maxAge: 25,
          logOnly: environment.production,
        }),

    // 3rd party
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [],
  providers: [
    AppSettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService, LocalStorageService, AppSettingsService, Store],
    },
    {provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true},
    {provide: ErrorHandler, useClass: AppErrorHandler},
    {provide: RouterStateSerializer, useClass: CustomSerializer},
  ],
  exports: [
    // angular
    FormsModule,

    // 3rd party
    TranslateModule,
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
