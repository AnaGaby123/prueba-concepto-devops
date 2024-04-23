/* Core Imports */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

/* Module Imports */
import {CheckOcNotArrivedRoutingModule} from '@appComponents/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';

/* Component Imports */
import {CheckOcNotArrivedComponent} from '@appComponents/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived.component';
import {EffectsModule} from '@ngrx/effects';
import {CheckOcNotArrivedListEffects} from '@appEffects/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-list/check-oc-not-arrived-list.effects';
import {CheckOcNotArrivedDetailsEffects} from '@appEffects/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details.effects';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CheckOcNotArrivedRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.purchasingManager),
    ),
    EffectsModule.forFeature([CheckOcNotArrivedListEffects, CheckOcNotArrivedDetailsEffects]),
    TranslateModule,
  ],
  exports: [CheckOcNotArrivedComponent],
  declarations: [CheckOcNotArrivedComponent],
})
export class CheckOcNotArrivedModule {}
