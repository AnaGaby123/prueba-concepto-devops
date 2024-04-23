import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewCustomerNoticeComponent} from '@appComponents/quotation/quotation-details/router-pages/new-customer-notice/new-customer-notice.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [NewCustomerNoticeComponent],
  imports: [CommonModule, TranslateModule],
  exports: [NewCustomerNoticeComponent],
})
export class NewCustomerNoticeModule {}
