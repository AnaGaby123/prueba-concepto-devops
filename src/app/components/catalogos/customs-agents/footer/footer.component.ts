/* CORE */
import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
/* MODELS */
/* ACTIONS */
import {customAgentDetailsActions} from '@appActions/forms/custom-agent-form';
/* SELECTORS */
import {
  customAgentsDetailsSelectors,
  customAgentsSelectors,
} from '@appSelectors/forms/custom-agents-form';
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import {selectIsInDetails} from '@appSelectors/forms/custom-agents-form/custom-agents-form.selectors';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  editMode$: Observable<boolean> = this.store.select(customAgentsSelectors.selectEditMode);
  enableEdit$: Observable<boolean> = this.store.select(customAgentsSelectors.selectEnableEdit);
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);
  saveButton$: Observable<boolean> = this.store.select(
    customAgentsDetailsSelectors.saveButtonValidation,
  );
  isInDetails$: Observable<boolean> = this.store.select(selectIsInDetails);

  constructor(private store: Store<AppState>) {}

  handleAddOrEdit(mode: string): void {
    this.store.dispatch(customAgentDetailsActions.ADD_OR_EDIT_COMPONENT_EFFECT({mode}));
  }

  cancel(): void {
    this.store.dispatch(customAgentDetailsActions.CANCEL_COMPONENT_EFFECT());
  }

  saveData(): void {
    this.store.dispatch(customAgentDetailsActions.SAVE_DATA_COMPONENT_EFFECT());
  }
}
