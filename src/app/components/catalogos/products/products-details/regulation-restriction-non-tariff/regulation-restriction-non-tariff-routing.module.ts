import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegulationRestrictionNonTariffComponent} from '@appComponents/catalogos/products/products-details/regulation-restriction-non-tariff/regulation-restriction-non-tariff.component';

const routes: Routes = [
  {
    path: '',
    component: RegulationRestrictionNonTariffComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegulationRestrictionNonTariffRoutingModule {}
