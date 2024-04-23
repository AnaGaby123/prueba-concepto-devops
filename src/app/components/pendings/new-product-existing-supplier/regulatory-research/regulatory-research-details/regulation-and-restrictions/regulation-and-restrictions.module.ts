import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegulationAndRestrictionsComponent} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulation-and-restrictions/regulation-and-restrictions.component';
import {RegulationAndRestrictionsRoutingModule} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulation-and-restrictions/regulation-and-restrictions-routing.module';
import {PqfDropDownListModule} from '../../../../../shared/pqf-drop-down-list/pqf-drop-down-list.module';
import {TranslateModule} from '@ngx-translate/core';
import {PqfGenericInputModule} from '../../../../../shared/pqf-generic-input/pqf-generic-input.module';
import {PqfGenericInputFileModule} from '@appComponents/shared/pqf-generic-input-file/pqf-generic-input-file.module';
import {RegulatoryResearchDetailsModule} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulatory-research-details.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {PqfDatePickerModule} from '@appComponents/shared/generic-date-picker/pqf-date-picker.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';

@NgModule({
  declarations: [RegulationAndRestrictionsComponent],
  imports: [
    CommonModule,
    RegulationAndRestrictionsRoutingModule,
    PqfDropDownListModule,
    TranslateModule,
    PqfGenericInputModule,
    PqfGenericInputFileModule,
    RegulatoryResearchDetailsModule,
    GenericInputModule,
    DatePickerModule,
    PqfDatePickerModule,
    GenericInputFileModule,
  ],
  exports: [RegulationAndRestrictionsComponent],
})
export class RegulationAndRestrictionsModule {}
