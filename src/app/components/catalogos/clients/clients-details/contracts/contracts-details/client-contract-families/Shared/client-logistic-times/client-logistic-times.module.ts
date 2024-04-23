import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientLogisticTimesComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/client-logistic-times/client-logistic-times.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ClientLogisticTimesComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ClientLogisticTimesComponent],
})
export class ClientLogisticTimesModule {}
