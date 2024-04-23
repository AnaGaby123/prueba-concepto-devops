import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GeneralDataComponent} from '@appComponents/catalogos/clients/clients-details/general-data/general-data.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: GeneralDataComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class GeneralDataRoutingModule {}
