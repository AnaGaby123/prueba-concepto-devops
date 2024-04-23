/* Core Imports */
import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {lastValueFrom, Observable} from 'rxjs';
import {take} from 'rxjs/operators';

/* Actions Imports */
import {authLogout} from '@appActions/auth/auth.actions';

/* Selectors Imports */
import {selectUser} from '@appSelectors/auth/auth.selectors';
import {selectMenuIsOpen, selectViewType} from '@appSelectors/utils/utils.selectors';

/* Imports Models */
import {UserInfo} from '@appModels/auth/user-info.model';

/* Tools Imports */
import * as actionsUtils from '@appActions/utils/utils.action';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {AppState} from '@appCore/core.state';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {hamburgerAnimation} from '@appUtil/animations';

const FILE_NAME = 'header.component.ts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [hamburgerAnimation],
})
export class HeaderComponent {
  user$: Observable<UserInfo> = this.store.select(selectUser);
  menuIsOpen$: Observable<boolean> = this.store.select(selectMenuIsOpen);
  viewType$: Observable<string> = this.store.select(selectViewType);
  readonly viewTypes = AppViewTypes;

  constructor(private store: Store<AppState>, private logger: NGXLogger) {}

  closeSession(): void {
    this.logger.debug(servicesLogger.generateMessage(FILE_NAME, '@closeSession: start'));
    this.store.dispatch(authLogout());
  }

  async menuHandler(): Promise<void> {
    const isOpen = await lastValueFrom(this.store.pipe(select(selectMenuIsOpen), take(1)));
    this.store.dispatch(actionsUtils.SET_MENU_IS_OPEN({isOpen: !isOpen}));
  }
}
