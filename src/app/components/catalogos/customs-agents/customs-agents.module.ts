import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomsAgentsRoutingModule} from './customs-agents-routing.module';
import {CustomsAgentsComponent} from '@appComponents/catalogos/customs-agents/customs-agents.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {FooterModule} from '@appComponents/catalogos/customs-agents/footer/footer.module';
import {EffectsModule} from '@ngrx/effects';
import {CustomAgentMethodsEffects} from '@appEffects/forms/custom-agent-form/custom-agent-methods.effects';
import {CustomAgentDetailsFormEffects} from '@appEffects/forms/custom-agent-form/custom-agent-details-form/custom-agent-details-form.effects';
import {CustomAgentDetailsFormMethodsEffects} from '@appEffects/forms/custom-agent-form/custom-agent-details-form/custom-agent-details-form-methods.effects';
import {CustomAgentListFormEffects} from '@appEffects/forms/custom-agent-form/custom-agent-list-form/custom-agent-list-form.effects';
import {CustomAgentListFormMethodsEffects} from '@appEffects/forms/custom-agent-form/custom-agent-list-form/custom-agent-list-form-methods.effects';
import {Action, StoreModule} from '@ngrx/store';
import {FORMS_FEATURE_KEY, FormsNodeKeys} from '@appUtil/common.protocols';
import {FormsState, getFormsReducers} from '@appModels/store/forms/forms.models';

@NgModule({
  declarations: [CustomsAgentsComponent],
  imports: [
    CommonModule,
    CustomsAgentsRoutingModule,
    HeaderBarModule,
    FooterModule,
    StoreModule.forFeature(FORMS_FEATURE_KEY, (state: FormsState, action: Action) =>
      getFormsReducers(state, action, FormsNodeKeys.customsAgentsForm),
    ),
    EffectsModule.forFeature([
      CustomAgentDetailsFormEffects,
      CustomAgentDetailsFormMethodsEffects,
      CustomAgentListFormEffects,
      CustomAgentListFormMethodsEffects,
      CustomAgentMethodsEffects,
    ]),
  ],
  exports: [CustomsAgentsComponent],
})
export class CustomsAgentsModule {}
