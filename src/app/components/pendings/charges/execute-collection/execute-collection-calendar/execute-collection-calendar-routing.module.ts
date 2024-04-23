/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Component Imports */
import {ExecuteCollectionCalendarComponent} from './execute-collection-calendar.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ExecuteCollectionCalendarComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ExecuteCollectionCalendarRoutingModule {}
