import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ResumeComponent} from '@appComponents/pendings/close-offer/close-offer-details/resume/resume.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ResumeComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ResumeRoutingModule {}
