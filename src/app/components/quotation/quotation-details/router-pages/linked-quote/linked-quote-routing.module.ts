import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LinkedQuoteComponent} from '@appComponents/quotation/quotation-details/router-pages/linked-quote/linked-quote.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: LinkedQuoteComponent}])],
  exports: [RouterModule],
})
export class LinkedQuoteRoutingModule {}
