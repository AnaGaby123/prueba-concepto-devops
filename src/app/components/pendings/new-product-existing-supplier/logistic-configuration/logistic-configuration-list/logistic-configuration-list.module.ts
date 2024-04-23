import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogisticConfigurationListComponent} from './logistic-configuration-list.component';
import {LogisticConfigurationListRoutingModule} from '@appComponents/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration-list/logistic-configuration-list-routing.module';
import {PqfSearchModule} from '@appComponents/shared/pqf-search/pqf-search.module';
import {LogisticConfigurationListItemModule} from '@appComponents/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration-list/logistic-configuration-list-item/logistic-configuration-list-item.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {PqfDashboardFiltersModule} from '@appComponents/shared/pqf-dashboard-filters/pqf-dashboard-filters.module';
import {LogisticConfigurationDetailsModule} from '@appComponents/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration-details/logistic-configuration-details.module';
import {PqfFilterOptionsModule} from '@appComponents/shared/pqf-filter-options/pqf-filter-options.module';
import {TranslateModule} from '@ngx-translate/core';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {PqfPopUpModule} from '@appComponents/shared/pqf-pop-up/pqf-pop-up.module';

@NgModule({
  declarations: [LogisticConfigurationListComponent],
  imports: [
    CommonModule,
    LogisticConfigurationListRoutingModule,
    PqfSearchModule,
    PqfDashboardFiltersModule,
    VirtualScrollerModule,
    LogisticConfigurationListItemModule,
    LogisticConfigurationDetailsModule,
    PqfFilterOptionsModule,
    TranslateModule,
    WithoutResultsModule,
    LoadingModule,
    PqfPopUpModule,
  ],
})
export class LogisticConfigurationListModule {}
