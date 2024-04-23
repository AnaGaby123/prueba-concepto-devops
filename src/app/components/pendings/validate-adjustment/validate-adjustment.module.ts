import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ValidateAdjustmentComponent} from './validate-adjustment.component';
import {ValidateAdjustmentRoutingModule} from '@appComponents/pendings/validate-adjustment/validate-adjustment-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {ValidateAdjustmentDashboardEffects} from '@appEffects/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard.effects';
import {ValidateAdjustmentDetailsEffects} from '@appEffects/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.effects';
import {TranslateModule} from '@ngx-translate/core';
import {ValidateAdjustmentMethodsEffects} from '@appEffects/pendings/validate-adjustment/validate-adjustment-methods.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [ValidateAdjustmentComponent],
  imports: [
    CommonModule,
    ValidateAdjustmentRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.validateAdjustment),
    ),
    EffectsModule.forFeature([
      ValidateAdjustmentDashboardEffects,
      ValidateAdjustmentDetailsEffects,
      ValidateAdjustmentMethodsEffects,
    ]),
    TranslateModule,
  ],
  exports: [ValidateAdjustmentComponent],
})
export class ValidateAdjustmentModule {}
