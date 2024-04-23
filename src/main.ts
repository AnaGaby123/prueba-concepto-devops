import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from '@env/environment';

// TODO: DESCOMENTAR CUANDO SE IMPLEMENTE SW NUEVAMENTE
/*if (environment.production) {
  enableProdMode();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(`${environment.i18nPrefix}/ngsw-worker.js`)
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch((error) => {
        console.error('Error durante el registro del Service Worker:', error);
      });
  }
}*/

const providers = [{provide: 'AUTH_URL_SECURE', useValue: environment.serverUrl}];

platformBrowserDynamic(providers)
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
