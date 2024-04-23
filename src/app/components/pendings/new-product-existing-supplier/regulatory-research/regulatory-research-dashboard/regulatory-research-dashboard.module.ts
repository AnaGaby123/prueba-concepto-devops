import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegulatoryResearchDashboardComponent} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard.component';
import {RegulatoryResearchDashboardRoutingModule} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard-routing.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {TranslateModule} from '@ngx-translate/core';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {PqfDashboardFiltersModule} from '@appComponents/shared/pqf-dashboard-filters/pqf-dashboard-filters.module';
import {EffectsModule} from '@ngrx/effects';
import {RegulatoryResearchDashboardMethodsEffects} from '@appEffects/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard-methods.effects';
import {PqfFilterOptionsModule} from '@appComponents/shared/pqf-filter-options/pqf-filter-options.module';
import {PqfSearchModule} from '@appComponents/shared/pqf-search/pqf-search.module';
import {RegulatoryResearchDashboardEffects} from '@appEffects/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard.effects';
import {DateFormatModule} from '@appPipes/date-format.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {RegulatoryResearchDetailsMethodsEffects} from '@appEffects/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details-methods.effects';
import {RegulatoryResearchDetailsEffects} from '@appEffects/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.effects';

@NgModule({
  declarations: [RegulatoryResearchDashboardComponent],
  imports: [
    CommonModule,
    RegulatoryResearchDashboardRoutingModule,
    PqfSearchModule,
    PqfFilterOptionsModule,
    VirtualScrollerModule,
    TranslateModule,
    DoughnutChartModule,
    PqfDashboardFiltersModule,
    EffectsModule.forFeature([
      RegulatoryResearchDashboardMethodsEffects,
      RegulatoryResearchDashboardEffects,
      RegulatoryResearchDetailsMethodsEffects,
      RegulatoryResearchDetailsEffects,
    ]),
    DateFormatModule,
    LoadingModule,
    WithoutResultsModule,
  ],
  exports: [RegulatoryResearchDashboardComponent],
})
export class RegulatoryResearchDashboardModule {}
