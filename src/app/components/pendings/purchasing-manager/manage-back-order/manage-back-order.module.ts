import {NgModule} from '@angular/core';
import {ManageBackOrderComponent} from '@appComponents/pendings/purchasing-manager/manage-back-order/manage-back-order.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {ManageBackOrderRoutingModule} from '@appComponents/pendings/purchasing-manager/manage-back-order/manage-back-order-routing.module';
import {EffectsModule} from '@ngrx/effects';
import {ManageBackOrderListEffects} from '@appEffects/pendings/purchasing-manager/manage-back-order/manage-back-order-list/manage-back-order-list.effects';
import {ManageBackOrderDetailsEffects} from '@appEffects/pendings/purchasing-manager/manage-back-order/manage-back-order-details/manage-back-order-details.effects';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderBarModule,
    ManageBackOrderRoutingModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.purchasingManager),
    ),
    EffectsModule.forFeature([ManageBackOrderListEffects, ManageBackOrderDetailsEffects]),
    TranslateModule,
  ],
  exports: [ManageBackOrderComponent],
  declarations: [ManageBackOrderComponent],
})
export class ManageBackOrderModule {}
