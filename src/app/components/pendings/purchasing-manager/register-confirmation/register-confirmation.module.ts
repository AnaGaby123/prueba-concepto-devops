import {NgModule} from '@angular/core';
import {RegisterConfirmationComponent} from '@appComponents/pendings/purchasing-manager/register-confirmation/register-confirmation.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RegisterConfirmationRoutingModule} from '@appComponents/pendings/purchasing-manager/register-confirmation/register-confirmation-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {RegisterConfirmationListEffects} from '@appEffects/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.effects';
import {RegisterConfirmationDetailsEffects} from '@appEffects/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.effects';
import {TranslateModule} from '@ngx-translate/core';
import {Action, StoreModule} from '@ngrx/store';
import {PendingNodesKeys, PENDINGS_FEATURE_KEY} from '@appUtil/common.protocols';
import {getReducers} from '@appModels/store/pendings/pendings.models';

@NgModule({
  declarations: [RegisterConfirmationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RegisterConfirmationRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(PENDINGS_FEATURE_KEY, (state, action: Action) =>
      getReducers(state, action, PendingNodesKeys.purchasingManager),
    ),
    EffectsModule.forFeature([RegisterConfirmationListEffects, RegisterConfirmationDetailsEffects]),
    TranslateModule,
  ],
  exports: [RegisterConfirmationComponent],
})
export class RegisterConfirmationModule {}
