import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuotationNewComponent} from '@appComponents/pendings/close-offer/close-offer-details/general-data/quotation-new/quotation-new.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: QuotationNewComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class QuotationNewRoutingModule {}
