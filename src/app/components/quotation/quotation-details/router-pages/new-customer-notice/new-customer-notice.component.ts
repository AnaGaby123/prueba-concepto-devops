/* Core Imports */
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Router} from '@angular/router';

/* Actions Imports */
import {quotationActions, quotationDashboardActions} from '@appActions/quotation';

/* Tools Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-new-customer-notice',
  templateUrl: './new-customer-notice.component.html',
  styleUrls: ['./new-customer-notice.component.scss'],
})
export class NewCustomerNoticeComponent {
  constructor(private router: Router, private store: Store<AppState>) {}

  direcToNewCustomer(): void {
    this.store.dispatch(quotationDashboardActions.SET_ACTIVE_CHART({active: false}));
    this.store.dispatch(quotationActions.SET_DETAILS_MODE({detailsMode: false}));
    this.store.dispatch(quotationActions.SET_DETAILS_COMPONENT({detailsComponent: false}));
    this.router
      .navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.quoter.quoter,
        appRoutes.quoter.details,
        appRoutes.quoter.newClient,
      ])
      .then(() => {
        this.store.dispatch(quotationActions.SHOW_NAV_BAR({isCustomerNew: false}));
        this.store.dispatch(quotationActions.SHOW_NAV_BAR_REQUEST({isRequestNew: false}));
      });
  }
}
