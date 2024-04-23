import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {StrategyDashboardComponent} from '@appComponents/pendings/strategy/strategy-dashboard/strategy-dashboard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StrategyDashboardComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class StrategyDashboardRoutingModule {}
