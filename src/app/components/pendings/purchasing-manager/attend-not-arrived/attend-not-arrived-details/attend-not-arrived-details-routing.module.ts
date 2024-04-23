import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AttendNotArrivedDetailsComponent} from '@purchasing-manager/attend-not-arrived/attend-not-arrived-details/attend-not-arrived-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AttendNotArrivedDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AttendNotArrivedDetailsRoutingModule {}
