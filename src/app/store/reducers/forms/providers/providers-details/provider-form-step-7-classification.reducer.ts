import {createReducer, on} from '@ngrx/store';
import {filter, find, isEmpty, map as _map} from 'lodash-es';

import {
  ClassificationState,
  initialClassification,
  initialConcepto,
  IVMarcaFamilia,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-7-classification.model';
import {classificationActions} from '@appActions/forms/providers';
import {AgrupadorCaracteristica} from 'api-catalogos';
import {DEFAULT_UUID} from '@appUtil/common.protocols';

const initialStateClassification: ClassificationState = {
  ...initialClassification(),
};

export const classificationReducer = createReducer(
  initialStateClassification,
  on(
    classificationActions.SET_FAMILIES_PROVIDER_API_STATUS,
    (state: ClassificationState, {familiesApiStatus}): ClassificationState => ({
      ...state,
      familiesApiStatus,
    }),
  ),
  on(classificationActions.GET_FAMILIES_PROVIDER_SUCCESS, (state, {list}) => ({
    ...state,
    familiesList: list,
  })),
  on(classificationActions.UPDATE_FAMILY_SELECTED, (state, {item}) => ({
    ...state,
    selectedFamily: item,
  })),
  on(classificationActions.GET_CONCEPTS_FAMILY_SUCCESS, (state, {list}) => ({
    ...state,
    selectedFamily: {...state.selectedFamily, conceptsList: list},
    familiesList: _map(
      state.familiesList,
      (o: IVMarcaFamilia): IVMarcaFamilia => {
        if (o.IdMarcaFamilia === state.selectedFamily.IdMarcaFamilia) {
          return {
            ...o,
            conceptsList: list,
            needsToReload: false,
          };
        }
        return {
          ...o,
        };
      },
    ),
  })),
  on(
    classificationActions.SELECT_FAMILY_CARD,
    (state: ClassificationState, {itemId}): ClassificationState => ({
      ...state,
      // DOCS: Recorrer las familias
      familiesList: _map(state.familiesList, (o: IVMarcaFamilia) => {
        // DOCS: Encontrar la familia actualmente seleccionada
        if (
          o.IdMarcaFamilia === state.selectedFamily?.IdMarcaFamilia &&
          o.IdMarcaFamilia !== itemId
        ) {
          // DOCS: Respaldar la info de la familia actualmente seleccionada dentro de la lista de familias y se desmarca
          return {...state.selectedFamily, isSelected: false};
          // DOCS: Encontrar la nueva familia que se esta seleccionando
        } else if (o.IdMarcaFamilia === itemId) {
          // DOCS: Marcar la familia como seleccionada
          return {...o, isSelected: true};
        }
        // DOCS: Devolver la familia sin ningun cambio si no coincide con ninguna de las validaciones
        return {...o, isSelected: false};
      }),
      selectedFamily: _map(
        [find(state.familiesList, (o: IVMarcaFamilia) => o.IdMarcaFamilia === itemId)],
        (i) => ({...i, isSelected: true}),
      )[0],
      concept: initialConcepto(),
    }),
  ),
  on(classificationActions.SET_CONCEPT, (state, {concept}) => ({
    ...state,
    concept: {
      ...state.concept,
      IdMarcaFamilia: state.selectedFamily.IdMarcaFamilia,
      Descripcion: concept,
    },
  })),
  on(classificationActions.VERIFY_DUPLICATE_CONCEPT, (state) => ({
    ...state,
    isConceptDuplicate: !isEmpty(
      find(
        state.selectedFamily.conceptsList,
        (o: AgrupadorCaracteristica) => o.Descripcion === state.concept.Descripcion,
      ),
    ),
  })),
  on(classificationActions.ADD_CONCEPT_FAMILY, (state) => ({
    ...state,
    familiesList: _map(
      state.familiesList,
      (o: IVMarcaFamilia): IVMarcaFamilia => {
        if (o.IdMarcaFamilia === state.selectedFamily.IdMarcaFamilia) {
          return {
            ...o,
            conceptsList: [...o.conceptsList, state.concept],
          };
        }
        return {
          ...o,
        };
      },
    ),
    selectedFamily: {
      ...state.selectedFamily,
      conceptsList: [...state.selectedFamily.conceptsList, state.concept],
    },
    concept: initialConcepto(),
  })),
  on(
    classificationActions.DELETE_CONCEPT_FAMILY,
    (state: ClassificationState, {item}): ClassificationState => {
      return {
        ...state,
        selectedFamily: {
          ...state.selectedFamily,
          conceptsList: filter(
            state.selectedFamily.conceptsList,
            (o: AgrupadorCaracteristica) =>
              o.Descripcion !== item.Descripcion ||
              o.IdAgrupadorCaracteristica !== item.IdAgrupadorCaracteristica,
          ),
          deletedConceptsList:
            item.IdAgrupadorCaracteristica !== DEFAULT_UUID
              ? [...state.selectedFamily.deletedConceptsList, item]
              : state.selectedFamily.deletedConceptsList,
        },
      };
    },
  ),
  on(
    classificationActions.SAVE_FAMILIES_DATA_SUCCESS,
    (state: ClassificationState, {conceptsList}): ClassificationState => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        conceptsList,
      },
    }),
  ),
  on(
    classificationActions.DELETE_CONCEPTS_SUCCESS,
    (state: ClassificationState): ClassificationState => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        deletedConceptsList: [],
      },
    }),
  ),
  on(classificationActions.SET_CLASSIFICATION_BACKUP, (state) => ({
    ...state,
    selectedFamilyBackup: state.selectedFamily,
  })),
  on(
    classificationActions.RESTORE_CLASSIFICATION_BACKUP,
    (state: ClassificationState): ClassificationState => ({
      ...state,
      selectedFamily: state.selectedFamilyBackup,
      concept: initialConcepto(),
    }),
  ),
  on(classificationActions.SET_PRESELECTED_FAMILY, (state, {selectedFamily}) => ({
    ...state,
    preSelectedFamily: selectedFamily,
  })),
  on(classificationActions.CLEAN_STATE, (state) => ({
    ...initialStateClassification,
  })),
);
