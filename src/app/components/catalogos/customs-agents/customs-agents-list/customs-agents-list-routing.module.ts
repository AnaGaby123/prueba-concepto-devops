import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CustomsAgentsListComponent} from '@appComponents/catalogos/customs-agents/customs-agents-list/customs-agents-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CustomsAgentsListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CustomsAgentsListRoutingModule {}
