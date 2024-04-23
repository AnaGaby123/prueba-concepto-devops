import {NgModule} from '@angular/core';
import {FollowPurchasePromiseComponent} from '@appComponents/pendings/follow-purchase-promise/follow-purchase-promise.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FollowPurchasePromiseRoutingModule} from '@appComponents/pendings/follow-purchase-promise/follow-purchase-promise-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {FollowPurchasePromiseDetailsEffects} from '@appEffects/pendings/follow-purchase-promise/follow-purchase-promise-details/follow-purchase-promise-details.effects';
import {FollowPurchasePromiseListEffects} from '@appEffects/pendings/follow-purchase-promise/follow-purchase-promise-list/follow-purchase-promise-list.effects';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';
import {HistoryDialogModule} from '@appComponents/pendings/follow-purchase-promise/follow-purchase-promise-details/history-dialog/history-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FollowPurchasePromiseRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.followPurchasePromise),
    ),
    EffectsModule.forFeature([
      FollowPurchasePromiseListEffects,
      FollowPurchasePromiseDetailsEffects,
    ]),
    TranslateModule,
    HistoryDialogModule,
  ],
  exports: [FollowPurchasePromiseComponent],
  declarations: [FollowPurchasePromiseComponent],
})
export class FollowPurchasePromiseModule {}
