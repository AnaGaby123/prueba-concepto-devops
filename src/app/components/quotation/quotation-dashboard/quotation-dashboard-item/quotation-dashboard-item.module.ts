import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuotationDashboardItemComponent} from './quotation-dashboard-item.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [QuotationDashboardItemComponent],
  imports: [CommonModule, TranslateModule],
  exports: [QuotationDashboardItemComponent],
})
export class QuotationDashboardItemModule {}
