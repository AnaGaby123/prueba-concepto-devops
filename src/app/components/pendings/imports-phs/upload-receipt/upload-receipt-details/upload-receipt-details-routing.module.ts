/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Components Imports */
import {UploadReceiptDetailsComponent} from '@appComponents/pendings/imports-phs/upload-receipt/upload-receipt-details/upload-receipt-details.component';

/* Common Imports */
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: UploadReceiptDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UploadReceiptDetailsRoutingModule {}
