import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomAgentCostComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/custom-agent-cost/custom-agent-cost.component';
import {TranslateModule} from '@ngx-translate/core';
import {AccountingModule} from '@appPipes/accounting/accounting.module';

@NgModule({
  declarations: [CustomAgentCostComponent],
  imports: [CommonModule, TranslateModule, AccountingModule],
  exports: [CustomAgentCostComponent],
})
export class CustomAgentCostModule {}
