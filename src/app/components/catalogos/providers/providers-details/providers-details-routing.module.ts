import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProvidersDetailsComponent} from '@appComponents/catalogos/providers/providers-details/providers-details.component';
import {AddEditProvidersGuardService} from '@appGuards/providers/add-edit-providers-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProvidersDetailsComponent,
        canActivate: [AddEditProvidersGuardService],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProvidersDetailsRoutingModule {}
