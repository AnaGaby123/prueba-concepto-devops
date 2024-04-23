/* Core Imports */
import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {take} from 'rxjs/operators';

/* Selectors Imports */
import {selectAllowedToBarcode} from '@appSelectors/pendings/purchasing-manager/register-arrival/register-arrival-details/register-arrival-details.selectors';

/* Routes Imports */
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class BarcodeGuard implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const allowedToBarcodeComponent: boolean = await lastValueFrom(
      this.store.pipe(select(selectAllowedToBarcode), take(1)),
    );

    if (!allowedToBarcodeComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.registerArrival.registerArrival,
      ]);
    }
    return allowedToBarcodeComponent;
  }
}
