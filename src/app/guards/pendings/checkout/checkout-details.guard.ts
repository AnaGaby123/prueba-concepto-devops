import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {take} from 'rxjs/operators';
import {selectCheckoutDetailsComponent} from '@appSelectors/pendings/checkout/checkout.selectors';
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class CheckoutDetailsGuard implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const allowedToDetailsComponent: boolean = await lastValueFrom(
      this.store.pipe(select(selectCheckoutDetailsComponent), take(1)),
    );

    if (!allowedToDetailsComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.checkout.checkout,
      ]);
    }
    return allowedToDetailsComponent;
  }
}