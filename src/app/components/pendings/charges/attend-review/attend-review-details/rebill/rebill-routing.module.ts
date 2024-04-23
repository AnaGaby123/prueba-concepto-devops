import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RebillComponent} from '@appComponents/pendings/charges/attend-review/attend-review-details/rebill/rebill.component';

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
