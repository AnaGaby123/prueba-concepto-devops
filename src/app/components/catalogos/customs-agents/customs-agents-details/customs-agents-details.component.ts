/*CORE*/
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
/*MODELS*/
import {ITabOption} from '@appModels/botonera/botonera-option';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
/*ACTIONS*/
import {customAgentDetailsActions} from '@appActions/forms/custom-agent-form';
/*SELECTORS*/
import {
  customAgentsDetailsSelectors,
  customAgentsSelectors,
} from '@appSelectors/forms/custom-agents-form';
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';

@Component({
  selector: 'app-customs-agents-details',
  templateUrl: './customs-agents-details.component.html',
  styleUrls: ['./customs-agents-details.component.scss'],
})
export class CustomsAgentsDetailsComponent implements OnInit, OnDestroy {
  editMode$: Observable<boolean> = this.store.select(customAgentsSelectors.selectEditMode);
  enableEdit$: Observable<boolean> = this.store.select(customAgentsSelectors.selectEnableEdit);
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    customAgentsDetailsSelectors.selectTabOptions,
  );
  selectedTab$: Observable<ITabOption> = this.store.select(
    customAgentsDetailsSelectors.selectedTabOption,
  );
  activities$: Observable<Array<BarActivityOption>> = this.store.select(
    customAgentsDetailsSelectors.selectActivitiesOptions,
  );
  selectedActivity$: Observable<BarActivityOption> = this.store.select(
    customAgentsDetailsSelectors.selectedActivity,
  );
  nextStep$: Observable<boolean> = this.store.select(
    customAgentsDetailsSelectors.nexStepValidation,
  );
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);

  viewTypes = AppViewTypes;
  tabOption: ITabOption = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(customAgentDetailsActions.INIT_DETAILS_COMPONENT_EFFECT());
  }

  ngOnDestroy(): void {
    this.store.dispatch(customAgentDetailsActions.ON_DESTROY_DETAILS_COMPONENT_EFFECT());
  }

  changeTab(option: ITabOption): void {
    this.store.dispatch(customAgentDetailsActions.CHANGE_TAB_COMPONENT_EFFECT({option}));
    this.tabOption = option;
  }

  nextStep(step): void {
    this.store.dispatch(customAgentDetailsActions.NEXT_STEP_COMPONENT_EFFECT({step}));
  }
}
