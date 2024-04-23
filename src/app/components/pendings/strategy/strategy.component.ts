/* Imports Core */
import {Component, OnDestroy} from '@angular/core';

import {Router} from '@angular/router';

/* Models Imports */
import {AppState} from '@appCore/core.state';

/* Actions Imports */
import {select, Store} from '@ngrx/store';
import {strategyActions, strategyDetailsActions} from '@appActions/pendings/strategy';

/* Selectors Imports */
import {strategyDetailsSelectors, strategySelectors} from '@appSelectors/pendings';

/* Imports Rxjs */
import {lastValueFrom, Observable} from 'rxjs';
import {take} from 'rxjs/operators';

/* Tools Imports  */
import {appRoutes} from '@appHelpers/core/app-routes';
import {CLEAN_ALL_STRATEGY} from '@appActions/pendings/strategy/strategy.actions';

@Component({
  selector: 'app-strategy',
  templateUrl: './strategy.component.html',
  styleUrls: ['./strategy.component.scss'],
})
export class StrategyComponent implements OnDestroy {
  detailsMode$: Observable<boolean> = this.store.select(strategySelectors.selectDetailsMode);
  nameClient$: Observable<string> = this.store.select(
    strategyDetailsSelectors.selectClientNameHeader,
  );
  title$: Observable<string> = this.store.select(strategySelectors.selectTitle);

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnDestroy(): void {
    this.store.dispatch(strategyActions.CLEAN_ALL_STRATEGY());
  }

  async returnMainPage(): Promise<void> {
    // this.store.dispatch(strategyDashboardtActions.SET_ACTIVE_CHART({active: true}));
    const detailsMode = await lastValueFrom(
      this.store.pipe(select(strategySelectors.selectDetailsMode), take(1)),
    );
    if (detailsMode) {
      this.store.dispatch(strategyActions.SET_DETAILS_MODE({detailsMode: false}));
    }
    this.store.dispatch(strategyDetailsActions.CLEAN_ALL_STRATEGY_DETAIL());
    this.store.dispatch(strategyDetailsActions.CLEAN_CLIENT_DATA());
    await this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.strategy.strategy,
    ]);
  }
}
