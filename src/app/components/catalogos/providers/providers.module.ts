import {NgModule} from '@angular/core';
import {ProvidersComponent} from '@appComponents/catalogos/providers/providers.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {ProvidersRoutingModule} from '@appComponents/catalogos/providers/providers-routing.module';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {ProviderMethodsEffects} from '@appEffects/forms/providers/provider-methods.effects';
import {Action, StoreModule} from '@ngrx/store';
import {FORMS_FEATURE_KEY, FormsNodeKeys} from '@appUtil/common.protocols';
import {FormsState, getFormsReducers} from '@appModels/store/forms/forms.models';

@NgModule({
  imports: [
    HeaderBarModule,
    ProvidersRoutingModule,
    CommonModule,
    StoreModule.forFeature(FORMS_FEATURE_KEY, (state: FormsState, action: Action) =>
      getFormsReducers(state, action, FormsNodeKeys.providersForm),
    ),
    EffectsModule.forFeature([ProviderMethodsEffects]),
  ],
  exports: [ProvidersComponent],
  declarations: [ProvidersComponent],
  providers: [],
})
export class ProvidersModule {}
