/*core imports */
import {createReducer, on} from '@ngrx/store';

/*model imports */
import {
  ICheckOutQuotation,
  initialCheckOutQuotation,
} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';

/*action imports */
import {checkOutQuotationActions, quotationDetailsActions} from '@appActions/quotation';

const initialStateCheckOutQuotation: ICheckOutQuotation = {
  ...initialCheckOutQuotation(),
};

export const checkOutQuotationReducer = createReducer(
  initialStateCheckOutQuotation,
  on(checkOutQuotationActions.SET_TAB, (state, {tab}) => ({
    ...state,
    tapSelected: tab,
  })),
  on(checkOutQuotationActions.SET_SEARCH_TERM, (state, {searchTerm}) => ({
    ...state,
    searchTerm,
  })),
  on(checkOutQuotationActions.SET_DETAILS_PRODUCT_SUCCESS, (state, {item}) => ({
    ...state,
    // itemQuotationSelected: item,
  })),
  on(checkOutQuotationActions.SET_UNIT_PRICE_SUCCESS, (state, {priceUnit}) => ({
    ...state,
    itemQuotationSelected: {
      ...state.itemQuotationSelected,
      PrecioCotizadoUnitarioPactado: priceUnit,
      priceUnit,
    },
  })),
  on(
    quotationDetailsActions.CLEAN_ALL_QUOTATION_DETAIL,
    quotationDetailsActions.SET_QUOTATION_SELECTED,
    () => ({...initialCheckOutQuotation()}),
  ),
  /*  on(checkOutQuotationActions.GET_CAT_FREIGHT_SUCCESS, (state, {list}) => ({
    ...state,
    freight: {
      ...state.freight,
      listFreight: {
        ...state.freight.listFreight,
        list,
      },
    },
  })),*/
  /*  on(checkOutQuotationActions.GET_CAT_FREIGHT_EXPRESS_SUCCESS, (state, {list}) => ({
    ...state,
    freight: {
      ...state.freight,
      listProvider: {
        ...state.freight.listProvider,
        list,
      },
    },
  })),*/
  /*  on(checkOutQuotationActions.SET_ISSELECTED_FREIGHT_EXPRESS, (state, {item}) => ({
    ...state,
    freight: {
      ...state.freight,
      listFreightsExpress: {
        ...state.freight.listFreightsExpress,
        list: _.map(
          state.freight.listFreightsExpress.list,
          (provider): IFreightExpress => {
            if (provider.IdProveedor === item.IdProveedor) {
              return {...provider, isSelected: !provider.isSelected};
            }
            return provider;
          },
        ),
      },
    },
  })),*/
  /*  on(checkOutQuotationActions.SET_OPTION_FREIGHT_CONVENTIONAL, (state, {item}) => ({
    ...state,
    freight: {
      ...state.freight,
      lastMileFreights: {
        ...state.freight.lastMileFreights,
        list: _.map(
          state.freight.lastMileFreights.list,
          (freight): IFlete => {
            if (freight.IdFlete === item.IdFlete) {
              return {...freight, isSelected: !freight.isSelected};
            }
            return {...freight};
          },
        ),
      },
    },
  })),*/
  /*  on(checkOutQuotationActions.SELECTED_ALL_FREIGHT_EXPRESS, (state, {status}) => ({
    ...state,
    freight: {
      ...state.freight,
      listProvider: {
        ...state.freight.listFreightsExpress,
        list: _.map(
          state.freight.listFreightsExpress.list,
          (provider): IFreightExpress => {
            return {...provider, isSelected: status};
          },
        ),
      },
    },
  })),*/
  /*  on(checkOutQuotationActions.GET_FREIGHT_EXPRESS_SUCCESS, (state, {freights}) => ({
    ...state,
    freightExpress: freights,
  })),*/
  on(checkOutQuotationActions.SET_MODAL_IS_OPEN_SEND_QUOTATION, (state, {value}) => {
    return {
      ...state,
      modalIsOpenSendQuotation: value,
    };
  }),
);
