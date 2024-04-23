import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  initialIWorkArrivalDocumentsDetails,
  IWorkArrivalDocumentsDetails,
} from '@appModels/store/pendings/work-arrival-documents/work-arrival-documents-details/work-arrival-documents-details.models';
import {IPackingListShipping} from '@appModels/store/pendings/assorting-manager/shipping/shipping-details/shipping-details.models';
import {workArrivalDocumentsDetailsActions} from '@appActions/pendings/work-arrival-documents';
import {filter, map} from 'lodash-es';

export const workArrivalDocumentsDetailsReducer: ActionReducer<IWorkArrivalDocumentsDetails> = createReducer(
  initialIWorkArrivalDocumentsDetails(),
  on(
    workArrivalDocumentsDetailsActions.CLEAN_ALL_DETAILS_STATE,
    (): IWorkArrivalDocumentsDetails => ({
      ...initialIWorkArrivalDocumentsDetails(),
    }),
  ),
  on(
    workArrivalDocumentsDetailsActions.SET_SELECTED_PROVIDER,
    (state: IWorkArrivalDocumentsDetails, {selectedProvider}): IWorkArrivalDocumentsDetails => ({
      ...state,
      selectedProvider,
    }),
  ),
  on(
    workArrivalDocumentsDetailsActions.FETCH_PRODUCTS_SUCCESS,
    (state: IWorkArrivalDocumentsDetails, {products}): IWorkArrivalDocumentsDetails => ({
      ...state,
      products,
    }),
  ),
  on(
    workArrivalDocumentsDetailsActions.FETCH_CONTACT_SUCCESS,
    (state: IWorkArrivalDocumentsDetails, {contact}): IWorkArrivalDocumentsDetails => ({
      ...state,
      contact,
    }),
  ),
  on(
    workArrivalDocumentsDetailsActions.SET_SELECTED_PRODUCT,
    (state: IWorkArrivalDocumentsDetails, {productId}): IWorkArrivalDocumentsDetails => ({
      ...state,
      products: map(state.products, (o: IPackingListShipping) => {
        if (o.IdFCCFolioPagoCliente === state.selectedProduct.IdFCCFolioPagoCliente) {
          return {
            ...state.selectedProduct,
            isSelected: o.IdFCCFolioPagoCliente === productId,
          };
        } else if (o.IdFCCFolioPagoCliente === productId) {
          return {...o, isSelected: true};
        }
        return {...o, isSelected: false};
      }),
      selectedProduct: filter(
        state.products,
        (o: IPackingListShipping) => o.IdFCCFolioPagoCliente === productId,
      )[0],
    }),
  ),
  on(
    workArrivalDocumentsDetailsActions.SET_PRODUCTS_STATUS,
    (state: IWorkArrivalDocumentsDetails, {productsStatus}): IWorkArrivalDocumentsDetails => ({
      ...state,
      productsStatus,
    }),
  ),
  on(
    workArrivalDocumentsDetailsActions.SET_SEARCH_TERM,
    (state: IWorkArrivalDocumentsDetails, {searchTerm}): IWorkArrivalDocumentsDetails => ({
      ...state,
      searchTerm,
    }),
  ),
);
