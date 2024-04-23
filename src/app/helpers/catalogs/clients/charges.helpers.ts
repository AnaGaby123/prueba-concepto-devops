import {DatosFacturacionClienteDetalle} from 'api-catalogos';
import {filter, find} from 'lodash-es';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ENUM_PAYMENT_CONDITIONS} from '@appUtil/common.protocols';

export const FacturationDataClient = (
  dataFacturation: DatosFacturacionClienteDetalle,
  paymentConditionsDropList,
  paymentForm,
  company,
  typeRevision,
  useCFDI,
  paymentMethod,
) => ({
  ...dataFacturation,
  DatosFacturacionCliente: {
    ...dataFacturation.DatosFacturacionCliente,
    ConfiguracionPagos: {
      ...dataFacturation.DatosFacturacionCliente.ConfiguracionPagos,
      paymentConditionsSelected: dataFacturation.CondicionesDePago
        ? dataToDropListPaymentConditions(paymentConditionsDropList, dataFacturation)
        : filter(
            paymentConditionsDropList,
            (o: DropListOption) => o.labelKey === ENUM_PAYMENT_CONDITIONS.prepaid,
          ),
      paymentFormSelected: dataFacturation.CondicionesDePago
        ? dataToDropListPaymentForm(paymentForm, dataFacturation)
        : null,
    },
    ClienteDatosSTP: {
      ...dataFacturation.DatosFacturacionCliente.ClienteDatosSTP,
      enterpriseSelected: dataToDropListEnterprise(company, dataFacturation),
      publicationEnterpriseSelected: dataToDropListPublicationsEnterprise(company, dataFacturation),
    },
    CatUseCFDISelected: dataToDropListUseCFDI(useCFDI, dataFacturation),
    CatPaymentMethodCFDISelected: dataToDropPaymentMethodCFDI(paymentMethod, dataFacturation),
    CatRevisionSelected: dataToDropListRevision(typeRevision, dataFacturation),
  },
});
export const dataToDropListPaymentConditions = (data, dataFacturationCatalogs) => {
  return find(
    data,
    (o) =>
      dataFacturationCatalogs.DatosFacturacionCliente.ConfiguracionPagos.IdCatCondicionesDePago ===
      o.value,
  );
};

export const dataToDropListPaymentForm = (data, dataFacturationCatalogs) => {
  return find(
    data,
    (o) =>
      dataFacturationCatalogs.DatosFacturacionCliente.ConfiguracionPagos.IdCatMedioDePago ===
      o.value,
  );
};

export const dataToDropListUseCFDI = (data, dataFacturationCatalogs) => {
  return find(
    data,
    (o) => dataFacturationCatalogs.DatosFacturacionCliente.IdCatUsoCFDI === o.value,
  );
};
export const dataToDropPaymentMethodCFDI = (data, dataFacturationCatalogs) => {
  return find(
    data,
    (o) => dataFacturationCatalogs.DatosFacturacionCliente.IdCatMetodoDePagoCFDI === o.value,
  );
};
export const dataToDropListRevision = (data, dataFacturationCatalogs) => {
  return find(
    data,
    (o) => dataFacturationCatalogs.DatosFacturacionCliente.IdCatRevision === o.value,
  );
};
export const dataToDropListEnterprise = (data, dataFacturationCatalogs) => {
  return find(
    data,
    (o) => dataFacturationCatalogs.DatosFacturacionCliente.ClienteDatosSTP.IdEmpresa === o.value,
  );
};
export const dataToDropListPublicationsEnterprise = (data, dataFacturationCatalogs) => {
  const {IdEmpresaPublicaciones} = dataFacturationCatalogs.DatosFacturacionCliente.ClienteDatosSTP;
  if (!IdEmpresaPublicaciones) {
    return find(
      data,
      (o) => dataFacturationCatalogs.DatosFacturacionCliente.ClienteDatosSTP.IdEmpresa === o.value,
    );
  }
  return data.find((o) => o.value === IdEmpresaPublicaciones);
};
