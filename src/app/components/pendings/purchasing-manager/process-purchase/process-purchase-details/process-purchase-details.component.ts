/* Core Imports */
import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';

/* Actions Imports */
import {processPurchaseDetailsActions} from '@appActions/pendings/purchasing-manager/process-purchase';

@Component({
  selector: 'app-process-purchase-details',
  templateUrl: './process-purchase-details.component.html',
  styleUrls: ['./process-purchase-details.component.scss'],
})
export class ProcessPurchaseDetailsComponent implements OnDestroy {
  constructor(private store: Store) {}

  ngOnDestroy(): void {
    this.store.dispatch(processPurchaseDetailsActions.CLEAN_DATA());
  }
}
