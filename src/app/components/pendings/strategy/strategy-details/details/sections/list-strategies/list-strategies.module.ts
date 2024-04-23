import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListStrategiesComponent} from '@appComponents/pendings/strategy/strategy-details/details/sections/list-strategies/list-strategies.component';
import {ListStrategiesRoutingModule} from '@appComponents/pendings/strategy/strategy-details/details/sections/list-strategies/list-strategies-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CardModule} from '@appComponents/shared/card/card.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {OfferComponent} from './offer/offer.component';
import {RelationComponent} from './relation/relation.component';
import {ContactComponent} from './contact/contact.component';
import {SmartBusinessComponent} from './smart-business/smart-business.component';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {UnderConstructionModule} from '@appComponents/under-construction/under-construction.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {PercentageBarModule} from '@appComponents/shared/percentage-bar/percentage-bar.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {StrategyPopUpModule} from '@appComponents/shared/strategy-pop-up/strategy-pop-up.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DailyMeetingDetailsModule} from '@appComponents/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DropListFiltersModule} from '@appComponents/shared/drop-list-filters/drop-list-filters.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';

@NgModule({
  declarations: [
    ListStrategiesComponent,
    OfferComponent,
    RelationComponent,
    ContactComponent,
    SmartBusinessComponent,
  ],
  imports: [
    CommonModule,
    ListStrategiesRoutingModule,
    TranslateModule,
    CardModule,
    TabsModule,
    SearchModule,
    UnderConstructionModule,
    VirtualScrollerModule,
    PercentageBarModule,
    DoughnutChartModule,
    HamburgerMenuModule,
    StrategyPopUpModule,
    BarChartModule,
    ProgressBarModule,
    DateFormatModule,
    DailyMeetingDetailsModule,
    LoadingModule,
    WithoutResultsModule,
    DropListFiltersModule,
    InternalSalesItemModule,
    HeaderInternalSalesItemModule,
    PqfCardModule,
    CustomPositionPopUpModule,
    PopUpGenericModule,
  ],
  exports: [ListStrategiesComponent],
})
export class ListStrategiesModule {}
