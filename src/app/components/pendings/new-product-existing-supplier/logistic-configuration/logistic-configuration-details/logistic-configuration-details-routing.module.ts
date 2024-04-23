import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LogisticConfigurationDetailsComponent} from '@appComponents/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration-details/logistic-configuration-details.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: LogisticConfigurationDetailsComponent}])],
  exports: [RouterModule],
})
export class LogisticConfigurationDetailsRoutingModule {}
