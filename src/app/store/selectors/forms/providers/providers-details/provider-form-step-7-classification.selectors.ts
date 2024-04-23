import {createSelector} from '@ngrx/store';
import {selectProvidersAddEdit} from '@appSelectors/forms/providers/providers-details/providers-details.selectors';
import {ProvidersDetailsState} from '@appModels/store/forms/providers/providers-details/providers-details.models';
import {DEFAULT_UUID} from '@appUtil/common.protocols';
import {isEqual, map as _map, omit} from 'lodash-es';

import {ICard} from '@appModels/card/card';
import {
  ClassificationState,
  IVMarcaFamilia,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-7-classification.model';
import {AgrupadorCaracteristica} from 'api-catalogos';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';

export const selectProvidersClassification = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState) => state.classification,
);
export const selectFamilies = createSelector(
  selectProvidersClassification,
  (state) => state.familiesList,
);
export const selectFamiliesToCards = createSelector(
  selectFamilies,
  (state: Array<IVMarcaFamilia>): Array<ICard> =>
    _map(
      state,
      (o: any): ICard => ({
        active: o.isSelected,
        value: o.IdMarcaFamilia,
        labels: [
          {label: o.NombreMarca, className: CLASS_NAMES.title},
          {label: o.Industria, className: CLASS_NAMES.type},
          {label: o.Tipo, className: CLASS_NAMES.type},
          {label: o.Subtipo, className: CLASS_NAMES.type},
          {label: o.Control, className: CLASS_NAMES.type},
          {
            label: `${o.Productos} ${o.Productos === 1 ? 'PRODUCTO' : 'PRODUCTOS'}`,
            className: CLASS_NAMES.countProducts,
          },
        ],
      }),
    ),
);
export const selectFamiliesApiStatus = createSelector(
  selectProvidersClassification,
  (state) => state.familiesApiStatus,
);
export const selectFamily = createSelector(
  selectProvidersClassification,
  (state: ClassificationState): IVMarcaFamilia => state.selectedFamily,
);
export const selectFamilyBackup = createSelector(
  selectProvidersClassification,
  (state: ClassificationState): IVMarcaFamilia => state.selectedFamilyBackup,
);
export const selectDeleteConcepts = createSelector(selectFamily, (state: IVMarcaFamilia) => {
  const list: any[] = [];
  state?.deletedConceptsList?.map((item: AgrupadorCaracteristica) => {
    if (item.IdAgrupadorCaracteristica !== DEFAULT_UUID) {
      list.push(item);
    }
  });
  return list;
});
export const selectConcept = createSelector(
  selectProvidersClassification,
  (state) => state.concept,
);
export const selectConceptsList = createSelector(
  selectFamily,
  (state: IVMarcaFamilia) => state?.conceptsList,
);
export const selectIsConceptDuplicate = createSelector(
  selectProvidersClassification,
  (state: ClassificationState) => state.isConceptDuplicate,
);
export const selectClassificationsHasChanges = createSelector(
  [selectFamily, selectFamilyBackup],
  (selectedFamily: IVMarcaFamilia, selectedFamilyBackup: IVMarcaFamilia): boolean => {
    return !isEqual(
      JSON.stringify(omit(selectedFamily, ['isSelected'])),
      JSON.stringify(omit(selectedFamilyBackup, ['isSelected'])),
    );
  },
);
export const saveValidationFeatureGroup = createSelector(
  selectClassificationsHasChanges,
  (hasChanges: boolean): boolean => !!hasChanges,
);
export const selectAlertPop = createSelector(
  selectProvidersClassification,
  (state) => state.alertPop,
);
export const selectPreselectedFamily = createSelector(
  selectProvidersClassification,
  (state) => state.preSelectedFamily,
);
