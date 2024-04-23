import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogisticConfigurationDetailsComponent} from './logistic-configuration-details.component';
import {LogisticConfigurationDetailsRoutingModule} from '@appComponents/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration-details/logistic-configuration-details-routing.module';
import {LogisticConfigurationRoutesModule} from '@appComponents/pendings/new-product-existing-supplier/shared/logistic-configuration-routes/logistic-configuration-routes.module';
import {PqfPopUpModule} from '@appComponents/shared/pqf-pop-up/pqf-pop-up.module';
import {TranslateModule} from '@ngx-translate/core';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  declarations: [LogisticConfigurationDetailsComponent],
  imports: [
    CommonModule,
    LogisticConfigurationDetailsRoutingModule,
    LogisticConfigurationRoutesModule,
    PqfPopUpModule,
    TranslateModule,
    LoadingModule,
  ],
  exports: [LogisticConfigurationDetailsComponent],
})
export class LogisticConfigurationDetailsModule {}
