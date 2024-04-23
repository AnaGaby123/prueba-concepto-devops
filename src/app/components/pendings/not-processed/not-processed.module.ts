import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotProcessedComponent} from './not-processed.component';
import {NotProcessedRoutingModule} from '@appComponents/pendings/not-processed/not-processed-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {NotProcessedDashboardEffects} from '@appEffects/pendings/not-processed/not-processed-dashboard/not-processed-dashboard.effects';
import {NotProcessedDetailsEffects} from '@appEffects/pendings/not-processed/not-processed-details/not-processed-details.effects';
import {TranslateModule} from '@ngx-translate/core';
import {AuthCodeDialogEffects} from '@appEffects/dialogs/auth-code/auth-code-dialog.effects';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [NotProcessedComponent],
  imports: [
    CommonModule,
    NotProcessedRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.notProcessed),
    ),
    EffectsModule.forFeature([
      NotProcessedDashboardEffects,
      NotProcessedDetailsEffects,
      AuthCodeDialogEffects,
    ]),
    TranslateModule,
  ],
  exports: [NotProcessedComponent],
})
export class NotProcessedModule {}
