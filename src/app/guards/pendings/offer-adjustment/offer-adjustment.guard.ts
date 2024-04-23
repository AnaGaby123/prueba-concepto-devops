import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {take} from 'rxjs/operators';
import {selectDetailsMode} from '@appSelectors/pendings/offer-adjustment/offer-adjustment.selectors';
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class OfferAdjustmentGuard {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const allowedToDetailsComponent: boolean = await lastValueFrom(
      this.store.pipe(select(selectDetailsMode), take(1)),
    );

    if (!allowedToDetailsComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.offerAdjustment.offerAdjustment,
      ]);
    }
    return allowedToDetailsComponent;
  }
}
