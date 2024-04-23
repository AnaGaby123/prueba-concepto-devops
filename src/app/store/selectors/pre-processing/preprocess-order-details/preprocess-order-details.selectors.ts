import {createSelector} from '@ngrx/store';
import {selectPreprocessOrder} from '@appSelectors/pre-processing/pre-processing.selectors';
import {
  IDetailsTEE,
  IOrder,
  IPreprocessOrderDetails,
} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
import {
  concat,
  filter,
  find,
  forEach,
  includes,
  isEmpty,
  isUndefined,
  map as _map,
  toLower,
} from 'lodash-es';
import {IPpPartidaPedidoDetallePretamitar} from '@appModels/store/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.models';
import {CustomerList} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';
import {IClientContact} from '@appModels/shared/shared.models';
import {
  ContactoDetalleObj,
  CorreoRecibidoClienteRequerimientoObj,
  PpPartidaPedidoAddendaSanofi,
  PpPedidoConfiguracion,
  PpPedidoFleteExpressObj,
  PpPedidoFleteUltimaMilla,
  RestriccionTemporalDatosFacturacion,
} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ResumeGroupQueryInfo, VDireccion} from 'api-catalogos';
import * as moment from 'moment';
import {
  calculateEstimatedDeliveryDate,
  dateWithHoursFormatDate,
  dateWithoutHoursUTCDate,
} from '@appUtil/dates';
import {buildImageNameSave} from '@appUtil/strings';
import {selectCatalogsState} from '@appCore/core.state';
import {CatalogsState} from '@appModels/store/catalogs/catalogs.models';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {IFreightItem, InternalSalesItem} from '@appModels/table/internal-sales-item';
import {
  buildInternalSalesItem,
  getFreightsExpressByIdProvider,
} from '@appHelpers/pending/pre-processing/pre-processing.helpers';
import {
  ENUM_CONTROL_FAMILY,
  FREIGHT_EXPRESS,
  FREIGHTS_LAST_MILE,
  SRC_IMG_TYPE_AVAILABILITY,
  SRC_IMG_TYPE_ITEM,
} from '@appUtil/common.protocols';
import {
  buildAddressFormat,
  getTotalFreightsInOc,
  validateFieldsRequiredString,
} from '@appUtil/util';
import {
  SeeItemDetailsPopBottom,
  SeeItemDetailsPopTop,
} from '@appModels/see-details-item-pop/see-item-details-pop.models';
import {ShoppingCartTotalsModel} from '@appModels/quotation/ShoppingCartTotals.model';

export const selectPreProcessOrder = createSelector(
  selectPreprocessOrder,
  (state: IPreprocessOrderDetails): IPreprocessOrderDetails => state,
);
export const selectPurchaseOrderList = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): IOrder[] => state.purchaseOrderList.Results,
);
export const selectPurchaseOrderTotal = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): number => state.purchaseOrderList.TotalResults,
);
export const selectOptionsFilters = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): DropListOption[] => state.filterData,
);
export const selectFilterSelected = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): DropListOption => state.filterSelected,
);
export const selectOrderSelected = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): IOrder => state?.purchaseOrderSelected,
);
export const selectBillingAddress = createSelector(
  selectOrderSelected,
  (state: IOrder): VDireccion => state.DatosFacturacionClienteDetalle?.DireccionFacturacion,
);
export const selectBillingAddressFormat = createSelector(
  selectBillingAddress,
  (billingAddress: VDireccion): string => buildAddressFormat(billingAddress),
);
export const selectRequieredAddendum = createSelector(
  selectOrderSelected,
  (order: IOrder): boolean => {
    return order?.DatosFacturacionClienteDetalle?.AddendaDeLineaDeOrden;
  },
);
export const selectedOrderAcceptPartials = createSelector(
  selectOrderSelected,
  (state: IOrder): boolean => state.AceptaParciales,
);
export const selectItemsOrder = createSelector(
  selectOrderSelected,
  (state: IOrder): IPpPartidaPedidoDetallePretamitar[] => state.itemsOrder,
);
export const selectEntriesApiStatus = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): number => state.entriesApiStatus,
);
export const selectPedidoConfiguracion = createSelector(
  selectOrderSelected,
  (state: IOrder): PpPedidoConfiguracion => state.ppPedidoConfiguracion,
);

export const selectActiveEntriesListResults = createSelector(
  selectItemsOrder,
  (state: IPpPartidaPedidoDetallePretamitar[]): IPpPartidaPedidoDetallePretamitar[] =>
    filter(state, (o: IPpPartidaPedidoDetallePretamitar) => o.Activo),
);

export const selectClient = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): CustomerList => state.clientSelected,
);

export const selectBillingDataClient = createSelector(
  selectOrderSelected,
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
export const selectExpressFreightsOrder = createSelector(
  selectOrderSelected,
  (state: IOrder): PpPedidoFleteExpressObj[] => state.ppPedidoFletesExpressObj,
);
// DOCS: VALIDACIONES PARA LAS BANDERAS TRAMITABLE O INTRAMITABLE PARA EL BODY DEL GUARDADO
export const validatorForTramitableAndIntramitable = createSelector(
  [selectOrderSelected, selectActiveEntriesListResults, processWithoutOC, processWithInternalOc],
  (
    order: IOrder,
    items: IPpPartidaPedidoDetallePretamitar[],
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
export const selectTotalControlledEntries = createSelector(
  selectItemsOrder,
  (state: IPpPartidaPedidoDetallePretamitar[]): boolean =>
    filter(
      state,
      (o: IPpPartidaPedidoDetallePretamitar) =>
        o.Activo &&
        o.cotPartidaCotizacionDetalle?.vProducto?.Controlado &&
        (o.cotPartidaCotizacionDetalle?.vProducto?.ControlClave ===
          ENUM_CONTROL_FAMILY.Nacionales ||
          o.cotPartidaCotizacionDetalle?.vProducto?.ControlClave === ENUM_CONTROL_FAMILY.Mundiales),
    ).length > 0,
);

export const selectValidateIncidenceEntries = createSelector(
  selectItemsOrder,
  (state: IPpPartidaPedidoDetallePretamitar[]): boolean => {
    // DOCS: Partidas inválidas
    const itemsWithFalseCheck = filter(
      state,
      (o: IPpPartidaPedidoDetallePretamitar) => o.Validada === false,
    );
    // DOCS: Partidas inválidas con su inconsistencia llena
    const itemsWithFalseCheckAndNotEmpty = filter(
      itemsWithFalseCheck,
      (o: IPpPartidaPedidoDetallePretamitar) =>
        o.ppIncidenciaPartida &&
        o.ppIncidenciaPartida.Comentarios &&
        (o.ppIncidenciaPartida.Catalogo ||
          o.ppIncidenciaPartida.Descripcion ||
          o.ppIncidenciaPartida.Presentacion ||
          o.ppIncidenciaPartida.Marca ||
          o.ppIncidenciaPartida.TiempoEstimadoEntrega ||
          o.ppIncidenciaPartida.IVA ||
          o.ppIncidenciaPartida.PrecioUnitario ||
          o.ppIncidenciaPartida.Moneda ||
          o.ppIncidenciaPartida?.FechaRealizacionEnCapacitacion),
    );
    return itemsWithFalseCheck.length === itemsWithFalseCheckAndNotEmpty.length;
  },
);
// DOCS: VALIDACIÓN PARA BOTÓN INTRAMITABLE
export const validatePreProcessNotTramitable = createSelector(
  selectClient,
  selectOrderSelected,
  selectItemsOrder,
  selectValidateIncidenceEntries,
  selectBillingAddress,
  (
    client: CustomerList,
    order: IOrder,
    entries: IPpPartidaPedidoDetallePretamitar[],
    validateIncidence: boolean,
    billingAddress: VDireccion,
  ): boolean => {
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
      order.ppPedidoConfiguracion?.EmpresaValidada !== null &&
      order.ppPedidoConfiguracion?.RazonSocialValidado !== null &&
      order.ppPedidoConfiguracion?.CondicionesDePagoValidado !== null &&
      order.ppPedidoConfiguracion?.oCSinIrregularidades !== null &&
      order.ppPedidoConfiguracion?.DireccionClienteEntregaValidado !== null;

    // DOCS: Indica si algún check a nivel pedido es inválido
    const oneOrMoreOrderCheckAreFalse =
      !order.ppPedidoConfiguracion?.EmpresaValidada ||
      !order.ppPedidoConfiguracion?.RazonSocialValidado ||
      !order.ppPedidoConfiguracion?.CondicionesDePagoValidado ||
      !order.ppPedidoConfiguracion?.oCSinIrregularidades ||
      !order.ppPedidoConfiguracion?.DireccionClienteEntregaValidado;

    // DOCS: Indica si todos los datos requeridos han sido llenados
    const allRequiredDataIsFull =
      !isEmpty(entries) && // DOCS: Si hay al menos una partida en el pedido
      entriesActive?.length > 0 && // DOCS: No entiendo porque valida si al menos una partida esta activa
      allOrderChecksAreChecked && // DOCS: Todos los checks del pedido están chequeados
      allItemsAreChecked && // DOCS: Todas las partidas están chequeadas
      validateIncidence && // DOCS: Todas las partidas inválidas tienen su inconsistencia llena
      billingAddress; // DOCS: Existe una dirección de facturación

    // DOCS: Validación para cliente que acepta parciales en la dirección seleccionada
    const validationAcceptPartials = order.DireccionEntrega?.AceptaParciales && noneItemsAreTrue; // DOCS: Si todas las partidas no están validadas

    const validationNotAcceptPartials =
      !order.DireccionEntrega?.AceptaParciales && oneOrMoreItemsAreFalse; // DOCS: No acepta parciales // DOCS: Si un check a nivel pedido no esta validado o al menos una partidas no están validada

    // DOCS: Validación del cliente y su configuración de OC
    const clientIsInvalid =
      client?.TramitarConOrdenDeCompraInterna || // DOCS: Si el cliente tramita con OC interna
      // DOCS: Si el cliente tramita con OC y no tiene OC
      (!client?.TramitarSinOrdenDeCompra &&
        !client?.TramitarConOrdenDeCompraInterna &&
        !order.ConOrdenDeCompra);

    return (
      allRequiredDataIsFull && // DOCS: Todos los datos requeridos han sido llenados
      (clientIsInvalid || // DOCS: Cliente es inválido
      oneOrMoreOrderCheckAreFalse || // DOCS: El pedido es inválido
      validationAcceptPartials || // DOCS: No pasa la validación de acepta parciales
        validationNotAcceptPartials) // DOCS: No pasa la validación de no acepta parciales
    );
  },
);
// DOCS: VALIDACION PARA BOTÓN TRAMITAR
export const validatePreProcessTramitable = createSelector(
  selectClient,
  selectOrderSelected,
  selectItemsOrder,
  selectValidateIncidenceEntries,
  selectRequieredAddendum,
  selectBillingAddress,
  (
    client: CustomerList,
    order: IOrder,
    entries: IPpPartidaPedidoDetallePretamitar[],
    validateIncidence: boolean,
    requiredAddendum: boolean,
    billingAddress: VDireccion,
  ): boolean => {
    // DOCS: Partidas activas que no estan chequeadas
    const activeAndNotCheckedEntries = filter(
      entries,
      (o: IPpPartidaPedidoDetallePretamitar) => o.Validada === null && o.Activo,
    );
    // DOCS: Partidas activas
    const activeItems = filter(
      entries,
      (o: IPpPartidaPedidoDetallePretamitar) => o.Activo === true,
    );
    // DOCS: Indica si todas las partidas están chequeadas
    const allItemsAreChecked = isEmpty(activeAndNotCheckedEntries);
    // DOCS: Indica si todas las partidas son válidas
    const noneItemsAreFalse = isEmpty(
      filter(
        entries,
        (o: IPpPartidaPedidoDetallePretamitar) =>
          (o.Validada === false || o.Validada === null) && o.Activo,
      ),
    );
    // DOCS: Indica si una o más partidas (pueden ser todas) son válidas
    const oneOrMoreItemsAreTrue = !isEmpty(
      filter(entries, (o: IPpPartidaPedidoDetallePretamitar) => o.Validada && o.Activo),
    );

    // DOCS: Indica si todos los checks a nivel pedido estan marcados (no importa si es true o false)
    const allOrderChecksAreChecked =
      order.ppPedidoConfiguracion?.EmpresaValidada !== null &&
      order.ppPedidoConfiguracion?.RazonSocialValidado !== null &&
      order.ppPedidoConfiguracion?.CondicionesDePagoValidado !== null &&
      order.ppPedidoConfiguracion?.oCSinIrregularidades !== null &&
      order.ppPedidoConfiguracion?.DireccionClienteEntregaValidado !== null;

    // DOCS: Indica si algún check a nivel pedido es inválido
    const allOrderCheckAreTrue =
      order.ppPedidoConfiguracion?.EmpresaValidada &&
      order.ppPedidoConfiguracion?.RazonSocialValidado &&
      order.ppPedidoConfiguracion?.CondicionesDePagoValidado &&
      order.ppPedidoConfiguracion?.oCSinIrregularidades &&
      order.ppPedidoConfiguracion?.DireccionClienteEntregaValidado;

    // DOCS: Indica si han sido llenados los datos de addenda
    const validAddendum = requiredAddendum
      ? isEmpty(
          filter(entries, (partida: IPpPartidaPedidoDetallePretamitar) => {
            const orderLine: string = partida?.ppPartidaPedidoAddendaSanofi?.LineaDeOrden || '';
            const idCatUnit: string = partida?.ppPartidaPedidoAddendaSanofi?.IdCatUnidad || '';
            const v1 = validateFieldsRequiredString(orderLine, 1);
            const v2 = validateFieldsRequiredString(idCatUnit, 1);
            return !v1 || !v2;
          }),
        )
      : true;

    // DOCS: Indica si todos los datos requeridos han sido llenados
    const allRequiredDataIsFull =
      !isEmpty(entries) && // DOCS: Si hay al menos una partida en el pedido
      activeItems?.length > 0 && // DOCS: No entiendo porque valida si al menos una partida esta activa
      allOrderChecksAreChecked && // DOCS: Todos los checks del pedido están chequeados
      allItemsAreChecked && // DOCS: Todas las partidas están chequeadas
      validAddendum && // DOCS: Todas las partidas tienen addenda configurada
      validateIncidence && // DOCS: Todas las partidas inválidas tienen su inconsistencia llena
      billingAddress; // DOCS: Existe una dirección de facturación

    // DOCS: Validación para cliente que acepta parciales en la dirección seleccionada
    const validationAcceptPartials =
      order.DireccionEntrega?.AceptaParciales && oneOrMoreItemsAreTrue; // DOCS: Si al menos una partida es válida

    // DOCS: Validación para cliente que no acepta parciales en la dirección seleccionada
    const validationNotAcceptPartials =
      !order.DireccionEntrega?.AceptaParciales && noneItemsAreFalse; // DOCS: Si todas las partidas son válidas

    const clientIsValid =
      !client?.TramitarConOrdenDeCompraInterna && // DOCS: Si el cliente no tramita con OC interna
      (client?.TramitarSinOrdenDeCompra ||
        // DOCS: Si el cliente tramita con OC y tiene OC
        (!client?.TramitarSinOrdenDeCompra &&
          !client?.TramitarConOrdenDeCompraInterna &&
          order.ConOrdenDeCompra));

    return (
      allRequiredDataIsFull &&
      allOrderCheckAreTrue &&
      clientIsValid &&
      (validationAcceptPartials || validationNotAcceptPartials)
    );
  },
);
export const selectKeyPadOptions = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): DropListOption[] => state.keyPadOptions,
);
export const selectKeyPadOption = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): DropListOption => state.keyPadSelected,
);
export const selectTermSearch = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): string => state.termSearch,
);
export const selectStatusApi = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): number => state.statusApiListOrders,
);
export const selectDataMail = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): CorreoRecibidoClienteRequerimientoObj =>
    state.purchaseOrderSelected.mailData,
);
export const selectData64 = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): string => state.fileBase64,
);
export const selectIsPdf = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): boolean => state.isPDF,
);
export const selectOpenViewFile = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails) => state.openViewFile,
);
export const selectTotalItems = createSelector(selectOrderSelected, (state: IOrder): number => {
  let tot = 0;
  if (state?.TipoPartidasCotizacion) {
    state.TipoPartidasCotizacion.forEach((item) => {
      if (item.Total) {
        tot = tot + item.Total;
      }
    });
  }

  return tot;
});
export const selectIndex = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): number => state.indexOrder,
);

export const selectContact = createSelector(
  selectOrderSelected,
  (state: IOrder): ContactoDetalleObj => state.ContactoDetalle,
);

export const selectCurrencyLabel = createSelector(
  selectOrderSelected,
  (state: IOrder) => state?.catMoneda?.ClaveMoneda,
);
export const selectIdCatCurrency = createSelector(
  selectOrderSelected,
  (state: IOrder): string => state.IdCatMoneda,
);
export const selectIsInAddItem = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): boolean => state.isInAddItem,
);
export const selectViewFileLoading = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): boolean => state.viewFileIsLoading,
);

// TODO: Revisar si se va a implementar
/*export const selectItemSelected = createSelector(selectOrderSelected, (listQuotes: IOrder) => {
  const item = filter(listQuotes, (o) => {
    if (o.isInViewQuotesLinked) {
      return o.quotesLinked;
    }
  });
  return item[0];
});*/
export const selectInvoice = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): string => state.invoice,
);
export const selectDeliveryAddress = createSelector(
  selectOrderSelected,
  (purchaseOrderSelected: IOrder): VDireccion => purchaseOrderSelected?.DireccionEntrega,
);

export const selectDeliveryAddresses = createSelector(
  selectPreprocessOrder,
  (details: IPreprocessOrderDetails): VDireccion[] => details?.deliveryAddresses,
);
export const selectClientContactData = createSelector(
  selectOrderSelected,
  selectClient,
  selectContact,
  selectDeliveryAddress,

  (
    state: IOrder,
    client: CustomerList,
    contact: ContactoDetalleObj,
    deliveryAddress: VDireccion,
  ): IClientContact => ({
    hasCredit: !client?.SinCredito,
    clientName: client?.Nombre,
    decisionLevel: contact?.NivelDecision || 'N/D',
    category: client?.Categoria || 'N/D',
    image: client?.imageHover,
    contactName: contact?.Nombres
      ? `${contact?.Nombres} ${contact?.ApellidoPaterno} ${contact?.ApellidoMaterno}`
      : null,
    assignedEsacName: client?.ESAC || 'N/D',
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

export const selectQueryInfoListOrders = createSelector(
  selectClient,
  selectKeyPadOption,
  selectFilterSelected,
  selectTermSearch,
  (
    client: CustomerList,
    optionSelected: DropListOption,
    filterSelected: DropListOption,
    searchTerm: string,
  ): ResumeGroupQueryInfo => {
    let filters: ResumeGroupQueryInfo = {
      Filters: [
        {
          NombreFiltro: 'IdCliente',
          ValorFiltro: client?.IdCliente,
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
          NombreFiltro: 'Original',
          ValorFiltro: true,
        },
      ],

      SortField: 'FechaRegistro',
      SortDirection: 'desc',
    };

    if (optionSelected.value !== '1') {
      filters = {
        ...filters,
        Filters: [
          ...filters.Filters,
          {
            NombreFiltro: 'ConOrdenDeCompra',
            ValorFiltro: optionSelected.value === '2',
          },
        ],
      };
    }
    if (filterSelected.value === '2') {
      filters = {
        ...filters,
        SortDirection: 'asc',
      };
    }
    if (searchTerm) {
      filters = {
        ...filters,
        Filters: [...filters.Filters, {NombreFiltro: 'OrdenDeCompra', ValorFiltro: searchTerm}],
      };
    }

    return filters;
  },
);

export const selectPopUpTeeItemOrder = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): boolean => state.isOpenPopUpTeeItemOrder,
);

export const selectedItemOrder = createSelector(
  selectOrderSelected,
  (state: IOrder): IPpPartidaPedidoDetallePretamitar => state?.itemOrderSelected,
);
export const selectFeeRangeStart = createSelector(
  selectedItemOrder,
  (item: IPpPartidaPedidoDetallePretamitar): Date => {
    const deliveryDays =
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.TiempoEstimadoEntrega;
    const currentDate = dateWithoutHoursUTCDate();
    const timeSlack = 4;
    return calculateEstimatedDeliveryDate(
      currentDate,
      deliveryDays + timeSlack,
      item?.nonWorkingDays,
    );
  },
);
export const selectFEERangeEnd = createSelector(
  (): Date => {
    const endDate = dateWithoutHoursUTCDate();
    endDate.setFullYear(endDate.getFullYear() + 2);
    return endDate;
  },
);

export const selectFEE = createSelector(
  selectedItemOrder,
  (state: IPpPartidaPedidoDetallePretamitar): Date => {
    const deliveryDays =
      state?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.TiempoEstimadoEntrega;
    const currentDate = dateWithoutHoursUTCDate();
    return calculateEstimatedDeliveryDate(currentDate, deliveryDays, state?.nonWorkingDays);
  },
);
export const selectFechaEstimadaEntregaPartida = createSelector(
  [selectedItemOrder, selectFeeRangeStart],
  (state: IPpPartidaPedidoDetallePretamitar, startDate: Date): Date => {
    return state?.FechaEstimadaEntrega
      ? dateWithHoursFormatDate(state?.FechaEstimadaEntrega)
      : null;
  },
);

export const selectUnavailableDatesCalendarDay = createSelector(
  selectedItemOrder,
  (state: IPpPartidaPedidoDetallePretamitar) => {
    return _map(state?.nonWorkingDays, (o: string) => ({
      day: moment(o, 'YYYY-MM-DD').toDate(),
      enable: false,
    }));
  },
);

export const selectQueryItemsQuoteDetails = createSelector(
  selectOrderSelected,
  (state: IOrder): ResumeGroupQueryInfo => ({
    Filters: [
      {
        NombreFiltro: 'IdPPPedido',
        ValorFiltro: state.IdPPPedido,
      },
    ],
    SortField: 'Numero',
    SortDirection: 'asc',
  }),
);

export const selectValidationBtnButton = createSelector(
  [selectedItemOrder, selectRequieredAddendum],
  (item: IPpPartidaPedidoDetallePretamitar, requiredAddendum: boolean) => {
    const vOrderLine = validateFieldsRequiredString(
      item?.ppPartidaPedidoAddendaSanofi?.LineaDeOrden,
      1,
    );
    const vIdCatUnit = validateFieldsRequiredString(
      item?.ppPartidaPedidoAddendaSanofi?.IdCatUnidad,
    );
    const validAddendum = requiredAddendum ? vOrderLine && vIdCatUnit : true;
    const validScheduled = item?.Programada ? !!item?.FechaEstimadaEntrega : true;
    return validAddendum && validScheduled;
  },
);

export const selectDetailsItemPopTEE = createSelector(
  [selectedItemOrder, selectCurrencyLabel, selectOrderSelected, selectExpressFreightsOrder],
  (
    state: IPpPartidaPedidoDetallePretamitar,
    currency: string,
    orderSelected: IOrder,
    expressFreight: PpPedidoFleteExpressObj[],
  ): IDetailsTEE => {
    if (state) {
      return {
        currency,
        freight: getFreightsExpressByIdProvider(
          expressFreight,
          state?.cotPartidaCotizacionDetalle?.vProducto?.IdProveedorPrincipal,
        ),
        pieces: state?.NumeroDePiezas,
        //DOCS: PUBLICACIONES
        supplement: state?.cotPartidaCotizacionDetalle?.vProductoSuplementarios,
        //DOCS: CAPACITACIÓN
        datesTraining:
          state?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.fechasRealizacionCapacitacion,
        //DOCS: RESTRUCCIONES
        monthlyRestriction: orderSelected.restriccionMensualDatosFacturacion,
        temporaryRestriction: orderSelected.restriccionTemporalDatosFacturacion,
        isActiveTemporaryRestriction:
          orderSelected.DatosFacturacionClienteDetalle?.RestriccionesTemporales,
      };
    }

    return {} as IDetailsTEE;
  },
);

export const selectDetailsItemPopTop = createSelector(
  [selectedItemOrder, selectCurrencyLabel],
  (state: IPpPartidaPedidoDetallePretamitar, currency: string): SeeItemDetailsPopTop => {
    if (state) {
      const typeItem =
        state?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
          ?.TipoPartidaCotizacion;
      const {
        cotPartidaCotizacionDetalle: {vProducto},
      } = state;
      return {
        srcImageTypePresentation: `assets/Images/products/${buildImageNameSave(
          vProducto?.TipoPresentacion,
        )}.svg`,
        srcImageBrand: `assets/Images/logos/${vProducto.NombreImagenMarca?.toLowerCase()}_hover.svg`,
        srcImageAvailability:
          SRC_IMG_TYPE_AVAILABILITY[vProducto?.Disponibilidad?.split(' ')?.join('')] ||
          SRC_IMG_TYPE_AVAILABILITY.Disponible,
        srcImageTypeItem: SRC_IMG_TYPE_ITEM[typeItem] || SRC_IMG_TYPE_ITEM.Original,
        cat: vProducto.Catalogo,
        typePresentation: vProducto?.TipoPresentacion,
        amountPresentation: vProducto.Presentacion,
        unitProduct: vProducto?.Unidad,
        typeUse: vProducto.Uso,
        description: vProducto?.Descripcion,
        type: vProducto?.Tipo,
        subtype: vProducto?.Subtipo,
        control: vProducto?.Control,
        isControlled: vProducto?.Controlado,
        nameProvider: vProducto.NombreProveedor,
        nameBrand: vProducto?.NombreMarca,
        tee: state?.TiempoEstimadoEntrega,
        unitPrice: state?.PrecioUnitario,
        currency: currency,
        publication: {
          nameAuthor: vProducto?.Autor,
          formatPublication: vProducto?.FormatoPublicacion,
        },
        training: {
          typeMode: vProducto?.MedioDifusion,
          timeEvent: vProducto.DuracionEvento,
          numberPerson: vProducto.NumeroDePersonasPorGrupo,
        },
      };
    }

    return {} as SeeItemDetailsPopTop;
  },
);

export const selectDetailsItemPopBottom = createSelector(
  [selectedItemOrder, selectCurrencyLabel],
  (state: IPpPartidaPedidoDetallePretamitar, currency: string): SeeItemDetailsPopBottom => {
    if (state) {
      const {
        cotPartidaCotizacionDetalle: {vProducto},
      } = state;
      return {
        isControlled: vProducto?.Controlado, // DOCS: Es controlado
        numberItem: state?.Numero, //DOCS: Numero de la partida
        amount: state?.NumeroDePiezas, // DOCS: Cantida de piezas
        dateValidation: vProducto?.FechaCaducidadVigenciaCuraduria, //DOCS: Fecha vigencia curaduria
        dateExpiration:
          state?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.FechaCaducidadLote, //DOCS: Fecha de Caducidad del lote
        nameBatch:
          state?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.FechaCaducidadLote, //DOCS: Nombre del lote
        edition: vProducto?.Edicion,
      };
    }
    return {} as SeeItemDetailsPopBottom;
  },
);

export const selectFirstTemporalRestriction = createSelector(
  selectDetailsItemPopTEE,
  (details: IDetailsTEE): RestriccionTemporalDatosFacturacion => {
    return details?.temporaryRestriction?.length > 0 ? details?.temporaryRestriction[0] : {};
  },
);
export const selectUnitListForDropdown = createSelector(
  selectCatalogsState,
  (state: CatalogsState): DropListOption[] => {
    return _map(state.unidadPqf.listUnidad, (o: DropListOptionPqf) => ({
      label: o.label,
      value: o.id,
    }));
  },
);
export const selectAddendaSanofi = createSelector(
  selectedItemOrder,
  (state: IPpPartidaPedidoDetallePretamitar): PpPartidaPedidoAddendaSanofi =>
    state?.ppPartidaPedidoAddendaSanofi,
);

export const selectAddendaOrderLine = createSelector(
  selectAddendaSanofi,
  (state: PpPartidaPedidoAddendaSanofi) => state?.LineaDeOrden,
);

export const selectAddendaUnitOfMeasurement = createSelector(
  selectAddendaSanofi,
  selectUnitListForDropdown,
  (state: PpPartidaPedidoAddendaSanofi, unitList: DropListOption[]): DropListOption => {
    // DOCS: SE CAMBIÓ UnidadDeMedida a IdCatUnidad
    const data = find(unitList, (o: DropListOption) => o.value === state?.IdCatUnidad);
    return {
      label: data?.label,
      value: data?.value,
    };
  },
);

export const selectLastMileFreightOrder = createSelector(
  selectOrderSelected,
  (state: IOrder): PpPedidoFleteUltimaMilla[] => state.ppPedidoFletesUltimaMilla,
);
export const selectHasFreights = createSelector(
  [selectExpressFreightsOrder, selectLastMileFreightOrder],
  (
    expressFreights: PpPedidoFleteExpressObj[],
    lastMileFreights: PpPedidoFleteUltimaMilla[],
  ): boolean => {
    return expressFreights?.length > 0 || lastMileFreights?.length > 0;
  },
);
export const selectTotalFreights = createSelector(
  selectExpressFreightsOrder,
  selectLastMileFreightOrder,
  (
    expressFreights: PpPedidoFleteExpressObj[],
    lastMile: PpPedidoFleteUltimaMilla[],
  ): ShoppingCartTotalsModel => {
    return {
      totalTax: getTotalFreightsInOc(lastMile, expressFreights, {iva: true}),
      subTotal: getTotalFreightsInOc(lastMile, expressFreights, {subtotal: true}),
      totalPriceQuotation: getTotalFreightsInOc(lastMile, expressFreights),
    };
  },
);
export const totalsItemsOrderSelected = createSelector(
  selectItemsOrder,
  selectTotalFreights,
  (
    state: IPpPartidaPedidoDetallePretamitar[],
    totalFreights: ShoppingCartTotalsModel,
  ): ShoppingCartTotalsModel => {
    let total = 0;
    let subtotal = 0;
    let iva = 0;
    forEach(state, (o: IPpPartidaPedidoDetallePretamitar) => {
      if (o.Activo) {
        total += o.Total;
        subtotal += o.Subtotal;
        iva += o.IVA;
      }
    });
    return {
      subTotal: subtotal + totalFreights.subTotal,
      totalTax: iva + totalFreights.totalTax,
      totalPriceQuotation: total + totalFreights.totalPriceQuotation,
    };
  },
);

export const selectItemForReusableHeaderTable = createSelector(
  selectItemsOrder,
  selectCurrencyLabel,
  selectOrderSelected,
  (
    itemsOrder: IPpPartidaPedidoDetallePretamitar[],
    currency: string,
    orderSelected: IOrder,
  ): InternalSalesItem | null => {
    if (itemsOrder?.length) {
      const showNotes = !isEmpty(
        filter(itemsOrder, (o: IPpPartidaPedidoDetallePretamitar) => o.Comentarios),
      );
      //DOCS: MOSTRAR COLUMNA DE PRORRATA DE FLETE
      const existProratedFreight = find(
        itemsOrder,
        (o: IPpPartidaPedidoDetallePretamitar) => o.PrecioFleteNoDesglosado > 0,
      );
      return buildInternalSalesItem(showNotes, itemsOrder[0], currency, {
        orderSelected: orderSelected,
        showColumnProratedFreight: existProratedFreight !== undefined,
      });
    } else {
      return null; // DOCS: DEVUELVE NULL O VACÍO CUANDO itemsOrder NO TIENE DATOS
    }
  },
);
export const selectSearchItemsByCatalog = createSelector(
  selectPreProcessOrder,
  (state: IPreprocessOrderDetails): string => state?.searchItemsByCatalog,
);
export const selectItemsOrderCombined = createSelector(
  selectItemsOrder,
  selectExpressFreightsOrder,
  selectTotalFreights,
  selectOrderSelected,
  selectCurrencyLabel,
  selectSearchItemsByCatalog,
  (
    items: IPpPartidaPedidoDetallePretamitar[],
    freights: PpPedidoFleteExpressObj[],
    totalFreights: ShoppingCartTotalsModel,
    orderSelected: IOrder,
    currency: string,
    searchByCatalog: string,
  ): InternalSalesItem[] => {
    if (items?.length >= 1) {
      // DOCS: MOSTRARÁ LOS FLETES COMO PARTTDA CUANDO LA SUMATORIA DE LOS FLETES EXPRESS Y ÚLTIMA MILLA SEA MAYOR A 0
      if (
        (orderSelected?.ppPedidoFletesExpressObj?.length > 0 ||
          orderSelected?.ppPedidoFletesUltimaMilla?.length > 0) &&
        orderSelected?.EsFleteDesglosado
      ) {
        const freightItem: IFreightItem = {
          descriptionFreight: freights?.length >= 1 ? FREIGHT_EXPRESS : FREIGHTS_LAST_MILE,
          total: totalFreights.totalPriceQuotation,
          subtotal: totalFreights.subTotal,
          iva: totalFreights.totalTax,
        };
        items = concat(items, [{freightItem}]);
      }
      const listItem: InternalSalesItem[] = [];
      const showNotes = !isEmpty(
        filter(items, (o: IPpPartidaPedidoDetallePretamitar) => o.Comentarios),
      );

      //DOCS: MOSTRAR LA COLUMNA  DE PRORRATA DE FLETE
      const existProratedFreight = find(
        items,
        (o: IPpPartidaPedidoDetallePretamitar) => o.PrecioFleteNoDesglosado > 0,
      );

      _map(items, (o: IPpPartidaPedidoDetallePretamitar, index: number) => {
        listItem.push(
          buildInternalSalesItem(showNotes, o, currency, {
            orderSelected,
            index,
            showColumnProratedFreight: existProratedFreight !== undefined,
            freights,
          }),
        );
      });

      if (isUndefined(searchByCatalog) || isEmpty(searchByCatalog)) {
        return listItem;
      } else {
        return filter(listItem, (item) => {
          return includes(
            toLower(item?.data?.cotPartidaCotizacionDetalle?.vProducto?.Catalogo),
            toLower(searchByCatalog),
          );
        });
      }
    } else {
      return [];
    }
  },
);
export const selectHasObservations = createSelector(
  selectOrderSelected,
  (purchaseOrder: IOrder): boolean => purchaseOrder.TieneObservaciones,
);
export const selectObservations = createSelector(
  selectOrderSelected,
  (purchaseOrder: IOrder): string => purchaseOrder.Observaciones,
);
