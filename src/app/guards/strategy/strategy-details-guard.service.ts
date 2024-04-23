/* Core Imports */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

/* Models Imports */
import {AppState} from '@appCore/core.state';

/* Selectors Imports */
import {strategySelectors} from '@appSelectors/pendings';

/* Tools Imports */
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class StrategyDetailsGuardService {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isQuotationDetailsComponent: boolean = await lastValueFrom(
      this.store.pipe(select(strategySelectors.selectStrategyDetailsComponent), take(1)),
    );

    if (!isQuotationDetailsComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.strategy.strategy,
        appRoutes.strategy.list,
      ]);
    }
    return isQuotationDetailsComponent;
  }
}
