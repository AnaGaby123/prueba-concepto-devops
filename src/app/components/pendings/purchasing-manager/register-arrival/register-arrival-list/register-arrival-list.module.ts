import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RegisterArrivalListRoutingModule} from '@appComponents/pendings/purchasing-manager/register-arrival/register-arrival-list/register-arrival-list-routing.module';
import {RegisterArrivalListComponent} from '@appComponents/pendings/purchasing-manager/register-arrival/register-arrival-list/register-arrival-list.component';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {TranslateModule} from '@ngx-translate/core';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegisterArrivalListRoutingModule,
    DoughnutChartModule,
    TranslateModule,
    HamburgerMenuModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    LoadingModule,
    DateFormatModule,
  ],
  exports: [RegisterArrivalListComponent],
  declarations: [RegisterArrivalListComponent],
})
export class RegisterArrivalListModule {}
