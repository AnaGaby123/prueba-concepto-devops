import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GenerateComponent} from '@appComponents/pendings/purchasing-manager/process-purchase/process-purchase-details/details/generate/generate.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: GenerateComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class GenerateRoutingModule {}
