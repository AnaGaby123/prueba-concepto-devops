import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UploadInvoiceComponent} from '@appComponents/pendings/purchasing-manager/upload-invoice/upload-invoice.component';
import {UploadInvoiceGuard} from '@appGuards/pendings/purchasing-manager/upload-invoice/upload-invoice.guard';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: appRoutes.empty,
        component: UploadInvoiceComponent,
        children: [
          {
            path: appRoutes.empty,
            redirectTo: appRoutes.uploadInvoice.list,
            pathMatch: 'full',
          },
          {
            path: appRoutes.uploadInvoice.list,
            loadChildren: () =>
              import('./upload-invoice-list/upload-invoice-list.module').then(
                (m) => m.UploadInvoiceListModule,
              ),
          },
          {
            path: appRoutes.uploadInvoice.details,
            loadChildren: () =>
              import('./upload-invoice-details/upload-invoice-details.module').then(
                (m) => m.UploadInvoiceDetailsModule,
              ),
            canLoad: [UploadInvoiceGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UploadInvoiceRoutingModule {}
