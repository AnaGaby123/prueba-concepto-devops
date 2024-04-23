import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {technicalCommercialInvestigationActions} from '@appActions/forms/product-form';
import {mergeMap, withLatestFrom} from 'rxjs/operators';
import {
  productDetailsSelectors,
  productTechnicalCommercialInvestigationSelectors,
} from '@appSelectors/forms/product-form';
import {of} from 'rxjs';
import {VMarcaFamilia} from 'api-catalogos';
import {find} from 'lodash-es';
import * as catalogActions from '@appActions/catalogs/catalogos.actions';
import {RETURN_EMPTY} from '@appActions/utils/utils.action';

@Injectable()
export class TechnicalCommercialProductMethodsEffects {
  constructor(private store: Store, private action$: Actions) {}

  setValueDropDownList$ = createEffect(() =>
    this.action$.pipe(
      ofType(technicalCommercialInvestigationActions.SET_VALUE_DROP_DOWN_LIST_COMPONENT_EFFECT),
      withLatestFrom(
        this.store.select(productDetailsSelectors.selectNameValidationConfiguration),
        this.store.select(productTechnicalCommercialInvestigationSelectors.selectProductTypeFamily),
      ),
      mergeMap(([action, nodeRoot, productTypeFamily]) => {
        if (action.node === 'IdMarca') {
          this.store.dispatch(
            technicalCommercialInvestigationActions.SET_VALUE_DROP_TRADEMARK({
              value: action.value,
              node: action.node,
              nodeSelected: action.nodeSelected,
            }),
          );
          this.store.dispatch(
            technicalCommercialInvestigationActions.SET_LOAD_TYPE_PRODUCT_FAMILY({
              selectedTradeMarkdId: action.value.value,
            }),
          );
        } else {
          this.store.dispatch(
            technicalCommercialInvestigationActions.SET_VALUE_DROP({
              value: action.value,
              node: action.node,
              nodeSelected: action.nodeSelected,
            }),
          );
        }
        if (action.node === 'IdMarcaFamilia') {
          const familySelected: VMarcaFamilia = find(
            productTypeFamily,
            (o: VMarcaFamilia) => o.IdMarcaFamilia === action.value.value,
          );
          this.store.dispatch(
            technicalCommercialInvestigationActions.SET_INITIAL_DATA_CONFIGURATION({
              nodeRoot,
              familySelected,
            }),
          );
          this.store.dispatch(
            technicalCommercialInvestigationActions.SET_LOAD_CHARASTERISTIC_GROUPER({
              payload: action.value.value,
            }),
          );
          this.store.dispatch(
            catalogActions.GET_CAT_CLASSIFICATIONS_LOAD({
              IdCatSubtipoProducto: familySelected.IdCatSubtipoProducto,
            }),
          );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  setValueDropDownListConfiguration$ = createEffect(() =>
    this.action$.pipe(
      ofType(technicalCommercialInvestigationActions.SET_VALUE_DROP_CONFIG_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(productDetailsSelectors.selectNameValidationConfiguration)),
      mergeMap(([action, nodeRoot]) => {
        this.store.dispatch(
          technicalCommercialInvestigationActions.SET_VALUE_DROP_WITH_CONFIGURATION({
            value: action.value,
            nodeRoot,
            node: action.node,
            nodeSelected: action.nodeSelected,
          }),
        );
        if (action.node === 'IdMarca') {
          this.store.dispatch(
            technicalCommercialInvestigationActions.SET_LOAD_TYPE_PRODUCT_FAMILY({
              selectedTradeMarkdId: action.value.value,
            }),
          );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );

  setValueInputWithConfiguration$ = createEffect(() =>
    this.action$.pipe(
      ofType(technicalCommercialInvestigationActions.SET_VALUE_INPUT_WITH_CONFIG_COMPONENT_EFFECT),
      withLatestFrom(this.store.select(productDetailsSelectors.selectNameValidationConfiguration)),
      mergeMap(([action, nodeRoot]) => {
        let value = action.value;
        if (nodeRoot === 'ProductoCapacitacion') {
          if (action.node === 'NumeroDePersonasPorGrupo' || action.node === 'DuracionEvento') {
            value = value === '' ? null : Number(value);
          }
          this.store.dispatch(
            technicalCommercialInvestigationActions.SET_VALUE_INPUT_WITH_CONFIGURATION({
              value: value || null,
              node: action.node,
              nodeRoot,
            }),
          );
        } else {
          value = value === '' ? null : value;
          if (action.node === 'CAS' && value !== null) {
            this.store.dispatch(
              technicalCommercialInvestigationActions.SET_VALIDATE_CAS({
                value,
              }),
            );
          }
          this.store.dispatch(
            technicalCommercialInvestigationActions.SET_VALUE_INPUT_WITH_CONFIGURATION({
              value,
              node: action.node,
              nodeRoot,
            }),
          );
        }
        return of(RETURN_EMPTY());
      }),
    ),
  );
}
