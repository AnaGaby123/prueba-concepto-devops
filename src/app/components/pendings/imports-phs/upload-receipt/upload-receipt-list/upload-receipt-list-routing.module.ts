import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UploadReceiptListComponent} from '@appComponents/pendings/imports-phs/upload-receipt/upload-receipt-list/upload-receipt-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: UploadReceiptListComponent}])],
  exports: [RouterModule],
})
export class UploadReceiptListRoutingModule {}
