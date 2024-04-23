import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PendingsHomeComponent} from '@appComponents/pendings/pendings-home/pendings-home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PendingsHomeComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PendingsHomeRoutingModule {}
