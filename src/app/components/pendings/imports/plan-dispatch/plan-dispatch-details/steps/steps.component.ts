/* Core Imports */
import {Component, OnDestroy} from '@angular/core';
import {AppState} from '@appCore/core.state';
import {select, Store} from '@ngrx/store';
import {lastValueFrom, Observable} from 'rxjs';
import {take} from 'rxjs/operators';

/* Selectors Imports */
import {planDispatchDetailsSelectors} from '@appSelectors/pendings/imports/plan-dispatch';
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';

/* Models Imports */
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';

/* Actions Imports */
import {planDispatchDetailsActions} from '@appActions/pendings/imports/plan-dispatch';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnDestroy {
  steps$: Observable<Array<BarActivityOption>> = this.store.select(
    planDispatchDetailsSelectors.selectSteps,
  );
  stepSelected$: Observable<number> = this.store.select(
    planDispatchDetailsSelectors.selectStepSelected,
  );
  stepsValidator$: Observable<boolean> = this.store.select(
    planDispatchDetailsSelectors.validatorForNextSteps,
  );
  stepSelectedName$: Observable<string> = this.store.select(
    planDispatchDetailsSelectors.selectCurrentStepName,
  );
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);
  popIsOpen = false;

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(planDispatchDetailsActions.CLEAN_ALL_DETAILS_STEPS_STATE());
  }

  async changeStep(selectedStep: number): Promise<void> {
    const actualStep = await lastValueFrom(
      this.store.pipe(select(planDispatchDetailsSelectors.selectStepSelected), take(1)),
    );
    if (actualStep === 2 && selectedStep === 3) {
      this.handleOpenPop();
    } else {
      this.store.dispatch(
        planDispatchDetailsActions.SET_STEP_SELECTED({
          selectedStep,
          direction: selectedStep > actualStep ? 'next' : 'previous',
        }),
      );
    }
  }

  handleOpenPop(): void {
    this.popIsOpen = !this.popIsOpen;
  }
}
