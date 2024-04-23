import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {QuarantineManagerDetailsComponent} from '@appComponents/pendings/resource-manager/quarantine-manager/quarantine-manager-details/quarantine-manager-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: QuarantineManagerDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class QuarantineManagerDetailsRoutingModule {}
