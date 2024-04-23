import {createSelector} from '@ngrx/store';

import {ResumeGroupQueryInfo, VDireccion, VPpPedidoTipoPartidaCotizacionObj} from 'api-logistica';
import {ContactoDetalleObj} from 'api-catalogos';
import {
  ICorrectData,
  ICustomer,
  IOrder,
  IPpPartidaPedidoDetalleValidateAdjustment,
  IPurchase,
  ITotalDividedEntries,
  ITotalsEntries,
  TotalItemsOrder,
  ValidateAdjustmentDetailsState,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';
import {ValidateAdjustmentState} from '@appModels/store/pendings/validate-adjustment/validate-adjustment.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

import {selectValidateAdjustment} from '@appSelectors/pendings/pendings.selectors';
import {concat, countBy, filter, find, flow, forEach, isEmpty, sumBy} from 'lodash-es';
import {IClientContact} from '@appModels/shared/shared.models';
import {buildInternalSalesItem} from '@appHelpers/pending/validate-adjustment/validate-adjusment.helpers';
import {IFreightItem, InternalSalesItem} from '@appModels/table/internal-sales-item';
import {buildAddressFormat, getTotalFreightsInOc} from '@appUtil/util';
import {IPpPartidaPedidoDetallePretamitar} from '@appModels/store/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.models';
import {FREIGHT_EXPRESS, FREIGHTS_LAST_MILE} from '@appUtil/common.protocols';

export const selectValidateDetails = createSelector(
  selectValidateAdjustment,
  (state: ValidateAdjustmentState): ValidateAdjustmentDetailsState =>
    state.validateAdjustmentDetails,
);
export const selectCustomer = createSelector(
  selectValidateDetails,
  (state: ValidateAdjustmentDetailsState): ICustomer => state.customerSelected,
);
export const selectedOrder = createSelector(
  selectValidateDetails,
  (state: ValidateAdjustmentDetailsState): IOrder => state.orderSelected,
);
export const selectStatusApiOrderList = createSelector(
  selectValidateDetails,
  (state: ValidateAdjustmentDetailsState): number => state.apiStatusOrderList,
);
export const selectStatusApiIssueAndItemsOrder = createSelector(
  selectValidateDetails,
  (state: ValidateAdjustmentDetailsState): number => state.apisStatusIssueAndItemsOrder,
);

export const selectDataMail = createSelector(selectedOrder, (state: IOrder) => state.mailData);
export const selectContact = createSelector(
  selectedOrder,
  (state: IOrder): ContactoDetalleObj => state.ContactoDetalle,
);
export const selectCurrencyLabel = createSelector(
  selectedOrder,
  (state: IOrder): string => state?.catMoneda?.ClaveMoneda,
);
export const selectItemOrdersResults = createSelector(
  selectedOrder,
  (state: IOrder) => state?.itemsOrderSelected || [],
);

export const selectInternalSalesItem = createSelector(
  selectItemOrdersResults,
  selectedOrder,
  (state: any[], orderSelected: IOrder) => {
    let items = state;
    if (
      orderSelected?.ppPedidoFletesUltimaMilla?.length > 0 ||
      (orderSelected?.ppPedidoFletesExpressObj?.length > 0 && orderSelected?.EsFleteDesglosado)
    ) {
      const freightItem: IFreightItem = {
        descriptionFreight:
          orderSelected?.ppPedidoFletesExpressObj?.length >= 1
            ? FREIGHT_EXPRESS
            : FREIGHTS_LAST_MILE,
        iva: getTotalFreightsInOc(
          orderSelected?.ppPedidoFletesUltimaMilla,
          orderSelected?.ppPedidoFletesExpressObj,
          {iva: true},
        ),
        subtotal: getTotalFreightsInOc(
          orderSelected?.ppPedidoFletesUltimaMilla,
          orderSelected?.ppPedidoFletesExpressObj,
          {subtotal: true},
        ),
        total: getTotalFreightsInOc(
          orderSelected?.ppPedidoFletesUltimaMilla,
          orderSelected?.ppPedidoFletesExpressObj,
        ),
      };
      items = concat(items, [{freightItem}]);
    }
    return items;
  },
);
export const selectActiveEntriesListResults = createSelector(
  selectItemOrdersResults,
  (
    state: IPpPartidaPedidoDetalleValidateAdjustment[],
  ): IPpPartidaPedidoDetalleValidateAdjustment[] =>
    filter(state, (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.Activo),
);
export const selectValidateAndInvalidateEntries = createSelector(
  selectItemOrdersResults,
  (state: IPpPartidaPedidoDetalleValidateAdjustment[]): ITotalDividedEntries => {
    return state
      ? flow(
          () => countBy(state, (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.Validada),
          (counts) => ({
            validate: counts.true ? counts.true : 0,
            invalidate: counts.false ? counts.false : 0,
          }),
        )()
      : {validate: 0, invalidate: 0};
  },
);
export const selectControlledCount = createSelector(selectItemOrdersResults, (state): number => {
  let cont = 0;
  forEach(state, (o: IPpPartidaPedidoDetalleValidateAdjustment) => {
    if (o.cotPartidaCotizacionDetalle?.vProducto?.Controlado) {
      cont++;
    }
  });
  return cont;
});
export const selectTotalsEntries = createSelector(
  selectItemOrdersResults,
  (state: IPpPartidaPedidoDetalleValidateAdjustment[]): ITotalsEntries => ({
    controlled: filter(
      state,
      (o: IPpPartidaPedidoDetalleValidateAdjustment) =>
        o.Activo && o?.cotPartidaCotizacionDetalle?.vProducto?.Controlado,
    ).length,
  }),
);
export const selectTotalItems = createSelector(selectedOrder, (state: IOrder): number =>
  state?.TipoPartidasCotizacion
    ? sumBy(state?.TipoPartidasCotizacion, (o: VPpPedidoTipoPartidaCotizacionObj) => o.Total)
    : 0,
);
export const selectedOrdersList = createSelector(
  selectValidateDetails,
  (state: ValidateAdjustmentDetailsState): IPurchase => state.orders,
);
export const selectedOrdersResults = createSelector(
  selectedOrdersList,
  (state: IPurchase): IOrder[] => (state?.Results?.length > 0 ? state.Results : []),
);
// export const selectKeyPadOptions = createSelector(
//   selectValidateDetails,
//   (state: ValidateAdjustmentDetailsState): Array<DropListOption> => state.keyPadOptions,
// );
// export const selectKeyPadOption = createSelector(
//   selectValidateDetails,
//   (state: ValidateAdjustmentDetailsState): DropListOption => state.keyPadSelected,
// );
export const selectFilterOptions = createSelector(
  selectValidateDetails,
  (state: ValidateAdjustmentDetailsState): Array<DropListOption> => state.filters,
);
export const selectFilterOptionSelected = createSelector(
  selectValidateDetails,
  (state: ValidateAdjustmentDetailsState): DropListOption => state.filterSelected,
);
export const selectSearchTerm = createSelector(
  selectValidateDetails,
  (state: ValidateAdjustmentDetailsState): string => state.searchTerm,
);
export const selectData64 = createSelector(
  selectValidateDetails,
  (state: ValidateAdjustmentDetailsState): string => state.fileBase64,
);
export const selectOpenViewFile = createSelector(
  selectValidateDetails,
  (state: ValidateAdjustmentDetailsState): boolean => state.openViewFile,
);
export const selectValidateIncidenceEntries = createSelector(
  selectItemOrdersResults,
  (state: IPpPartidaPedidoDetalleValidateAdjustment[]): boolean =>
    !isEmpty(state) &&
    filter(state, (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.Validada === false).length ===
      filter(
        state,
        (o: IPpPartidaPedidoDetalleValidateAdjustment) =>
          !o.Validada &&
          o.ppIncidenciaPartida &&
          o.ppIncidenciaPartida.Comentarios &&
          (o.ppIncidenciaPartida.Catalogo ||
            o.ppIncidenciaPartida.Descripcion ||
            o.ppIncidenciaPartida.Presentacion ||
            o.ppIncidenciaPartida.Marca ||
            o.ppIncidenciaPartida.TiempoEstimadoEntrega ||
            o.ppIncidenciaPartida.IVA ||
            o.ppIncidenciaPartida.PrecioUnitario ||
            o?.ppIncidenciaPartida?.Moneda ||
            o?.ppIncidenciaPartida?.FechaRealizacionEnCapacitacion),
      ).length,
);

export const selectBillingAddress = createSelector(
  selectedOrder,
  (state: IOrder): VDireccion => state?.DatosFacturacionClienteDetalle?.DireccionFacturacion,
);
export const selectBillingDataClient = createSelector(
  selectedOrder,
  (state) => state.DatosFacturacionClienteDetalle,
);
export const processWithoutOC = createSelector(
  selectBillingDataClient,
  (state) => state?.Cliente?.TramitarSinOrdenDeCompra,
);
export const processWithInternalOc = createSelector(
  selectBillingDataClient,
  (state) => state?.Cliente?.TramitarConOrdenDeCompraInterna,
);
export const selectBillingAddressFormat = createSelector(
  selectBillingAddress,
  (billingAddress: VDireccion): string => buildAddressFormat(billingAddress),
);
export const validatePreProcessTramitable = createSelector(
  selectedOrder,
  selectItemOrdersResults,
  selectValidateIncidenceEntries,
  selectBillingAddress,
  selectCustomer,
  (
    state: IOrder,
    entries: IPpPartidaPedidoDetalleValidateAdjustment[],
    validateIncidence: boolean,
    billingAddress: VDireccion,
    client: ICustomer,
  ) => {
    // DOCS: Partidas activas que no estan chequeadas
    const activeAndNotCheckedEntries = filter(
      entries,
      (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.Validada === null && o.Activo,
    );
    // DOCS: Partidas activas
    const activeItems = filter(
      entries,
      (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.Activo === true,
    );
    // DOCS: Indica si todas las partidas están chequeadas
    const allItemsAreChecked = isEmpty(activeAndNotCheckedEntries);
    // DOCS: Indica si una o más partidas (pueden ser todas) son válidas
    const oneOrMoreItemsAreTrue = !isEmpty(
      filter(entries, (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.Validada),
    );
    // DOCS: Indica si todas las partidas son válidas
    const noneItemsAreFalse = isEmpty(
      filter(entries, (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.Validada === false),
    );
    // DOCS: Indica si todos los checks a nivel pedido estan marcados (no importa si es true o false)
    const allOrderChecksAreChecked =
      state.ppPedidoConfiguracion?.EmpresaValidada !== null &&
      state.ppPedidoConfiguracion?.RazonSocialValidado !== null &&
      state.ppPedidoConfiguracion?.CondicionesDePagoValidado !== null &&
      state.ppPedidoConfiguracion?.oCSinIrregularidades !== null &&
      state.ppPedidoConfiguracion?.DireccionClienteEntregaValidado !== null;

    // DOCS: Indica si algún check a nivel pedido es inválido
    const allOrderCheckAreTrue =
      state.ppPedidoConfiguracion?.EmpresaValidada &&
      state.ppPedidoConfiguracion?.RazonSocialValidado &&
      state.ppPedidoConfiguracion?.CondicionesDePagoValidado &&
      state.ppPedidoConfiguracion?.oCSinIrregularidades &&
      state.ppPedidoConfiguracion?.DireccionClienteEntregaValidado;
    // DOCS: Indica si todos los datos requeridos han sido llenados
    const allRequiredDataIsFull =
      !isEmpty(entries) && // DOCS: Si hay al menos una partida en el pedido
      activeItems?.length > 0 && // DOCS: No entiendo porque valida si al menos una partida esta activa
      allOrderChecksAreChecked && // DOCS: Todos los checks del pedido están chequeados
      allItemsAreChecked && // DOCS: Todas las partidas están chequeadas
      validateIncidence && // DOCS: Todas las partidas inválidas tienen su inconsistencia llena
      billingAddress; // DOCS: Existe una dirección de facturación
    // DOCS: Validación para cliente que acepta parciales en la dirección seleccionada
    const validationAcceptPartials =
      state.DireccionEntrega?.AceptaParciales && oneOrMoreItemsAreTrue; // DOCS: Si al menos una partida es válida

    // DOCS: Validación para cliente que no acepta parciales en la dirección seleccionada
    const validationNotAcceptPartials =
      !state.DireccionEntrega?.AceptaParciales && noneItemsAreFalse; // DOCS: Si todas las partidas son válidas
    const clientIsValid =
      !client?.TramitarConOrdenDeCompraInterna && // DOCS: Si el cliente no tramita con OC interna
      (client?.TramitarSinOrdenDeCompra ||
        // DOCS: Si el cliente tramita con OC y tiene OC
        (!client?.TramitarSinOrdenDeCompra &&
          !client?.TramitarConOrdenDeCompraInterna &&
          state.ConOrdenDeCompra));
    return (
      allRequiredDataIsFull &&
      allOrderCheckAreTrue &&
      clientIsValid &&
      (validationAcceptPartials || validationNotAcceptPartials)
    );
    /*    const validationAcceptPartials =
      activeItems?.length > 0 &&
      state.AceptaParciales === true &&
      state.ppPedidoConfiguracion?.EmpresaValidada &&
      state.ppPedidoConfiguracion?.RazonSocialValidado &&
      state.ppPedidoConfiguracion?.CondicionesDePagoValidado &&
      state.ppPedidoConfiguracion?.oCSinIrregularidades &&
      allItemsAreChecked &&
      oneOrMoreItemsAreTrue &&
      validateIncidence;

    const validationNotAcceptPartials =
      activeItems?.length > 0 &&
      state.AceptaParciales === false &&
      state.ppPedidoConfiguracion?.EmpresaValidada &&
      state.ppPedidoConfiguracion?.RazonSocialValidado &&
      state.ppPedidoConfiguracion?.CondicionesDePagoValidado &&
      state.ppPedidoConfiguracion?.oCSinIrregularidades &&
      allItemsAreChecked &&
      noneItemsAreFalse &&
      validateIncidence;
    return validationAcceptPartials || validationNotAcceptPartials; */
  },
);
export const validatePreProcessNotTramitable = createSelector(
  selectedOrder,
  selectItemOrdersResults,
  selectValidateIncidenceEntries,
  selectBillingAddress,
  selectCustomer,
  (
    state: IOrder,
    entries: IPpPartidaPedidoDetalleValidateAdjustment[],
    validateIncidence: boolean,
    billingAddress: VDireccion,
    client: ICustomer,
  ) => {
    // DOCS: Partidas activas que no estan chequeadas
    const activeAndNotCheckedEntries = filter(
      entries,
      (o: IPpPartidaPedidoDetallePretamitar) => o.Validada === null && o.Activo,
    );
    // DOCS: Partidas activas
    const entriesActive = filter(
      entries,
      (o: IPpPartidaPedidoDetallePretamitar) => o.Activo === true,
    );
    // DOCS: Indica si todas las partidas están chequeadas
    const allItemsAreChecked = isEmpty(activeAndNotCheckedEntries);
    // DOCS: Indica si todas las partidas son inválidas
    const noneItemsAreTrue = isEmpty(
      filter(entries, (o: IPpPartidaPedidoDetallePretamitar) => o.Validada),
    );
    // DOCS: Indica si una o más partidas (pueden ser todas) son inválidas
    const oneOrMoreItemsAreFalse = !isEmpty(
      filter(entries, (o: IPpPartidaPedidoDetallePretamitar) => o.Validada === false),
    );

    // DOCS: Indica si todos los checks a nivel pedido estan marcados (no importa si es true o false)
    const allOrderChecksAreChecked =
      state.ppPedidoConfiguracion?.EmpresaValidada !== null &&
      state.ppPedidoConfiguracion?.RazonSocialValidado !== null &&
      state.ppPedidoConfiguracion?.CondicionesDePagoValidado !== null &&
      state.ppPedidoConfiguracion?.oCSinIrregularidades !== null &&
      state.ppPedidoConfiguracion?.DireccionClienteEntregaValidado !== null;

    // DOCS: Indica si algún check a nivel pedido es inválido
    const oneOrMoreOrderCheckAreFalse =
      !state.ppPedidoConfiguracion?.EmpresaValidada ||
      !state.ppPedidoConfiguracion?.RazonSocialValidado ||
      !state.ppPedidoConfiguracion?.CondicionesDePagoValidado ||
      !state.ppPedidoConfiguracion?.oCSinIrregularidades ||
      !state.ppPedidoConfiguracion?.DireccionClienteEntregaValidado;

    // DOCS: Indica si todos los datos requeridos han sido llenados
    const allRequiredDataIsFull =
      !isEmpty(entries) && // DOCS: Si hay al menos una partida en el pedido
      entriesActive?.length > 0 && // DOCS: No entiendo porque valida si al menos una partida esta activa
      allOrderChecksAreChecked && // DOCS: Todos los checks del pedido están chequeados
      allItemsAreChecked && // DOCS: Todas las partidas están chequeadas
      validateIncidence && // DOCS: Todas las partidas inválidas tienen su inconsistencia llena
      billingAddress; // DOCS: Existe una dirección de facturación

    // DOCS: Validación para cliente que acepta parciales en la dirección seleccionada
    const validationAcceptPartials = state.DireccionEntrega?.AceptaParciales && noneItemsAreTrue; // DOCS: Si todas las partidas no están validadas

    const validationNotAcceptPartials =
      !state.DireccionEntrega?.AceptaParciales && oneOrMoreItemsAreFalse; // DOCS: No acepta parciales // DOCS: Si un check a nivel pedido no esta validado o al menos una partidas no están validada

    // DOCS: Validación del cliente y su configuración de OC
    const clientIsInvalid =
      client?.TramitarConOrdenDeCompraInterna || // DOCS: Si el cliente tramita con OC interna
      // DOCS: Si el cliente tramita con OC y no tiene OC
      (!client?.TramitarSinOrdenDeCompra &&
        !client?.TramitarConOrdenDeCompraInterna &&
        !state.ConOrdenDeCompra);

    return (
      allRequiredDataIsFull && // DOCS: Todos los datos requeridos han sido llenados
      (clientIsInvalid || // DOCS: Cliente es inválido
      oneOrMoreOrderCheckAreFalse || // DOCS: El pedido es inválido
      validationAcceptPartials || // DOCS: No pasa la validación de acepta parciales
        validationNotAcceptPartials) // DOCS: No pasa la validación de no acepta parciales
    );
    /*    const activeAndNotCheckedEntries = filter(
      entries,
      (o: IPpPartidaPedidoDetallePretamitar) => o.Validada === null && o.Activo,
    );
    // DOCS: Partidas activas
    const entriesActive = _.filter(
      entries,
      (o: IPpPartidaPedidoDetallePretamitar) => o.Activo === true,
    );
    // DOCS: Indica si todas las partidas están chequeadas
    const allItemsAreChecked = _.isEmpty(activeAndNotCheckedEntries);
    // DOCS: Indica si todas las partidas son inválidas
    const noneItemsAreTrue = _.isEmpty(
      _.filter(entries, (o: IPpPartidaPedidoDetallePretamitar) => o.Validada),
    );
    // DOCS: Indica si una o más partidas (pueden ser todas) son inválidas
    const oneOrMoreItemsAreFalse = !_.isEmpty(
      _.filter(entries, (o: IPpPartidaPedidoDetallePretamitar) => o.Validada === false),
    );

    // DOCS: Indica si todos los checks a nivel pedido estan marcados (no importa si es true o false)
    const allOrderChecksAreChecked =
      state.ppPedidoConfiguracion?.EmpresaValidada !== null &&
      state.ppPedidoConfiguracion?.RazonSocialValidado !== null &&
      state.ppPedidoConfiguracion?.CondicionesDePagoValidado !== null &&
      state.ppPedidoConfiguracion?.oCSinIrregularidades !== null &&
      state.ppPedidoConfiguracion?.DireccionClienteEntregaValidado !== null;

    // DOCS: Indica si algún check a nivel pedido es inválido
    const oneOrMoreOrderCheckAreFalse =
      !state.ppPedidoConfiguracion?.EmpresaValidada ||
      !state.ppPedidoConfiguracion?.RazonSocialValidado ||
      !state.ppPedidoConfiguracion?.CondicionesDePagoValidado ||
      !state.ppPedidoConfiguracion?.oCSinIrregularidades ||
      !state.ppPedidoConfiguracion?.DireccionClienteEntregaValidado;

    // DOCS: Indica si todos los datos requeridos han sido llenados
    const allRequiredDataIsFull =
      !_.isEmpty(entries) && // DOCS: Si hay al menos una partida en el pedido
      entriesActive?.length > 0 && // DOCS: No entiendo porque valida si al menos una partida esta activa
      allOrderChecksAreChecked && // DOCS: Todos los checks del pedido están chequeados
      allItemsAreChecked && // DOCS: Todas las partidas están chequeadas
      validateIncidence && // DOCS: Todas las partidas inválidas tienen su inconsistencia llena
      billingAddress; // DOCS: Existe una dirección de facturación

    // DOCS: Validación para cliente que acepta parciales en la dirección seleccionada
    const validationAcceptPartials = state.AceptaParciales && noneItemsAreTrue; // DOCS: Si todas las partidas no están validadas

    const validationNotAcceptPartials = !state.AceptaParciales && oneOrMoreItemsAreFalse; // DOCS: No acepta parciales // DOCS: Si un check a nivel pedido no esta validado o al menos una partidas no están validada

    // DOCS: Validación del cliente y su configuración de OC
    const clientIsInvalid =
      client?.TramitarConOrdenDeCompraInterna || // DOCS: Si el cliente tramita con OC interna
      // DOCS: Si el cliente tramita con OC y no tiene OC
      (!client?.TramitarSinOrdenDeCompra &&
        !client?.TramitarConOrdenDeCompraInterna &&
        !state.ConOrdenDeCompra);

    return (
      allRequiredDataIsFull && // DOCS: Todos los datos requeridos han sido llenados
      (clientIsInvalid || // DOCS: Cliente es inválido
      oneOrMoreOrderCheckAreFalse || // DOCS: El pedido es inválido
      validationAcceptPartials || // DOCS: No pasa la validación de acepta parciales
        validationNotAcceptPartials) // DOCS: No pasa la validación de no acepta parciales
    );
    /*    const activeAndNotCheckedEntries = _.filter(
      entries,
      (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.Validada === null && o.Activo,
    );
    const entriesActive = filter(
      entries,
      (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.Activo === true,
    );
    const allItemsAreChecked = isEmpty(activeAndNotCheckedEntries);
    const noneItemsAreTrue = isEmpty(
      filter(entries, (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.Validada),
    );
    const oneOrMoreItemsAreFalse = !isEmpty(
      filter(entries, (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.Validada === false),
    );

    const checksAreChecked =
      state.ppPedidoConfiguracion?.EmpresaValidada !== null &&
      state.ppPedidoConfiguracion?.RazonSocialValidado !== null &&
      state.ppPedidoConfiguracion?.CondicionesDePagoValidado !== null;

    const oneOrMoreCheckAreFalse =
      state.ppPedidoConfiguracion?.EmpresaValidada !== true ||
      state.ppPedidoConfiguracion?.RazonSocialValidado !== true ||
      state.ppPedidoConfiguracion?.CondicionesDePagoValidado !== true;

    const validationAcceptPartials =
      entriesActive?.length > 0 &&
      state.AceptaParciales &&
      checksAreChecked &&
      (oneOrMoreCheckAreFalse || noneItemsAreTrue) &&
      allItemsAreChecked &&
      !isEmpty(entries) &&
      validateIncidence;

    const validationNotAcceptPartials =
      entriesActive?.length > 0 &&
      !state.AceptaParciales &&
      checksAreChecked &&
      (oneOrMoreCheckAreFalse || oneOrMoreItemsAreFalse) &&
      allItemsAreChecked &&
      !isEmpty(entries) &&
      validateIncidence;
    return validationAcceptPartials || validationNotAcceptPartials;*/
  },
);

export const selectQueryInfoSubDashboardDetails = createSelector(
  selectSearchTerm,
  selectFilterOptionSelected,
  selectCustomer,
  // selectKeyPadOption,

  (
    searchTerm: string,
    filterSelected: DropListOption,
    client: ICustomer,
    // keyPad: DropListOption,
  ): ResumeGroupQueryInfo => {
    let filters: ResumeGroupQueryInfo = {
      Filters: [
        {
          NombreFiltro: 'IdCliente',
          ValorFiltro: client.IdCliente,
        },
        {
          NombreFiltro: 'Tramitado',
          ValorFiltro: false,
        },
        {
          NombreFiltro: 'Intramitable',
          ValorFiltro: false,
        },
        {
          NombreFiltro: 'ValidarAjuste',
          ValorFiltro: '',
        },
      ],
      SortField: 'FechaRegistro',
      SortDirection: 'desc',
    };

    // if (keyPad.value !== '1') {
    //   filters.Filters = [
    //     ...filters.Filters,
    //     {
    //       NombreFiltro: 'ConOrdenDeCompra',
    //       ValorFiltro: keyPad.value === '2',
    //     },
    //   ];
    // }

    if (filterSelected.value !== '1') {
      filters = {
        ...filters,
        SortDirection: 'asc',
      };
    }

    if (searchTerm) {
      filters.Filters = [
        ...filters.Filters,
        {
          NombreFiltro: 'OrdenDeCompra',
          ValorFiltro: searchTerm,
        },
      ];
    }

    return filters;
  },
);

export const selectQueryItemsQuoteDetails = createSelector(
  selectedOrder,
  (state: IOrder): ResumeGroupQueryInfo => {
    return {
      Filters: [
        {
          NombreFiltro: 'IdPPPedido',
          ValorFiltro: state.IdPPPedido,
        },
      ],
      SortField: 'Numero',
      SortDirection: 'asc',
    };
  },
);

export const selectDeliveryAddressSelected = createSelector(
  selectedOrder,
  (order: IOrder): VDireccion => order?.DireccionEntrega,
);
export const selectDeliveryAddresses = createSelector(
  selectValidateDetails,
  (details: ValidateAdjustmentDetailsState) => details.deliveryAddresses,
);

export const selectClientContactData = createSelector(
  selectedOrder,
  selectCustomer,
  selectContact,
  selectDeliveryAddressSelected,
  (
    state: IOrder,
    client: ICustomer,
    contact: ContactoDetalleObj,
    deliveryAddress: VDireccion,
  ): IClientContact => ({
    hasCredit: !client?.SinCredito,
    clientName: client?.Nombre,
    decisionLevel: client?.NivelIngreso,
    category: client?.Categoria,
    image: client?.imageHover,
    contactName: contact?.Nombres
      ? `${contact?.Nombres} ${contact?.ApellidoPaterno} ${contact?.ApellidoMaterno}`
      : null,
    assignedEsacName: client?.ESAC,
    department: contact?.Departamento,
    mail: contact?.CorreoElectronico[0]?.Correo,
    incomeLevel: client?.NivelIngreso,
    position: contact?.Puesto,
    telephoneNumber: contact?.NumeroTelefonico[0]?.Numero,
    telephoneNumberExtension: contact?.NumeroTelefonico[0]?.Extension,
    acceptsPartial: deliveryAddress?.AceptaParciales,
    showSendGuide: !!deliveryAddress?.EsMensajeriaInterna,
    sendGuide: deliveryAddress?.PagaGuiaEnvio,
  }),
);

export const hasFreights = createSelector(selectedOrder, (order: IOrder): boolean => {
  return (
    order?.ppPedidoFletesExpressObj?.length > 0 || order?.ppPedidoFletesUltimaMilla?.length > 0
  );
});

export const totalsItemsOrderSelected = createSelector(
  selectItemOrdersResults,
  selectedOrder,
  (state: IPpPartidaPedidoDetalleValidateAdjustment[], order: IOrder): TotalItemsOrder => {
    return {
      total: order.ValorTotal,
      subtotal: order.Subtotal,
      iva: order.Iva,
    };
  },
);
export const selectedOrderAcceptPartials = createSelector(
  selectedOrder,
  (state: IOrder): boolean => state.AceptaParciales,
);

export const selectClientValidation = createSelector(
  selectedOrder,
  (state: IOrder): ICorrectData => state.dataValidation,
);

// DOCS: VALIDACIONES PARA LAS BANDERAS TRAMITABLE O INTRAMITABLE PARA EL BODY DE LA TRANSACCIÓN
export const validatorForTramitableAndIntramitable = createSelector(
  [selectedOrder, selectActiveEntriesListResults, processWithoutOC, processWithInternalOc],
  (
    order: IOrder,
    items: IPpPartidaPedidoDetalleValidateAdjustment[],
    processWithoutOc: boolean,
    processWithInternalOc: boolean,
  ) => {
    // DOCS: Indica si todas las partidas son válidas
    const allItemsAreTrue = isEmpty(
      filter(
        items,
        (o: IPpPartidaPedidoDetallePretamitar) => o.Validada === false || o.Validada === null,
      ),
    );
    // DOCS: Indica si una o más partidas (pueden ser todas) son válidas
    const oneOrMoreItemsAreTrue = !isEmpty(
      filter(items, (o: IPpPartidaPedidoDetallePretamitar) => o.Validada),
    );
    // DOCS: Validación para cliente que acepta parciales en la dirección seleccionada
    const validationAcceptPartials =
      order.DireccionEntrega?.AceptaParciales && oneOrMoreItemsAreTrue; // DOCS: Si al menos una partida es válida
    // DOCS: Validación para cliente que no acepta parciales en la dirección seleccionada
    const validationNotAcceptPartials = !order.DireccionEntrega?.AceptaParciales && allItemsAreTrue; // DOCS: Si todas las partidas son válidas
    // DOCS: Indica si algún check a nivel pedido es inválido
    const allOrderCheckAreTrue =
      order.ppPedidoConfiguracion?.EmpresaValidada &&
      order.ppPedidoConfiguracion?.RazonSocialValidado &&
      order.ppPedidoConfiguracion?.CondicionesDePagoValidado &&
      order.ppPedidoConfiguracion?.oCSinIrregularidades &&
      order.ppPedidoConfiguracion?.DireccionClienteEntregaValidado;
    // DOCS: Indica si la configuración del cliente es válida
    const clientIsValid =
      !processWithInternalOc && // DOCS: Si el cliente no tramita con OC interna
      (processWithoutOc ||
        // DOCS: Si el cliente tramita con OC y tiene OC
        (!processWithoutOc && !processWithInternalOc && order.ConOrdenDeCompra));

    if (
      clientIsValid &&
      allOrderCheckAreTrue &&
      (validationAcceptPartials || validationNotAcceptPartials)
    ) {
      return {
        tramitable: true,
        intramitable: false,
      };
    }
    return {
      tramitable: false,
      intramitable: true,
    };
  },
);
export const buildInternalItemHeader = createSelector(
  selectItemOrdersResults,
  selectCurrencyLabel,
  selectedOrder,
  (list: any[], currency: string): InternalSalesItem => {
    if (list?.length >= 1) {
      const showNotes = !isEmpty(filter(list, (o, index) => o?.Comentarios));
      const showColumnProFreight = find(
        list,
        (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.PrecioFleteNoDesglosado > 0,
      );
      return buildInternalSalesItem(showNotes, list[0], {
        currency,
        showColumnProFreight: showColumnProFreight !== undefined,
      });
    } else {
      return null;
    }
  },
);
