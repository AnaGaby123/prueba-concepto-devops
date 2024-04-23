import {NgModule} from '@angular/core';
import {PopUpSendEmailComponent} from '@appComponents/shared/pop-up-send-email/pop-up-send-email.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DropListContactModule} from '@appComponents/shared/drop-list-contact/drop-list-contact.module';
import {MultipleEmailsInputModule} from '@appComponents/shared/multiple-emails-input/multiple-emails-input.module';
import {TranslateModule} from '@ngx-translate/core';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    PopUpGenericModule,
    DropListContactModule,
    MultipleEmailsInputModule,
    TranslateModule,
    GenericTextAreaModule,
    GenericInputModule,
  ],
  exports: [PopUpSendEmailComponent],
  declarations: [PopUpSendEmailComponent],
})
export class PopUpSendEmailModule {}
