// Core
import {Component, OnDestroy} from '@angular/core';

// Librerías
import {Observable, SubscriptionLike} from 'rxjs';

// Store
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {quotationDashboardActions, quotationDetailsActions} from '@appActions/quotation';
import {quotationDetailsSelectors, quotationSelectors} from '@appSelectors/quotation';
import {Location} from '@angular/common';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss'],
})
export class QuotationComponent implements OnDestroy {
  detailsMode$: Observable<boolean> = this.store.select(quotationSelectors.selectDetailsMode);
  hiddenBack$: Observable<boolean> = this.store.select(quotationSelectors.selectHiddeBack);
  nameClient$: Observable<string> = this.store.select(
    quotationDetailsSelectors.selectClientNameHeader,
  );
  title$: Observable<string> = this.store.select(quotationSelectors.selectTitle);
  private locationSub: SubscriptionLike;

  constructor(private store: Store<AppState>, private location: Location) {}

  ngOnInit(): void {
    this.locationSub = this.location.subscribe((event) => {
      if (event.url === '/protected/pendings/quoter/details/main') {
        this.returnMainPage();
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(quotationDetailsActions.RESTORE_INITIAL_STATE());
    this.locationSub?.unsubscribe();
  }

  returnMainPage(): void {
    this.store.dispatch(quotationDashboardActions.RETURN_MAIN_PAGE_QUOTATION_EFFECT());
  }
}
