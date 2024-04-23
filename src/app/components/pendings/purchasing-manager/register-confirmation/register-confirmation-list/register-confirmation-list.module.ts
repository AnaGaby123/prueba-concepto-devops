import {NgModule} from '@angular/core';
import {RegisterConfirmationListComponent} from '@appComponents/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RegisterConfirmationListRoutingModule} from '@appComponents/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegisterConfirmationListRoutingModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    DoughnutChartModule,
    BarChartModule,
    WithoutResultsModule,
    LoadingModule,
    DateFormatModule,
  ],
  exports: [RegisterConfirmationListComponent],
  declarations: [RegisterConfirmationListComponent],
})
export class RegisterConfirmationListModule {}
