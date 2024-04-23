import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoicesComponent} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/execute-payment/invoices/invoices.component';
import {InvoicesRoutingModule} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/execute-payment/invoices/invoices-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {RadioButtonModule} from '@appComponents/shared/radio-button/radio-button.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [InvoicesComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    TranslateModule,
    VirtualScrollerModule,
    RadioButtonModule,
    DateFormatModule,
    FormsModule,
  ],
  exports: [InvoicesComponent],
})
export class InvoicesModule {}
