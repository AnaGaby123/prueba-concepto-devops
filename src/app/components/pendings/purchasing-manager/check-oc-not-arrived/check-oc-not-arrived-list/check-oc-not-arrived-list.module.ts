/* Core Imports */
import {NgModule} from '@angular/core';

/* Components Imports */
import {CheckOcNotArrivedListComponent} from '@appComponents/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-list/check-oc-not-arrived-list.component';

/* Module Imports */
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CheckOcNotArrivedListRoutingModule} from '@appComponents/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-list/check-oc-not-arrived-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CheckOcNotArrivedListRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    DoughnutChartModule,
    BarChartModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    LoadingModule,
    DateFormatModule,
  ],
  exports: [CheckOcNotArrivedListComponent],
  declarations: [CheckOcNotArrivedListComponent],
})
export class CheckOcNotArrivedListModule {}
