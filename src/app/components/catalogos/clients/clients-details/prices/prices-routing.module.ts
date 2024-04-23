import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PricesComponent} from '@appComponents/catalogos/clients/clients-details/prices/prices.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PricesComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PricesRoutingModule {}
