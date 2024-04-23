import {DatosFacturacionClienteDetalle} from 'api-catalogos';
import {find, map} from 'lodash-es';
import {initialMonthlyRestriction} from '@appModels/store/forms/clients-form/clients-details-form/delivery-billing/delivery-billing-client-form.models';

export const FacturationDataClientRestructuration = (
  dataFacturation: DatosFacturacionClienteDetalle,
  mercantileSociety,
  taxRegime,
  typeAddress,
  currency,
  enterprise,
  themes,
  country,
  regionType,
  region,
) => ({
  ...dataFacturation,
  DatosFacturacionCliente: {
    ...dataFacturation.DatosFacturacionCliente,
    Restriccion: dataFacturation.RestriccionMensualDatosFacturacion
      ? dataFacturation.RestriccionMensualDatosFacturacion
      : initialMonthlyRestriction(),
    RestriccionesT: dataFacturation.RestriccionesTemporalesDatosFacturacion,
    RestriccionesDelete: [],
    Comentarios: map(dataFacturation.ClienteComentario, (o) => {
      return {
        ...o,
        TemaComentario: find(themes, (i) => i.value === o.IdCatTemaComentario).label,
      };
    }),
    ComentariosDeshabilitados: [],
    CorreosCFDI: [],
    OfferCurrencySelected: dataToDropOfferCurrency(currency, dataFacturation),
    CompanySelected: dataToDropCompany(enterprise, dataFacturation),
    MercantileSocietySelected: dataToDropMercantileSociety(
      mercantileSociety,
      dataFacturation?.DatosFacturacionCliente?.IdCatTipoSociedadMercantil,
    ),
    TaxRegimeSelected: dataToDropTaxRegime(taxRegime, dataFacturation),
    BillingCurrencySelected: dataToDropCurrency(currency, dataFacturation),
    TypesChanges: [],
    TypeChangeSelected: {},
    DisableEmails: [],
    isMexican: dataFacturation.EsMexicano,
  },
  DireccionClienteDetalleFacturacion: {
    ...dataFacturation.DireccionClienteDetalleFacturacion,
    catTipoDireccionSelected: dataToDropTypeAddress(typeAddress),
    catCountrySelected: dataToDropCountry(country, dataFacturation),
    catRegionSelected: dataToDropRegion(region, dataFacturation),
    catRegionTypeSelected: dataToDropRegionType(regionType, dataFacturation),
  },
});

export const dataToDropCountry = (data, dataFacturationCatalogs: DatosFacturacionClienteDetalle) =>
  find(
    data,
    (o) =>
      dataFacturationCatalogs?.DireccionClienteDetalleFacturacion?.Direccion.IdCatPais === o.value,
  );

export const dataToDropRegion = (data, dataFacturationCatalogs) =>
  find(
    data,
    (o) =>
      dataFacturationCatalogs?.DireccionClienteDetalleFacturacion?.Direccion.IdCatZona === o.value,
  );
export const dataToDropRegionType = (data, dataFacturationCatalogs) =>
  find(
    data,
    (o) =>
      dataFacturationCatalogs?.DireccionClienteDetalleFacturacion?.Direccion.IdCatRutaEntrega ===
      o.value,
  );
export const dataToDropTypeAddress = (addressType) =>
  find(addressType, (o) => o.label === 'Facturación');
export const dataToDropCurrency = (data, dataFacturationCatalogs) =>
  find(data, (o) => dataFacturationCatalogs?.DatosFacturacionCliente?.IdCatMoneda === o.value);

export const dataToDropTaxRegime = (
  data,
  dataFacturationCatalogs: DatosFacturacionClienteDetalle,
) =>
  find(
    data,
    (o) => dataFacturationCatalogs?.DatosFacturacionCliente?.IdCatRegimenFiscal === o.value,
  );

export const dataToDropMercantileSociety = (
  mercantileSociety,
  IdCatTipoSociedadMercantil: string,
) => find(mercantileSociety, (o) => IdCatTipoSociedadMercantil === o.value);

export const dataToDropOfferCurrency = (data, dataFacturationCatalogs) =>
  find(
    data,
    (o) => dataFacturationCatalogs?.DatosFacturacionCliente?.IdCatMonedaTramitacion === o.value,
  );
export const dataToDropCompany = (
  data,
  dataFacturationCatalogs: DatosFacturacionClienteDetalle,
) => {
  return find(data, (o) => dataFacturationCatalogs?.DatosFacturacionCliente?.IdEmpresa === o.value);
};
