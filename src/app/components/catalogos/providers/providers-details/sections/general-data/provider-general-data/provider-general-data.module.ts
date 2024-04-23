import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProviderGeneralDataComponent} from './provider-general-data.component';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {TranslateModule} from '@ngx-translate/core';
import {DateFormatModule} from '@appPipes/date-format.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';

@NgModule({
  declarations: [ProviderGeneralDataComponent],
  exports: [ProviderGeneralDataComponent],
  imports: [
    CommonModule,
    GenericInputModule,
    CheckBoxModule,
    TranslateModule,
    DateFormatModule,
    DropDownListModule,
  ],
})
export class ProviderGeneralDataModule {}
