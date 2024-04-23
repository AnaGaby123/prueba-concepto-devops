import {NgModule} from '@angular/core';
import {UploadInvoiceComponent} from '@appComponents/pendings/purchasing-manager/upload-invoice/upload-invoice.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UploadInvoiceRoutingModule} from '@appComponents/pendings/purchasing-manager/upload-invoice/upload-invoice-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {UploadInvoiceListEffects} from '@appEffects/pendings/purchasing-manager/upload-invoice/upload-invoice-list/upload-invoice-list.effects';
import {UploadInvoiceDetailsEffects} from '@appEffects/pendings/purchasing-manager/upload-invoice/upload-invoice-details/upload-invoice-details.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UploadInvoiceRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.purchasingManager),
    ),
    EffectsModule.forFeature([UploadInvoiceListEffects, UploadInvoiceDetailsEffects]),
  ],
  exports: [UploadInvoiceComponent],
  declarations: [UploadInvoiceComponent],
})
export class UploadInvoiceModule {}
