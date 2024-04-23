import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ContractsComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ContractsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ContractsRoutingModule {}
