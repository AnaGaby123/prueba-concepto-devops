import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {lastValueFrom} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {quotationSelectors} from '@appSelectors/quotation';
import {take} from 'rxjs/operators';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class QuotationMainGuard implements CanActivateChild {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    const isQuotationDetailsComponent: boolean = await lastValueFrom(
      this.store.pipe(select(quotationSelectors.selectQuotationDetailsComponent), take(1)),
    );

    if (!isQuotationDetailsComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.quoter.quoter,
        appRoutes.quoter.dashboard,
      ]);
    }
    return isQuotationDetailsComponent;
  }
}
