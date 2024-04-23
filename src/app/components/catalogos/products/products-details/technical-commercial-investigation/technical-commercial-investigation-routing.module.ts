import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TechnicalCommercialInvestigationComponent} from '@appComponents/catalogos/products/products-details/technical-commercial-investigation/technical-commercial-investigation.component';

const routes: Routes = [
  {
    path: '',
    component: TechnicalCommercialInvestigationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicalCommercialInvestigationRoutingModule {}
