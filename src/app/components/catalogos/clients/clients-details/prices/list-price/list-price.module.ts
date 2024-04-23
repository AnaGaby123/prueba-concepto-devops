import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListPriceComponent} from '@appComponents/catalogos/clients/clients-details/prices/list-price/list-price.component';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {ToggleSwitchModule} from '@appComponents/shared/toggle-switch/toggle-switch.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {ProviderListPriceModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/provider-list-price/provider-list-price.module';
import {ImportModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/import/import.module';
import {ExpensesModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/expenses/expenses.module';
import {UtilityModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/utility/utility.module';
import {DiscountFreightModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/discount-freight/discount-freight.module';
import {CustomAgentCostModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/custom-agent-cost/custom-agent-cost.module';
import {FixedModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/fixed/fixed.module';
import {ClientLogisticsTimesModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/client-logistics-times/client-logistics-times.module';
import {ListPriceItemModule} from '@appComponents/catalogos/clients/clients-details/prices/list-price/list-price-item/list-price-item.module';
import {OptionsBarModule} from '@appComponents/shared/options-bar/options-bar.module';
import {SeeBreakdownModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/see-breakdown/see-breakdown.module';

@NgModule({
  declarations: [ListPriceComponent],
  exports: [ListPriceComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    TabsModule,
    ToggleSwitchModule,
    GenericInputModule,
    DropDownListModule,
    LoadingModule,
    ProviderListPriceModule,
    ImportModule,
    ExpensesModule,
    UtilityModule,
    DiscountFreightModule,
    CustomAgentCostModule,
    FixedModule,
    ClientLogisticsTimesModule,
    ListPriceItemModule,
    OptionsBarModule,
    SeeBreakdownModule,
  ],
})
export class ListPriceModule {}
