import {AppState} from '@appCore/core.state';
import {Component, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/*Selectors import*/
import {
  followPPromiseDetailsSelectors,
  followPPromiseSelectors,
} from '@appSelectors/pendings/follow-purchase-promise';
import {followPPromiseListActions} from '@appActions/pendings/follow-purchase-promise';

@Component({
  selector: 'app-follow-purchase-promise',
  templateUrl: './follow-purchase-promise.component.html',
  styleUrls: ['./follow-purchase-promise.component.scss'],
})
export class FollowPurchasePromiseComponent implements OnDestroy {
  clientName$: Observable<string> = this.store.select(
    followPPromiseDetailsSelectors.selectedClientName,
  );
  detailsMode$: Observable<boolean> = this.store.select(followPPromiseSelectors.selectIsDetails);
  title$: Observable<string> = this.store.select(followPPromiseSelectors.selectTitle);

  constructor(private store: Store<AppState>, private location: Location) {}

  handleGoBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.store.dispatch(followPPromiseListActions.SET_INITIAL_STATE());
  }
}
