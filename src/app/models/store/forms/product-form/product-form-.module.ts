import {
  initialListProduct,
  ListProductsForm,
} from '@appModels/store/forms/product-form/list-products-form/list-products-form.model';
import {
  initialProductsDetails,
  ProductsDetails,
} from '@appModels/store/forms/product-form/products-details-form/product-details.model';

export interface ProductFormState {
  listProducts: ListProductsForm;
  productDetails: ProductsDetails;
  title: string;
  editMode: boolean;
  enableEdit: boolean;
  isInDetails: boolean;
  addEditComponent?: boolean;
}

export const initialProductFormState = (): ProductFormState => ({
  listProducts: initialListProduct(),
  productDetails: initialProductsDetails(),
  editMode: false,
  enableEdit: false,
  isInDetails: false,
  addEditComponent: false,
  title: PRODUCTS_CATALOG_TITLE,
});

export const PRODUCTS_CATALOG_TITLE = 'CATÁLOGO DE PRODUCTOS (CONTENIDOS)';
export const PRODUCTS_CATALOG_TITLE_ADD_PRODUCT = 'AGREGAR PRODUCTO';
export const PRODUCTS_CATALOG_TITLE_SEE_PRODUCT = 'VER PRODUCTO';
export const PRODUCTS_CATALOG_TITLE_EDIT_PRODUCT = 'EDITAR PRODUCTO';
