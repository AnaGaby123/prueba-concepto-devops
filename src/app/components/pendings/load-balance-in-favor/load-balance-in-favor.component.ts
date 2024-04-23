/* Core Imports */
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

/* Selectors Imports */
import {confirmLoadBalanceInFavorSelectors} from '@appSelectors/pendings/load-balance-in-favor';

@Component({
  selector: 'app-load-balance-in-favor',
  templateUrl: './load-balance-in-favor.component.html',
  styleUrls: ['./load-balance-in-favor.component.scss'],
})
export class LoadBalanceInFavorComponent {
  title$: Observable<string> = this.store.select(confirmLoadBalanceInFavorSelectors.selectTitle);
  detailsMode$: Observable<boolean> = this.store.select(
    confirmLoadBalanceInFavorSelectors.selectIsInDetailsView,
  );

  constructor(private store: Store<AppState>) {}
}
