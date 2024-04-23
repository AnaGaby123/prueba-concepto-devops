import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ListStrategiesComponent} from '@appComponents/pendings/strategy/strategy-details/details/sections/list-strategies/list-strategies.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ListStrategiesComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ListStrategiesRoutingModule {}
