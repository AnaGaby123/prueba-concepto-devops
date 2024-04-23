import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ROUTE_EMPTY} from '@appUtil/common.protocols';
import {RegulationAndNonTariffRestrictionsComponent} from '@appComponents/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-details/regulation-and-non-tariff-restrictions/regulation-and-non-tariff-restrictions.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: ROUTE_EMPTY,
        component: RegulationAndNonTariffRestrictionsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RegulationAndNonTariffRestrictionsRoutingModule {}
