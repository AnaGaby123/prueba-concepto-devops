import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TechnicalCommercialInvestigationRoutingModule} from './technical-commercial-investigation-routing.module';
import {TechnicalCommercialInvestigationComponent} from '@appComponents/catalogos/products/products-details/technical-commercial-investigation/technical-commercial-investigation.component';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {TranslateModule} from '@ngx-translate/core';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {LogisticModule} from '@appComponents/catalogos/products/products-details/logistic/logistic.module';
import {FormsModule} from '@angular/forms';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {EffectsModule} from '@ngrx/effects';
import {TechnicalCommercialProductMethodsEffects} from '@appEffects/forms/product-form/product-details-form/technical-commercial/technical-commercial-product-methods.effects';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';

@NgModule({
  declarations: [TechnicalCommercialInvestigationComponent],
  imports: [
    CommonModule,
    TechnicalCommercialInvestigationRoutingModule,
    GenericInputModule,
    DropDownListModule,
    TranslateModule,
    DatePickerModule,
    GenericInputFileModule,
    GenericTextAreaModule,
    CheckBoxModule,
    WithoutResultsModule,
    LogisticModule,
    FormsModule,
    RadioButtonModule,
    DateFormatModule,
    EffectsModule.forFeature([TechnicalCommercialProductMethodsEffects]),
    PopUpGenericModule,
  ],
  exports: [TechnicalCommercialInvestigationComponent],
})
export class TechnicalCommercialInvestigationModule {}
