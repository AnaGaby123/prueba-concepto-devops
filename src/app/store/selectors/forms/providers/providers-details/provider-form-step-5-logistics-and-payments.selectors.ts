import {createSelector} from '@ngrx/store';
import {selectProvidersAddEdit} from '@appSelectors/forms/providers/providers-details/providers-details.selectors';
import {ProvidersDetailsState} from '@appModels/store/forms/providers/providers-details/providers-details.models';
import {
  ICardMark,
  LogisticsAndPayments,
  Payment,
  RutaEntrega,
} from '@appModels/store/forms/providers/providers-details/provider-form-step-5-logistics-and-payments.model';
import {filter, find, isEmpty, isEqual, map as _map} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  selectCatBancoForDropList,
  selectCatMedioDePagoForDropDown,
  selectCatPaymentConditionsForDropDown,
} from '@appSelectors/catalogs/catalogs.selectors';
import {DEFAULT_DATE, DEFAULT_UUID, paymentMethods} from '@appUtil/common.protocols';
import {
  CatBanco,
  CatMedioDePago,
  ConfiguracionPagosDatosBancariosDetalle,
  ConfiguracionTiempoEntregaProveedor,
  DatosBancarios,
  ValorConfiguracionTiempoEntrega,
  VProveedor,
} from 'api-catalogos';

export const selectProviderslogisticsAndPayments = createSelector(
  selectProvidersAddEdit,
  (state: ProvidersDetailsState) => state?.logisticsAndPayments,
);
export const selectCatRoute = createSelector(
  selectProviderslogisticsAndPayments,
  (state) => state?.routeList,
);
export const selectLogistic = createSelector(
  selectProviderslogisticsAndPayments,
  (state: LogisticsAndPayments) => state?.logistics,
);
export const selectRouteList = createSelector(
  selectProviderslogisticsAndPayments,
  (state: LogisticsAndPayments) => state?.routeList,
);

export const selectPayment = createSelector(
  selectProviderslogisticsAndPayments,
  (state) => state?.payment,
);
export const selectPaymentconfig = createSelector(
  selectPayment,
  (state: Payment) => state?.configuracionPagos,
);
export const selectCardMarkList = createSelector(
  selectProviderslogisticsAndPayments,
  (state) => state?.cardMarkList,
);
export const selectedPaymentConf = createSelector(
  [selectPayment, selectCatPaymentConditionsForDropDown],
  (payment: Payment, conditions: Array<DropListOption>): DropListOption => {
    return find(
      conditions,
      (o: DropListOption) => o.value === payment.configuracionPagos.IdCatCondicionesDePago,
    );
  },
);
export const selectLineCreditIsDisabled = createSelector(
  selectedPaymentConf,
  (state: DropListOption): boolean => !!(state?.sinCredito || !state),
);
export const selectAccounts = createSelector(
  selectPayment,
  (state: Payment): ConfiguracionPagosDatosBancariosDetalle[] => state?.bankAccounts,
);
export const selectAccountstoDelete = createSelector(
  selectPayment,
  (state: Payment) => state?.accountsToDelete,
);
export const selectAccountsBankForm = createSelector(
  selectProviderslogisticsAndPayments,
  (state: LogisticsAndPayments) => state?.accountsBankForm,
);
export const selectMedioDePagoForm = createSelector(
  selectAccountsBankForm,
  (state: ConfiguracionPagosDatosBancariosDetalle) => state?.catMedioDePago,
);
export const selectBankForm = createSelector(
  selectAccountsBankForm,
  (state: ConfiguracionPagosDatosBancariosDetalle) => state?.catBanco,
);
export const selectedPaymentMethod = createSelector(
  selectCatMedioDePagoForDropDown,
  selectMedioDePagoForm,
  (catMedioDePago: DropListOption[], form: CatMedioDePago) =>
    find(catMedioDePago, (o: DropListOption) => o.value === form.IdCatMedioDePago),
);
export const selectedBank = createSelector(
  selectCatBancoForDropList,
  selectBankForm,
  (list: DropListOption[], bankForm: CatBanco) =>
    find(list, (o: DropListOption) => o.value === bankForm.IdCatBanco),
);
export const selectBankData = createSelector(
  selectAccountsBankForm,
  (state: ConfiguracionPagosDatosBancariosDetalle) => state.DatosBancarios,
);
export const selectCardMarkListBackup = createSelector(
  selectProviderslogisticsAndPayments,
  (state) => state.cardMarkListBackup,
);
export const accountFormValidator = createSelector(
  selectMedioDePagoForm,
  selectBankForm,
  selectBankData,
  selectCardMarkListBackup,
  selectCardMarkList,
  (
    payment: CatMedioDePago,
    bank: CatBanco,
    data: DatosBancarios,
    cardMarkListBackup: ICardMark[],
    cardMarkList: ICardMark[],
  ): boolean => {
    switch (payment.Clave) {
      case paymentMethods.transferKey:
        return (
          bank.IdCatBanco !== DEFAULT_UUID &&
          data.Clabe &&
          data.Beneficiario &&
          data.Clabe.length === 18
        );
      case paymentMethods.swiftCode:
        return (
          bank.IdCatBanco !== DEFAULT_UUID &&
          data.NumeroDeCuenta &&
          data.Beneficiario &&
          data.NumeroDeCuenta.length > 0
        );
      case paymentMethods.transferAccount:
        return (
          bank.IdCatBanco !== DEFAULT_UUID &&
          data.NumeroDeCuenta &&
          data.Beneficiario &&
          data.Sucursal &&
          data.NumeroDeCuenta.length >= 8 &&
          data.NumeroDeCuenta.length <= 12
        );
      case paymentMethods.abaCode:
        return (
          bank.IdCatBanco !== DEFAULT_UUID &&
          data.NumeroDeCuenta &&
          data.Beneficiario &&
          data.NumeroDeCuenta.length > 0
        );
      case paymentMethods.bankCheck:
        return (
          bank.IdCatBanco !== DEFAULT_UUID &&
          data.NumeroDeCuenta &&
          data.Beneficiario &&
          data.NumeroDeCuenta.length > 0
        );
      case paymentMethods.creditCard:
        return (
          !isEmpty(filter(cardMarkList, (o: ICardMark) => o.isChecked)) ||
          isEqual(JSON.stringify(cardMarkList), JSON.stringify(cardMarkListBackup))
        );
    }
  },
);

export const selectCardsAdded = createSelector(
  selectAccounts,
  (state: ConfiguracionPagosDatosBancariosDetalle[]): ConfiguracionPagosDatosBancariosDetalle[] =>
    filter(state, (o: ConfiguracionPagosDatosBancariosDetalle) => !!o.IdCatMarcaTarjeta),
);
export const getConfigDeliveryTime = createSelector(
  selectRouteList,
  (state: Array<RutaEntrega>): Array<ValorConfiguracionTiempoEntrega> =>
    _map(
      state,
      (o: RutaEntrega): ValorConfiguracionTiempoEntrega => {
        return {
          IdValorConfiguracionTiempoEntrega: o.IdValorConfiguracionTiempoEntrega,
          ValorEsperado: o.ValorEsperado,
          EsIntervalo: false,
          IdCatUnidadTiempo: isEmpty(o.idSelected) ? null : o.idSelected,
          ValorMaximoIntervalo: 0,
          ValorMinimoIntervalo: 0,
        };
      },
    ),
);
export const getConfigDeliveryTimeProvider = createSelector(
  [selectRouteList, selectLogistic],
  (
    routeList: Array<RutaEntrega>,
    logistic: VProveedor,
  ): Array<ConfiguracionTiempoEntregaProveedor> =>
    _map(
      routeList,
      (o: RutaEntrega): ConfiguracionTiempoEntregaProveedor => {
        return {
          Activo: true,
          IdConfiguracionTiempoEntregaProveedor: o.IdConfiguracionTiempoEntregaProveedor,
          IdValorConfiguracionTiempoEntrega: o.IdValorConfiguracionTiempoEntrega,
          IdCatRutaEntrega: o.id,
          IdProveedor: logistic.IdProveedor,
          FechaRegistro: o.FechaRegistro,
          FechaUltimaActualizacion: DEFAULT_DATE,
        };
      },
    ),
);
export const logisticPaymentHasChanges = createSelector(
  selectProviderslogisticsAndPayments,
  (state: LogisticsAndPayments): boolean => {
    return (
      !isEqual(state.logistics, state.logisticsBackUp) ||
      !isEqual(state.payment, state.paymentBackUp) ||
      !isEqual(state.routeList, state.routeListBackUp)
    );
  },
);
export const saveValidatorLogisticPayments = createSelector(
  [selectProviderslogisticsAndPayments, selectLineCreditIsDisabled],
  (state: LogisticsAndPayments, isDisabledLineCredit: boolean): boolean => {
    const logistic = state.logistics;
    const payments = state.payment;
    if (state.logistics.TieneFleteExpress) {
      const daysInvalid = filter(state.routeList, (o: RutaEntrega) => o.ValorEsperado <= 0);
      return (
        !isEmpty(logistic.ConceptoFleteExpress) &&
        !isEmpty(logistic.LeyendaFleteExpress) &&
        isEmpty(daysInvalid) &&
        logistic.PrecioFleteExpress > 0 &&
        payments.configuracionPagos.IdCatCondicionesDePago !== DEFAULT_UUID &&
        payments.configuracionPagos.IdCatCondicionesDePago !== null &&
        payments.bankAccounts?.length > 0 &&
        (!isDisabledLineCredit
          ? payments.configuracionPagos.LineaCredito > 0
          : isDisabledLineCredit)
      );
    } else {
      return (
        payments.configuracionPagos.IdCatCondicionesDePago !== DEFAULT_UUID &&
        payments.configuracionPagos.IdCatCondicionesDePago !== null &&
        payments.bankAccounts?.length > 0 &&
        (!isDisabledLineCredit
          ? payments.configuracionPagos.LineaCredito > 0
          : isDisabledLineCredit)
      );
    }
  },
);
