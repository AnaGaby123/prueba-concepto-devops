import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegulationRestrictionNonTariffComponent} from '@appComponents/catalogos/products/products-details/regulation-restriction-non-tariff/regulation-restriction-non-tariff.component';
import {RegulationRestrictionNonTariffRoutingModule} from '@appComponents/catalogos/products/products-details/regulation-restriction-non-tariff/regulation-restriction-non-tariff-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {LogisticModule} from '../logistic/logistic.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {EffectsModule} from '@ngrx/effects';
import {RegulationRestrictionNonTariffEffects} from '@appEffects/forms/product-form/product-details-form/restriction-non-tariff/regulaion-restriction-non-tariff.effects';
import {DateFormatModule} from '@appPipes/date-format.module';

@NgModule({
  declarations: [RegulationRestrictionNonTariffComponent],
  imports: [
    CommonModule,
    RegulationRestrictionNonTariffRoutingModule,
    TranslateModule,
    LogisticModule,
    DropDownListModule,
    GenericInputModule,
    GenericInputFileModule,
    DatePickerModule,
    EffectsModule.forFeature([RegulationRestrictionNonTariffEffects]),
    DateFormatModule,
  ],
  exports: [RegulationRestrictionNonTariffComponent],
})
export class RegulationRestrictionNonTariffModule {}
