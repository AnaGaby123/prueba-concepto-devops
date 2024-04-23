import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NewCustomerQuotesComponent} from '@appComponents/quotation/quotation-details/router-pages/new-customer-quotes/new-customer-quotes.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: NewCustomerQuotesComponent}])],
  exports: [RouterModule],
})
export class NewCustomerQuotesRoutingModule {}
