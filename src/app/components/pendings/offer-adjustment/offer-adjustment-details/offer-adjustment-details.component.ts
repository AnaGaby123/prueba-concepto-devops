/* Core Container */
import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';

/* Models Imports */
/* Actions Imports */
import {
  offerAdjustmentActions,
  offerAdjustmentDetailsActions,
  offerAdjustmentListActions,
} from '@appActions/pendings/offer-adjustment';

/* Tools Imports */
import {VIEW_IPAD, VIEW_MACBOOKAIR} from '@appUtil/common.protocols';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import {Observable} from 'rxjs';

/* Selectors imports */
import {
  adjustmentDetailsDetailsListOfferAdjustmentSelectors,
  adjustmentDetailsDetailsSelectors,
  adjustmentDetailsSelectors,
} from '@appSelectors/pendings/offer-adjustment';
import {selectViewType} from '@appSelectors/utils/utils.selectors';

@Component({
  selector: 'app-offer-adjustment-details',
  templateUrl: './offer-adjustment-details.component.html',
  styleUrls: ['./offer-adjustment-details.component.scss'],
})
export class OfferAdjustmentDetailsComponent implements OnDestroy {
  viewType$: Observable<string> = this.store.select(selectViewType);
  userName$: Observable<string> = this.store.select(
    adjustmentDetailsSelectors.selectNameUserSelected,
  );
  totalFacturado$: Observable<number> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectTotalFacturadoUSD,
  );
  quotationCurrency$: Observable<string> = this.store.select(
    adjustmentDetailsDetailsSelectors.selectedQuotationCurrency,
  );
  percentageBarAmountBilledVSAnnualSaleObjective$: Observable<number> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectPercentageBarAmountBilledVSAnnualSaleObjective,
  );
  objetivo$: Observable<number> = this.store.select(
    adjustmentDetailsDetailsListOfferAdjustmentSelectors.selectObjetivoFundamental,
  );
  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();
  requestIsOpen = true;
  viewType: string;
  viewIpad = VIEW_IPAD;
  viewMacBookAir = VIEW_MACBOOKAIR;

  constructor(private store: Store<AppState>, private route: Router, private logger: NGXLogger) {}

  ngOnDestroy(): void {
    this.store.dispatch(offerAdjustmentActions.SET_DETAILS_MODE({detailsMode: false}));
    this.store.dispatch(offerAdjustmentActions.SET_DETAILS_COMPONENT({detailsComponent: false}));
    this.store.dispatch(offerAdjustmentDetailsActions.CLEAN_ALL_OFFER_ADJUSTMENT_DETAILS());
    this.store.dispatch(offerAdjustmentListActions.CLEAN_ALL_OFFER_ADJUSTMENT_LIST());
    this.store.dispatch(offerAdjustmentListActions.CLEAN_USER_SELECTED());
  }
}
