import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralsComponent} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/generals/generals.component';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {TranslateModule} from '@ngx-translate/core';
import {DiscountFreightModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/discount-freight/discount-freight.module';
import {ExpensesModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/expenses/expenses.module';
import {FixedModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/fixed/fixed.module';
import {UtilityModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/utility/utility.module';
import {DeliveryRoutesModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/delivery-routes/delivery-routes.module';
import {ToggleSwitchModule} from '@appComponents/shared/toggle-switch/toggle-switch.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {ProviderListPriceModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/provider-list-price/provider-list-price.module';
import {ImportModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/import/import.module';
import {CustomAgentCostModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/custom-agent-cost/custom-agent-cost.module';
import {LogisticsTimesModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/logistics-times/logistics-times.module';
import {IndicatorsModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/indicators/indicators.module';
import {OptionsBarModule} from '@appComponents/shared/options-bar/options-bar.module';
import {PerformanceModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/performance/performance.module';

@NgModule({
  declarations: [GeneralsComponent],
  exports: [GeneralsComponent],
  imports: [
    CommonModule,
    TabsModule,
    TranslateModule,
    ProviderListPriceModule,
    DiscountFreightModule,
    ImportModule,
    CustomAgentCostModule,
    ExpensesModule,
    FixedModule,
    UtilityModule,
    DeliveryRoutesModule,
    ToggleSwitchModule,
    GenericInputModule,
    DropDownListModule,
    LogisticsTimesModule,
    IndicatorsModule,
    OptionsBarModule,
    PerformanceModule,
  ],
})
export class GeneralsModule {}
