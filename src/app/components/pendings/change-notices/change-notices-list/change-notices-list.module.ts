import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangeNoticesListComponent} from './change-notices-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {ChangeNoticesListRoutingModule} from '@appComponents/pendings/change-notices/change-notices-list/change-notices-list-routing.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  declarations: [ChangeNoticesListComponent],
  imports: [
    CommonModule,
    ChangeNoticesListRoutingModule,
    TranslateModule,
    BarChartModule,
    DoughnutChartModule,
    VirtualScrollerModule,
    HamburgerMenuModule,
    SearchModule,
    TabsModule,
    WithoutResultsModule,
    LoadingModule,
  ],
})
export class ChangeNoticesListModule {}
