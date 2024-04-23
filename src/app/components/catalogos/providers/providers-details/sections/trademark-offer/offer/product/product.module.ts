import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/product/product.component';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {DiscountFreightModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/discount-freight/discount-freight.module';
import {ExpensesModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/expenses/expenses.module';
import {FixedModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/fixed/fixed.module';
import {UtilityModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/utility/utility.module';
import {DeliveryRoutesModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/delivery-routes/delivery-routes.module';
import {ToggleSwitchModule} from '@appComponents/shared/toggle-switch/toggle-switch.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {ProductItemModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/product/product-item/product-item.module';
import {ProviderListPriceModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/provider-list-price/provider-list-price.module';
import {ImportModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/import/import.module';
import {CustomAgentCostModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/custom-agent-cost/custom-agent-cost.module';
import {IndicatorsModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/indicators/indicators.module';
import {LogisticsTimesModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/logistics-times/logistics-times.module';
import {OptionsBarModule} from '@appComponents/shared/options-bar/options-bar.module';
import {PerformanceModule} from '@appComponents/catalogos/providers/providers-details/sections/trademark-offer/offer/shared/performance/performance.module';

@NgModule({
  declarations: [ProductComponent],
  exports: [ProductComponent],
  imports: [
    CommonModule,
    TranslateModule,
    DropDownListModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    TabsModule,
    DiscountFreightModule,
    ExpensesModule,
    FixedModule,
    UtilityModule,
    DeliveryRoutesModule,
    ToggleSwitchModule,
    GenericInputModule,
    LoadingModule,
    ProductItemModule,
    ProviderListPriceModule,
    ImportModule,
    CustomAgentCostModule,
    IndicatorsModule,
    LogisticsTimesModule,
    OptionsBarModule,
    PerformanceModule,
  ],
})
export class ProductModule {}
