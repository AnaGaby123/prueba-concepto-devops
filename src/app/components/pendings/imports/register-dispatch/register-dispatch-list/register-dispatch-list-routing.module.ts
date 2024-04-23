/* Core Imports */
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

/* Components Imports */
import {RegisterDispatchListComponent} from '@appComponents/pendings/imports/register-dispatch/register-dispatch-list/register-dispatch-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: RegisterDispatchListComponent}])],
  exports: [RouterModule],
})
export class RegisterDispatchListRoutingModule {}
