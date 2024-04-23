import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommercialTechnicalResearchComponent} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/commercial-technical-research/commercial-technical-research.component';
import {CommercialTechnicalResearchRoutingModule} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/commercial-technical-research/commercial-technical-research-routing.module';
import {PqfGenericInputFileModule} from '@appComponents/shared/pqf-generic-input-file/pqf-generic-input-file.module';
import {PqfGenericInputModule} from '@appComponents/shared/pqf-generic-input/pqf-generic-input.module';
import {PqfDropDownListModule} from '@appComponents/shared/pqf-drop-down-list/pqf-drop-down-list.module';
import {TranslateModule} from '@ngx-translate/core';
import {PqfCheckBoxModule} from '@appComponents/shared/pqf-check-box/pqf-check-box.module';
import {PqfRadioButtonModule} from '@appComponents/shared/pqf-radio-button/pqf-radio-button.module';
import {PqfDatePickerModule} from '@appComponents/shared/generic-date-picker/pqf-date-picker.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {RegulatoryResearchDetailsModule} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.module';

@NgModule({
  declarations: [CommercialTechnicalResearchComponent],
  imports: [
    CommonModule,
    CommercialTechnicalResearchRoutingModule,
    PqfGenericInputFileModule,
    PqfGenericInputModule,
    PqfDropDownListModule,
    TranslateModule,
    PqfCheckBoxModule,
    PqfRadioButtonModule,
    PqfDatePickerModule,
    DatePickerModule,
    GenericInputModule,
    GenericInputFileModule,
    RegulatoryResearchDetailsModule,
  ],
  exports: [CommercialTechnicalResearchComponent],
})
export class CommercialTechnicalResearchModule {}
