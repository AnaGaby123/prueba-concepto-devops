import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContractConfigurationPopUpComponent} from './contract-configuration-pop-up.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';

@NgModule({
  declarations: [ContractConfigurationPopUpComponent],
  imports: [
    CheckBoxModule,
    CommonModule,
    DateFormatModule,
    DropDownListModule,
    GenericInputFileModule,
    GenericInputModule,
    GenericTextAreaModule,
    PopUpGenericModule,
    RadioButtonModule,
    TranslateModule,
  ],
  exports: [ContractConfigurationPopUpComponent],
})
export class ContractConfigurationPopUpModule {}
