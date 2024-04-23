import {createReducer, on} from '@ngrx/store';
import {
  Billing,
  ClientDataSTP,
  Credit,
  IChargesClientForm,
  initialChargesClientsForm,
} from '@appModels/store/forms/clients-form/clients-details-form/charges/charges-clients-form.models';
import {
  CLEAN_CHARGES_CLIENT_STATE,
  SET_ACCOUNT_NUMBER,
  SET_ACCOUNT_NUMBER_STP,
  SET_ALIAS,
  SET_BACKUP_CHARGES,
  SET_CLEAN_BACKUP,
  SET_CREDIT_LINE,
  SET_OVERDRAFT,
  SET_PAYMENT_CONDITIONS,
  SET_PAYMENT_FORM,
  SET_PAYMENT_METHOD,
  SET_PROCESS_PURCHASE_ORDER,
  SET_PROCESS_WITHOUT_PURCHASE_ORDER,
  SET_PUBLICATIONS_ACCOUNT_NUMBER_STP,
  SET_PUBLICATIONS_ALIAS,
  SET_REVIEW_TYPE,
  SET_SUCCESS_CHARGES_CLIENT,
  SET_USE_CFDI,
} from '@appActions/forms/client-form/clients-details-form/charges-clients-form/charges-clients-form.actions';
import {Cliente} from 'api-catalogos';
import {chargesActions} from '@appActions/forms/client-form';

const initialAddressClientsFormState: IChargesClientForm = {
  ...initialChargesClientsForm(),
};
export const chargesClientsFormReducers = createReducer(
  initialAddressClientsFormState,
  on(SET_SUCCESS_CHARGES_CLIENT, (state, {payload}) => {
    return {
      ...state,
      clientSelected: payload.DatosFacturacionCliente?.Cliente as Cliente,
      clientDataSTP: payload.DatosFacturacionCliente?.ClienteDatosSTP as ClientDataSTP,
      credit: {
        ...state.credit,
        ...payload.DatosFacturacionCliente?.ConfiguracionPagos,
      },
      billing: payload.DatosFacturacionCliente as Billing,
    };
  }),
  on(
    SET_PAYMENT_CONDITIONS,
    (state, {paymentCondition}): IChargesClientForm => ({
      ...state,
      credit: {
        ...state.credit,
        paymentConditionsSelected: paymentCondition,
        IdCatCondicionesDePago: paymentCondition.value.toString(),
        LineaCredito: paymentCondition.sinCredito ? null : state.credit.LineaCredito,
        LimiteLineaCredito: paymentCondition.sinCredito ? null : state.credit.LimiteLineaCredito,
        PorcentajeSobregiroLineaCredito: paymentCondition.sinCredito
          ? null
          : state.credit.PorcentajeSobregiroLineaCredito,
      },
    }),
  ),
  on(chargesActions.UPDATE_CREDIT_DATA, (state, {credit}) => ({
    ...state,
    credit,
  })),
  on(SET_PAYMENT_FORM, (state, {paymentForm}) => ({
    ...state,
    credit: {
      ...state.credit,
      paymentFormSelected: paymentForm,
      IdCatMedioDePago: paymentForm.value.toString(),
    },
  })),
  on(SET_ACCOUNT_NUMBER, (state, {accountNumber}) => ({
    ...state,
    credit: {
      ...state.credit,
      NumeroDeCuenta: accountNumber,
    },
  })),
  on(SET_CREDIT_LINE, (state, {creditLine}) => ({
    ...state,
    credit: {
      ...state.credit,
      LineaCredito: Number(creditLine),
      LimiteLineaCredito:
        Number(creditLine) + Number(creditLine) * state.credit.PorcentajeSobregiroLineaCredito,
    },
  })),
  on(SET_OVERDRAFT, (state, {overdraft}) => ({
    ...state,
    credit: {
      ...state.credit,
      PorcentajeSobregiroLineaCredito: Number(overdraft),
      LimiteLineaCredito: state.credit.LineaCredito + state.credit.LineaCredito * Number(overdraft),
    },
  })),
  on(SET_PROCESS_PURCHASE_ORDER, (state, {value}) => ({
    ...state,
    clientSelected: {
      ...state.clientSelected,
      TramitarConOrdenDeCompraInterna: value,
      TramitarSinOrdenDeCompra: false,
    },
  })),
  on(SET_PROCESS_WITHOUT_PURCHASE_ORDER, (state, {value}) => ({
    ...state,
    clientSelected: {
      ...state.clientSelected,
      TramitarSinOrdenDeCompra: value,
      TramitarConOrdenDeCompraInterna: false,
    },
  })),
  on(SET_ACCOUNT_NUMBER_STP, (state, {accountNumber}) => ({
    ...state,
    clientDataSTP: {
      ...state.clientDataSTP,
      NumeroDeCuenta: accountNumber,
    },
  })),
  on(SET_PUBLICATIONS_ACCOUNT_NUMBER_STP, (state, {accountNumber}) => ({
    ...state,
    clientDataSTP: {
      ...state.clientDataSTP,
      NumeroDeCuentaPublicaciones: accountNumber,
    },
  })),
  on(SET_ALIAS, (state, {alias}) => ({
    ...state,
    clientDataSTP: {
      ...state.clientDataSTP,
      Alias: alias,
    },
  })),
  on(SET_PUBLICATIONS_ALIAS, (state, {publicationAlias}) => ({
    ...state,
    clientDataSTP: {
      ...state.clientDataSTP,
      AliasPublicaciones: publicationAlias,
    },
  })),
  on(SET_REVIEW_TYPE, (state, {reviewType}) => ({
    ...state,
    billing: {
      ...state.billing,
      CatRevisionSelected: reviewType,
      IdCatRevision: reviewType.value.toString(),
    },
  })),
  on(SET_USE_CFDI, (state, {useCfdi}) => ({
    ...state,
    billing: {
      ...state.billing,
      CatUseCFDISelected: useCfdi,
      IdCatUsoCFDI: useCfdi.value.toString(),
    },
  })),
  on(SET_PAYMENT_METHOD, (state, {paymentMethod}) => ({
    ...state,
    billing: {
      ...state.billing,
      CatPaymentMethodCFDISelected: paymentMethod,
      IdCatMetodoDePagoCFDI: paymentMethod.value.toString(),
    },
  })),
  on(SET_BACKUP_CHARGES, (state) => ({
    ...state,
    dataBackup: {
      ...state.dataBackup,
      billing: state.billing,
      clientDataSTP: state.clientDataSTP,
      clientSelected: state.clientSelected,
      credit: state.credit,
    },
  })),
  on(SET_CLEAN_BACKUP, (state) => ({
    ...state,
    credit: state.dataBackup.credit,
    clientSelected: state.dataBackup.clientSelected,
    clientDataSTP: state.dataBackup.clientDataSTP,
    billing: state.dataBackup.billing,
    dataBackup: {
      ...state.dataBackup,
      billing: {} as Billing,
      clientDataSTP: {} as ClientDataSTP,
      clientSelected: {} as Cliente,
      credit: {} as Credit,
    },
  })),
  on(chargesActions.SET_PAYMENT_CONFIG_ID, (state, {IdConfiguracionPagos}) => ({
    ...state,
    credit: {
      ...state.credit,
      IdConfiguracionPagos,
    },
    clientSelected: {
      ...state.clientSelected,
      IdConfiguracionPagos,
    },
  })),
  on(CLEAN_CHARGES_CLIENT_STATE, (state) => ({
    ...initialChargesClientsForm(),
  })),
);
