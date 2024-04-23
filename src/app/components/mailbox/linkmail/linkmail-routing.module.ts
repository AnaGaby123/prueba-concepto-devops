import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LinkmailComponent} from '@appComponents/mailbox/linkmail/linkmail.component';
import {MailboxGuardService} from '@appGuards/mailbox/mailbox-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LinkmailComponent,
        canActivate: [MailboxGuardService],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LinkmailRoutingModule {}
