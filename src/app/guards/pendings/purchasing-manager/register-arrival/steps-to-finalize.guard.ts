/* Core Imports */
import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';
import {AppState} from '@appCore/core.state';

/* Selectors Imports */
import {selectAllowedToSteps} from '@appSelectors/pendings/purchasing-manager/register-arrival/register-arrival-details/register-arrival-details.selectors';
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class StepsToFinalizeGuard implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const allowedToStepsComponent: boolean = await lastValueFrom(
      this.store.pipe(select(selectAllowedToSteps), take(1)),
    );

    if (!allowedToStepsComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.registerArrival.registerArrival,
        appRoutes.registerArrival.details,
        appRoutes.registerArrival.barcode,
      ]);
    }
    return allowedToStepsComponent;
  }
}
