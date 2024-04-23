import {createSelector} from '@ngrx/store';
import {selectOrderModification} from '@appSelectors/pendings/order-modification/order-modification.selectors';
import {IOrderModificationState} from '@appModels/store/pendings/order-modification/order-modification.model';
import {
  IFreightProvider,
  IOrderModificationDetails,
  IOrdersC,
  IPurchaseOrderDetails,
  IPurchaseOrderItem,
} from '@appModels/store/pendings/order-modification/order-modification-details/order-modification-details.models';
import {dropListDestinos, selectListCatProcess} from '@appSelectors/catalogs/catalogs.selectors';
/*Models Imports*/
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {CatDestino, TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj} from 'api-logistica';
import {CatProceso, ContactoDetalleObj, DireccionClienteDetalle} from 'api-catalogos';
/*Utils Imports*/
import {filter, findIndex, isEmpty, map as _map} from 'lodash-es';

import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import {DateFormatSlashShort} from '@appPipes/date-format.pipe';
import * as moment from 'moment';
import {
  IFlete,
  IFreightExpress,
} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {PROCEDURES_TYPES} from '@appModels/store/pendings/checkout/checkout-list/checkout-list.model';
import {FiltersOnlyActive} from '@appModels/filters/Filters';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';

export const selectOrderModificationDetails = createSelector(
  selectOrderModification,
  (state: IOrderModificationState): IOrderModificationDetails => state.orderModificationDetails,
);

export const selectedPurchaseOrder = createSelector(
  selectOrderModificationDetails,
  (state: IOrderModificationDetails) =>
    state.selectedPurchaseOrder ? state.selectedPurchaseOrder : ({} as IOrdersC),
);
export const selectPurchaseOrderDetails = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC) => state?.purchaseOrderDetails,
);
export const selectPurchaseOrderDetailsLoading = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC) => state?.purchaseOrderDetails?.apiStatus,
);
export const selectFinanceCodeRequest = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC) => state?.purchaseOrderDetails?.tpSolicitudAutorizacionFinanzas,
);
export const selectPurchaseOrderEntriesLoading = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC) => state?.purchaseOrderEntries?.listStatus,
);
export const selectedItems = createSelector(selectedPurchaseOrder, (state: IOrdersC) =>
  filter(state?.purchaseOrderEntries?.list, (o: IPurchaseOrderItem) => o.isSelected),
);
export const selectIdsOfItemsSelected = createSelector(
  selectedItems,
  (items: Array<IPurchaseOrderItem>): Array<string> =>
    !isEmpty(items) ? _map(items, (o: IPurchaseOrderItem) => o.IdTPPartidaPedido) : [],
);
export const selectPurchaseOrderEntries = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC) => state?.purchaseOrderEntries?.list,
);
export const selectDropDestiny = createSelector(
  dropListDestinos,
  (state: Array<CatDestino>): Array<DropListOption> => {
    const arrayDestiny: Array<DropListOption> = [];
    state.forEach((item) => {
      arrayDestiny.push({label: item.Destino, value: item.IdCatDestino});
    });
    return arrayDestiny;
  },
);
export const selectPurchaseOrderCatDestiny = createSelector(
  selectPurchaseOrderDetails,
  (state: IPurchaseOrderDetails): DropListOption =>
    state?.catDestino
      ? {
          value: state?.catDestino.IdCatDestino,
          label: state?.catDestino.Destino,
        }
      : ({} as DropListOption),
);
export const selectPurchaseOrderAddress = createSelector(
  selectOrderModificationDetails,
  (state: IOrderModificationDetails): Array<DropListOption> =>
    state?.clientAddresses
      ? _map(state.clientAddresses, (o: DireccionClienteDetalle) => ({
          value: o.DireccionCliente.IdDireccionCliente,
          label: `${o.catPais.NombreEspanol}, ${o.Direccion.Ciudad}, ${o.Direccion.Calle} #${
            o.Direccion.NumeroExterior
          } ${o.Direccion.NumeroInterior ? 'Int. ' + o.Direccion.NumeroInterior : ''} Col. ${
            o.Direccion.Colonia
          } · C.P. ${o.Direccion.CodigoPostal}`,
        }))
      : [],
);
export const selectDropProcess = createSelector(
  selectListCatProcess,
  (state): Array<DropListOption> => {
    const arrayProcess: Array<DropListOption> = [];
    state.forEach((item: CatProceso) => {
      arrayProcess.push({label: item.Proceso, value: item.IdCatProceso});
    });
    return arrayProcess;
  },
);
export const selectFilterSelected = createSelector(
  selectOrderModificationDetails,
  (state) => state.filterSelected,
);
export const selectFilterList = createSelector(
  selectOrderModificationDetails,
  (state) => state.filterByType,
);
export const selectSearchTerm = createSelector(
  selectOrderModificationDetails,
  (state) => state.searchTerm,
);
export const selectCustomerSelected = createSelector(
  selectOrderModificationDetails,
  (state) => state.customerSelected,
);
export const selectOrderSelected = createSelector(
  selectOrderModificationDetails,
  (state) => state.selectedPurchaseOrder || ({} as IOrdersC),
);
export const selectProcessSelected = createSelector(
  selectOrderSelected,
  (state) => state?.processSelected,
);
export const selectAdditionalFiles = createSelector(
  selectOrderSelected,
  (state) => state?.additionalFiles,
);
export const selectOrdersCard = createSelector(
  selectOrderModificationDetails,
  selectOrderSelected,
  (state, orderS) =>
    !isEmpty(state.purchaseOrders.list) && !isEmpty(state.selectedPurchaseOrder)
      ? _map(state.purchaseOrders.list, (order: IOrdersC) => ({
          value: order.IdTPPedido,
          active: order.IdTPPedido === orderS.IdTPPedido,
          labels: [
            {
              label: `#${order.index + 1} · ${order.NumeroOrdenDeCompra}`,
              className: CLASS_NAMES.title,
            },
            {
              label: `Valor Total ${new CurrencyFormat().transform(
                order.Total,
                order.ClaveMoneda,
              )} ${order.ClaveMoneda}`,
              className: CLASS_NAMES.totalAmount,
            },
            {
              label: `${order.Productos} ${order.Productos === 1 ? 'Producto' : 'Productos'} `,
              className: CLASS_NAMES.countProducts,
            },
            {
              label: `FEE: ${new DateFormatSlashShort().transform(order.FechaRecepcion)}`,
              className: CLASS_NAMES.dateLastUpdate,
            },
          ],
        }))
      : [],
);
export const selectPurchaseOrderSchedules = createSelector(
  selectPurchaseOrderDetails,
  (state: IPurchaseOrderDetails) => {
    const schedules = [];
    const schedule = state?.DireccionClienteDetalle?.HorarioAtencionEntrega;
    if (schedule?.HorarioAtencionLunes) {
      const monday = schedule?.HorarioAtencionLunes;
      schedules.push(
        `· Lunes · ${moment(monday.HoraInicioPrimerHorario, 'hh:mm').format('HH:mm')} - ${moment(
          monday.HoraFinPrimerHorario,
          'hh:mm',
        ).format('HH:mm')} y ${moment(monday.HoraInicioSegundoHorario, 'hh:mm').format(
          'HH:mm',
        )}-${moment(monday.HoraFinSegundoHorario, 'hh:mm').format('HH:mm')} Hrs`,
      );
    }
    if (schedule?.HorarioAtencionMartes) {
      const monday = schedule?.HorarioAtencionMartes;
      schedules.push(
        `· Martes · ${moment(monday.HoraInicioPrimerHorario, 'hh:mm').format('HH:mm')} - ${moment(
          monday.HoraFinPrimerHorario,
          'hh:mm',
        ).format('HH:mm')} y ${moment(monday.HoraInicioSegundoHorario, 'hh:mm').format(
          'HH:mm',
        )}-${moment(monday.HoraFinSegundoHorario, 'hh:mm').format('HH:mm')} Hrs`,
      );
    }
    if (schedule?.HorarioAtencionMiercoles) {
      const monday = schedule?.HorarioAtencionMiercoles;
      schedules.push(
        `· Miércoles · ${moment(monday.HoraInicioPrimerHorario, 'hh:mm').format(
          'HH:mm',
        )} - ${moment(monday.HoraFinPrimerHorario, 'hh:mm').format('HH:mm')} y ${moment(
          monday.HoraInicioSegundoHorario,
          'hh:mm',
        ).format('HH:mm')}-${moment(monday.HoraFinSegundoHorario, 'hh:mm').format('HH:mm')} Hrs`,
      );
    }
    if (schedule?.HorarioAtencionJueves) {
      const monday = schedule?.HorarioAtencionJueves;
      schedules.push(
        `· Jueves · ${moment(monday.HoraInicioPrimerHorario, 'hh:mm').format('HH:mm')} - ${moment(
          monday.HoraFinPrimerHorario,
          'hh:mm',
        ).format('HH:mm')} y ${moment(monday.HoraInicioSegundoHorario, 'hh:mm').format(
          'HH:mm',
        )}-${moment(monday.HoraFinSegundoHorario, 'hh:mm').format('HH:mm')} Hrs`,
      );
    }
    if (schedule?.HorarioAtencionViernes) {
      const monday = schedule?.HorarioAtencionViernes;
      schedules.push(
        `· Viernes · ${moment(monday.HoraInicioPrimerHorario, 'hh:mm').format('HH:mm')} - ${moment(
          monday.HoraFinPrimerHorario,
          'hh:mm',
        ).format('HH:mm')} y ${moment(monday.HoraInicioSegundoHorario, 'hh:mm').format(
          'HH:mm',
        )}-${moment(monday.HoraFinSegundoHorario, 'hh:mm').format('HH:mm')} Hrs`,
      );
    }
    return schedules;
  },
);
export const selectSavedClientContacts = createSelector(
  selectPurchaseOrderDetails,
  (state: IPurchaseOrderDetails): Array<TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj> =>
    state?.ListaContactoNotificadoEntrega,
);
export const selectClientContactsForMultiDrop = createSelector(
  selectOrderModificationDetails,
  selectSavedClientContacts,
  (
    state: IOrderModificationDetails,
    contacts: Array<TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj>,
  ): Array<IDropListMulti> =>
    _map(state.clientContacts, (o: ContactoDetalleObj) => ({
      value: o.CorreoElectronico[0]?.IdCorreoElectronico,
      labels: [{label: o.CorreoElectronico[0]?.Correo}],
      isSelected:
        findIndex(
          contacts,
          (i: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
            i.m_Item2?.CorreoElectronico[0]?.IdCorreoElectronico ===
            o.CorreoElectronico[0]?.IdCorreoElectronico,
        ) !== -1,
    })),
);
export const validatorForSegmentOrderButton = createSelector(
  selectPurchaseOrderEntries,
  (items: Array<IPurchaseOrderItem>): boolean =>
    items?.length > 1 && !isEmpty(filter(items, (o: IPurchaseOrderItem) => o.isSelected)),
);
export const validatorForCancelActions = createSelector(
  selectPurchaseOrderDetails,
  (details: IPurchaseOrderDetails): boolean =>
    details?.DireccionClienteDetalle?.DatosDireccionCliente?.AceptaParciales,
);
export const selectFreightExpress = createSelector(
  selectOrderModificationDetails,
  (state) => state.freightProviders,
);
export const selectFreightExpressList = createSelector(
  selectFreightExpress,
  selectOrderSelected,
  (list, order): Array<IFreightProvider> => {
    const arrayFreight: Array<IFreightProvider> = [];
    list.forEach((freight) => {
      arrayFreight.push({
        ...freight,
        isSelected: false,
        // FIXME
        /*find(
          order.purchaseOrderDetails.FletesExpress,
          (o) => o.IdProveedor === freight.IdProveedor,
        )*/
      });
    });
    return arrayFreight;
  },
);
export const selectFreight = createSelector(
  selectOrderModificationDetails,
  (state) => state.freight,
);
// FIXME: El flete ya no existe
export const selectFreightList = createSelector(
  selectFreight,
  selectOrderSelected,
  (list, order): Array<IFlete> => {
    return [];
  },
);
// FIXME: El flete ya no existe
export const selectSaveFreight = createSelector(
  selectFreightList,
  (state) => filter(state, (o) => o.isSelected)?.length > 0,
);
export const selectTotalFreightExpress = createSelector(selectFreightExpressList, (state) => {
  let total = 0;
  _map(state, (provider: IFreightExpress) => {
    if (provider.isSelected) {
      total += provider.PrecioFleteExpress;
    }
  });
  return total;
});
// FIXME: El flete ya no existe
export const selectTotalFreightConventional = createSelector(selectFreightList, (state) => {
  let total = 0;
  _map(state, (freight: IFlete) => {
    if (freight.isSelected) {
      total += freight.PrecioVenta;
    }
  });
  return total;
});
export const selectTpOrder = createSelector(
  selectOrderSelected,
  (state) => state.purchaseOrderDetails?.tpPedido,
);
export const selectCode = createSelector(selectOrderSelected, (state: IOrdersC) =>
  state.code ? state.code : [],
);
export const selectCodeIsFill = createSelector(
  selectOrderSelected,
  (state: IOrdersC) => filter(state.code, (o) => o !== null).length === 4,
);
export const selectCodeIsEmpty = createSelector(
  selectOrderSelected,
  (state: IOrdersC) => filter(state.code, (o) => o === null).length === 4,
);
export const selectShaked = createSelector(selectOrderSelected, (state: IOrdersC) => state.shaked);
export const selectFirstCodePassed = createSelector(
  selectOrderSelected,
  (state: IOrdersC) => state.firstCodePassed,
);
export const selectProcedureType = createSelector(
  selectOrderSelected,
  (order: IOrdersC) => order?.procedureType,
);
export const selectCodeRequestLocal = createSelector(
  selectOrderSelected,
  (order: IOrdersC) => order?.codeRequest || {},
);
export const selectCodeRequest = createSelector(
  selectPurchaseOrderDetails,
  (details: IPurchaseOrderDetails) => details?.tpClienteCSCreditoMorosoCorreo || {},
);
export const selectExistAnyRequest = createSelector(
  selectPurchaseOrderDetails,
  (details: IPurchaseOrderDetails) => !!(details && details.tpClienteCSCreditoMorosoCorreo),
);
export const selectExistEditInvoiceDataRequest = createSelector(
  selectPurchaseOrderDetails,
  (details: IPurchaseOrderDetails) =>
    !!(
      details &&
      details.tpClienteCSCreditoMorosoCorreo &&
      details.tpClienteCSCreditoMorosoCorreo.TipoTramite === PROCEDURES_TYPES.editData
    ),
);
export const selectIsAuthorizedEditInvoiceDataRequest = createSelector(
  [selectPurchaseOrderDetails, selectExistEditInvoiceDataRequest],
  (details: IPurchaseOrderDetails, exist: boolean) =>
    !!(exist && details.tpClienteCSCreditoMorosoCorreo.Autorizado),
);
export const selectExistCancelItemRequest = createSelector(
  selectPurchaseOrderDetails,
  (details: IPurchaseOrderDetails) =>
    !!(
      !isEmpty(details) &&
      !isEmpty(details.tpClienteCSCreditoMorosoCorreo) &&
      details.tpClienteCSCreditoMorosoCorreo.TipoTramite === PROCEDURES_TYPES.cancelItem &&
      details.tpClienteCSCreditoMorosoCorreo.IdTPPartidaPedido !== null
    ),
);

export const selectExistCancelOrderRequest = createSelector(
  selectPurchaseOrderDetails,
  (details: IPurchaseOrderDetails) =>
    !!(
      details &&
      details.tpClienteCSCreditoMorosoCorreo &&
      details.tpClienteCSCreditoMorosoCorreo.TipoTramite === PROCEDURES_TYPES.cancelOrder
    ),
);
export const selectFreightExpressBackUp = createSelector(
  selectOrderModificationDetails,
  (state) => state.freightExpressBackUp,
);
export const selectItemOfOrderFreightExpress = createSelector(selectOrderSelected, (state) =>
  state.purchaseOrderDetails?.FletesExpress ? state.purchaseOrderDetails.FletesExpress : [],
);
export const selectItemDeleteOfOrderFreightExpress = createSelector(
  selectItemOfOrderFreightExpress,
  selectFreightExpressBackUp,
  (freight, freightBackUp) => [],
  // FIXME: freight ahora es un numero
  /*filter(
      freightBackUp,
      (o) => findIndex(freight, (item) => item.IdProveedor === o.IdProveedor) < 0,
    ),*/
);
export const selectItemAddOrderFreightExpress = createSelector(
  selectFreightExpressList,
  selectFreightExpressBackUp,
  selectTpOrder,

  (arrayFreight, backUp, order) => {
    const arrayAdd: Array<any> = [];
    arrayFreight.forEach((freight) => {
      const isExist = findIndex(backUp, (item) => item.IdProveedor === freight.IdProveedor);

      if (freight.isSelected) {
        arrayAdd.push({
          IdCatMoneda: freight.IdCatMonedaVentas,
          Activo: true,
          Facturado: false,
          FechaRegistro: DEFAULT_DATE,
          FechaUltimaActualizacion: DEFAULT_DATE,
          IdProveedor: freight.IdProveedor,
          IdTPPedido: order.IdTPPedido,
          PrecioFlete: freight.PrecioFleteExpress,
          IdTPPedidoFleteExpress:
            isExist >= 0 ? backUp[isExist].IdTPPedidoFleteExpress : DEFAULT_UUID,
        });
      }
    });
    return arrayAdd;
  },
);
export const selectStatusPopFreight = createSelector(
  selectOrderModificationDetails,
  (state) => state.openFreight,
);
export const selectValidateFinalizeButton = createSelector(
  [selectedPurchaseOrder, selectPurchaseOrderDetails],
  (purchaseOrder: IOrdersC, order: IPurchaseOrderDetails): boolean =>
    !!(
      order &&
      order?.tpPedido &&
      order?.tpPedido?.NotasModificacion &&
      order?.tpPedido?.IdCatProceso &&
      order?.tpPedido?.IdCatDestino &&
      order?.catDestino &&
      order?.catDestino.IdCatDestino !== DEFAULT_UUID &&
      order?.tpPedido?.IdDireccionCliente &&
      order?.selectedClientAddresses &&
      order?.selectedClientAddresses.value !== DEFAULT_UUID &&
      purchaseOrder.processSelected &&
      purchaseOrder.processSelected.value !== DEFAULT_UUID &&
      purchaseOrder.notes !== ''
    ),
);
export const selectPopUpNotesIsOpen = createSelector(
  selectOrderSelected,
  (state: IOrdersC) => state.popUpNotesIsOpen,
);
export const selectQueryInfo = createSelector(
  selectSearchTerm,
  selectFilterSelected,
  selectCustomerSelected,
  (searchTerm: string, filterSelected: DropListOption, customer) => {
    const params = new FiltersOnlyActive();
    params.Filters.push(
      {
        NombreFiltro: 'IdCliente',
        ValorFiltro: customer.IdCliente,
      },
      {
        NombreFiltro: 'Tramitado',
        ValorFiltro: true,
      },
    );
    if (searchTerm !== '') {
      params.Filters.push({
        NombreFiltro: 'NumeroOrdenDeCompra',
        ValorFiltro: searchTerm,
      });
    }
    if (filterSelected.value > '1') {
      if (filterSelected.value === '2') {
        params.Filters.push({
          NombreFiltro: 'ConIncidencias',
          ValorFiltro: 0,
        });
      } else {
        params.Filters.push({
          NombreFiltro: 'ConIncidencias',
          ValorFiltro: 1,
        });
      }
    }
    return params;
  },
);
export const selectSelectedPurchaseOrder = createSelector(
  selectOrderModificationDetails,
  (state) => state.selectedPurchaseOrder,
);
export const selectFileBase64 = createSelector(
  selectOrderModificationDetails,
  (state) => state.fileBase64,
);
export const selectOpenPDF = createSelector(
  selectOrderModificationDetails,
  (state) => state.openViewFile,
);
export const selectViewFileIsLoading = createSelector(
  selectOrderModificationDetails,
  (state) => state.viewFileIsLoading,
);
// TODO: REVISAR SI SE QUITA O SE QUEDA
/*export const selectItemSelected = createSelector(selectPurchaseOrderEntries, (itemList) => {
  const item = filter(itemList, (o) => {
    if (o.isInViewQuotesLinked) {
      return o.isInViewQuotesLinked;
    }
  });
  return item[0];
});*/
export const selectInvoiceSelected = createSelector(
  selectOrderModificationDetails,
  (state) => state.invoice,
);
