import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CharacteristicGrouperComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/characteristic-grouper/characteristic-grouper.component';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {TranslateModule} from '@ngx-translate/core';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {OptionsBarModule} from '@appComponents/shared/options-bar/options-bar.module';
import {ProviderListPriceModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/provider-list-price/provider-list-price.module';
import {DiscountFreightModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/discount-freight/discount-freight.module';
import {ImportModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/import/import.module';
import {CustomAgentCostModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/custom-agent-cost/custom-agent-cost.module';
import {ExpensesModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/expenses/expenses.module';
import {FixedModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/fixed/fixed.module';
import {UtilityModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/utility/utility.module';
import {ClientLogisticTimesModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/client-logistic-times/client-logistic-times.module';

@NgModule({
  declarations: [CharacteristicGrouperComponent],
  imports: [
    CommonModule,
    SearchModule,
    VirtualScrollerModule,
    TranslateModule,
    WithoutResultsModule,
    LoadingModule,
    OptionsBarModule,
    ProviderListPriceModule,
    DiscountFreightModule,
    ImportModule,
    CustomAgentCostModule,
    ExpensesModule,
    FixedModule,
    UtilityModule,
    ClientLogisticTimesModule,
  ],
  exports: [CharacteristicGrouperComponent],
})
export class CharacteristicGrouperModule {}
