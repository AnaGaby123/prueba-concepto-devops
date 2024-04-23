import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CloseOfferComponent} from './close-offer.component';
import {CloseOfferRoutingModule} from '@appComponents/pendings/close-offer/close-offer-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {CloseOfferEffects} from '@appEffects/pendings/close-offer/close-offer.effects';
import {CloseOfferListEffects} from '@appEffects/pendings/close-offer/close-offer-list/close-offer-list.effects';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [CloseOfferComponent],
  imports: [
    CommonModule,
    CloseOfferRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.closeOffer),
    ),
    EffectsModule.forFeature([CloseOfferEffects, CloseOfferListEffects]),
    TranslateModule,
  ],
  exports: [CloseOfferComponent],
})
export class CloseOfferModule {}
