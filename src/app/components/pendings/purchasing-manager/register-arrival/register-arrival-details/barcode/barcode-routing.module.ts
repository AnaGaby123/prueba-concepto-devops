/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Components Imports */
import {BarcodeComponent} from '@purchasing-manager/register-arrival/register-arrival-details/barcode/barcode.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BarcodeComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class BarcodeRoutingModule {}
