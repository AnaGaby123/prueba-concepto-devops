import {createSelector} from '@ngrx/store';
import {selectNewProductExistingSupplier} from '@appSelectors/pendings/pendings.selectors';
import {IRegulatoryResearchState} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research.models';
import {NewProductExistingSupplierState} from '@appModels/store/pendings/new-product-existing-supplier/new-product-existing-supplier.models';
import {dateWithHoursFormatDate} from '@appUtil/dates';
import {getOnlyFileName} from '@appUtil/files';
import {VProductoDetalle} from 'api-catalogos';

export const selectRegulatoryResearch = createSelector(
  selectNewProductExistingSupplier,
  (state: NewProductExistingSupplierState): IRegulatoryResearchState => state.regulatoryResearch,
);

export const selectProductDetails = createSelector(
  selectRegulatoryResearch,
  (state: IRegulatoryResearchState) => {
    return state.regulatoryResearchDetails?.selectedProduct?.productDetails;
  },
);

export const nameFileStructureMolecular = createSelector(
  selectRegulatoryResearch,
  (state: IRegulatoryResearchState) => {
    return getOnlyFileName(
      state.regulatoryResearchDetails?.selectedProduct?.productDetails?.ArchivoEstructuraMolecular
        ?.FileKey,
    );
  },
);

export const selectProductOnDetails = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => {
    return state?.Producto;
  },
);

export const selectFechaCaducidadVigenciaCuraduria = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => {
    const date = state?.Producto?.FechaCaducidadVigenciaCuraduria;
    return date ? dateWithHoursFormatDate(date) : null;
  },
);
export const selectBackOrderAvailabilityDate = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => {
    const date = state?.Producto.FechaDisponibilidadBackOrder;
    return date ? dateWithHoursFormatDate(date) : null;
  },
);
export const selectFechaCaducidadRegistroSanitario = createSelector(
  selectProductDetails,
  (state: VProductoDetalle) => {
    const date = state?.Producto?.FechaCaducidadRegistroSanitario;
    return date ? dateWithHoursFormatDate(date) : null;
  },
);

export const selectTitle = createSelector(
  selectRegulatoryResearch,
  (state: IRegulatoryResearchState) => state.title,
);
export const selectAllowToDetails = createSelector(
  selectRegulatoryResearch,
  (state: IRegulatoryResearchState) => state.allowToDetails,
);
export const selectIsInDetails = createSelector(
  selectRegulatoryResearch,
  (state: IRegulatoryResearchState) => state.allowToDetails,
);
export const selectEnableEdit = createSelector(
  selectRegulatoryResearch,
  (state: IRegulatoryResearchState) => state.enableEdit,
);
