import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SeeResumeComponent} from '@purchasing-manager/secure-shipment/secure-shipment-details/see-resume/see-resume.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SeeResumeComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SeeResumeRoutingModule {}
