import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralsComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/generals/generals.component';
import {OptionsBarModule} from '@appComponents/shared/options-bar/options-bar.module';
import {ProviderListPriceModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/provider-list-price/provider-list-price.module';
import {DiscountFreightModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/discount-freight/discount-freight.module';
import {ImportModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/import/import.module';
import {CustomAgentCostModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/custom-agent-cost/custom-agent-cost.module';
import {ExpensesModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/expenses/expenses.module';
import {FixedModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/fixed/fixed.module';
import {UtilityModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/utility/utility.module';
import {ClientLogisticTimesModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/client-logistic-times/client-logistic-times.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [GeneralsComponent],
  imports: [
    CommonModule,
    OptionsBarModule,
    ProviderListPriceModule,
    DiscountFreightModule,
    ImportModule,
    CustomAgentCostModule,
    ExpensesModule,
    FixedModule,
    UtilityModule,
    ClientLogisticTimesModule,
    TranslateModule,
  ],
  exports: [GeneralsComponent],
})
export class GeneralsModule {}
