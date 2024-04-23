import {createSelector} from '@ngrx/store';
import {selectNotProcessedNode} from '@appSelectors/pendings/not-processed/not-processed.selectors';
import {FiltersOnlyActive, IFilter} from '@appModels/filters/Filters';
import {filter, find, forEach, isEmpty, map as _map} from 'lodash-es';

import {
  ICustomer,
  IOrderNotProcessed,
  IPpPartidaPedidoObjNotProcess,
  IPurchaseOrder,
  NotProcessedDetailsState,
} from '@appModels/store/pendings/not-processed/not-processed-details/not-processed-details.models';
import {ContactoDetalleObj} from 'api-catalogos';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {IClientContact} from '@appModels/shared/shared.models';
import {NotProcessedState} from '@appModels/store/pendings/not-processed/not-processed.models';
import {
  GMCotPartidasDetalle,
  GMPPedidoGeneraCotizacion,
  GMPPPedidoRecalcular,
  PpPartidaPedido,
  PpPedidoFleteExpressObj,
  PpPedidoFleteUltimaMilla,
  VClienteppPedidoObj,
  VDireccion,
} from 'api-logistica';
import {
  IFreightItem,
  InternalSalesItem,
  StylesColumnTotalValue,
  TypeOptionsColumn,
} from '@appModels/table/internal-sales-item';
import {
  IVPartidaCotizacion,
  QuotationItemCombined,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {
  PurchaseRestrictions,
  QuotationItemTypes,
  quotationItemTypes,
} from '@appHelpers/pending/quotation/quotation.helpers';
import {buildAddressFormat, getTotalFreightsInOc} from '@appUtil/util';
import {IPpPartidaPedidoDetallePretamitar} from '@appModels/store/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.models';
import {FREIGHT_EXPRESS, FREIGHTS_LAST_MILE} from '@appUtil/common.protocols';
import {ShoppingCartTotalsModel} from '@appModels/quotation/ShoppingCartTotals.model';

export const selectNotProcessedDetails = createSelector(
  selectNotProcessedNode,
  (state: NotProcessedState): NotProcessedDetailsState => state.notProcessedDetails,
);
export const isValidQuotation = createSelector(
  selectNotProcessedDetails,
  (state: NotProcessedDetailsState): boolean => {
    return (
      !!state?.gMCotCotizacionDetalle?.CotCotizacion &&
      !!state?.purchaseOrder?.orderSelected?.gmPPedidoGeneraCotizacion?.FechaEstimadaAjuste
    );
  },
);

export const selectClientFromList = createSelector(
  selectNotProcessedDetails,
  (state: NotProcessedDetailsState): VClienteppPedidoObj =>
    state?.clientNotProcessedSelected?.selectedClient,
);
export const selectClient = createSelector(
  selectNotProcessedDetails,
  (state: NotProcessedDetailsState): ICustomer => state.clientNotProcessedSelected,
);
export const selectClientContactsForDrop = createSelector(
  selectClient,
  (state: ICustomer): IDropListMulti[] =>
    _map(state.contacts, (o: ContactoDetalleObj) => ({
      value: o.IdContacto,
      labels: [
        {
          label: `${o.Nombres} ${o.ApellidoPaterno} ${o.ApellidoMaterno}`,
          color: '#424242',
          size: '13px',
        },
        {
          label: !isEmpty(o.CorreoElectronico) ? o.CorreoElectronico[0].Correo : '',
          color: '#008894',
          size: '12px',
        },
      ],
    })),
);
export const selectDataPurchaseOrders = createSelector(
  selectNotProcessedDetails,
  (state: NotProcessedDetailsState): IPurchaseOrder => state.purchaseOrder,
);
export const selectKeyPadOptions = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): DropListOption[] => state.keyPadOptions,
);
export const selectKeyPadSelected = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): DropListOption => state.keyPadSelected,
);
export const selectFilters = createSelector(
  selectDataPurchaseOrders,
  (state): DropListOption[] => state.filters,
);
export const selectFilter = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): DropListOption => state.filterSelected,
);
export const selectOrderSelected = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): IOrderNotProcessed => state.orderSelected,
);
export const selectOrderSelectedBackUp = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): IOrderNotProcessed => state.orderSelectedBackup,
);
export const selectApiStatus = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): number => state.apiStatus,
);
export const selectApiStatusMail = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): number => state.apiStatusMail,
);

export const selectApiStatusItems = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): number => state.apiStatusItems,
);

export const selectTermSearch = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): string => state.termSearch,
);
export const selectData64 = createSelector(
  selectDataPurchaseOrders,
  (state): string => state.fileBase64,
);
export const selectOpenViewFile = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): boolean => state.openViewFile,
);
export const selectFiltersOrder = createSelector(
  selectDataPurchaseOrders,
  selectFilter,
  selectClient,
  selectKeyPadSelected,
  selectTermSearch,
  (
    state,
    filterFeas: DropListOption,
    client: ICustomer,
    option: DropListOption,
    termSearch: string,
  ) => {
    const params = new FiltersOnlyActive();
    const filters: Array<IFilter> = [...params.Filters];
    if (option && option.value !== '1') {
      filters.push({
        NombreFiltro: 'ConOrdenDeCompra',
        ValorFiltro: option.value === '2',
      });
    }
    if (termSearch && termSearch !== '') {
      filters.push({
        NombreFiltro: 'OrdenDeCompra',
        ValorFiltro: termSearch.trim(),
      });
    }

    if (filterFeas.value !== '1') {
      const types = {
        2: 'FEAaTiempo',
        3: 'FEAfueraDeTimpo',
        4: 'FEAporVencer',
        5: 'SinFEA',
      };
      const type = types[filterFeas.value];
      if (type) {
        filters.push({NombreFiltro: type, ValorFiltro: true});
      }
    }
    filters.push({NombreFiltro: 'IdCliente', ValorFiltro: client.IdCliente});
    filters.push({NombreFiltro: 'Intramitable', ValorFiltro: true});
    filters.push({NombreFiltro: 'OcInternaAceptada', ValorFiltro: false});
    params.Filters = filters;
    params.SortDirection = 'desc';
    params.SortField = 'FechaRegistro';
    return params;
  },
);
export const selectPurchaseOrders = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): IOrderNotProcessed[] => state.orders.Results,
);
export const selectTotalsOrder = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): number => {
    let tot = 0;
    if (state?.TipoPartidasCotizacion) {
      state.TipoPartidasCotizacion.forEach((item) => {
        if (item.Total) {
          tot = tot + item.Total;
        }
      });
    }

    return tot;
  },
);
export const selectContact = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): ContactoDetalleObj => state?.ContactoDetalle,
);
export const selectItemsOrder = createSelector(selectOrderSelected, (state: IOrderNotProcessed) =>
  state?.items && state?.items?.Results ? state?.items?.Results : [],
);
export const selectItemsOrderBackup = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): Array<IPpPartidaPedidoObjNotProcess> => {
    return state?.orderSelectedBackup?.itemsBackup?.Results;
  },
);
export const selectActiveItems = createSelector(
  selectItemsOrder,
  (items: IPpPartidaPedidoObjNotProcess[]): IPpPartidaPedidoObjNotProcess[] =>
    filter(items, (i: IPpPartidaPedidoObjNotProcess) => i && i.Activo),
);
export const selectInvalidateItemsOrder = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): IPpPartidaPedidoObjNotProcess[] =>
    state.items && state.items.Results
      ? filter(
          state.items.Results,
          (o: IPpPartidaPedidoObjNotProcess) => !!(!o.Validada && o.ppIncidenciaPartida),
        )
      : [],
);
export const selectMainEmail = createSelector(
  selectOrderSelected,
  (order: IOrderNotProcessed) => order?.contact,
);
export const selectValidateRequestFEAPop = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): boolean => {
    const now = new Date();
    const fea = state.FechaEstimadaAjusteDate;
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return !!(
      (
        fea.getTime() >= date.getTime() &&
        state?.ObservacionesFEA?.trim() &&
        state?.ObservacionesFEA &&
        state.IdContactoCliente
      )
      //&&  !isEmpty(state.selectedPpPedidoContactForDrop)
    );
  },
);
export const selectValidateProcessWithErrorsPop = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): boolean =>
    !!(
      // !isEmpty(state.selectedDeliveryContactForDrop) &&
      (state.ppPedidoInstruccionesEntrega && state.ppPedidoInstruccionesEntrega?.trim())
    ),
);
/*export const selectEntriesListResults = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed) => state?.items?.Results || [],
);*/
/*export const selectValidateIncidenceEntries = createSelector(
  selectEntriesListResults,
  (state: IPpPartidaPedidoObjNotProcess[]): boolean =>
    state?.length &&
    filter(
      state,
      (o: IPpPartidaPedidoObjNotProcess) =>
        !o.Validada &&
        o.Activo &&
        o.ppIncidenciaPartida &&
        o.ppIncidenciaPartida?.Comentarios &&
        (o.ppIncidenciaPartida?.Catalogo ||
          o.ppIncidenciaPartida?.Descripcion ||
          o.ppIncidenciaPartida?.Presentacion ||
          o.ppIncidenciaPartida?.Marca ||
          o.ppIncidenciaPartida?.TiempoEstimadoEntrega ||
          o.ppIncidenciaPartida?.IVA ||
          o.ppIncidenciaPartida?.PrecioUnitario ||
          o?.ppIncidenciaPartida?.Moneda ||
          o?.ppIncidenciaPartida?.FechaRealizacionEnCapacitacion),
    ).length,
);*/

export const selectContactEmail = createSelector(
  selectOrderSelected,
  (order: IOrderNotProcessed): Array<IDropListMulti> => {
    const contacts: Array<IDropListMulti> = [];
    contacts.push({
      value: '1',
      labels: [
        {
          label: order?.ContactoDetalle?.CorreoElectronico[0]?.Correo,
          isShow: true,
        },
      ],
      isSelected: false,
    });
    return contacts;
  },
);
export const selectViewFileIsLoading = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder) => state.viewFileIsLoading,
);
export const selectFileBase64 = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder) => state.fileBase64,
);
/*export const selectItemSelected = createSelector(selectItemsOrder, (orders) => {
  const item = filter(orders, (o) => {
    if (o.isInViewQuotesLinked) {
      return o.quotesLinked;
    }
  });
  return item[0];
});*/
export const selectInvoiceName = createSelector(selectDataPurchaseOrders, (state) => state.invoice);
export const selectedDeliveryAddress = createSelector(
  selectOrderSelected,
  (order: IOrderNotProcessed): VDireccion => order?.DireccionEntrega,
);
export const selectDeliveriesAddress = createSelector(
  selectNotProcessedDetails,
  (state: NotProcessedDetailsState): VDireccion[] => state.deliveryAddress,
);
export const selectClientContactData = createSelector(
  [selectOrderSelected, selectClient, selectContact, selectedDeliveryAddress],
  (
    order: IOrderNotProcessed,
    client: ICustomer,
    contact: ContactoDetalleObj,
    deliveryAddress: VDireccion,
  ): IClientContact => {
    const isContactName = contact?.Nombres && contact?.ApellidoPaterno && contact?.ApellidoMaterno;
    return {
      hasCredit: !order?.DatosFacturacionClienteDetalle?.catCondicionesDePago?.SinCredito,
      clientName: client?.Nombre,
      decisionLevel: contact?.NivelDecision,
      category: client?.Categoria,
      image: client?.imageHover,
      contactName: isContactName
        ? `${contact?.Nombres} ${contact?.ApellidoPaterno} ${contact?.ApellidoMaterno}`
        : '',
      assignedEsacName: order?.user?.NombreCompleto,
      department: contact?.Departamento,
      mail: contact?.CorreoElectronico[0]?.Correo,
      position: contact?.Puesto,
      telephoneNumber: contact?.NumeroTelefonico[0]?.Numero,
      telephoneNumberExtension: contact?.NumeroTelefonico[0]?.Extension,
      acceptsPartial: deliveryAddress?.AceptaParciales,
      showSendGuide: !!deliveryAddress?.EsMensajeriaInterna,
      sendGuide: deliveryAddress?.PagaGuiaEnvio,
    };
  },
);
export const selectSelectedOrderIdPPPedido = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): string => state?.IdPPPedido,
);
export const selectBillingAddress = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): VDireccion =>
    state.DatosFacturacionClienteDetalle?.DireccionFacturacion,
);
export const selectBillingAddressFormat = createSelector(
  selectBillingAddress,
  (billingAddress: VDireccion): string => buildAddressFormat(billingAddress),
);
export const selectIncidentItems = createSelector(selectActiveItems, (items) => {
  const incidentItems = [];
  _map(items, (item: IPpPartidaPedidoObjNotProcess) => {
    const ppPartidaPedido: PpPartidaPedido = {
      ...item,
      Activo: item.Activo,
      FechaEstimadaEntrega: item.FechaEstimadaEntrega,
      FechaRegistro: item.FechaRegistro,
      FechaUltimaActualizacion: item.FechaUltimaActualizacion,
      IVA: item.IVA,
      IdPPIncidenciaPartidaPedido: item.IdPPIncidenciaPartidaPedido,
      IdPPPPartidaPedidoCorregida: item.IdPPPPartidaPedidoCorregida,
      IdPPPartidaPedido: item.IdPPPartidaPedido,
      IdPPPartidaPedidoConfiguracion: item.IdPPPartidaPedidoConfiguracion,
      IdPPPartidaPedidoMadre: item.IdPPPartidaPedidoMadre,
      IdPPPedido: item.IdPPPedido,
      IdPcPartidaPromesaDeCompra: item.IdPcPartidaPromesaDeCompra,
      IdProducto: item.IdProducto,
      IdValorConfiguracionTiempoEntrega: item.IdValorConfiguracionTiempoEntrega,
      Numero: item.Numero,
      NumeroDePiezas: item.NumeroDePiezas,
      PrecioUnitario: item.PrecioUnitario,
      Programada: item.Programada,
      Total: item.Total,
      Tramitada: item.Tramitada,
      Validada: item.Validada,
      TiempoEstimadoEntrega: item?.TiempoEstimadoEntrega,
      PrecioFleteNoDesglosado: item?.PrecioFleteNoDesglosado,
      Comentarios: item.Comentarios,
    };
    return incidentItems.push({
      ppIncidenciaPartida: item?.IdPPIncidenciaPartidaPedido
        ? {...item?.ppIncidenciaPartida}
        : null,
      ppPartidaPedido,
    });
  });
  return incidentItems;
});
export const selectDeliveryInstructions = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed) => state?.ppPedidoInstruccionesEntrega,
);
export const selectDeliveryType = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): DropListOption[] => state.deliveryType,
);
export const selectGmPPPedidoRecalcular = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): GMPPPedidoRecalcular => {
    return {
      ...state?.gmPPPedidoRecalcular,
      AplicaFleteExpress: !!state?.gmPPPedidoRecalcular?.AplicaFleteExpress,
      FleteDesglosado: !!state?.gmPPPedidoRecalcular?.FleteDesglosado,
      EntregaUnica: !!state?.gmPPPedidoRecalcular?.EntregaUnica,
      IdPPPedido: state?.IdPPPedido,
    };
  },
);
export const selectGmPPedidoGeneraCotizacion = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): GMPPedidoGeneraCotizacion => {
    return {
      ...state?.gmPPedidoGeneraCotizacion,
      IdPPPedido: state?.IdPPPedido,
    };
  },
);

export const selectDeliveryTypeSelected = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): DropListOption => state?.deliveryTypeSelected,
);
export const selectOrderSelectedApplyExpressFlight = createSelector(
  selectGmPPPedidoRecalcular,
  (state: GMPPPedidoRecalcular): boolean => state?.AplicaFleteExpress,
);
export const selectOrderSelectedItemizedFreight = createSelector(
  selectGmPPPedidoRecalcular,
  (state: GMPPPedidoRecalcular): boolean => state?.FleteDesglosado,
);
export const selectExpressFreightsOrder = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): PpPedidoFleteExpressObj[] => state?.ppPedidoFletesExpressObj,
);
export const selectLastMileFreightsOrder = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): PpPedidoFleteUltimaMilla[] => state?.ppPedidoFletesUltimaMilla,
);
export const selectExpressFreightsOrderBackUp = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): Array<PpPedidoFleteExpressObj> =>
    state?.orderSelectedBackup?.ppPedidoFletesExpressObj,
);
export const selectLastMileFreightsOrderBackUp = createSelector(
  selectDataPurchaseOrders,
  (state: IPurchaseOrder): Array<PpPedidoFleteUltimaMilla> =>
    state?.orderSelectedBackup?.ppPedidoFletesUltimaMilla,
);
export const selectTotalFreights = createSelector(
  selectExpressFreightsOrder,
  selectLastMileFreightsOrder,
  (
    expressFreights: Array<PpPedidoFleteExpressObj>,
    lastMile: Array<PpPedidoFleteUltimaMilla>,
  ): ShoppingCartTotalsModel => {
    return {
      totalTax: getTotalFreightsInOc(lastMile, expressFreights, {iva: true}),
      subTotal: getTotalFreightsInOc(lastMile, expressFreights, {subtotal: true}),
      totalPriceQuotation: getTotalFreightsInOc(lastMile, expressFreights),
    };
  },
);

export const selectTotalFreightsBackUp = createSelector(
  selectExpressFreightsOrderBackUp,
  selectLastMileFreightsOrderBackUp,
  (
    expressFreights: Array<PpPedidoFleteExpressObj>,
    lastMile: Array<PpPedidoFleteUltimaMilla>,
  ): ShoppingCartTotalsModel => {
    return {
      totalTax: getTotalFreightsInOc(lastMile, expressFreights, {iva: true}),
      subTotal: getTotalFreightsInOc(lastMile, expressFreights, {subtotal: true}),
      totalPriceQuotation: getTotalFreightsInOc(lastMile, expressFreights),
    };
  },
);
export const selectItemsOrderCombined = createSelector(
  [selectItemsOrder, selectTotalFreights, selectOrderSelected],
  (
    items: IPpPartidaPedidoObjNotProcess[],
    totalFreights: ShoppingCartTotalsModel,
    selectedOrder: IOrderNotProcessed,
  ): IPpPartidaPedidoObjNotProcess[] => {
    if (!items || items?.length === 0) {
      return [];
    }

    const descriptionFreight =
      selectedOrder?.ppPedidoFletesExpressObj?.length >= 1 ? FREIGHT_EXPRESS : FREIGHTS_LAST_MILE;

    if (
      (selectedOrder?.ppPedidoFletesExpressObj?.length > 0 ||
        selectedOrder?.ppPedidoFletesUltimaMilla?.length > 0) &&
      selectedOrder?.EsFleteDesglosado
    ) {
      const freightItem: IFreightItem = {
        descriptionFreight,
        subtotal: totalFreights?.subTotal,
        iva: totalFreights?.totalTax,
        total: totalFreights.totalPriceQuotation,
      };
      return [...items, {freightItem}];
    } else {
      return items;
    }
  },
);

export const selectItemsOrderCombinedBackup = createSelector(
  [selectItemsOrderBackup, selectExpressFreightsOrderBackUp, selectTotalFreightsBackUp],
  (
    items: IPpPartidaPedidoObjNotProcess[],
    freights: Array<PpPedidoFleteExpressObj>,
    totalFreights: ShoppingCartTotalsModel,
  ): IPpPartidaPedidoObjNotProcess[] => {
    if (!items || items?.length === 0) {
      return [];
    }

    const descriptionFreight = freights?.length >= 1 ? FREIGHT_EXPRESS : FREIGHTS_LAST_MILE;

    if (totalFreights?.totalPriceQuotation > 0) {
      const freightItem: IFreightItem = {
        descriptionFreight,
        subtotal: totalFreights?.subTotal,
        iva: totalFreights?.totalTax,
        total: totalFreights?.totalPriceQuotation,
      };
      return [...items, {freightItem}];
    } else {
      return items;
    }
  },
);

export const selectCurrencyLabel = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): string => state?.catMoneda?.ClaveMoneda,
);

export const displayColumnsConfig = createSelector(
  // DOCS: El nodo puede ser cambiado para ser dínamico por columnas
  selectNotProcessedNode,
  selectCurrencyLabel,
  selectOrderSelected,
  (
    state_: NotProcessedState,
    currency: string,
    orderderSelected: IOrderNotProcessed,
  ): InternalSalesItem => {
    const showNotes = !isEmpty(
      filter(
        orderderSelected?.items?.Results,
        (o: IPpPartidaPedidoDetallePretamitar) => o.Comentarios,
      ),
    );
    const showColumnProFreight = find(
      orderderSelected?.items?.Results,
      (item: IPpPartidaPedidoObjNotProcess) => item.PrecioFleteNoDesglosado > 0,
    );

    return buildDisplayRowsConfig(showNotes, currency, showColumnProFreight !== undefined);
  },
);
export const displayRowsConfig = createSelector(
  selectItemsOrderCombined,
  selectCurrencyLabel,
  selectOrderSelected,
  (
    itemsOrderCombined: IPpPartidaPedidoObjNotProcess[],
    currency: string,
    orderderSelected: IOrderNotProcessed,
  ): InternalSalesItem[] => {
    return itemsOrderCombined.map((item: IPpPartidaPedidoObjNotProcess, index) => {
      const showColumnProFreight = find(
        itemsOrderCombined,
        (item: IPpPartidaPedidoObjNotProcess) => item.PrecioFleteNoDesglosado > 0,
      );

      const showNotes = !isEmpty(
        filter(
          orderderSelected?.items?.Results,
          (o: IPpPartidaPedidoDetallePretamitar) => o.Comentarios,
        ),
      );
      return buildDisplayRowsConfig(
        showNotes,
        currency,
        showColumnProFreight !== undefined,
        item,
        index,
        orderderSelected,
      );
    });
  },
);

//DOCS: Items de la primera lista Antes de "Calcular el precio del flete"
export const displayRowsConfigBackup = createSelector(
  selectItemsOrderCombinedBackup,
  selectCurrencyLabel,
  selectOrderSelected,
  (
    itemsOrderCombined: IPpPartidaPedidoObjNotProcess[],
    currency: string,
    orderSelected: IOrderNotProcessed,
  ): InternalSalesItem[] => {
    const showNotes = !isEmpty(
      filter(
        orderSelected?.items?.Results,
        (o: IPpPartidaPedidoDetallePretamitar) => o.Comentarios,
      ),
    );
    const showColumnProFreight = find(
      itemsOrderCombined,
      (item: IPpPartidaPedidoObjNotProcess) => item.PrecioFleteNoDesglosado > 0,
    );

    return _map(itemsOrderCombined, (item: IPpPartidaPedidoObjNotProcess, index) => {
      return buildDisplayRowsConfig(
        showNotes,
        currency,
        showColumnProFreight !== undefined,
        item,
        index,
      );
    });
  },
);

export const selectItemsReconfigureFreight = createSelector(
  selectDataPurchaseOrders,
  (selectPurchaseOrder: IPurchaseOrder): Array<GMCotPartidasDetalle> => {
    return selectPurchaseOrder?.orderSelectedBackup?.itemsReconfigureFreight || [];
  },
);

export const hasBeenReconfigureFreight = createSelector(
  selectItemsReconfigureFreight,
  (reconfigureFreight: Array<GMCotPartidasDetalle>): boolean => {
    return reconfigureFreight?.length > 0;
  },
);

//DOCS: Concatenar la partida de flete en caso de que exista la segunda del pop "Reconfigurar Flete"
export const selectConfigItemsReconfigureFreights = createSelector(
  [selectItemsReconfigureFreight, selectExpressFreightsOrderBackUp, selectTotalFreightsBackUp],
  (
    items: Array<GMCotPartidasDetalle>,
    freights: Array<PpPedidoFleteExpressObj>,
    totalFreights: ShoppingCartTotalsModel,
  ): any[] => {
    if (!items || items?.length === 0) {
      return [];
    }

    const description = freights?.length >= 1 ? FREIGHT_EXPRESS : FREIGHTS_LAST_MILE;

    if (totalFreights?.totalPriceQuotation > 0) {
      const freightItem = {
        descriptionFreight: description,
        total: totalFreights?.totalPriceQuotation,
        subtotal: totalFreights?.subTotal,
        iva: totalFreights?.totalTax,
        VPartidaCotizacion: items[0]?.VPartidaCotizacion || items[0]?.VProducto,
      };
      return [...items, {freightItem}];
    } else {
      return items;
    }
  },
);

export const selectCurrencyFromOrder = createSelector(
  selectOrderSelected,
  (order: IOrderNotProcessed): string => order.catMoneda.ClaveMoneda,
);

//DOCS: Items despues de Calcular el precio en "Reconfigurar Flete Express", para "Generar Cotizacion"
export const displayRowsConfigReconfigureFreight = createSelector(
  [selectConfigItemsReconfigureFreights, selectCurrencyFromOrder],
  (
    itemsOrderCombined: Array<GMCotPartidasDetalle & any>,
    currency: string,
  ): InternalSalesItem[] => {
    return _map(
      itemsOrderCombined,
      (item: QuotationItemCombined & any, index: number): InternalSalesItem => {
        if (!item.freightItem) {
          const generalDataObject: IVPartidaCotizacion | ProductSearchResult =
            item.VPartidaCotizacion || item.VProducto || item.product;
          const internalSalesItem: InternalSalesItem = {
            data: item,
            index,
            backgroundColorByTypeItem:
              item.VPartidaCotizacion?.ClaveTipoPartidaCotizacion ===
                quotationItemTypes[QuotationItemTypes.Saving] || item?.VPartidaCotizacion === null
                ? QuotationItemTypes.Saving
                : QuotationItemTypes.Original,
            columnNumberItem: {
              number: item?.Index,
              showArrow:
                item.VPartidaCotizacion?.ClaveTipoPartidaCotizacion ===
                  quotationItemTypes[QuotationItemTypes.Saving] ||
                item?.VPartidaCotizacion === null,
            },
            columnImgTypeItem: {
              value:
                item.VPartidaCotizacion?.ClaveTipoPartidaCotizacion ===
                  quotationItemTypes[QuotationItemTypes.Saving] || item?.VPartidaCotizacion === null
                  ? QuotationItemTypes.Saving
                  : QuotationItemTypes.Original,
            },
            columnConcept: {
              availabilityKey: generalDataObject?.DisponibilidadClave,
              cat: generalDataObject?.Catalogo,
              typePresentation: generalDataObject?.TipoPresentacion,
              presentation: generalDataObject?.Presentacion,
              unity: generalDataObject?.Unidad,
              description: generalDataObject?.Descripcion,
              type: generalDataObject?.Tipo,
              subType: generalDataObject?.Subtipo,
              control: generalDataObject?.Control,
              controlled: generalDataObject?.Controlado,
              dateValidation: generalDataObject?.FechaCaducidadVigenciaCuraduria,
              author: generalDataObject?.Autor,
              formatPublication: generalDataObject?.FormatoPublicacion,
              typeMode: generalDataObject?.MedioDifusion,
              supplements: generalDataObject?.TotalSuplementario,
              complementary: generalDataObject?.TotalComplementario,
              alternate: generalDataObject?.TotalAlternativo,
            },
            columnBrand: {
              src: generalDataObject.imageHover,
              nameBrand: generalDataObject.NombreMarca,
            },
            columnDeliveryTime: {
              days: generalDataObject.TiempoEstimadoEntrega,
              isEdit: false,
              isFreight: true,
              // item.CotProductoOferta.IdProveedor === freightExpressSelectedInList?.IdProveedor,
              // TODO: Verificar flete express
              // isFreight:
              //   freight?.FleteExpress?.IdProveedor ===
              //   o.cotPartidaCotizacionDetalle?.vProducto?.IdProveedorPrincipal,
            },
            columnNumberPieces: {
              value: item.CotProductoOferta?.NumeroDePiezas,
              isEdit: false,
            },
            columnUnitPrice: {
              value: item.CotProductoOferta?.PrecioCotizadoUnitarioConvertido,
              currency: currency,
              isEdit: false,
              showComments: false,
              priceGroup: generalDataObject?.PrecioPorGrupo,
              pricePerson: generalDataObject?.PrecioPorPersona,
              numberPeopleGroup: generalDataObject?.NumeroDePersonasPorGrupo,
            },
            columnProFreight: {
              // showColumn: !isProratedFreight && hasFreightSelected,
              showColumn: false,
              value: item.proratedFreightTotal,
              currency: currency,
            },
            columnSubtotal: {
              value: item.CotProductoOferta.PrecioCotizadoSubtotal,
              currency: currency,
            },
            columnIva: {
              value: item.CotProductoOferta?.PrecioIVA,
              currency: currency,
            },
            columnDeliveryRestrictions: {
              showColumn: false,
              // showColumn: containsDeliveryRestrictions ?? false,
              value:
                generalDataObject?.RestriccionDeCompra === PurchaseRestrictions.limitOfPieces
                  ? generalDataObject?.RestriccionDeCompra +
                    ' ' +
                    item?.CotProductoOferta?.NumeroDePiezas +
                    ' al Mes'
                  : generalDataObject?.RestriccionDeCompra,
            },
            columnTotalValue: {
              value: item.CotProductoOferta?.PrecioCotizadoTotal,
              style: StylesColumnTotalValue.General,
              currency: currency,
              listPrice: item.CotProductoOferta?.PrecioListaConvertido,
              priceGroup: generalDataObject?.PrecioPorGrupo,
              pricePerson: generalDataObject?.PrecioPorPersona,
              numberPeopleGroup: generalDataObject?.NumeroDePersonasPorGrupo,
              type: generalDataObject?.Tipo,
            },
            // columnDelete: {
            //   // showColumn: selectedQuotation.EstadoCotizacion !== CatQuotationState.Enviada,
            //   showColumn: false,
            //   showArrow: true,
            //   typeItem:
            //     item.VPartidaCotizacion?.ClaveTipoPartidaCotizacion ===
            //     quotationItemTypes[QuotationItemTypes.Saving] || item?.VPartidaCotizacion === null
            //       ? QuotationItemTypes.Saving
            //       : QuotationItemTypes.Original,
            // },
          };
          // if (true) {
          // if (selectedQuotation.EstadoCotizacion === CatQuotationState.Enviada) {
          //   delete internalSalesItem.columnDelete;
          // }
          return internalSalesItem;
        }
        const internal: InternalSalesItem = {
          data: item,
          index,
          activeGenericEmitterFreight: true,
          columnNumberItem: {
            number: item.freightItem.index,
          },
          columnImgTypeItem: {},
          columnConcept: {
            nameFreight: item?.freightItem?.descriptionFreight,
          },
          columnBrand: {},
          columnDeliveryTime: {},
          columnNumberPieces: {},
          columnUnitPrice: {},
          columnProFreight: {},
          columnSubtotal: {
            value: item.freightItem.subtotal,
            currency: item?.freightItem?.VPartidaCotizacion?.ClaveMoneda,
          },
          columnIva: {
            value: item.freightItem.iva,
            currency: item?.freightItem?.VPartidaCotizacion?.ClaveMoneda,
          },
          columnTotalValue: {
            value: item.freightItem.total,
            style: StylesColumnTotalValue.General,
            currency: item?.freightItem?.VPartidaCotizacion?.ClaveMoneda,
          },
        };

        return internal;
      },
    );
  },
);

export const buildDisplayRowsConfig = (
  showNotes: boolean,
  currency: string,
  showColumnProFreight: boolean,
  item: IPpPartidaPedidoObjNotProcess = {},
  index = 0,
  iOrderNotProcessed: IOrderNotProcessed | null = null,
): InternalSalesItem => {
  const config: InternalSalesItem = {
    data: item,
    index: index,
    columnOptions: {
      typeOption: TypeOptionsColumn.OnlyCheckBoxRedGreen,
      value: item?.Validada,
      isCheckHeader: false,
    },
    columnNumberItem: {
      number: index + 1,
      showArrow: false,
    },
    columnConcept: {
      cat: item?.cotPartidaCotizacionDetalle?.vProducto?.Catalogo,
      control: item?.cotPartidaCotizacionDetalle?.vProducto?.Control,
      controlled: item?.cotPartidaCotizacionDetalle?.vProducto?.Controlado,
      dateValidation: item?.cotPartidaCotizacionDetalle?.vProducto?.FechaCaducidadVigenciaCuraduria,
      description: item?.cotPartidaCotizacionDetalle?.vProducto?.Descripcion,
      presentation: item?.cotPartidaCotizacionDetalle?.vProducto?.Presentacion,
      subType: item?.cotPartidaCotizacionDetalle?.vProducto?.Subtipo,
      type: item?.cotPartidaCotizacionDetalle?.vProducto?.Tipo,
      typePresentation: item?.cotPartidaCotizacionDetalle?.vProducto?.TipoPresentacion,
      unity: item?.cotPartidaCotizacionDetalle?.vProducto?.Unidad,
      availabilityKey: item?.cotPartidaCotizacionDetalle?.vProducto?.DisponibilidadClave,
      proratedExpress: item?.PrecioFleteNoDesglosado > 0 && item?.AplicaFleteExpress,
      // iOrderNotProcessed?.ppPedidoFletesExpress?.find(
      //   (it) =>
      //     it.IdProveedor === item?.cotPartidaCotizacionDetalle?.vProducto?.IdProveedorPrincipal,
      // ) && !iOrderNotProcessed?.EsFleteDesglosado,
      author: item?.cotPartidaCotizacionDetalle?.vProducto?.Autor ?? 'N/D',
      formatPublication: item?.cotPartidaCotizacionDetalle?.vProducto?.FormatoPublicacion ?? 'N/D',
      typeMode: item?.cotPartidaCotizacionDetalle?.vProducto?.MedioDifusion ?? 'N/D',
      datesSuggested:
        item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.fechasRealizacionCapacitacion,
      dateAvailability: item?.cotPartidaCotizacionDetalle?.vProducto?.FechaDisponibilidadBackOrder,
      alternate: item?.cotPartidaCotizacionDetalle?.vProducto?.TotalAlternativo,
      complementary: item?.cotPartidaCotizacionDetalle?.vProducto?.TotalComplementario,
      supplements: item?.cotPartidaCotizacionDetalle?.vProducto?.TotalSuplementario,
    },
    columnNotes: showNotes
      ? item?.Comentarios
        ? {
            systemNotes: null,
            itemNotes: item?.Comentarios,
          }
        : {
            systemNotes: null,
            itemNotes: null,
          }
      : null,
    columnProFreight: {
      showColumn: showColumnProFreight,
      value: item?.PrecioFleteNoDesglosado || 'N/A',
      currency,
    },
    columnBrand: {
      src: item?.imageHover,
      nameBrand: item?.cotPartidaCotizacionDetalle?.vProducto?.NombreMarca,
    },
    columnDeliveryTime: {
      days: item?.Programada
        ? item?.FechaEstimadaEntrega
        : item?.TiempoEstimadoEntrega ||
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.TiempoEstimadoEntrega,
      isProgramming: item?.Programada,
      // TODO: Verificar flete express
      isFreight: item?.AplicaFleteExpress,
    },
    columnNumberPieces: {
      value: item?.NumeroDePiezas,
    },
    columnUnitPrice: {
      value: item?.PrecioUnitario,
      currency,
    },
    columnSubtotal: {
      value: item?.Subtotal,
      currency,
    },
    columnIva: {
      value: item?.IVA,
      currency,
    },
    columnTotalValue: {
      value: item?.Total,
      currency,
      style: StylesColumnTotalValue.General,
      listPrice:
        item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
          ?.PrecioListaConvertido,
    },
  };
  if (item?.freightItem) {
    for (const key in config) {
      config[key] = {};
    }
    config.data = item;
    config.index = index;
    config.columnNumberItem = {
      number: index + 1,
      showArrow: false,
    };
    config.columnNotes = showNotes
      ? {
          systemNotes: null,
          itemNotes: null,
        }
      : null;
    config.columnConcept = {
      nameFreight: item?.freightItem?.descriptionFreight,
    };
    config.columnIva = {
      value: item?.freightItem?.iva || 0,
      currency,
    };
    config.columnSubtotal = {
      value: item?.freightItem?.subtotal,
      currency,
    };
    config.columnTotalValue = {
      value: item?.freightItem?.total,
      style: StylesColumnTotalValue.General,
      currency,
    };
    config.columnProFreight = {
      showColumn: showColumnProFreight,
    };
  }
  return config;
};
export const selectTotalAmount = createSelector(
  [selectItemsOrderBackup, selectExpressFreightsOrderBackUp, selectLastMileFreightsOrderBackUp],
  (
    activeItems: IPpPartidaPedidoObjNotProcess[],
    expressFreights,
    lastMilleFreight,
  ): ShoppingCartTotalsModel => {
    let subTotal = 0;
    let iva = 0;
    let total = 0;

    forEach(activeItems, (i: IPpPartidaPedidoObjNotProcess) => {
      subTotal += i?.Subtotal;
      iva += i?.IVA;
      total += i?.Total;
    });

    forEach(expressFreights, (i: PpPedidoFleteExpressObj) => {
      subTotal += i?.PrecioFlete;
      iva += i?.PrecioIVA || 0;
      total += i?.PrecioTotal || 0;
    });

    forEach(lastMilleFreight, (i: PpPedidoFleteUltimaMilla) => {
      subTotal += i?.PrecioVentaConvertido;
      iva += i?.PrecioIVA || 0;
      total += i?.PrecioTotal || 0;
    });

    return {
      subTotal,
      totalTax: iva,
      totalPriceQuotation: total,
    };
  },
);

export const selectQueryInfoPurchaseItems = createSelector(
  selectOrderSelected,
  (state: IOrderNotProcessed): FiltersOnlyActive => {
    const params = new FiltersOnlyActive();
    params.Filters.push({
      NombreFiltro: 'IdPPPedido',
      ValorFiltro: state?.IdPPPedido,
    });
    params.SortField = 'Numero';
    params.SortDirection = 'asc';

    return params;
  },
);
// export const selectDeliveryAddress = createSelector(
//   selectOrderSelected,
//   (order: IOrderNotProcessed): string => {
//     if (order?.DireccionEntrega) {
//       const {Calle, Ciudad, Colonia, Municipio, Estado} = order?.DireccionEntrega;
//       return Calle + ' ' + Colonia + ' ' + Ciudad + ' ' + Municipio + ' ' + Estado;
//     } else {
//       return 'N/D';
//     }
//   },
// );

export const selectQueryInfoGetDeliveryAddress = createSelector(
  selectClient,
  (client: ICustomer) => {
    let params = new FiltersOnlyActive();
    params = {
      ...params,
      Filters: [
        ...params.Filters,
        {
          NombreFiltro: 'IdCliente',
          ValorFiltro: client.IdCliente,
        },
        {
          NombreFiltro: 'ClaveTipoDireccion',
          ValorFiltro: 'entrega',
        },
      ],
    };
    return params;
  },
);
export const selectEstimatedAdjustmentDate = createSelector(
  selectOrderSelected,
  (order: IOrderNotProcessed): Date => {
    if (order?.gmPPedidoGeneraCotizacion?.FechaEstimadaAjuste) {
      return new Date(order?.gmPPedidoGeneraCotizacion?.FechaEstimadaAjuste);
    }
  },
);

export const selectTotalsOrderSelected = createSelector(
  selectOrderSelected,
  selectTotalFreights,
  (order: IOrderNotProcessed, totalFreight: ShoppingCartTotalsModel): ShoppingCartTotalsModel => {
    return {
      subTotal: order.Subtotal,
      totalTax: order.Iva,
      totalPriceQuotation: order.ValorTotal,
    };
  },
);
