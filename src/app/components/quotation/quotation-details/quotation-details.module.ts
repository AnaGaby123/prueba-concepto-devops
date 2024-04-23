import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {TranslateModule} from '@ngx-translate/core';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {QuotationDetailsComponent} from '@appComponents/quotation/quotation-details/quotation-details.component';
import {QuotationDetailsRoutingModule} from '@appComponents/quotation/quotation-details/quotation-details-routing.module';
import {HeaderBarModule} from '@appComponents/shared/header-bar/header-bar.module';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {GenericTextAreaModule} from '@appComponents/shared/generic-text-area/generic-text-area.module';
import {TextFormatModule} from '@appPipes/text-format/text-format.module';
import {NewCustomerNoticeModule} from '@appComponents/quotation/quotation-details/router-pages/new-customer-notice/new-customer-notice.module';
import {ClientRequestPanelModule} from '@appComponents/quotation/quotation-details/client-request-panel/client-request-panel.module';
import {ClientInfoSideBarModule} from '@appComponents/quotation/quotation-details/client-info-side-bar/client-info-side-bar.module';
import {DraggableModalModule} from '@appComponents/shared/draggable-modal/draggable-modal.module';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {ResendQuoteModule} from '@appComponents/quotation/quotation-details/router-pages/linked-quote/resend-quote/resend-quote.module';

@NgModule({
  declarations: [QuotationDetailsComponent],
  imports: [
    CommonModule,
    CheckBoxModule,
    DropDownListModule,
    GenericInputModule,
    GenericTextAreaModule,
    HeaderBarModule,
    TranslateModule,
    WithoutResultsModule,
    QuotationDetailsRoutingModule,
    TextFormatModule,
    NewCustomerNoticeModule,
    ClientRequestPanelModule,
    ClientInfoSideBarModule,
    DraggableModalModule,
    UploadViewFileModule,
    ResendQuoteModule,
  ],
  exports: [QuotationDetailsComponent],
})
export class QuotationDetailsModule {}
