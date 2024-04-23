import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TotalQuotePdfComponent} from '@appComponents/quotation/quotation-details/router-pages/total-quote-pdf/total-quote-pdf.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: TotalQuotePdfComponent}])],
  exports: [RouterModule],
})
export class TotalQuotePdfRoutingModule {}
