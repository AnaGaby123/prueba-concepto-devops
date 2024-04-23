import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrandsRoutingModule} from './brands-routing.module';
import {BrandsComponent} from '@appComponents/catalogos/brands/brands.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {BrandFormListEffects} from '@appEffects/forms/brand-form/brand-form-list/brand-form-list.effects';
import {BrandFormDetailsEffects} from '@appEffects/forms/brand-form/brand-form-details/brand-form-details.effects';
import {BrandFormListMethodsEffects} from '@appEffects/forms/brand-form/brand-form-list/brand-form-list-methods.effects';
import {BrandFormMethodsEffects} from '@appEffects/forms/brand-form/brand-form-methods.effects';
import {BrandFormDetailsMethodsEffects} from '@appEffects/forms/brand-form/brand-form-details/brand-form-details-methods.effects';
import {Action, StoreModule} from '@ngrx/store';
import {FORMS_FEATURE_KEY, FormsNodeKeys} from '@appUtil/common.protocols';
import {FormsState, getFormsReducers} from '@appModels/store/forms/forms.models';

@NgModule({
  declarations: [BrandsComponent],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    HeaderBarModule,
    StoreModule.forFeature(FORMS_FEATURE_KEY, (state: FormsState, action: Action) =>
      getFormsReducers(state, action, FormsNodeKeys.brandsForm),
    ),
    EffectsModule.forFeature([
      BrandFormMethodsEffects,
      BrandFormListEffects,
      BrandFormListMethodsEffects,
      BrandFormDetailsEffects,
      BrandFormDetailsMethodsEffects,
    ]),
  ],
  exports: [BrandsComponent],
})
export class BrandsModule {}
