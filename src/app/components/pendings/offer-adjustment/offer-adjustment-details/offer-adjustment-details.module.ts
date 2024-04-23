import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OfferAdjustmentDetailsComponent} from '@appComponents/pendings/offer-adjustment/offer-adjustment-details/offer-adjustment-details.component';
import {ListClientsComponent} from '@appComponents/pendings/offer-adjustment/offer-adjustment-details/list-clients/list-clients.component';
import {OfferAdjustmentDetailsRoutingModule} from '@appComponents/pendings/offer-adjustment/offer-adjustment-details/offer-adjustment-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {DailyMeetingDetailsModule} from '@appComponents/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.module';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {RouterModule} from '@angular/router';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {DropdownButtonModule} from '@appComponents/shared/dropdown-button/dropdown-button.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [OfferAdjustmentDetailsComponent, ListClientsComponent],
  imports: [
    CommonModule,
    OfferAdjustmentDetailsRoutingModule,
    TranslateModule,
    DailyMeetingDetailsModule,
    ProgressBarModule,
    DropDownListModule,
    RouterModule,
    TabsModule,
    DropdownButtonModule,
    SearchModule,
    HamburgerMenuModule,
    VirtualScrollerModule,
    LoadingModule,
    WithoutResultsModule,
    AccountingModule,
    DateFormatModule,
  ],
  exports: [OfferAdjustmentDetailsComponent],
})
export class OfferAdjustmentDetailsModule {}
