import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PricesComponent} from '@appComponents/catalogos/clients/clients-details/prices/prices.component';
import {PricesRoutingModule} from './prices-routing.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {CardModule} from '@appComponents/shared/card/card.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {PopUpConfiguracionModule} from '@appComponents/shared/pop-up-configuracion/pop-up-configuracion.module';
import {AlertModule} from '@appComponents/shared/alert/alert.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {PqfToggleSwitchModule} from '@appComponents/shared/pqf-toggle-switch/pqf-toggle-switch.module';
import {ProvidersPanelModule} from './providers-panel/providers-panel.module';
import {GeneralsModule} from '@appComponents/catalogos/clients/clients-details/prices/generals/generals.module';
import {ListPriceModule} from '@appComponents/catalogos/clients/clients-details/prices/list-price/list-price.module';
import {OfferClassificationModule} from '@appComponents/catalogos/clients/clients-details/prices/offer-classification/offer-classification.module';
import {ProductModule} from '@appComponents/catalogos/clients/clients-details/prices/product/product.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {EffectsModule} from '@ngrx/effects';
import {PricesClientsFormEffects} from '@appEffects/forms/client-form/clients-details-form/prices/prices-clients-form.effects';
import {PricesSavesEffects} from '@appEffects/forms/client-form/clients-details-form/prices/prices-saves.effects';
import {PricesClientsFormMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/prices/prices-methods/prices-clients-form-methods.effects';
import {PricesClientsFormSharedMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/prices/prices-methods/prices-clients-form-shared-methods.effects';
import {PricesClientsFormProvidersPanelMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/prices/prices-methods/prices-clients-form-providers-panel-methods.effects';
import {PricesClientsFormProductMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/prices/prices-methods/prices-clients-form-product-methods.effects';
import {PricesClientsFormOfferClassificationMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/prices/prices-methods/prices-clients-form-offer-classification-methods.effects';
import {PricesClientsFormListPriceMethodsEffects} from '@appEffects/forms/client-form/clients-details-form/prices/prices-methods/prices-clients-form-list-price-methods.effects';
import {SeeBreakdownModule} from '@appComponents/catalogos/clients/clients-details/prices/shared/see-breakdown/see-breakdown.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';
import {TemporalConfigurationDialogModule} from '@appComponents/catalogos/clients/clients-details/prices/temporal-configuration-dialog/temporal-configuration-dialog.module';
import {ConfirmDialogModule} from '@appComponents/shared/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [PricesComponent],
  imports: [
    CommonModule,
    PricesRoutingModule,
    SearchModule,
    VirtualScrollerModule,
    WithoutResultsModule,
    CardModule,
    TabsModule,
    PopUpConfiguracionModule,
    AlertModule,
    AccountingModule,
    TranslateModule,
    DropDownListModule,
    GenericInputModule,
    PqfToggleSwitchModule,
    ProvidersPanelModule,
    ListPriceModule,
    GeneralsModule,
    OfferClassificationModule,
    ProductModule,
    EffectsModule.forFeature([
      PricesClientsFormEffects,
      PricesSavesEffects,
      PricesClientsFormMethodsEffects,
      PricesClientsFormSharedMethodsEffects,
      PricesClientsFormProvidersPanelMethodsEffects,
      PricesClientsFormProductMethodsEffects,
      PricesClientsFormOfferClassificationMethodsEffects,
      PricesClientsFormListPriceMethodsEffects,
    ]),
    SeeBreakdownModule,
    PqfCardModule,
    TemporalConfigurationDialogModule,
    ConfirmDialogModule,
  ],
  exports: [PricesComponent],
})
export class PricesModule {}
