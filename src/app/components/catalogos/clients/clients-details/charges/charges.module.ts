import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChargesComponent} from '@appComponents/catalogos/clients/clients-details/charges/charges.component';
import {ChargesRoutingModule} from './charges-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {DatePickerModule} from '@appComponents/shared/date-picker/date-picker.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {AlertModule} from '@appComponents/shared/alert/alert.module';
import {AccountingModule} from '@appPipes/accounting/accounting.module';
import {ChargesClientsFormEffects} from '@appEffects/forms/client-form/clients-details-form/charges/charges-clients-form.effects';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  declarations: [ChargesComponent],
  imports: [
    AccountingModule,
    AlertModule,
    ChargesRoutingModule,
    CheckBoxModule,
    CommonModule,
    DateFormatModule,
    DatePickerModule,
    DropDownListModule,
    GenericInputModule,
    RadioButtonModule,
    TranslateModule,
    EffectsModule.forFeature([ChargesClientsFormEffects]),
  ],
  exports: [ChargesComponent],
})
export class ChargesModule {}
