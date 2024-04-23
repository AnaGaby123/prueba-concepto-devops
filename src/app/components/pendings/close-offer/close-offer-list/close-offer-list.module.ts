import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CloseOfferListComponent} from './close-offer-list.component';
import {CloseOfferListRoutingModule} from '@appComponents/pendings/close-offer/close-offer-list/close-offer-list-routing.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {DateRangeModule} from '@appComponents/shared/date-range/date-range.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {TranslateModule} from '@ngx-translate/core';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {EffectsModule} from '@ngrx/effects';
import {CloseOfferDetailsEffects} from '@appEffects/pendings/close-offer/close-offer-details/close-offer-details.effects';

@NgModule({
  declarations: [CloseOfferListComponent],
  imports: [
    CommonModule,
    CloseOfferListRoutingModule,
    TabsModule,
    HamburgerMenuModule,
    DateRangeModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    DoughnutChartModule,
    BarChartModule,
    TranslateModule,
    LoadingModule,
    EffectsModule.forFeature([CloseOfferDetailsEffects]),
  ],
  exports: [CloseOfferListComponent],
})
export class CloseOfferListModule {}
