/* Core Imports */
import {NgModule} from '@angular/core';

/* Router Imports */
import {RouterModule} from '@angular/router';

/* Component Imports */
import {ExecutePaymentCalendarComponent} from './execute-payment-calendar.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ExecutePaymentCalendarComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ExecutePaymentCalendarRoutingModule {}
