import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewCustomerQuotesComponent} from '@appComponents/quotation/quotation-details/router-pages/new-customer-quotes/new-customer-quotes.component';
import {GenericInputModule} from '@appComponents/shared/generic-input/generic-input.module';
import {DropDownListModule} from '@appComponents/shared/drop-down-list/drop-down-list.module';
import {CheckBoxModule} from '@appComponents/shared/check-box/check-box.module';
import {TranslateModule} from '@ngx-translate/core';
import {PopUpGenericModule} from '@appComponents/shared/pop-up-generic/pop-up-generic.module';
import {VirtualScrollerModule} from '@iharbeck/ngx-virtual-scroller';
import {NewCustomerQuotesRoutingModule} from '@appComponents/quotation/quotation-details/router-pages/new-customer-quotes/new-customer-quotes-routing.module';
import {ContactItemModule} from '@appComponents/shared/contact-item/contact-item.module';
import {DateFormatModule} from '@appPipes/date-format.module';
import {WithoutResultsModule} from '@appComponents/shared/without-results/without-results.module';
import {DropListModule} from '@appComponents/shared/drop-list/drop-list.module';
import {MapModule} from '@appComponents/shared/map/map.module';
import {SearchModule} from '@appComponents/shared/search/search.module';
import {AddContactDialogModule} from '@appComponents/quotation/quotation-details/router-pages/new-customer-quotes/add-contact-dialog/add-contact-dialog.module';

@NgModule({
  declarations: [NewCustomerQuotesComponent],
  imports: [
    DropListModule,
    CommonModule,
    GenericInputModule,
    DropDownListModule,
    CheckBoxModule,
    TranslateModule,
    NewCustomerQuotesRoutingModule,
    PopUpGenericModule,
    VirtualScrollerModule,
    ContactItemModule,
    DateFormatModule,
    WithoutResultsModule,
    MapModule,
    SearchModule,
    AddContactDialogModule,
  ],
  exports: [NewCustomerQuotesComponent],
})
export class NewCustomerQuotesModule {}
