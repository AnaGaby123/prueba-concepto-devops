import {NgModule} from '@angular/core';
import {ProductsComponent} from '@appComponents/catalogos/products/products.component';
import {CommonModule} from '@angular/common';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {EffectsModule} from '@ngrx/effects';
import {ProductFormListEffects} from '@appEffects/forms/product-form/product-form-list/product-form-list.effects';
import {ProductsRoutingModule} from '@appComponents/catalogos/products/products-routing.module';
import {ProductsFormDetailsEffects} from '@appEffects/forms/product-form/product-details-form/technical-commercial/technical-commercial-product.effects';
import {ProductFormListMethodsEffects} from '@appEffects/forms/product-form/product-form-list/product-form-list-methods.effects';
import {Action, StoreModule} from '@ngrx/store';
import {FORMS_FEATURE_KEY, FormsNodeKeys} from '@appUtil/common.protocols';
import {FormsState, getFormsReducers} from '@appModels/store/forms/forms.models';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    HeaderBarModule,
    ProductsRoutingModule,
    StoreModule.forFeature(FORMS_FEATURE_KEY, (state: FormsState, action: Action) =>
      getFormsReducers(state, action, FormsNodeKeys.productsForm),
    ),
    EffectsModule.forFeature([
      ProductFormListEffects,
      ProductFormListMethodsEffects,
      ProductsFormDetailsEffects,
    ]),
  ],
  exports: [ProductsComponent],
})
export class ProductsModule {}
