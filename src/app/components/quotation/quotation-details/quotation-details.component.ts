/* Core Imports */
import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';

/* Models Imports */
import {AppState} from '@appCore/core.state';

/* Actions Imports */
import {quotationActions, quotationDetailsActions} from '@appActions/quotation';

/* Selectors Imports */
import {quotationSelectors} from '@appSelectors/quotation';
import {Observable} from 'rxjs';

/* Dev Tools */
const FILE_NAME = 'quotations-center-sections.component.ts';

@Component({
  selector: 'app-quotation-details',
  templateUrl: './quotation-details.component.html',
  styleUrls: ['./quotation-details.component.scss'],
})
export class QuotationDetailsComponent implements OnDestroy {
  constructor(private store: Store<AppState>) {}

  navBarGeneralData$: Observable<boolean> = this.store.select(quotationSelectors.selectShowNavBar);
  newClientRegis$: Observable<boolean> = this.store.select(quotationSelectors.selectChangeTitle);
  requestIsOpen$: Observable<boolean> = this.store.select(
    quotationSelectors.selectNavBarRequestQuotation,
  );
  title$: Observable<string> = this.store.select(quotationSelectors.selectTitle);

  ngOnDestroy(): void {
    this.store.dispatch(quotationActions.SET_DETAILS_MODE({detailsMode: false}));
    this.store.dispatch(quotationDetailsActions.RESTORE_INITIAL_STATE());
  }

  handleEmit(): void {}
}
