import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuotationAdjustmentComponent} from '@appComponents/pendings/close-offer/close-offer-details/general-data/quotation-adjustment/quotation-adjustment.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: QuotationAdjustmentComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class QuotationAdjustmentRoutingModule {}
