import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadReceiptComponent} from '@appComponents/pendings/imports-phs/upload-receipt/upload-receipt.component';
import {FormsModule} from '@angular/forms';
import {UploadReceiptRoutingModule} from '@appComponents/pendings/imports-phs/upload-receipt/upload-receipt-routing.module';
import {UploadReceiptDetailsModule} from '@appComponents/pendings/imports-phs/upload-receipt/upload-receipt-details/upload-receipt-details.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UploadReceiptRoutingModule,
    UploadReceiptDetailsModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.importsPHS),
    ),
  ],
  exports: [UploadReceiptComponent],
  declarations: [UploadReceiptComponent],
})
export class UploadReceiptModule {}
