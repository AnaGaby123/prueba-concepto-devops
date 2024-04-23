import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TechCommercialInvestComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details/tech-commercial-invest/tech-commercial-invest.component';

const routes: Routes = [
  {
    path: '',
    component: TechCommercialInvestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicalCommercialInvestigationRoutingModule {}
