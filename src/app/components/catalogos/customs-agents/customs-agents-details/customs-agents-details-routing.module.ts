import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CustomsAgentsDetailsComponent} from '@appComponents/catalogos/customs-agents/customs-agents-details/customs-agents-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CustomsAgentsDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CustomsAgentsDetailsRoutingModule {}
