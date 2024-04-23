/* Core Imports */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

/* Models Imports */
import {AppState} from '@appCore/core.state';

/* Selectors Imports */
import {dailyMeetingSelectors} from '@appSelectors/pendings';

/* Tools Imports */
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class DailyMeetingDetailsGuardService {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isDailyMeetingDetailsComponent: boolean = await lastValueFrom(
      this.store.pipe(select(dailyMeetingSelectors.selectDailyMeetingDetailsComponent), take(1)),
    );

    if (!isDailyMeetingDetailsComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.dailyMeeting.dailyMeeting,
        appRoutes.dailyMeeting.list,
      ]);
    }
    return isDailyMeetingDetailsComponent;
  }
}
