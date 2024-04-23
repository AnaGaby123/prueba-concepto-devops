import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';

import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {take} from 'rxjs/operators';
import {selectIsDetails} from '@appSelectors/pendings/purchasing-manager/process-purchase/process-purchase.selectors';
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class ProcessPurchaseGuard implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const allowedToDetailsComponent: boolean = await lastValueFrom(
      this.store.pipe(select(selectIsDetails), take(1)),
    );

    if (!allowedToDetailsComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.processPurchase.orderPurchase,
      ]);
    }
    return allowedToDetailsComponent;
  }
}
