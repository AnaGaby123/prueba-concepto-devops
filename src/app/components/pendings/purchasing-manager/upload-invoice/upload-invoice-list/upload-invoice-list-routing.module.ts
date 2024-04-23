import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UploadInvoiceListComponent} from '@appComponents/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: UploadInvoiceListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UploadInvoiceListRoutingModule {}
