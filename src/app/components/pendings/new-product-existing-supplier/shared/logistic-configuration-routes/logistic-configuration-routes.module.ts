import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogisticConfigurationRoutesComponent} from './logistic-configuration-routes.component';
import {TranslateModule} from '@ngx-translate/core';
import {LogisticConfigurationRoutesTimesModule} from '@appComponents/pendings/new-product-existing-supplier/shared/logistic-configuration-routes/logistic-configuration-routes-times/logistic-configuration-routes-times.module';
import {PqfPopUpModule} from '@appComponents/shared/pqf-pop-up/pqf-pop-up.module';

@NgModule({
  declarations: [LogisticConfigurationRoutesComponent],
  imports: [CommonModule, TranslateModule, LogisticConfigurationRoutesTimesModule, PqfPopUpModule],
  exports: [LogisticConfigurationRoutesComponent],
})
export class LogisticConfigurationRoutesModule {}
