import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PurchasingConfigurationDetailsRoutingModule} from './purchasing-configuration-details-routing.module';
import {PurchasingConfigurationDetailsComponent} from '@appComponents/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details/purchasing-configuration-details.component';
import {PqfSearchModule} from '@appComponents/shared/pqf-search/pqf-search.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {PqfDashboardFiltersModule} from '@appComponents/shared/pqf-dashboard-filters/pqf-dashboard-filters.module';
import {PqfToggleModule} from '@appComponents/shared/pqf-toggle/pqf-toggle.module';
import {PqfGenericInputModule} from '@appComponents/shared/pqf-generic-input/pqf-generic-input.module';
import {PqfCheckBoxModule} from '@appComponents/shared/pqf-check-box/pqf-check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {PqfDropDownListModule} from '@appComponents/shared/pqf-drop-down-list/pqf-drop-down-list.module';
import {PqfTabOptionsModule} from '@appComponents/shared/pqf-tab-options/pqf-tab-options.module';
import {PqfFilterOptionsModule} from '@appComponents/shared/pqf-filter-options/pqf-filter-options.module';
import {EffectsModule} from '@ngrx/effects';
import {PurchasingConfigurationDetailsEffects} from '@appEffects/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details.effects';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {ProviderListPriceModule} from '@appComponents/pendings/new-product-existing-supplier/purchasing-configuration/shared/provider-list-price/provider-list-price.module';
import {DiscountFreightModule} from '@appComponents/pendings/new-product-existing-supplier/purchasing-configuration/shared/discount-freight/discount-freight.module';
import {ImportModule} from '@appComponents/pendings/new-product-existing-supplier/purchasing-configuration/shared/import/import.module';
import {CustomAgentsModule} from '@appComponents/pendings/new-product-existing-supplier/purchasing-configuration/shared/custom-agents/custom-agents.module';
import {ExpensesModule} from '@appComponents/pendings/new-product-existing-supplier/purchasing-configuration/shared/expenses/expenses.module';
import {PurchasingConfigurationDetailsSavesEffects} from '@appEffects/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details-saves.effects';
import {PqfGenericPopUpModule} from '@appComponents/shared/pqf-generic-pop-up/pqf-generic-pop-up.module';
import {PqfPopUpModule} from '@appComponents/shared/pqf-pop-up/pqf-pop-up.module';
import {PurchasingConfigurationDetailsMethodsEffects} from '@appEffects/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details-methods.effects';

@NgModule({
  declarations: [PurchasingConfigurationDetailsComponent],
  imports: [
    CommonModule,
    PurchasingConfigurationDetailsRoutingModule,
    PqfSearchModule,
    TranslateModule,
    VirtualScrollerModule,
    DateFormatModule,
    PqfDashboardFiltersModule,
    PqfToggleModule,
    PqfGenericInputModule,
    PqfCheckBoxModule,
    GenericInputModule,
    PqfDropDownListModule,
    PqfTabOptionsModule,
    PqfFilterOptionsModule,
    EffectsModule.forFeature([
      PurchasingConfigurationDetailsEffects,
      PurchasingConfigurationDetailsSavesEffects,
      PurchasingConfigurationDetailsMethodsEffects,
    ]),
    LoadingModule,
    WithoutResultsModule,
    ProviderListPriceModule,
    DiscountFreightModule,
    ImportModule,
    CustomAgentsModule,
    ExpensesModule,
    PqfGenericPopUpModule,
    PqfPopUpModule,
  ],
  exports: [PurchasingConfigurationDetailsComponent],
})
export class PurchasingConfigurationDetailsModule {}
