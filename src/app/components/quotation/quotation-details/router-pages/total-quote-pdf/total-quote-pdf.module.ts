import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {TotalQuotePdfComponent} from '@appComponents/quotation/quotation-details/router-pages/total-quote-pdf/total-quote-pdf.component';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {TotalQuotePdfRoutingModule} from '@appComponents/quotation/quotation-details/router-pages/total-quote-pdf/total-quote-pdf-routing.module';
import {SendEmailDialogModule} from '@appComponents/shared/send-email-dialog/send-email-dialog.module';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';

@NgModule({
  declarations: [TotalQuotePdfComponent],
  imports: [
    CommonModule,
    TranslateModule,
    UploadViewFileModule,
    TotalQuotePdfRoutingModule,
    SendEmailDialogModule,
    LoadingModule,
    WithoutResultsModule,
  ],
  exports: [TotalQuotePdfComponent],
})
export class TotalQuotePdfModule {}
