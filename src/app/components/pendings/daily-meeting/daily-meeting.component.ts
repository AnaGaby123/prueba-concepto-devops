import {AppState} from '@appCore/core.state';
import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {lastValueFrom, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

/*Selectors imports*/
import {dailyMeetingSelectors} from '@appSelectors/pendings';

/*Actions imports */
import {dailyMeetingActions, dailyMeetingDetailsActions} from '@appActions/pendings/daily-meeting';

/*Utils imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-daily-meeting',
  templateUrl: './daily-meeting.component.html',
  styleUrls: ['./daily-meeting.component.scss'],
})
export class DailyMeetingComponent implements OnDestroy {
  title$: Observable<string> = this.store.select(dailyMeetingSelectors.selectTitle);
  detailsMode$: Observable<boolean> = this.store.select(dailyMeetingSelectors.selectDetailsMode);

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnDestroy(): void {
    this.store.dispatch(dailyMeetingActions.CLEAN_ALL_DAILY_MEETING());
  }

  async returnMainPage(): Promise<void> {
    const detailsMode = await lastValueFrom(
      this.store.pipe(select(dailyMeetingSelectors.selectDetailsMode), take(1)),
    );
    if (detailsMode) {
      this.store.dispatch(dailyMeetingActions.SET_DETAILS_MODE({detailsMode: false}));
      this.store.dispatch(dailyMeetingActions.SET_DETAILS_COMPONENT({detailsComponent: false}));
    }
    this.store.dispatch(dailyMeetingDetailsActions.CLEAN_ALL_DAILY_MEETING_DETAIL());
    await this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.dailyMeeting.dailyMeeting,
    ]);
  }
}
