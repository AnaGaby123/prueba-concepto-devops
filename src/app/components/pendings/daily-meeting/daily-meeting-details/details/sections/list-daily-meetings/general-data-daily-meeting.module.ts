import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralDataDailyMeetingsComponent} from '@appComponents/pendings/daily-meeting/daily-meeting-details/details/sections/list-daily-meetings/general-data-daily-meeting.component';
import {OfferComponent} from '@appComponents/pendings/daily-meeting/daily-meeting-details/details/sections/list-daily-meetings/offer/offer.component';
import {RelationComponent} from '@appComponents/pendings/daily-meeting/daily-meeting-details/details/sections/list-daily-meetings/relation/relation.component';
import {ContactComponent} from '@appComponents/pendings/daily-meeting/daily-meeting-details/details/sections/list-daily-meetings/contact/contact.component';
import {SmartBusinessComponent} from '@appComponents/pendings/daily-meeting/daily-meeting-details/details/sections/list-daily-meetings/smart-business/smart-business.component';
import {GeneralDataDailyMeetingRoutingModule} from '@appComponents/pendings/daily-meeting/daily-meeting-details/details/sections/list-daily-meetings/general-data-daily-meeting-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CardModule} from '@appComponents/shared/card/card.module';
import {PercentageBarModule} from '@appComponents/shared/percentage-bar/percentage-bar.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {UnderConstructionModule} from '@appComponents/under-construction/under-construction.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {StrategyPopUpModule} from '@appComponents/shared/strategy-pop-up/strategy-pop-up.module';
import {DoughnutChartModule} from '@appComponents/shared/doughnut-chart/doughnut-chart.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {BarChartModule} from '@appComponents/shared/bar-chart/bar-chart.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {DropListFiltersModule} from '@appComponents/shared/drop-list-filters/drop-list-filters.module';
import {HeaderInternalSalesItemModule} from '@appComponents/shared/header-internal-sales-item/header-internal-sales-item.module';
import {InternalSalesItemModule} from '@appComponents/shared/item-quote/internal-sales-item.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';

@NgModule({
  declarations: [
    GeneralDataDailyMeetingsComponent,
    OfferComponent,
    RelationComponent,
    ContactComponent,
    SmartBusinessComponent,
  ],
  imports: [
    CommonModule,
    GeneralDataDailyMeetingRoutingModule,
    TranslateModule,
    CardModule,
    PercentageBarModule,
    TabsModule,
    UnderConstructionModule,
    SearchModule,
    VirtualScrollerModule,
    StrategyPopUpModule,
    DoughnutChartModule,
    HamburgerMenuModule,
    BarChartModule,
    WithoutResultsModule,
    LoadingModule,
    DateFormatModule,
    CustomPositionPopUpModule,
    DropListFiltersModule,
    HeaderInternalSalesItemModule,
    InternalSalesItemModule,
    PqfCardModule,
  ],
  exports: [GeneralDataDailyMeetingsComponent],
})
export class GeneralDataDailyMeetingModule {}
