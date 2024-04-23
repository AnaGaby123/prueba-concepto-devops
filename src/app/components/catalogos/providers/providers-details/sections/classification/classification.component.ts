import {Component, OnDestroy, OnInit} from '@angular/core';
// Selectos
import * as classifitacionSelector from '@appSelectors/forms/providers/providers-details/provider-form-step-7-classification.selectors';
// Actions
import * as classificationActions from '@appActions/forms/providers/providers-details/provider-form-step-7-classification.actions';

import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {IVMarcaFamilia} from '@appModels/store/forms/providers/providers-details/provider-form-step-7-classification.model';
import {selectEnableEdit} from '@appSelectors/forms/providers/providers.selectors';
import {ICard} from '@appModels/card/card';
import {AgrupadorCaracteristica} from 'api-catalogos';
import {isEmpty} from 'lodash-es';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss'],
})
export class ClassificationComponent implements OnInit, OnDestroy {
  enableEdit$: Observable<boolean> = this.store.select(selectEnableEdit);
  familiesStatus$: Observable<number> = this.store.select(
    classifitacionSelector.selectFamiliesApiStatus,
  );
  families$: Observable<Array<ICard>> = this.store.select(
    classifitacionSelector.selectFamiliesToCards,
  );
  familySelected$: Observable<IVMarcaFamilia> = this.store.select(
    classifitacionSelector.selectFamily,
  );
  concepts$: Observable<Array<AgrupadorCaracteristica>> = this.store.select(
    classifitacionSelector.selectConceptsList,
  );
  concept$: Observable<AgrupadorCaracteristica> = this.store.select(
    classifitacionSelector.selectConcept,
  );
  isConceptDuplicade$: Observable<boolean> = this.store.select(
    classifitacionSelector.selectIsConceptDuplicate,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  lodashIsEmpty = isEmpty;
  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(classificationActions.GET_FAMILIES_PROVIDER_LOAD());
  }

  ngOnDestroy(): void {
    this.store.dispatch(classificationActions.CLEAN_STATE());
  }

  handleSelectedFamilyChange(selectedFamily: ICard): void {
    this.store.dispatch(
      classificationActions.HANDLE_SELECTED_FAMILY_COMPONENT_EFFECT({
        selectedFamily,
      }),
    );
  }

  recivedConcept(concept): void {
    if (concept !== null || concept !== undefined) {
      this.store.dispatch(classificationActions.SET_CONCEPT({concept}));
      this.store.dispatch(classificationActions.VERIFY_DUPLICATE_CONCEPT());
    }
  }

  addConcept(): void {
    this.store.dispatch(classificationActions.ADD_CONCEPT_FAMILY());
  }

  deleteConcept(item: AgrupadorCaracteristica): void {
    this.store.dispatch(classificationActions.DELETE_CONCEPT_FAMILY({item}));
  }
}
