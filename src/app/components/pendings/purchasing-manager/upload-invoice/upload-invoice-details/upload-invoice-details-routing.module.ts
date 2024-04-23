import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UploadInvoiceDetailsComponent} from '@appComponents/pendings/purchasing-manager/upload-invoice/upload-invoice-details/upload-invoice-details.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: UploadInvoiceDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UploadInvoiceDetailsRoutingModule {}
