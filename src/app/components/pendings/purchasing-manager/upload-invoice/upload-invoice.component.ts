/*Core imports */
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

/*Selectors Imports */
import {uploadInvoiceSelectors} from '@appSelectors/pendings/purchasing-manager/upload-invoice';

/*Action imports */
import {uploadInvoiceActions} from '@appActions/pendings/purchasing-manager/upload-invoice';

import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.scss'],
})
export class UploadInvoiceComponent {
  isDetails$: Observable<boolean> = this.store.select(uploadInvoiceSelectors.selectIsDetails);
  title$: Observable<string> = this.store.select(uploadInvoiceSelectors.selectTitle);

  constructor(private store: Store, private route: Router) {}

  goBack(): void {
    this.store.dispatch(uploadInvoiceActions.SET_DETAILS_MODE({detailsMode: false}));
    this.store.dispatch(uploadInvoiceActions.SET_DETAILS_COMPONENT({detailsComponent: false}));
    this.store.dispatch(uploadInvoiceActions.CLEAN_ALL_DETAILS());
    this.route.navigate([
      appRoutes.pendings.pendings,
      appRoutes.protected,
      appRoutes.uploadInvoice.uploadInvoice,
      appRoutes.uploadInvoice.list,
    ]);
  }
}
