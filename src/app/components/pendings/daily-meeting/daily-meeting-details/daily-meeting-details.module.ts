import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DailyMeetingDetailsComponent} from '@appComponents/pendings/daily-meeting/daily-meeting-details/daily-meeting-details.component';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {DailyMeetingDetailsRoutingModule} from '@appComponents/pendings/daily-meeting/daily-meeting-details/daily-meeting-details-routing.module';
import {DashboardClientsComponent} from '@appComponents/pendings/daily-meeting/daily-meeting-details/dashboard-clients/dashboard-clients.component';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {HamburgerMenuModule} from '@appComponents/shared/hamburger-menu/hamburger-menu.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {PercentageBarModule} from '@appComponents/shared/percentage-bar/percentage-bar.module';
import {ProgressBarModule} from '@appComponents/shared/progress-bar/progress-bar.module';
import {PercentageStarsComponent} from '@appComponents/shared/percentage-stars/percentage-stars.component';
import {DropdownButtonModule} from '@appComponents/shared/dropdown-button/dropdown-button.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {FormsModule} from '@angular/forms';
import {CustomPositionPopUpModule} from '@appComponents/shared/custom-position-pop-up/custom-position-pop-up.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';

@NgModule({
  declarations: [DailyMeetingDetailsComponent, DashboardClientsComponent, PercentageStarsComponent],
  imports: [
    CommonModule,
    DailyMeetingDetailsRoutingModule,
    SearchModule,
    VirtualScrollerModule,
    TranslateModule,
    RouterModule,
    TabsModule,
    HamburgerMenuModule,
    DropDownListModule,
    CheckBoxModule,
    RadioButtonModule,
    PercentageBarModule,
    ProgressBarModule,
    DropdownButtonModule,
    AccountingModule,
    LoadingModule,
    WithoutResultsModule,
    FormsModule,
    CustomPositionPopUpModule,
    DateFormatModule,
    GenericTextAreaModule,
  ],
  exports: [DailyMeetingDetailsComponent, PercentageStarsComponent],
})
export class DailyMeetingDetailsModule {}
