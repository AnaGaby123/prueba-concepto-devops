import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {CoreModule} from '@appCore/core.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {CoreContainerModule} from '@appComponents/core-container/core-container.module';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import {environment} from '@env/environment';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    AppRoutingModule,
    CoreContainerModule,
    //DOCS: Se importa a este nivel debido a que los dialogs son insetados a nivel del <body>
    VirtualScrollerModule,
    // DOCS: Logger del sistema
    LoggerModule.forRoot({
      level: environment.production ? NgxLoggerLevel.OFF : NgxLoggerLevel.DEBUG,
      enableSourceMaps: true,
      // timestampFormat: 'full',
      colorScheme: ['purple', 'teal', 'gray', 'gray', 'red', 'red', 'red'],
    }),
    // DOCS: Manejar la inactividad del usuario
    NgIdleKeepaliveModule.forRoot(),
    // DOCS: SE COMENTÓ POR QUE SW NO ESTÁ FUNCIONANDO CORRECTAMENTE EN PROD
    /*    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),*/
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
