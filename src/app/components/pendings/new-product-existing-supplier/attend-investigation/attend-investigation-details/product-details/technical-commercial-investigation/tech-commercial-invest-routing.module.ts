import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TechCommercialInvestigationComponent} from '@appComponents/pendings/new-product-existing-supplier/attend-investigation/attend-investigation-details/product-details/technical-commercial-investigation/tech-commercial-investigation.component';

const routes: Routes = [
  {
    path: '',
    component: TechCommercialInvestigationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicalCommercialInvestigationRoutingModule {}
