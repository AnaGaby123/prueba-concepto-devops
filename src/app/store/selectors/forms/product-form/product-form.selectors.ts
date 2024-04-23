import {createSelector} from '@ngrx/store';
import {selectProductForms} from '@appSelectors/forms/forms.selectors';
import {ProductFormState} from '@appModels/store/forms/product-form/product-form-.module';
import {ENUM_PRODUCT_FAMILY} from '@appUtil/common.protocols';
import {ProductsDetails} from '@appModels/store/forms/product-form/products-details-form/product-details.model';

export const selectEditMode = createSelector(
  selectProductForms,
  (state: ProductFormState): boolean => state.editMode,
);
export const selectTitle = createSelector(
  selectProductForms,
  (state: ProductFormState): string => state.title,
);
export const selectEnableEdit = createSelector(
  selectProductForms,
  (state: ProductFormState): boolean => state.enableEdit,
);

export const selectIsInDetails = createSelector(
  selectProductForms,
  (state: ProductFormState): boolean => state.isInDetails,
);

export const productName = createSelector(
  selectProductForms,
  (state: ProductFormState): string =>
    `${
      state.productDetails.productBackUp?.Tipo &&
      state.productDetails.productBackUp?.Tipo !== ENUM_PRODUCT_FAMILY.training
        ? 'Cat'
        : ''
    } ${state?.productDetails?.productBackUp?.Catalogo ?? 'N/D'} ${
      state?.productDetails?.productBackUp?.Descripcion ?? 'N/D'
    }`,
);

export const selectDetailsProductState = createSelector(
  selectProductForms,
  (state: ProductFormState): ProductsDetails => state?.productDetails,
);
