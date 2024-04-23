import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientContractFamiliesComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/client-contract-families.component';
import {TranslateModule} from '@ngx-translate/core';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {CardModule} from '@appComponents/shared/card/card.module';
import {TabsModule} from '@appComponents/shared/tabs/tabs.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {AlertModule} from '@appComponents/shared/alert/alert.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {ClientLogisticTimesModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/Shared/client-logistic-times/client-logistic-times.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {EffectsModule} from '@ngrx/effects';
import {ClientContractFamiliesEffects} from '@appEffects/forms/client-form/clients-details-form/contracts/client-contract-families.effects';
import {OptionsBarModule} from '@appComponents/shared/options-bar/options-bar.module';
import {GeneralsModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/generals/generals.module';
import {ProviderPriceListModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/provider-price-list/provider-price-list.module';
import {CharacteristicGrouperModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/characteristic-grouper/characteristic-grouper.module';
import {ProductModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/product/product.module';
import {ContractConfigurationPopUpModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/contract-configuration-pop-up/contract-configuration-pop-up.module';
import {PqfCardModule} from '@appComponents/shared/pqf-card/pqf-card.module';

@NgModule({
  declarations: [ClientContractFamiliesComponent],
  imports: [
    CommonModule,
    TranslateModule,
    SearchModule,
    CardModule,
    TabsModule,
    VirtualScrollerModule,
    GenericInputModule,
    DragDropModule,
    ClientLogisticTimesModule,
    AlertModule,
    LoadingModule,
    WithoutResultsModule,
    PopUpGenericModule,
    DateFormatModule,
    RadioButtonModule,
    CheckBoxModule,
    GenericInputFileModule,
    DropDownListModule,
    GenericTextAreaModule,
    EffectsModule.forFeature([ClientContractFamiliesEffects]),
    OptionsBarModule,
    GeneralsModule,
    ProviderPriceListModule,
    CharacteristicGrouperModule,
    ProductModule,
    ContractConfigurationPopUpModule,
    PqfCardModule,
  ],
  exports: [ClientContractFamiliesComponent],
})
export class ClientContractFamiliesModule {}
