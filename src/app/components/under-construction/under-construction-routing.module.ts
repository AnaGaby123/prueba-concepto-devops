import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UnderConstructionComponent} from '@appComponents/under-construction/under-construction.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: UnderConstructionComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UnderConstructionRoutingModule {}
