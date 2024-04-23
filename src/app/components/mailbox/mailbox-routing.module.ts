import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MailboxComponent} from '@appComponents/mailbox/mailbox.component';
import {appRoutes} from '@appHelpers/core/app-routes';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MailboxComponent,
        children: [
          {
            path: '',
            redirectTo: appRoutes.mails.mailsList,
            pathMatch: 'full',
          },
          {
            path: appRoutes.mails.mailsList,
            loadChildren: () =>
              import('./mailslist/mailslist.module').then((m) => m.MailslistModule),
          },
          {
            path: appRoutes.mails.linkMail,
            loadChildren: () => import('./linkmail/linkmail.module').then((m) => m.LinkmailModule),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MailboxRoutingModule {}
