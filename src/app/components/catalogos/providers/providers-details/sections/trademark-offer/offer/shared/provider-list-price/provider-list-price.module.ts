import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProviderListPriceComponent} from './provider-list-price.component';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {PqfToggleSwitchModule} from '@appComponents/shared/pqf-toggle-switch/pqf-toggle-switch.module';
import {DropListContactModule} from '@appComponents/shared/drop-list-contact/drop-list-contact.module';

@NgModule({
  declarations: [ProviderListPriceComponent],
  imports: [
    CommonModule,
    GenericInputModule,
    CheckBoxModule,
    DropDownListModule,
    PqfToggleSwitchModule,
    DropListContactModule,
  ],
  exports: [ProviderListPriceComponent],
})
export class ProviderListPriceModule {}
