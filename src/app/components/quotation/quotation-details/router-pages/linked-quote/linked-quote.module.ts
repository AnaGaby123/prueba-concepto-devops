import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LinkedQuoteComponent} from '@appComponents/quotation/quotation-details/router-pages/linked-quote/linked-quote.component';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {LinkedQuoteRoutingModule} from '@appComponents/quotation/quotation-details/router-pages/linked-quote/linked-quote-routing.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {TranslateModule} from '@ngx-translate/core';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {DropListContactModule} from '@appComponents/shared/drop-list-contact/drop-list-contact.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {ResendQuoteModule} from '@appComponents/quotation/quotation-details/router-pages/linked-quote/resend-quote/resend-quote.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderBarModule,
    LinkedQuoteRoutingModule,
    UploadViewFileModule,
    TranslateModule,
    PopUpGenericModule,
    GenericTextAreaModule,
    DropListContactModule,
    GenericInputModule,
    ResendQuoteModule,
  ],
  declarations: [LinkedQuoteComponent],
  exports: [],
})
export class LinkedQuoteModule {}
