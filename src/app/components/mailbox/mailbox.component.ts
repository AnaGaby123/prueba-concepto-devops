/* Core Imports */
import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

/* Models Imports */
import {AppState} from '@appCore/core.state';

/* Store Imports */
import * as mailboxSelectors from '@appSelectors/mailbox/mailbox.selectors';
import {appRoutes} from '@appHelpers/core/app-routes';

import * as mailboxActions from '@appActions/mailbox/mailbox.actions';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss'],
})
export class MailboxComponent implements OnDestroy {
  title$: Observable<string> = this.store.select(mailboxSelectors.selectTitle);
  name$: Observable<string> = this.store.select(mailboxSelectors.selectName);
  linkMailActivate$: Observable<boolean> = this.store.select(
    mailboxSelectors.selectLinkMailActivate,
  );

  constructor(private store: Store<AppState>, private router: Router) {}

  async returnMainPage(): Promise<void> {
    await this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.mails.mailbox,
    ]);
  }

  ngOnDestroy() {
    this.store.dispatch(mailboxActions.CLEAN_STATE());
  }
}
