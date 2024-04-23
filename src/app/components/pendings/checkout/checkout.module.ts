import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckoutRoutingModule} from '@appComponents/pendings/checkout/checkout-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {CheckoutComponent} from '@appComponents/pendings/checkout/checkout.component';
import {EffectsModule} from '@ngrx/effects';
import {CheckoutListEffects} from '@appEffects/pendings/checkout/checkout-list/checkout-list.effects';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.checkout),
    ),
    EffectsModule.forFeature([CheckoutListEffects]),
    TranslateModule,
  ],
  exports: [CheckoutComponent],
})
export class CheckoutModule {}
