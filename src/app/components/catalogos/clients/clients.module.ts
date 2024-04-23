import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsComponent} from '@appComponents/catalogos/clients/clients.component';
import {ClientsRoutingModule} from '@appComponents/catalogos/clients/clients-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {RouterModule} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {ClientListFormMethodsEffects} from '@appEffects/forms/client-form/clients-list-form/client-list-form-methods.effects';
import {ClientsListFormEffects} from '@appEffects/forms/client-form/clients-list-form/clients-list-form.effects';
import {Action, StoreModule} from '@ngrx/store';
import {FORMS_FEATURE_KEY, FormsNodeKeys} from '@appUtil/common.protocols';
import {FormsState, getFormsReducers} from '@appModels/store/forms/forms.models';

@NgModule({
  declarations: [ClientsComponent],
  imports: [
    ClientsRoutingModule,
    CommonModule,
    HeaderBarModule,
    RouterModule,
    StoreModule.forFeature(FORMS_FEATURE_KEY, (state: FormsState, action: Action) =>
      getFormsReducers(state, action, FormsNodeKeys.clientsForm),
    ),
    EffectsModule.forFeature([ClientListFormMethodsEffects, ClientsListFormEffects]),
  ],
  exports: [ClientsComponent],
})
export class ClientsModule {}
