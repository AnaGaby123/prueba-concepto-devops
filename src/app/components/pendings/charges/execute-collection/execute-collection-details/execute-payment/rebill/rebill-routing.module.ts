import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RebillComponent} from '@appComponents/pendings/charges/execute-collection/execute-collection-details/execute-payment/rebill/rebill.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RebillComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class RebillRoutingModule {}
