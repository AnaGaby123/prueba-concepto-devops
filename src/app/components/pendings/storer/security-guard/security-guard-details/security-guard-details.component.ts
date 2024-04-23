import {select, Store} from '@ngrx/store';
import {isEmpty} from 'lodash-es';

import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';
import {lastValueFrom, Observable} from 'rxjs';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {
  securityGuardActions,
  securityGuardActionsDetails,
} from '@appActions/pendings/security-guard';
import {AppState} from '@appCore/core.state';
import {
  securityGuardDetailsSelectors,
  securityGuardSelectors,
} from '@appSelectors/pendings/security-guard';
import {selectActualStep} from '@appSelectors/pendings/security-guard/security-guard-details/security-guard-details.selectors';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-security-guard-details',
  templateUrl: './security-guard-details.component.html',
  styleUrls: ['./security-guard-details.component.scss'],
})
export class SecurityGuardDetailsComponent implements OnInit, OnDestroy {
  actualStep$: Observable<number> = this.store.select(selectActualStep);
  tabsStepsContainer$: Observable<Array<BarActivityOption>> = this.store.select(
    securityGuardDetailsSelectors.selectTabContainer,
  );
  step = 0;
  lodashIsEmpty = isEmpty;
  showingPopIncidence = false;
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  validatorArrow$: Observable<boolean> = this.store.select(
    securityGuardDetailsSelectors.validateNextStep,
  );
  validator$: Observable<boolean> = this.store.select(securityGuardDetailsSelectors.validatorStep2);
  incidenceMessage$: Observable<string> = this.store.select(
    securityGuardDetailsSelectors.selectIncidenceComment,
  );
  selectGuideLabel$: Observable<boolean> = this.store.select(
    securityGuardDetailsSelectors.selectGuideLabel,
  );
  selectGuideNumber$: Observable<string> = this.store.select(
    securityGuardDetailsSelectors.selectGuideNumber,
  );
  selectTotalGuides$: Observable<number> = this.store.select(
    securityGuardDetailsSelectors.selectTotalGuides,
  );
  errorPop$: Observable<boolean> = this.store.select(securityGuardDetailsSelectors.selectErrorPop);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(securityGuardActionsDetails.FETCH_INITIAL_VIEW());
  }

  ngOnDestroy(): void {
    this.store.dispatch(securityGuardActionsDetails.SET_INITIAL_STATE());
  }

  setStep(actualStep: number): void {
    this.store.dispatch(securityGuardActionsDetails.SET_ACTUAL_STEP({actualStep}));
  }

  saveVisit(event?: boolean) {
    if (event) {
      this.store.dispatch(securityGuardActionsDetails.SET_LOAD_INCIDENCE_IMAGE());
      this.showingPopIncidence = false;
    } else {
      this.store.dispatch(
        securityGuardActionsDetails.SET_COMMENT_GUIDE({
          comment: null,
          incidence: null,
        }),
      );
      this.showingPopIncidence = false;
    }
  }

  setComment(comment: string): void {
    this.store.dispatch(securityGuardActionsDetails.SET_COMMENT_GUIDE({comment, incidence: true}));
  }

  showIncidencePop(): void {
    this.showingPopIncidence = true;
  }

  async cancelPopEvent(event: boolean): Promise<void> {
    if (event) {
      const newVisitor: boolean = await lastValueFrom(
        this.store.pipe(select(securityGuardSelectors.newVisitant), take(1)),
      );
      if (!newVisitor) {
        this.store.dispatch(securityGuardActionsDetails.SET_RELOAD_BACKUP_VISITOR_SELECTED());
      }
      this.store.dispatch(securityGuardActions.SET_NEW_CONTACT({newContact: false}));
      this.store.dispatch(securityGuardActionsDetails.SET_RELOAD_IMAGE_VISITOR());
      this.store.dispatch(securityGuardActions.SET_EDIT_MODE({editMode: false}));
      this.store.dispatch(securityGuardActionsDetails.CLEAN_FIELDS_VISITOR());
      this.store.dispatch(securityGuardActionsDetails.SET_ERROR_POP({value: false}));
    } else {
      this.store.dispatch(securityGuardActionsDetails.SET_ERROR_POP({value: false}));
    }
  }
}
