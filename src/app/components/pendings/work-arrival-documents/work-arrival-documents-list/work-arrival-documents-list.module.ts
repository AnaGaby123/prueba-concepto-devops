import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkArrivalDocumentsListComponent} from './work-arrival-documents-list.component';
import {WorkArrivalDocumentsListRoutingModule} from '@appComponents/pendings/work-arrival-documents/work-arrival-documents-list/work-arrival-documents-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [WorkArrivalDocumentsListComponent],
  imports: [
    CommonModule,
    WorkArrivalDocumentsListRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    DoughnutChartModule,
    LoadingModule,
    DateFormatModule,
  ],
  exports: [WorkArrivalDocumentsListComponent],
})
export class WorkArrivalDocumentsListModule {}
