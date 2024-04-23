import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UploadReceiptComponent} from '@appComponents/pendings/imports-phs/upload-receipt/upload-receipt.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UploadReceiptComponent,
        children: [
          {path: '', redirectTo: appRoutes.uploadReceipt.list, pathMatch: 'full'},
          {
            path: appRoutes.uploadReceipt.list,
            loadChildren: () =>
              import('./upload-receipt-list/upload-receipt-list.module').then(
                (m) => m.UploadReceiptListModule,
              ),
          },
          {
            path: appRoutes.uploadReceipt.details,
            loadChildren: () =>
              import('./upload-receipt-details/upload-receipt-details.module').then(
                (m) => m.UploadReceiptDetailsModule,
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UploadReceiptRoutingModule {}
