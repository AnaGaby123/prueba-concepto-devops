import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ChargesComponent} from '@appComponents/catalogos/clients/clients-details/charges/charges.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ChargesComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ChargesRoutingModule {}
