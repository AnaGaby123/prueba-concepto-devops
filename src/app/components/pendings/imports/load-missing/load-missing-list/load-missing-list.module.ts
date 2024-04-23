/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/* Modules Imports */
import {LoadMissingListRoutingModule} from '@appComponents/pendings/imports/load-missing/load-missing-list/load-missing-list-routing.module';

/* Components Imports */
import {LoadMissingListComponent} from '@appComponents/pendings/imports/load-missing/load-missing-list/load-missing-list.component';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    LoadMissingListRoutingModule,
    SearchModule,
    TranslateModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    DoughnutChartModule,
    LoadingModule,
  ],
  exports: [LoadMissingListComponent],
  declarations: [LoadMissingListComponent],
})
export class LoadMissingListModule {}
