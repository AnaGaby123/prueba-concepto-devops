import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProviderCommercialInfoComponent} from './provider-commercial-info.component';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';

@NgModule({
  declarations: [ProviderCommercialInfoComponent],
  exports: [ProviderCommercialInfoComponent],
  imports: [CommonModule, CheckBoxModule, GenericInputModule, TranslateModule, DropDownListModule],
})
export class ProviderCommercialInfoModule {}
