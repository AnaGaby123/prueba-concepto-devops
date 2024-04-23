import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ListProvidersComponent} from '@appComponents/catalogos/providers/list-providers/list-providers.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ListProvidersComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ListProvidersRoutingModule {}
