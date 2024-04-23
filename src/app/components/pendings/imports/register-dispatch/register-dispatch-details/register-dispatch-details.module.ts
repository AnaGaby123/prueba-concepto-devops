import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterDispatchDetailsComponent} from './register-dispatch-details.component';
import {RegisterDispatchDetailsRoutingModule} from '@appComponents/pendings/imports/register-dispatch/register-dispatch-details/register-dispatch-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {TableModule} from '@appComponents/pendings/imports/register-dispatch/register-dispatch-details/table/table.module';
import {BarcodeModule} from '@appComponents/pendings/imports/register-dispatch/register-dispatch-details/barcode/barcode.module';
import {ConfigurationModule} from '@appComponents/pendings/imports/register-dispatch/register-dispatch-details/configuration/configuration.module';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [RegisterDispatchDetailsComponent],
  imports: [
    CommonModule,
    RegisterDispatchDetailsRoutingModule,
    TranslateModule,
    SearchModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
    TableModule,
    BarcodeModule,
    ConfigurationModule,
    DateFormatModule,
  ],
  exports: [RegisterDispatchDetailsComponent],
})
export class RegisterDispatchDetailsModule {}
