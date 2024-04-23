import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {inspectorActions, inspectorDetailsActions} from '@appActions/pendings/storer/inspector';
import {Observable} from 'rxjs';
import {inspectorDetailsSelectors} from '@appSelectors/pendings/storer/inspector';

import {OptionBar} from '@appModels/options-bar/options-bar';
import {Router} from '@angular/router';
import {appRoutes} from '@appHelpers/core/app-routes';

@Component({
  selector: 'app-inspector-details',
  templateUrl: './inspector-details.component.html',
  styleUrls: ['./inspector-details.component.scss'],
})
export class InspectorDetailsComponent implements OnInit, OnDestroy {
  stepOptions$: Observable<Array<OptionBar>> = this.store.select(
    inspectorDetailsSelectors.selectStepOption,
  );
  actualStep$: Observable<OptionBar> = this.store.select(inspectorDetailsSelectors.selectedStep);

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(inspectorActions.SET_IS_IN_DETAILS_VIEW({isInDetailsView: true}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(inspectorActions.SET_IS_IN_DETAILS_VIEW({isInDetailsView: false}));
    this.store.dispatch(inspectorActions.SET_ALLOWED_TO_DETAILS_VALUE({allowedToDetails: false}));
    this.store.dispatch(inspectorDetailsActions.RESTORE_DETAILS());
  }

  setStep(step: OptionBar): void {
    this.store.dispatch(inspectorDetailsActions.SET_STEP({step: step.number}));
    this.router.navigate([
      appRoutes.protected,
      appRoutes.pendings.pendings,
      appRoutes.inspector.inspector,
      appRoutes.inspector.details,
      appRoutes.inspector.steps,
      'step' + step.number,
    ]);
  }
}
