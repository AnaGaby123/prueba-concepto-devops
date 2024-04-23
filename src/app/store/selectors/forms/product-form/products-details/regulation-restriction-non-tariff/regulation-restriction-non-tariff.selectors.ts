import {createSelector} from '@ngrx/store';
import {ProductsDetails} from '@appModels/store/forms/product-form/products-details-form/product-details.model';
import {Producto, VProductoDetalle} from 'api-catalogos';
import {selectCatClasificacionRegulatoriaForDropDrown} from '@appSelectors/catalogs/catalogs.selectors';
import {find} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {selectProductType} from '@appSelectors/forms/product-form/products-details/logistic/logistic.selectors';
import {selectDetailsProductState} from '@appSelectors/forms/product-form/product-form.selectors';

export const selectProduct = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.productDetails,
);
export const selectConfigurationType = createSelector(
  selectProduct,
  (state: VProductoDetalle) => state.Tipo,
);
export const selectProducto = createSelector(
  selectProduct,
  (state: VProductoDetalle) => state.Producto,
);
export const selectedRegulatoryClassification = createSelector(
  [selectCatClasificacionRegulatoriaForDropDrown, selectProductType],
  (catClassifications: Array<DropListOption>, configurationType: any): DropListOption =>
    find(
      catClassifications,
      (o: DropListOption) => o.value === configurationType.IdCatClasificacionRegulatoria,
    ),
);
export const selectRegulationFiles = createSelector(
  selectDetailsProductState,
  (state: ProductsDetails) => state.regulationFiles,
);
export const sanitaryDate = createSelector(selectProducto, (state: Producto) =>
  state.FechaCaducidadRegistroSanitario !== null
    ? new Date(state.FechaCaducidadRegistroSanitario)
    : null,
);
