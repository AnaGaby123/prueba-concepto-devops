import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProviderContactPopComponent} from './provider-contact-pop.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ProviderContactPopComponent],
  imports: [
    CommonModule,
    PopUpGenericModule,
    GenericInputModule,
    CheckBoxModule,
    DropDownListModule,
    TranslateModule,
  ],
  exports: [ProviderContactPopComponent],
})
export class ProviderContactPopModule {}
