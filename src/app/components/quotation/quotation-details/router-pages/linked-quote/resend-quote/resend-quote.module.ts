import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResendQuoteComponent} from '@appComponents/quotation/quotation-details/router-pages/linked-quote/resend-quote/resend-quote.component';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {DropListContactModule} from '@appComponents/shared/drop-list-contact/drop-list-contact.module';
import {MultipleEmailsInputModule} from '@appComponents/shared/multiple-emails-input/multiple-emails-input.module';
import {TranslateModule} from '@ngx-translate/core';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PopUpGenericModule,
    DropListContactModule,
    MultipleEmailsInputModule,
    TranslateModule,
    GenericTextAreaModule,
    FormsModule,
  ],
  exports: [ResendQuoteComponent],
  declarations: [ResendQuoteComponent],
})
export class ResendQuoteModule {}
