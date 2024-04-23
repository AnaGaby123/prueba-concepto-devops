import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerContactQuotesComponent} from '@appComponents/quotation/quotation-details/router-pages/customer-contact-quotes/customer-contact-quotes.component';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [CustomerContactQuotesComponent],
  imports: [CommonModule, GenericInputModule, DropDownListModule, CheckBoxModule, TranslateModule],
  exports: [CustomerContactQuotesComponent, CustomerContactQuotesComponent],
})
export class CustomerContactQuotesModule {}
