import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DailyMeetingComponent} from '@appComponents/pendings/daily-meeting/daily-meeting.component';
import {DailyMeetingRoutingModule} from '@appComponents/pendings/daily-meeting/daily-meeting-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {DailyMeetingDashboardEffects} from '@appEffects/pendings/dailyMeeting/dailyMeeting-dashboard/daily-meeting-dashboard.effects';
import {DailyMeetingDetailsEffects} from '@appEffects/pendings/dailyMeeting/dailyMeeting-details/details/daily-meeting-details.effects';
import {DelinquentDailyMeetingEffects} from '@appEffects/pendings/dailyMeeting/dailyMeeting-details/details/offer/delinquent/delinquent.effects';
import {DeliveryDailyMeetingDetailsEffects} from '@appEffects/pendings/dailyMeeting/dailyMeeting-details/details/offer/delivery/delivery.effects';
import {TranslateModule} from '@ngx-translate/core';
import {DailyMeetingMethodsEffects} from '@appEffects/pendings/dailyMeeting/daily-meeting-methods.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [DailyMeetingComponent],
  imports: [
    CommonModule,
    DailyMeetingRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.dailyMeeting),
    ),
    EffectsModule.forFeature([
      DailyMeetingDashboardEffects,
      DailyMeetingDetailsEffects,
      DailyMeetingMethodsEffects,
      DelinquentDailyMeetingEffects,
      DeliveryDailyMeetingDetailsEffects,
    ]),
    TranslateModule,
  ],
  exports: [DailyMeetingComponent],
})
export class DailyMeetingModule {}
