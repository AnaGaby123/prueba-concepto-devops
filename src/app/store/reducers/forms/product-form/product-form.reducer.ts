import {ActionReducer, combineReducers, createReducer, on} from '@ngrx/store';
import {
  initialProductFormState,
  ProductFormState,
} from '@appModels/store/forms/product-form/product-form-.module';
import {
  SET_ADD_EDIT_COMPONENT,
  SET_EDIT_MODE,
  SET_ENABLE_EDIT,
  SET_IS_IN_DETAILS,
  SET_TITLE,
} from '@appActions/forms/product-form/product-form.actions';
import {listProductsFormReducer} from '@appReducers/forms/product-form/product-list-form/product-form-list.reducer';
import {productDetailsReducer} from '@appReducers/forms/product-form/product-details-form/product-details-form.reducer';

export const productFormReducer: ActionReducer<ProductFormState> = combineReducers(
  {
    listProducts: listProductsFormReducer,
    productDetails: productDetailsReducer,
    isInDetails: createReducer(
      initialProductFormState().isInDetails,
      on(SET_IS_IN_DETAILS, (state, {isInDetails}) => isInDetails),
    ),
    editMode: createReducer(
      initialProductFormState().editMode,
      on(SET_EDIT_MODE, (state, {editMode}) => editMode),
    ),
    addEditComponent: createReducer(
      initialProductFormState().addEditComponent,
      on(SET_ADD_EDIT_COMPONENT, (state, {addEditComponent}) => addEditComponent),
    ),
    title: createReducer(
      initialProductFormState().title,
      on(SET_TITLE, (state, {title}) => title),
    ),
    enableEdit: createReducer(
      initialProductFormState().enableEdit,
      on(SET_ENABLE_EDIT, (state, {enableEdit}) => enableEdit),
    ),
  },
  {
    ...initialProductFormState(),
  },
);
