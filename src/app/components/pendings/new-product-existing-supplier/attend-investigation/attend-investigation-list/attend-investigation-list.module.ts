import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AttendInvestigationListRoutingModule} from './attend-investigation-list-routing.module';
import {AttendInvestigationListComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-list/attend-investigation-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {AttendInvestigationListEffects} from '@appEffects/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.effects';
import {EffectsModule} from '@ngrx/effects';
import {PqfCheckBoxModule} from '@appComponents/shared/pqf-check-box/pqf-check-box.module';
import {AttendInvestigationMethodsEffects} from '@appEffects/pendings/attend-investigation/attend-investigation-methods.effects';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [AttendInvestigationListComponent],
  imports: [
    CommonModule,
    AttendInvestigationListRoutingModule,
    TranslateModule,
    SearchModule,
    HamburgerMenuModule,
    TabsModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
    DoughnutChartModule,
    BarChartModule,
    EffectsModule.forFeature([AttendInvestigationListEffects, AttendInvestigationMethodsEffects]),
    PqfCheckBoxModule,
    DateFormatModule,
  ],
  exports: [AttendInvestigationListComponent],
})
export class AttendInvestigationListModule {}
