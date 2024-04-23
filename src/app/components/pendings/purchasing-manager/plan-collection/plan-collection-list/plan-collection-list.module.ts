import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {FormsModule} from '@angular/forms';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {PlanCollectionListComponent} from '@purchasing-manager/plan-collection/plan-collection-list/plan-collection-list.component';
import {PlanCollectionListRoutingModule} from '@purchasing-manager/plan-collection/plan-collection-list/plan-collection-list-routing.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  imports: [
    CommonModule,
    BarChartModule,
    DateFormatModule,
    DoughnutChartModule,
    FormsModule,
    HamburgerMenuModule,
    LoadingModule,
    PlanCollectionListRoutingModule,
    SearchModule,
    TranslateModule,
    VirtualScrollerModule,
    WithoutResultsModule,
  ],
  exports: [PlanCollectionListComponent],
  declarations: [PlanCollectionListComponent],
})
export class PlanCollectionListModule {}
