import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from '@appComponents/pendings/imports/plan-dispatch/plan-dispatch-details/dashboard/dashboard-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule,
    LoadingModule,
    WithoutResultsModule,
    VirtualScrollerModule,
    DateFormatModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
