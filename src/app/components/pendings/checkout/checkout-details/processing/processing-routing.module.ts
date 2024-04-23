import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProcessingComponent} from '@appComponents/pendings/checkout/checkout-details/processing/processing.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProcessingComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProcessingRoutingModule {}
