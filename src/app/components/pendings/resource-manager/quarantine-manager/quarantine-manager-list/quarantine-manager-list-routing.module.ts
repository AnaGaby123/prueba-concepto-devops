import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuarantineManagerListComponent} from '@appComponents/pendings/resource-manager/quarantine-manager/quarantine-manager-list/quarantine-manager-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: QuarantineManagerListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class QuarantineManagerListRoutingModule {}
