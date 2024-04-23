import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkNewContactAddPopUpComponent} from './link-new-contact-add-pop-up.component';
import {TranslateModule} from '@ngx-translate/core';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';

@NgModule({
  declarations: [LinkNewContactAddPopUpComponent],
  imports: [
    CommonModule,
    TranslateModule,
    GenericInputModule,
    DropDownListModule,
    CheckBoxModule,
    PopUpGenericModule,
  ],
  exports: [LinkNewContactAddPopUpComponent],
})
export class LinkNewContactAddPopUpModule {}
