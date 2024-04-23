import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterProductComponent} from './register-product.component';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {GenericInputFileModule} from '@appComponents/shared/generic-input-file/generic-input-file.module';
import {EffectsModule} from '@ngrx/effects';
import {AttendInvestigationDetailsEffects} from '@appEffects/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.effects';

@NgModule({
  declarations: [RegisterProductComponent],
  imports: [
    CommonModule,
    RadioButtonModule,
    TranslateModule,
    DropDownListModule,
    GenericInputModule,
    DatePickerModule,
    GenericTextAreaModule,
    GenericInputFileModule,
    EffectsModule.forFeature([AttendInvestigationDetailsEffects]),
  ],
  exports: [RegisterProductComponent],
})
export class RegisterProductModule {}
