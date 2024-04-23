import {createSelector} from '@ngrx/store';

import {ProductsDetails} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {ProductoEstandar, VProductoDetalle} from 'api-catalogos';
import {IRadioButton} from '@appModels/radio-button/radio-button.models';
import {selectDetailsProductState} from '@appSelectors/forms/product-form/product-form.selectors';
import {selectProductDetails} from '@appSelectors/forms/product-form/products-details/product-details-form.selectors';
import {ENUM_PRODUCT_FAMILY_KEY} from '@appUtil/common.protocols';

export const selectProductType = createSelector(selectProductDetails, (state) => {
  if (state.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards) {
    return state.ProductoEstandar;
  }
  if (state.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware) {
    return state.ProductoLabware;
  }
  if (state.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications) {
    return state.ProductoPublicacion;
  }
  if (state.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives) {
    return state.ProductoReactivo;
  }
  if (state.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.medicalDevice) {
    return state.ProductoDispositivoMedico;
  }
});

export const selectTypeName = createSelector(selectProductDetails, (state: VProductoDetalle) => {
  if (state.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.standards) {
    return 'ProductoEstandar';
  }
  if (state.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.labware) {
    return 'ProductoLabware';
  }
  if (state.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.publications) {
    return 'ProductoPublicacion';
  }
  if (state.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.reactives) {
    return 'ProductoReactivo';
  }
  if (state.TipoProductoClave === ENUM_PRODUCT_FAMILY_KEY.medicalDevice) {
    return 'ProductoDispositivoMedico';
  }
});
export const selectRadioOptions = createSelector(
  selectProductType,
  (state: ProductoEstandar): Array<IRadioButton> => {
    return [
      {
        label: 'TMEC',
        value: state.TMEC,
      },
      {
        label: 'USMCA',
        value: state.USMCA,
      },
      {
        label: 'TLCUE',
        value: state.TLCUE,
      },
      {
        label: 'AELC',
        value: state.AELC,
      },
    ];
  },
);
export const selectSelectedRestrictionFreight = createSelector(
  [selectDetailsProductState],
  (state: ProductsDetails) => state.restrictionFreightSelected,
);
export const selectQueryInfoToCustomAgent = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => {
    const queryInfo = {
      idMarcaFamilia: state.IdMarcaFamilia,
      idProducto: state.IdProducto,
    };
    return queryInfo;
  },
);
export const selectCustomAgentData = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.customAgent,
);
export const selectLogisticFiles = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.logisticFiles,
);
