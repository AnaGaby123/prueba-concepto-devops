import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {PurchasePromiseListComponent} from '@appComponents/pendings/purchase-promise/purchase-promise-list/purchase-promise-list.component';
import {PurchasePromiseListRouting} from '@appComponents/pendings/purchase-promise/purchase-promise-list/purchase-promise-list-routing';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {DateFormatModule} from '@appPipes/date-format.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {EffectsModule} from '@ngrx/effects';
import {PurchasePromiseDetailsEffects} from '@appEffects/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.effects';

@NgModule({
  declarations: [PurchasePromiseListComponent],
  imports: [
    CommonModule,
    FormsModule,
    PurchasePromiseListRouting,
    HeaderBarModule,
    TranslateModule,
    TabsModule,
    HamburgerMenuModule,
    DateRangeModule,
    SearchModule,
    DoughnutChartModule,
    VirtualScrollerModule,
    DateFormatModule,
    WithoutResultsModule,
    LoadingModule,
    EffectsModule.forFeature([PurchasePromiseDetailsEffects]),
  ],
  exports: [PurchasePromiseListComponent],
})
export class PurchasePromiseListModule {}
