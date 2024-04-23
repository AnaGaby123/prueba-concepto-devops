import {NgModule} from '@angular/core';
import {ProcessPurchaseComponent} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProcessPurchaseRoutingModule} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {TranslateModule} from '@ngx-translate/core';
import {EffectsModule} from '@ngrx/effects';
import {ProcessPurchaseListEffects} from '@appEffects/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list.effects';
import {ProcessPurchaseDetailsEffects} from '@appEffects/pendings/purchasing-manager/process-purchase/process-purchase-details/process-purchase-details.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProcessPurchaseRoutingModule,
    HeaderBarModule,
    TranslateModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.purchasingManager),
    ),
    EffectsModule.forFeature([ProcessPurchaseListEffects, ProcessPurchaseDetailsEffects]),
  ],
  exports: [ProcessPurchaseComponent],
  declarations: [ProcessPurchaseComponent],
})
export class ProcessPurchaseModule {}
