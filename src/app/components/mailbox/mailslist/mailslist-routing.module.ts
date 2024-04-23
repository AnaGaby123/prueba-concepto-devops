import {NgModule} from '@angular/core';
import {MailslistComponent} from '@appComponents/mailbox/mailslist/mailslist.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MailslistComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MailslistRoutingModule {}
