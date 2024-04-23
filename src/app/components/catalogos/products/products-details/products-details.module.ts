import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductsDetailsRoutingModule} from './products-details-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {ProductsDetailsComponent} from '@appComponents/catalogos/products/products-details/products-details.component';
import {EffectsModule} from '@ngrx/effects';
import {ProductDetailsFormEffects} from '@appEffects/forms/product-form/product-details-form/product-details-form.effects';
import {TechnicalCommercialInvestigationModule} from '@appComponents/catalogos/products/products-details/technical-commercial-investigation/technical-commercial-investigation.module';
import {RegulationRestrictionNonTariffModule} from '@appComponents/catalogos/products/products-details/regulation-restriction-non-tariff/regulation-restriction-non-tariff.module';
import {LogisticModule} from '@appComponents/catalogos/products/products-details/logistic/logistic.module';
import {LinkAlternativeComplementaryModule} from '@appComponents/catalogos/products/products-details/link-alternative-complementary/link-alternative-complementary.module';
import {ProductDetailsFormMethodsEffects} from '@appEffects/forms/product-form/product-details-form/product-details-form-methods.effects';
import {ConfirmDialogModule} from '@appComponents/shared/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [ProductsDetailsComponent],
  imports: [
    CommonModule,
    ProductsDetailsRoutingModule,
    TranslateModule,
    TabsModule,
    PopUpGenericModule,
    EffectsModule.forFeature([ProductDetailsFormEffects, ProductDetailsFormMethodsEffects]),
    TechnicalCommercialInvestigationModule,
    RegulationRestrictionNonTariffModule,
    LogisticModule,
    LinkAlternativeComplementaryModule,
    ConfirmDialogModule,
  ],
  exports: [ProductsDetailsComponent],
})
export class ProductsDetailsModule {}
