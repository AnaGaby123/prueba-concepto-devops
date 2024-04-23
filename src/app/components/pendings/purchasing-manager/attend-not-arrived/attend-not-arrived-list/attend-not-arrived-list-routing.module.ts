import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AttendNotArriveListComponent} from '@purchasing-manager/attend-not-arrived/attend-not-arrived-list/attend-not-arrive-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AttendNotArriveListComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AttendNotArrivedListRoutingModule {}
