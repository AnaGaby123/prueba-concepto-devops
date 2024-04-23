import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SendEmailDialogComponent} from './send-email-dialog.component';
import {TranslateModule} from '@ngx-translate/core';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {FormsModule} from '@angular/forms';
import {DropListContactModule} from '@appComponents/shared/drop-list-contact/drop-list-contact.module';
import {MultipleEmailsInputModule} from '@appComponents/shared/multiple-emails-input/multiple-emails-input.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';

@NgModule({
  declarations: [SendEmailDialogComponent],
  imports: [
    CommonModule,
    TranslateModule,
    PopUpGenericModule,
    FormsModule,
    DropListContactModule,
    MultipleEmailsInputModule,
    GenericTextAreaModule,
  ],
})
export class SendEmailDialogModule {}
