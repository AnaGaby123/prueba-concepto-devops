import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {TranslateModule} from '@ngx-translate/core';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {FormsModule} from '@angular/forms';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {TechCommercialInvestComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details/tech-commercial-invest/tech-commercial-invest.component';
import {TechnicalCommercialInvestigationRoutingModule} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details/tech-commercial-invest/tech-commercial-invest-routing.module';

@NgModule({
  declarations: [TechCommercialInvestComponent],
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
    FormsModule,
    RadioButtonModule,
    DateFormatModule,
  ],
  exports: [TechCommercialInvestComponent],
})
export class TechCommercialInvestModule {}
