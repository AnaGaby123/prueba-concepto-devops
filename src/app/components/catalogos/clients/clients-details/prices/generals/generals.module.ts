import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralsComponent} from '@appComponents/catalogos/clients/clients-details/prices/generals/generals.component';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {TranslateModule} from '@ngx-translate/core';
import {ToggleSwitchModule} from '@appComponents/shared/toggle-switch/toggle-switch.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {PqfToggleSwitchModule} from '@appComponents/shared/pqf-toggle-switch/pqf-toggle-switch.module';
import {ProviderListPriceModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/provider-list-price/provider-list-price.module';
import {DiscountFreightModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/discount-freight/discount-freight.module';
import {ImportModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/import/import.module';
import {CustomAgentCostModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/custom-agent-cost/custom-agent-cost.module';
import {ExpensesModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/expenses/expenses.module';
import {FixedModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/fixed/fixed.module';
import {UtilityModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/utility/utility.module';
import {ClientLogisticsTimesModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/client-logistics-times/client-logistics-times.module';
import {ClientPricesPanelModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/client-prices-panel/client-prices-panel.module';
import {OptionsBarModule} from '@appComponents/shared/options-bar/options-bar.module';
import {SeeBreakdownModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/see-breakdown/see-breakdown.module';

@NgModule({
  declarations: [GeneralsComponent],
  exports: [GeneralsComponent],
  imports: [
    CommonModule,
    TabsModule,
    TranslateModule,
    ToggleSwitchModule,
    GenericInputModule,
    DropDownListModule,
    PqfToggleSwitchModule,
    ProviderListPriceModule,
    DiscountFreightModule,
    ImportModule,
    CustomAgentCostModule,
    ExpensesModule,
    FixedModule,
    UtilityModule,
    ClientLogisticsTimesModule,
    ClientPricesPanelModule,
    OptionsBarModule,
    SeeBreakdownModule,
  ],
})
export class GeneralsModule {}
