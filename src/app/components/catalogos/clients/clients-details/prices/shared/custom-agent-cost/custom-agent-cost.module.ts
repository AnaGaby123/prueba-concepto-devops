import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomAgentCostComponent} from './custom-agent-cost.component';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';

@NgModule({
  declarations: [CustomAgentCostComponent],
  imports: [
    CommonModule,
    TranslateModule,
    GenericInputModule,
    DropDownListModule,
    AccountingModule,
  ],
  exports: [CustomAgentCostComponent],
})
export class CustomAgentCostModule {}
