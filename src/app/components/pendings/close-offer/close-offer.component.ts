import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

// Models
import {ClientsListItemForCloseOffer} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';

// Actions
import * as closeOfferActions from '@appActions/pendings/close-offer/close-offer.actions';
import * as closeOfferDetailsActions from '@appActions/pendings/close-offer/close-offer-details/close-offer-details.actions';

// Selectors
import * as closeOfferDetailsSelectors from '@appSelectors/pendings/close-offer/close-offer-details/close-offer-details.selectors';
import * as closeOfferSelectors from '@appSelectors/pendings/close-offer/close-offer.selectors';

// Utils
import {Observable} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';
import {closeOfferListActions} from '@appActions/pendings/close-offer';

@Component({
  selector: 'app-close-offer',
  templateUrl: './close-offer.component.html',
  styleUrls: ['./close-offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseOfferComponent implements AfterContentChecked, OnDestroy {
  client$: Observable<ClientsListItemForCloseOffer> = this.store.select(
    closeOfferDetailsSelectors.selectClient,
  );
  isInDetailsView$: Observable<boolean> = this.store.select(
    closeOfferSelectors.selectIsInDetailsView,
  );
  isInReviewView$: Observable<boolean> = this.store.select(
    closeOfferDetailsSelectors.selectIsInResumeView,
  );
  title$: Observable<string> = this.store.select(closeOfferSelectors.selectTitle);

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  async goBack(): Promise<void> {
    this.store.dispatch(closeOfferDetailsActions.CLEAN_ALL_CLOSE_OFFER_DETAIL());
    this.store.dispatch(
      closeOfferActions.SET_IS_IN_DETAILS_VIEW({
        isInDetailsView: false,
      }),
    );
    this.store.dispatch(
      closeOfferActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: false,
      }),
    );
    await this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.closeOffer.closeOffer,
    ]);
  }

  ngOnDestroy(): void {
    this.store.dispatch(closeOfferListActions.CLEAN_ALL_CLOSE_OFFER_LIST());
  }
}
