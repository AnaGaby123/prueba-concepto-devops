import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RegisterConfirmationListComponent} from '@appComponents/pendings/purchasing-manager/register-confirmation/register-confirmation-list/register-confirmation-list.component';

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: RegisterConfirmationListComponent}])],
  exports: [RouterModule],
})
export class RegisterConfirmationListRoutingModule {}
