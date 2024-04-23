import {NgModule} from '@angular/core';
import {AttendReviewComponent} from '@appComponents/pendings/charges/attend-review/attend-review.component';
import {CommonModule} from '@angular/common';
import {AttendReviewRoutingModule} from '@appComponents/pendings/charges/attend-review/attend-review-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {AttendReviewDetailsEffects} from '@appEffects/pendings/charges/attend-review/attend-review-details/attend-review-details.effects';
import {AttendReviewListEffects} from '@appEffects/pendings/charges/attend-review/attend-review-list/attend-review-list.effects';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  imports: [
    CommonModule,
    AttendReviewRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.charges),
    ),
    EffectsModule.forFeature([AttendReviewDetailsEffects, AttendReviewListEffects]),
    TranslateModule,
  ],
  exports: [AttendReviewComponent],
  declarations: [AttendReviewComponent],
})
export class AttendReviewModule {}
