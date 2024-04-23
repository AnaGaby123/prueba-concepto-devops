import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Step1Component} from '@appComponents/pendings/storer/inspector/inspector-details/steps/step1/step1.component';
import {Step1RoutingModule} from '@appComponents/pendings/storer/inspector/inspector-details/steps/step1/step1-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';

@NgModule({
  declarations: [Step1Component],
  imports: [
    CommonModule,
    Step1RoutingModule,
    TranslateModule,
    DropDownListModule,
    CheckBoxModule,
    GenericInputFileModule,
    GenericInputModule,
    DatePickerModule,
  ],
  exports: [Step1Component],
})
export class Step1Module {}
