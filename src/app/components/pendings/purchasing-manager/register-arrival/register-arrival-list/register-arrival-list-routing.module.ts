import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegisterArrivalListComponent} from '@appComponents/pendings/purchasing-manager/register-arrival/register-arrival-list/register-arrival-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: RegisterArrivalListComponent}])],
  exports: [RouterModule],
})
export class RegisterArrivalListRoutingModule {}
