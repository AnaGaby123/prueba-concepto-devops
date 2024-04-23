import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {
  selectIsInDetails,
  selectTitle,
} from '@appSelectors/forms/custom-agents-form/custom-agents-form.selectors';
import {Location} from '@angular/common';
import {
  customAgentsDetailsSelectors,
  customAgentsSelectors,
} from '@appSelectors/forms/custom-agents-form';
import {customAgentListActions} from '@appActions/forms/custom-agent-form';
import {appRoutes} from '@appHelpers/core/app-routes';
import {VAgenteAduanal} from 'api-catalogos';

@Component({
  selector: 'app-customs-agents',
  templateUrl: './customs-agents.component.html',
  styleUrls: ['./customs-agents.component.scss'],
})
export class CustomsAgentsComponent implements OnDestroy {
  title$: Observable<string> = this.store.select(selectTitle);
  editMode$: Observable<boolean> = this.store.select(customAgentsSelectors.selectEditMode);
  enableEdit$: Observable<boolean> = this.store.select(customAgentsSelectors.selectEnableEdit);
  isInDetails$: Observable<boolean> = this.store.select(selectIsInDetails);

  constructor(private router: Router, private store: Store<AppState>, private location: Location) {}

  customAgentSelected$: Observable<VAgenteAduanal> = this.store.select(
    customAgentsDetailsSelectors.selectCustomAgentSelectedList,
  );

  returnMainPage(): void {
    this.router.navigate([appRoutes.protected, appRoutes.catalogs.catalogs]);
  }

  ngOnDestroy(): void {
    this.store.dispatch(customAgentListActions.RESTORE_LIST_STATE());
  }

  goBack(): void {
    this.location.back();
  }
}
