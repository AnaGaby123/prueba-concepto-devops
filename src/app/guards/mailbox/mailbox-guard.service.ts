import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {selectLinkMailActivate} from '@appSelectors/mailbox/mailbox.selectors';
import {take} from 'rxjs/operators';
import {lastValueFrom} from 'rxjs';
import {appRoutes} from '@appHelpers/core/app-routes';

@Injectable({
  providedIn: 'root',
})
export class MailboxGuardService implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isMailboxLinkComponent: boolean = await lastValueFrom(
      this.store.pipe(select(selectLinkMailActivate), take(1)),
    );

    if (!isMailboxLinkComponent) {
      await this.router.navigate([
        appRoutes.protected,
        appRoutes.pendings.pendings,
        appRoutes.mails.mailbox,
        appRoutes.mails.mailsList,
      ]);
    }
    return isMailboxLinkComponent;
  }
}
