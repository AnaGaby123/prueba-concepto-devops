import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductDetailsInvestigationComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details-investigation/product-details-investigation.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProductDetailsInvestigationComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AttendInvestigationDetailsRoutingModule {}
