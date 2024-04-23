/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';

/* Models Imports */
import {
  initialIProcessPurchaseDetails,
  IProcessPurchaseDetails,
} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-details/process-purchase-details.models';

/* Actions Imports */
import {processPurchaseDetailsActions} from '@appActions/pendings/purchasing-manager/process-purchase';

/* Tools Imports */
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
} from '@appUtil/common.protocols';
import {isEmpty} from 'lodash-es';

//
export const processPurchaseDetailsReducer: ActionReducer<IProcessPurchaseDetails> = createReducer(
  {...initialIProcessPurchaseDetails()},
  on(
    processPurchaseDetailsActions.FETCH_GENERAL_DATA_PURCHASE_SUCCESS,
    (
      state: IProcessPurchaseDetails,
      {generalData, modifiedContacts, contacts},
    ): IProcessPurchaseDetails => ({
      ...state,
      generalData,
      contacts: modifiedContacts,
      providerContacts: contacts,
      selectedProviderContact: !isEmpty(contacts)
        ? {
            label:
              contacts[0].Nombres +
              ' ' +
              contacts[0].ApellidoPaterno +
              ' ' +
              contacts[0].ApellidoMaterno,
            value: contacts[0].IdContactoProveedor,
          }
        : null,
      generalDataStatus: API_REQUEST_STATUS_SUCCEEDED,
      needsToReloadGeneralData: false,
      contactsStatus: API_REQUEST_STATUS_SUCCEEDED,
      needsToReloadContacts: false,
    }),
  ),
  on(processPurchaseDetailsActions.RELOAD_GENERAL_DATA, (state) => ({
    ...state,
    generalDataStatus: API_REQUEST_STATUS_LOADING,
    needsToReloadGeneralData: true,
    contactsStatus: API_REQUEST_STATUS_LOADING,
    needsToReloadContacts: true,
    productsToGenerateOrder: [],
    mailList: [],
    contacts: [],
    companyBuysSelected: null,
    shippingCompanySelected: null,
  })),

  on(processPurchaseDetailsActions.ADD_MAIL_TO_LIST, (state, {newMail}) => ({
    ...state,
    mailList: [...state.mailList, newMail],
  })),
  on(processPurchaseDetailsActions.FETCH_GENERAL_DATA_PURCHASE_FAILED, (state) => ({
    ...state,
    generalDataStatus: API_REQUEST_STATUS_FAILED,
    contactsStatus: API_REQUEST_STATUS_FAILED,
  })),
  on(processPurchaseDetailsActions.SET_DATA_PURCHASE_ORDER, (state, {purchaseOrderData}) => ({
    ...state,
    purchaseOrderData,
  })),
  on(processPurchaseDetailsActions.SET_DATA_PDF, (state, {pdfData}) => ({
    ...state,
    pdfData,
  })),
  on(processPurchaseDetailsActions.SAVE_ID_PURCHASE_ORDER, (state, {idPurchaseOrder}) => ({
    ...state,
    idPurchaseOrder,
  })),
  on(processPurchaseDetailsActions.HANDLE_POP_UP_SEND_MAIL, (state, {popUpSendMail}) => ({
    ...state,
    popUpSendMail,
  })),
  on(
    processPurchaseDetailsActions.SET_SELECTED_CONTACT_PROVIDER,
    (state: IProcessPurchaseDetails, {contactSelected}): IProcessPurchaseDetails => ({
      ...state,
      selectedProviderContact: contactSelected,
    }),
  ),
  on(processPurchaseDetailsActions.SET_FAMILIES, (state, {families, totalFamilies}) => ({
    ...state,
    families,
    totalFamilies,
  })),
  on(processPurchaseDetailsActions.SET_PROVIDER, (state, {provider}) => ({
    ...state,
    provider,
    generalDataStatus: API_REQUEST_STATUS_LOADING,
    contactsStatus: API_REQUEST_STATUS_LOADING,
  })),
  on(processPurchaseDetailsActions.SET_COMPANY_BUYS_SELECTED, (state, {companyBuysSelected}) => ({
    ...state,
    companyBuysSelected,
  })),
  on(
    processPurchaseDetailsActions.SET_SHIPPING_COMPANY_SELECTED,
    (state, {shippingCompanySelected}) => ({
      ...state,
      shippingCompanySelected,
    }),
  ),
  on(processPurchaseDetailsActions.CLEAN_DATA, (state) => ({
    ...initialIProcessPurchaseDetails(),
  })),
);
