import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {OfferAdjustmentRoutingModule} from '@appComponents/pendings/offer-adjustment/offer-adjustment-routing.module';
import {OfferAdjustmentComponent} from '@appComponents/pendings/offer-adjustment/offer-adjustment.component';
import {EffectsModule} from '@ngrx/effects';
import {OfferAdjustmenListEffects} from '@appEffects/pendings/offer-adjustment/offer-adjustmen-list/offer-adjustmen-list.effects';
import {ListOfferAdjustmentEffects} from '@appEffects/pendings/offer-adjustment/offer-adjustment-details/details/sections/list-offer-adjustment.effects';
import {ListClientsEffects} from '@appEffects/pendings/offer-adjustment/offer-adjustment-details/list-clients/list-clients.effects';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [OfferAdjustmentComponent],
  imports: [
    CommonModule,
    OfferAdjustmentRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.offerAdjustment),
    ),
    EffectsModule.forFeature([
      OfferAdjustmenListEffects,
      ListOfferAdjustmentEffects,
      ListClientsEffects,
    ]),
    TranslateModule,
  ],
  exports: [OfferAdjustmentComponent],
})
export class OfferAdjustmentModule {}
