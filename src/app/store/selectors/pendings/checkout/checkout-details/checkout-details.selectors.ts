import {createSelector} from '@ngrx/store';

// Models
import {ContactoDetalleObj, SolicitudAutorizacionCambio} from 'api-catalogos';
import * as apiLogistic from 'api-logistica';
import {
  CorreoElectronico,
  GMTipoAutorizacionUsuarioDetalle,
  PpPartidaPedidoAddendaSanofi,
  RestriccionTemporalDatosFacturacion,
  TpClienteCSCreditoMorosoCorreo,
  TpPartidaPedidoAddendaSanofi,
  TpPedido,
  TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj,
  VPartidaCotizacion,
} from 'api-logistica';
import {CheckoutState} from '@appModels/store/pendings/checkout/checkout.model';
import {
  CheckoutDetailsState,
  IOrdersC,
  IPurchaseOrderDetails,
  IPurchaseOrderItem,
} from '@appModels/store/pendings/checkout/checkout-details/checkout-details.model';
import {ICard} from '@appModels/card/card';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {
  ICustomerCheckOut,
  PROCEDURES_TYPES,
} from '@appModels/store/pendings/checkout/checkout-list/checkout-list.model';

// Selectors
import {selectCheckout} from '@appSelectors/pendings/pendings.selectors';

// Utils
import {
  concat,
  filter,
  find,
  findIndex,
  flow,
  forEach,
  isEmpty,
  map as _map,
  orderBy,
} from 'lodash-es';
import {DateFormatSlashShort} from '@appPipes/date-format.pipe';
import {CurrencyFormat} from '@appPipes/accounting/accounting.pipe';
import * as moment from 'moment';
import {
  DEFAULT_UUID,
  ENUM_CONTROL_FAMILY,
  FREIGHT_EXPRESS,
  FREIGHTS_LAST_MILE,
  KeyCatDestination,
  SRC_IMG_TYPE_AVAILABILITY,
  SRC_IMG_TYPE_ITEM,
} from '@appUtil/common.protocols';

import {FacturasPendientesClienteObj} from 'api-finanzas';

import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';
import {CalendarDay} from '@appModels/calendario/calendar';
import {selectCatalogsState} from '@appCore/core.state';
import {CatalogsState} from '@appModels/store/catalogs/catalogs.models';
import {
  buildInternalSalesItem,
  buildInternalSalesItemResume,
  buildSchedule,
  getTotalFreightsProcessing,
} from '@appHelpers/pending/processing/processing.helpers';
import {IFreightItem, InternalSalesItem} from '@appModels/table/internal-sales-item';
import {CLASS_NAMES} from '@appModels/shared-components/pqf-card';
import {
  calculateEstimatedDeliveryDate,
  currentDateWithoutHoursUTCFormatDate,
  dateWithoutHoursUTCDate,
} from '@appUtil/dates';
import {buildAddressFormat} from '@appUtil/util';
import {
  SeeItemDetailsPopBottom,
  SeeItemDetailsPopTop,
} from '@appModels/see-details-item-pop/see-item-details-pop.models';
import {buildImageNameSave} from '@appUtil/strings';

export const selectCheckoutDetails = createSelector(
  selectCheckout,
  (state: CheckoutState): CheckoutDetailsState => state.checkoutDetails,
);
export const selectClient = createSelector(
  selectCheckoutDetails,
  (state: CheckoutDetailsState) => state.clientSelected,
);
export const selectOrders = createSelector(
  selectCheckoutDetails,
  (state: CheckoutDetailsState) => state.purchaseOrders.list,
);
export const selectedPurchaseOrder = createSelector(
  selectCheckoutDetails,
  (state: CheckoutDetailsState): IOrdersC =>
    state.selectedPurchaseOrder ? state.selectedPurchaseOrder : ({} as IOrdersC),
);
export const selectResumeMode = createSelector(
  selectCheckoutDetails,
  (state: CheckoutDetailsState) => state?.resumeMode,
);

export const selectPurchaseOrderTotal = createSelector(
  selectOrders,
  (state: Array<IOrdersC>) => state.length,
);
export const selectPurchaseOrderForCards = createSelector(
  selectOrders,
  (state: Array<IOrdersC>): Array<ICard> =>
    state
      ? _map(state, (o: IOrdersC) => ({
          value: o.IdTPPedido,
          active: o.isSelected,
          labels: [
            {
              label: o.OcInterna
                ? `#${o.index + 1} · OC INTERNA`
                : o.SinOC
                ? `#${o.index + 1} · SIN OC`
                : `#${o.index + 1} · ${o.NumeroOrdenDeCompra}`,
              // color: true ? '#e67c91' : o.OcInterna ? '#e09c2c' : '#ffffff',
              className: CLASS_NAMES.title,
            },
            /**
             * DOCS: No se tiene el dato en Euros por lo tanto solo se considera Pesos o Dólares
             * */
            {
              label: `Valor Total ${
                o.ClaveMoneda === 'MXN'
                  ? new CurrencyFormat().transform(o.TotalMXN, 'MXN')
                  : new CurrencyFormat().transform(o.TotalUSD, 'USD')
              } ${o.ClaveMoneda === 'MXN' ? o.ClaveMoneda : 'USD'}`,
              className: CLASS_NAMES.totalAmount,
            },
            {
              label: `${o.Productos} ${o.Productos === 1 ? 'Producto' : 'Productos'}`,
              className: CLASS_NAMES.countProducts,
            },
            {
              label: `Recepción: ${new DateFormatSlashShort().transform(o.FechaRecepcion)}`,
              className: CLASS_NAMES.dateLastUpdate,
            },
          ],
        }))
      : [],
);
export const selectPurchaseOrderCurrency = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC): string => state?.ClaveMoneda,
);
export const selectPurchaseOrderEntries = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC): IPurchaseOrderItem[] => state?.purchaseOrderEntries?.list,
);
export const selectOpenedPurchaseOrderEntry = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC): IPurchaseOrderItem =>
    state?.purchaseOrderEntries
      ? filter(state.purchaseOrderEntries.list, (o: IPurchaseOrderItem) => o.isOpen)[0]
      : ({} as IPurchaseOrderItem),
);
export const selectVPartidaCotizacion = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC): VPartidaCotizacion => {
    const iPurchaseOrderItem: IPurchaseOrderItem = state?.purchaseOrderEntries?.list?.find(
      (it: IPurchaseOrderItem) => it?.isOpen,
    );
    return iPurchaseOrderItem?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle
      ?.VPartidaCotizacion;
  },
);

export const selectPurchaseOrderDetails = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC): IPurchaseOrderDetails => state?.purchaseOrderDetails,
);

export const clientAddress = createSelector(
  selectPurchaseOrderDetails,
  (state: IPurchaseOrderDetails) => buildAddressFormat(state?.DireccionClienteDetalle?.Direccion),
);

export const selectPurchaseOrderVTramitarPedidoPartida = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC): apiLogistic.VTramitarPedidoPartidaDetalle =>
    state?.vTramitarPedidoPartidaDetalle,
);
export const selectFirstRestrictionTemporalFacturation = createSelector(
  selectPurchaseOrderVTramitarPedidoPartida,
  (
    vTramitarPedidoPartidaDetalle: apiLogistic.VTramitarPedidoPartidaDetalle,
  ): RestriccionTemporalDatosFacturacion => {
    return vTramitarPedidoPartidaDetalle.RestriccionesTemporalesDatosFacturacion[0];
  },
);
export const selectPurchaseTpPartidaPedido = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC): IPurchaseOrderItem => {
    const iPurchaseOrderItem: IPurchaseOrderItem = state?.purchaseOrderEntries?.list?.find(
      (it: IPurchaseOrderItem) => it?.isOpen,
    );
    return iPurchaseOrderItem;
  },
);
export const selectBackupPurchaseOrder = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC): IPurchaseOrderItem => {
    return state?.purchaseOrderEntries?.backupPurchaseOrder;
  },
);
export const selectTpPartidaPedidoAddendaSanofi = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC): TpPartidaPedidoAddendaSanofi => {
    const iPurchaseOrderItem: IPurchaseOrderItem = state?.purchaseOrderEntries?.list?.find(
      (it: IPurchaseOrderItem) => it?.isOpen,
    );
    return iPurchaseOrderItem?.tpPartidaPedidoAddendaSanofi;
  },
);
export const selectPurchaseTpPartidaPedidoAddendaSanofi = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC): TpPartidaPedidoAddendaSanofi =>
    state?.vTramitarPedidoPartidaDetalle?.tpPartidaPedidoAddendaSanofi,
);
export const selectUnavailableDates = createSelector(
  selectCheckoutDetails,
  (checkoutDetailsState: CheckoutDetailsState) => checkoutDetailsState.datesUnavailable,
);
export const selectFEEDateRangeStart = createSelector(
  [selectVPartidaCotizacion, selectUnavailableDates],
  (selected: VPartidaCotizacion, nonWorkingDays: string[]): Date => {
    const deliveryDaysNumber = selected?.TiempoEstimadoEntrega;
    const currentDate = currentDateWithoutHoursUTCFormatDate();
    const timeSlack = 3;
    return calculateEstimatedDeliveryDate(
      currentDate,
      deliveryDaysNumber + timeSlack,
      nonWorkingDays,
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
  [selectVPartidaCotizacion, selectUnavailableDates],
  (selected: VPartidaCotizacion, nonWorkingDays: string[]): Date => {
    const deliveryDays = selected?.TiempoEstimadoEntrega;
    const currentDate = dateWithoutHoursUTCDate();
    return calculateEstimatedDeliveryDate(currentDate, deliveryDays, nonWorkingDays);
  },
);

export const selectPurchaseSelectedDate = createSelector(
  [selectPurchaseTpPartidaPedido, selectFEEDateRangeStart],
  (state: IPurchaseOrderItem, startDate: Date): Date => {
    return state?.tpPartidaPedido?.FechaEstimadaEntrega
      ? new Date(state?.tpPartidaPedido?.FechaEstimadaEntrega)
      : null;
  },
);
export const selectTpPedido = createSelector(
  selectPurchaseOrderDetails,
  (state: IPurchaseOrderDetails): TpPedido => state?.tpPedido,
);
export const selectContactDetailClientEmail = createSelector(
  selectPurchaseOrderDetails,
  (state: IPurchaseOrderDetails) => state?.ContactoDetalleObj?.CorreoElectronico[0],
);
export const selectPurchaseOrderCatDestiny = createSelector(
  selectPurchaseOrderDetails,
  (state: IPurchaseOrderDetails): DropListOption =>
    state?.catDestino
      ? {
          value: state?.catDestino.IdCatDestino,
          label: state?.catDestino.Destino,
          labelKey: state?.catDestino?.Clave,
        }
      : ({} as DropListOption),
);
export const selectPurchaseOrderSchedules = createSelector(
  selectPurchaseOrderDetails,
  (state: IPurchaseOrderDetails) => {
    const schedules = [];
    const schedule = state?.DireccionClienteDetalle?.HorarioAtencionEntrega;
    if (schedule?.HorarioAtencionLunes) {
      schedules.push(buildSchedule('Lunes', schedule?.HorarioAtencionLunes));
    }
    if (schedule?.HorarioAtencionMartes) {
      schedules.push(buildSchedule('Martes', schedule?.HorarioAtencionMartes));
    }
    if (schedule?.HorarioAtencionMiercoles) {
      schedules.push(buildSchedule('Miércoles', schedule?.HorarioAtencionMiercoles));
    }
    if (schedule?.HorarioAtencionJueves) {
      schedules.push(buildSchedule('Jueves', schedule?.HorarioAtencionJueves));
    }
    if (schedule?.HorarioAtencionViernes) {
      schedules.push(buildSchedule('Viernes', schedule?.HorarioAtencionViernes));
    }
    return schedules;
  },
);
export const selectSavedClientContacts = createSelector(
  selectPurchaseOrderDetails,
  (state: IPurchaseOrderDetails): Array<TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj> =>
    state?.ListaContactoNotificadoEntrega,
);

export const selectListContactDeliveryNotificationIds = createSelector(
  selectSavedClientContacts,
  (list: Array<TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj>) =>
    _map(
      list,
      (o: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
        o?.m_Item2?.IdContactoCliente,
    ),
);
export const selectClientContactsForMultiDrop = createSelector(
  selectCheckoutDetails,
  selectSavedClientContacts,
  (
    state: CheckoutDetailsState,
    contacts: Array<TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj>,
  ): Array<IDropListMulti> =>
    _map(state.clientContacts, (o: ContactoDetalleObj) => ({
      value: o.CorreoElectronico[0]?.IdCorreoElectronico,
      labels: [
        {label: `${o.Nombres} ${o.ApellidoPaterno} ${o.ApellidoMaterno ? o?.ApellidoMaterno : ''}`},
      ],
      isSelected:
        findIndex(
          contacts,
          (i: TupleTpPedidoContactoNotificadoEntregaContactoDetalleObj) =>
            i.m_Item2?.CorreoElectronico[0]?.IdCorreoElectronico ===
            o.CorreoElectronico[0]?.IdCorreoElectronico,
        ) !== -1,
    })),
);

export const selectContactDelivery = createSelector(
  selectCheckoutDetails,
  (state: CheckoutDetailsState): DropListOption[] =>
    _map(
      state.clientContacts,
      (contact: ContactoDetalleObj): DropListOption => {
        return {
          label: `${contact.Nombres} ${contact.ApellidoPaterno} ${
            contact?.ApellidoMaterno ? contact?.ApellidoMaterno : ''
          }`,
          value: contact?.IdContactoCliente,
        };
      },
    ),
);

export const selectedContactDelivery = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC): DropListOption => state?.selectedContactDelivery,
);
export const selectClientContactsForDropList = createSelector(
  selectCheckoutDetails,
  (state: CheckoutDetailsState): DropListOption[] => {
    return _map(
      state.clientContacts,
      (o: ContactoDetalleObj): DropListOption => ({
        value: o?.IdContacto,
        label: o?.CorreoElectronico[0]?.Correo?.toLowerCase(),
      }),
    );
  },
);
export const selectClientEmail = createSelector(
  [selectClientContactsForDropList, selectTpPedido],
  (list: DropListOption[], selectTpPedido: TpPedido): DropListOption => {
    return list.filter(
      (it: DropListOption) =>
        it.label?.toLowerCase() === selectTpPedido?.AddendaCorreoElectronico?.toLowerCase(),
    )[0];
  },
);
export const selectClientContactsForMultiDropActive = createSelector(
  selectContactDetailClientEmail,
  (state: CorreoElectronico): Array<IDropListMulti> =>
    _map([state], (o: CorreoElectronico) => ({
      value: o?.IdCorreoElectronico,
      labels: [{label: o?.Correo, isShow: true}],
    })),
);
export const checkoutButtonValidator = createSelector(
  selectPurchaseOrderDetails,
  (state: IPurchaseOrderDetails): boolean =>
    !!(
      state &&
      !isEmpty(state.catDestino) &&
      !isEmpty(state.selectedClientAddresses) &&
      !isEmpty(state.ListaContactoNotificadoEntrega) &&
      !isEmpty(state.tpPedido) &&
      state.tpPedido.IdCatDestino &&
      state.tpPedido.IdCatDestino !== DEFAULT_UUID &&
      state.tpPedido.IdDireccionCliente &&
      state.tpPedido.IdDireccionCliente !== DEFAULT_UUID &&
      (state?.catDestino?.Clave === KeyCatDestination?.Usuario
        ? state.tpPedido?.IdContactoEntrega !== null
        : true) &&
      !state.OcInternaPediente
    ),
);
export const selectTotalControlledEntries = createSelector(
  selectPurchaseOrderEntries,
  (state: IPurchaseOrderItem[]): boolean =>
    filter(
      state,
      (o: IPurchaseOrderItem) =>
        (o.cotPartidaCotizacionDetalle?.vProducto?.ControlClave ===
          ENUM_CONTROL_FAMILY.Nacionales ||
          o.cotPartidaCotizacionDetalle?.vProducto?.ControlClave ===
            ENUM_CONTROL_FAMILY.Mundiales) &&
        o.cotPartidaCotizacionDetalle?.vProducto.Controlado,
    ).length > 0,
);
export const selectCode = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC) => state.code || [],
);
export const selectCodeIsFill = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC): boolean => filter(state.code, (o) => o !== null)?.length === 4,
);
export const selectCodeIsEmpty = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC): boolean => filter(state.code, (o) => o === null)?.length === 4,
);
export const selectShaked = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC) => state.shaked,
);
export const selectProcedureType = createSelector(
  selectedPurchaseOrder,
  (order: IOrdersC): string => order?.procedureType,
);
export const selectCodeRequest = createSelector(
  selectPurchaseOrderDetails,
  (details: IPurchaseOrderDetails) => details?.tpClienteCSCreditoMorosoCorreo || {},
);
export const selectCodeRequestLocal = createSelector(
  selectedPurchaseOrder,
  (order: IOrdersC) => order?.codeRequest || {},
);
export const selectExistAnyRequest = createSelector(
  selectPurchaseOrderDetails,
  (details: IPurchaseOrderDetails) => {
    return !!(details && details.tpClienteCSCreditoMorosoCorreo);
  },
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
export const selectExistDelinquentCustomerRequest = createSelector(
  selectPurchaseOrderDetails,
  (details: IPurchaseOrderDetails) =>
    !!(
      details &&
      details.tpClienteCSCreditoMorosoCorreo &&
      details.tpClienteCSCreditoMorosoCorreo.TipoTramite === PROCEDURES_TYPES.delinquentCustomer
    ),
);
export const selectExistInvoiceInAdvanceRequest = createSelector(
  selectPurchaseOrderDetails,
  (details: IPurchaseOrderDetails) =>
    !!(
      details &&
      details.tpClienteCSCreditoMorosoCorreo &&
      details.tpClienteCSCreditoMorosoCorreo.TipoTramite === PROCEDURES_TYPES.invoiceInAdvance
    ),
);

export const selectCodeRequestNode = createSelector(
  selectCheckoutDetails,
  (state) => state.selectedPurchaseOrder.codeRequest,
);
export const selectCodePopValidation = createSelector(
  selectExistAnyRequest,
  selectCodeIsFill,
  selectCodeRequest,
  selectPurchaseOrderDetails,
  selectProcedureType,
  selectCodeRequestNode,
  (
    anyRequest: boolean,
    codeFill: boolean,
    codeRequest: TpClienteCSCreditoMorosoCorreo,
    requestType: IPurchaseOrderDetails,
    procedureType: string,
    codeNode: SolicitudAutorizacionCambio,
  ): boolean => {
    if (anyRequest) {
      if (requestType.tpClienteCSCreditoMorosoCorreo.TipoTramite === procedureType) {
        //   return codeFill && codeRequest.Autorizado && codeNode !== {};
        return codeFill && codeRequest.Autorizado && codeNode !== null;
      } else {
        return !!codeNode;
      }
    } else {
      return !!codeNode;
    }
  },
);

export const selectFilterByType = createSelector(
  selectCheckoutDetails,
  (state: CheckoutDetailsState) => state.dataSlow.filterByType,
);
export const clientSelected = createSelector(
  selectCheckoutDetails,
  (state: CheckoutDetailsState): ICustomerCheckOut => state.clientSelected,
);
export const selectDataSlow = createSelector(
  selectCheckoutDetails,
  (state: CheckoutDetailsState) => state.dataSlow.dataPendingInvoices,
);
export const selectHealthy = createSelector(
  [selectDataSlow, selectFilterByType],
  (pendingInvoices: FacturasPendientesClienteObj, filterByType: DropListOption) =>
    flow([
      () => {
        if (filterByType.value === '1') {
          return orderBy(
            pendingInvoices.FacturasMorosas,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item4],
            'desc',
          );
        } else if (filterByType.value === '2') {
          return orderBy(
            pendingInvoices.FacturasMorosas,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item4],
            'asc',
          );
        }
      },
      (facturasMorosas) =>
        _map(facturasMorosas, (invoice, index) => ({
          ...invoice,
          Index: index + 1,
        })),
    ])(),
);
export const selectCreditNotes = createSelector(
  [selectDataSlow, selectFilterByType],
  (pendingInvoices: FacturasPendientesClienteObj, filterByType: DropListOption) =>
    flow([
      () => {
        if (filterByType.value === '1') {
          return orderBy(
            pendingInvoices.NotasDeCredito,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item3],
            'desc',
          );
        } else if (filterByType.value === '2') {
          return orderBy(
            pendingInvoices.NotasDeCredito,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item3],
            'asc',
          );
        }
      },
      (notasDeCredito) =>
        _map(notasDeCredito, (invoice, index) => ({
          ...invoice,
          Index: index + 1,
        })),
    ])(),
);
export const selectDelinquentBills = createSelector(
  [selectDataSlow, selectFilterByType],
  (pendingsInvoices: FacturasPendientesClienteObj, filterByType: DropListOption) =>
    flow([
      () => {
        if (filterByType.value === '1') {
          return orderBy(
            pendingsInvoices.FacturasMorosas,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item4],
            'desc',
          );
        } else if (filterByType.value === '2') {
          return orderBy(
            pendingsInvoices.FacturasMorosas,
            [(o) => new Date(o.m_Item1.FechaRegistro).getTime(), (o) => o.m_Item4],
            'asc',
          );
        }
      },
      (facturasMorosas) =>
        _map(facturasMorosas, (invoice, index) => ({
          ...invoice,
          Index: index + 1,
        })),
    ])(),
);
export const selectDoughnutChartDataDefaulting = createSelector(
  selectHealthy,
  selectDelinquentBills,
  selectCreditNotes,
  (healthyDebtBills, delinquentBills, creditNotes) =>
    flow([
      (): IDoughnutChart => {
        const labels = ['Morosidad', 'Deuda Sana', 'Notas de Crédito'];
        let values: Array<number> = [];
        let totalCreditNotes = 0;
        let totalHealthyDebtBills = 0;
        let totalDelinquentBills = 0;
        forEach(creditNotes, (o) => {
          totalCreditNotes += o.m_Item3;
        });
        forEach(healthyDebtBills, (o) => {
          totalHealthyDebtBills += o.m_Item4;
        });
        forEach(delinquentBills, (o) => {
          totalDelinquentBills += o.m_Item4;
        });
        values = [totalDelinquentBills, totalHealthyDebtBills, totalCreditNotes];
        return {labels, values};
      },
    ])(),
);
export const selectCurrencyClient = createSelector(selectDataSlow, (state) =>
  state?.catMoneda ? state?.catMoneda.ClaveMoneda : '',
);
export const selectDoughnutChartDefaultingDetails = createSelector(
  selectDoughnutChartDataDefaulting,
  selectDataSlow,
  selectCurrencyClient,
  (chartData, pendingsInvoices: FacturasPendientesClienteObj, currency) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        const totalDelinquentBills = chartData.values[0];
        const totalHealthyDebtBills = chartData.values[1];
        const totalCreditNotes = chartData.values[2];
        if (!isEmpty(pendingsInvoices)) {
          return [
            {
              label: 'Morosidad',
              value: `${new CurrencyFormat().transform(
                totalDelinquentBills,
                currency,
              )} ${currency}`,
            },
            {
              label: 'Deuda Sana',
              value: `${new CurrencyFormat().transform(
                totalHealthyDebtBills,
                currency,
              )} ${currency}`,
            },
            {
              label: 'Notas de Crédito',
              value: `${new CurrencyFormat().transform(totalCreditNotes, currency)} ${currency}`,
            },
          ];
        } else {
          return [];
        }
      },
    ])(),
);
export const selectUnavailableDatesCalendarDay = createSelector(
  selectCheckoutDetails,

  (state): Array<CalendarDay> => {
    return _map(state.datesUnavailable, (o: string) => ({
      day: moment(o, 'YYYY-MM-DD').toDate(),
      enable: false,
    }));
  },
);
export const selectViewFileLoading = createSelector(
  selectCheckoutDetails,
  (state) => state.viewFileIsLoading,
);
export const selectFileBase64 = createSelector(
  selectCheckoutDetails,
  (state: CheckoutDetailsState) => state?.fileBase64,
);
/*export const selectItemSelected = createSelector(selectOrders, (orders: IOrdersC[]) => {
  const item = filter(orders, (o) => {
    if (o.isInViewQuotesLinked) {
      return o.quotesLinked;
    }
  });
  return item[0];
});*/
export const selectIsPDF = createSelector(
  selectCheckoutDetails,
  (state: CheckoutDetailsState) => state.isPDF,
);
export const selectIdTPPedido = createSelector(
  selectedPurchaseOrder,
  (state: IOrdersC) => state.IdTPPedido,
);
export const selectGmTipoAutorizacion = createSelector(
  selectCheckoutDetails,
  (state: CheckoutDetailsState) => state.gmTipoAutorizacionUsuarioDetalle,
);
export const selectGMCatTipoAutorizacion = createSelector(
  selectGmTipoAutorizacion,
  (state: GMTipoAutorizacionUsuarioDetalle) => state.catTipoAutorizacion,
);
export const selectIsAddendaPopUpOpen = createSelector(
  selectPurchaseOrderDetails,
  (state: IPurchaseOrderDetails): boolean => state?.isAddendaPopUpOpen,
);
export const selectListUnidad = createSelector(
  selectCatalogsState,
  (state: CatalogsState): Array<DropListOption> => state?.unidad?.listUnidad,
);
export const selectListUnidadPqf = createSelector(
  [selectCatalogsState, selectTpPartidaPedidoAddendaSanofi],
  (stateCatalogs: CatalogsState, sanofiState: TpPartidaPedidoAddendaSanofi): DropListOption => {
    return stateCatalogs?.unidad?.listUnidad.find(
      (it: DropListOption) =>
        // DOCS: SE CAMBIÓ UnidadDeMedida a IdCatUnidad
        it?.value === sanofiState?.IdCatUnidad,
    );
  },
);
export const selectItemForReusableHeaderTable = createSelector(
  selectPurchaseOrderEntries,
  selectedPurchaseOrder,
  selectPurchaseOrderDetails,
  (
    items: IPurchaseOrderItem[],
    purchaseOrderSelected: IOrdersC,
    details: IPurchaseOrderDetails,
  ): InternalSalesItem => {
    if (items?.length >= 1) {
      // const isItemizedFreight =
      //   details?.tpPedidoFleteExpress !== null || details?.tpPedidoFletesUltimaMilla?.length > 0
      //     ? !details.tpPedido?.FleteDesglosado
      //     : false;
      const showNotes = !isEmpty(
        filter(items, (o: IPurchaseOrderItem) => o?.tpPartidaPedido?.Comentarios),
      );
      const isItemizedFreight = !!find(
        items,
        (o: IPurchaseOrderItem) => o.PrecioFleteNoDesglosado > 0,
      );
      return buildInternalSalesItem(showNotes, items[0], purchaseOrderSelected.ClaveMoneda, {
        details,
        isItemizedFreight,
      });
    } else {
      return null;
    }
  },
);

export const selectHasFreights = createSelector(
  selectPurchaseOrderDetails,
  (details: IPurchaseOrderDetails): boolean => {
    return (
      !isEmpty(details?.tpPedidoFleteExpressObj) || details?.tpPedidoFletesUltimaMilla?.length > 0
    );
  },
);

export const selectTotalItemFreight = createSelector(
  selectPurchaseOrderDetails,
  (details: IPurchaseOrderDetails): number =>
    getTotalFreightsProcessing(
      details?.tpPedidoFletesUltimaMilla,
      details?.tpPedidoFleteExpressObj,
    ),
);

export const selectItemsForSalesItem = createSelector(
  selectPurchaseOrderEntries,
  selectedPurchaseOrder,
  selectPurchaseOrderDetails,
  (
    items: IPurchaseOrderItem[],
    purchaseOrderSelected: IOrdersC,
    details: IPurchaseOrderDetails,
  ): InternalSalesItem[] => {
    if (items?.length >= 1) {
      if (
        details?.tpPedidoFleteExpressObj !== null ||
        details?.tpPedidoFletesUltimaMilla?.length > 0
      ) {
        if (details?.tpPedido?.FleteDesglosado) {
          const freightItem: IFreightItem = {
            descriptionFreight: details?.tpPedidoFleteExpressObj
              ? FREIGHT_EXPRESS
              : FREIGHTS_LAST_MILE,
            subtotal: getTotalFreightsProcessing(
              details?.tpPedidoFletesUltimaMilla,
              details?.tpPedidoFleteExpressObj,
              {subtotal: true},
            ),
            iva: getTotalFreightsProcessing(
              details?.tpPedidoFletesUltimaMilla,
              details?.tpPedidoFleteExpressObj,
              {iva: true},
            ),
            total: getTotalFreightsProcessing(
              details?.tpPedidoFletesUltimaMilla,
              details?.tpPedidoFleteExpressObj,
            ),
          };
          items = concat(items, [{freightItem}]);
        }
      }
      // const isItemizedFreight =
      //   details?.tpPedidoFleteExpress !== null || details?.tpPedidoFletesUltimaMilla?.length > 0
      //     ? !details?.tpPedido?.FleteDesglosado
      //     : false;
      const isItemizedFreight = find(
        items,
        (o: IPurchaseOrderItem) => o.PrecioFleteNoDesglosado > 0,
      );
      const showNotes = !isEmpty(
        filter(items, (o: IPurchaseOrderItem) => o?.tpPartidaPedido?.Comentarios),
      );
      return _map(items, (item: IPurchaseOrderItem, index) => {
        return buildInternalSalesItem(showNotes, item, purchaseOrderSelected.ClaveMoneda, {
          index,
          details,
          isItemizedFreight: isItemizedFreight !== undefined,
        });
      });
    } else {
      return [];
    }
  },
);
export const selectItemsForSalesItemResume = createSelector(
  [selectPurchaseOrderEntries, selectPurchaseOrderCurrency, selectPurchaseOrderDetails],
  (
    items: IPurchaseOrderItem[],
    currency: string,
    details: IPurchaseOrderDetails,
  ): InternalSalesItem[] => {
    if (
      details?.tpPedidoFleteExpressObj !== null ||
      details?.tpPedidoFletesUltimaMilla?.length > 0
    ) {
      if (details?.tpPedido?.FleteDesglosado) {
        const freightItem: IFreightItem = {
          descriptionFreight: details?.tpPedidoFleteExpressObj
            ? FREIGHT_EXPRESS
            : FREIGHTS_LAST_MILE,
          subtotal: getTotalFreightsProcessing(
            details?.tpPedidoFletesUltimaMilla,
            details?.tpPedidoFleteExpressObj,
            {subtotal: true},
          ),
          iva: getTotalFreightsProcessing(
            details?.tpPedidoFletesUltimaMilla,
            details?.tpPedidoFleteExpressObj,
            {iva: true},
          ),
          total: getTotalFreightsProcessing(
            details?.tpPedidoFletesUltimaMilla,
            details?.tpPedidoFleteExpressObj,
          ),
        };
        items = concat(items, [{freightItem}]);
      }
    }

    const showNotes = !isEmpty(
      filter(items, (o: IPurchaseOrderItem) => o?.tpPartidaPedido?.Comentarios),
    );
    // const isItemizedFreight =
    //   details?.tpPedidoFleteExpress !== null || details?.tpPedidoFletesUltimaMilla?.length > 0
    //     ? !details?.tpPedido?.FleteDesglosado
    //     : false;
    const isItemizedFreight = find(items, (o: IPurchaseOrderItem) => o.PrecioFleteNoDesglosado > 0);
    return _map(items, (item) => {
      return buildInternalSalesItemResume(showNotes, item, currency, {
        isItemizedFreight: isItemizedFreight !== undefined,
        details,
      });
    });
  },
);
export const selectSalesItemHeaderResume = createSelector(
  [selectPurchaseOrderEntries, selectPurchaseOrderCurrency, selectPurchaseOrderDetails],
  (items: IPurchaseOrderItem[], currency: string, details: IPurchaseOrderDetails) => {
    const showNotes = !isEmpty(
      filter(items, (o: IPurchaseOrderItem) => o?.tpPartidaPedido?.Comentarios),
    );
    const isItemizedFreight = find(items, (o: IPurchaseOrderItem) => o.PrecioFleteNoDesglosado > 0);

    const objPurchasePromise: IPurchaseOrderDetails = {};
    return buildInternalSalesItemResume(showNotes, objPurchasePromise, currency, {
      isItemizedFreight: isItemizedFreight !== undefined,
      details,
    });
  },
);
export const selectIsValidAddendaInfo = createSelector(
  selectTpPedido,
  (tpPedido: TpPedido): boolean =>
    tpPedido.AddendaCorreoElectronico !== null &&
    tpPedido.AddendaCorreoElectronico !== '' &&
    tpPedido.AddendaObservaciones !== null &&
    tpPedido.AddendaObservaciones !== '',
);
export const getIdClientAddress = createSelector(
  selectPurchaseOrderDetails,
  (details: IPurchaseOrderDetails) =>
    details?.DireccionClienteDetalle?.DireccionCliente?.IdDireccionCliente,
);
export const selectEntrySelected = createSelector(
  selectedPurchaseOrder,
  (purchaseOrder: IOrdersC) => purchaseOrder.purchaseOrderEntries?.entrySelected,
);
export const selectIsAddendaOderLine = createSelector(
  selectTpPedido,
  (order: TpPedido) => order?.AplicaAddendaLineaDeOrden,
);
export const selectAddendaSanofi = createSelector(
  selectedPurchaseOrder,
  (order: IOrdersC): PpPartidaPedidoAddendaSanofi =>
    order.purchaseOrderEntries.tpPartidaPedidoAddendaSanofi,
);
export const validateTEEPop = createSelector(
  [selectAddendaSanofi, selectIsAddendaOderLine, selectEntrySelected],
  (
    addendaSanofi: PpPartidaPedidoAddendaSanofi,
    addendaApply: boolean,
    entrySelected: IPurchaseOrderItem,
  ): boolean => {
    return !!(
      ((addendaApply && addendaSanofi?.LineaDeOrden && addendaSanofi?.IdCatUnidad) ||
        !addendaApply) &&
      ((entrySelected?.tpPartidaPedido?.Programada &&
        entrySelected?.tpPartidaPedido.FechaEstimadaEntrega) ||
        !entrySelected?.tpPartidaPedido?.Programada)
    );
  },
);
export const selectListEntriesApiStatus = createSelector(
  selectedPurchaseOrder,
  (purchaseOrder: IOrdersC): number => purchaseOrder?.purchaseOrderEntries?.listStatus,
);
export const selectTEEOriginal = createSelector(
  selectVPartidaCotizacion,
  (state: VPartidaCotizacion): string =>
    state?.TiempoEstimadoEntrega +
    (state?.TiempoEstimadoEntrega && state?.TiempoEstimadoEntrega === 1 ? ' día' : 'días'),
);

export const selectDetailsItemPopTop = createSelector(
  selectEntrySelected,
  selectedPurchaseOrder,
  (state: IPurchaseOrderItem, orderSelected: IOrdersC): SeeItemDetailsPopTop => {
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
        srcImageBrand: `assets/Images/logos/${vProducto?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
        srcImageAvailability:
          SRC_IMG_TYPE_AVAILABILITY[vProducto?.Disponibilidad?.split(' ')?.join('')] ||
          SRC_IMG_TYPE_AVAILABILITY.Disponible,
        srcImageTypeItem: SRC_IMG_TYPE_ITEM[typeItem] || SRC_IMG_TYPE_ITEM.Original,
        cat: vProducto?.Catalogo,
        typePresentation: vProducto?.TipoPresentacion,
        amountPresentation: vProducto?.Presentacion,
        unitProduct: vProducto?.Unidad,
        typeUse: vProducto?.Uso,
        description: vProducto?.Descripcion,
        type: vProducto?.Tipo,
        subtype: vProducto?.Subtipo,
        control: vProducto?.Control,
        isControlled: vProducto?.Controlado,
        nameProvider: vProducto?.NombreProveedor, //DOCS:
        nameBrand: vProducto?.NombreMarca,
        tee: state?.tpPartidaPedido?.TiempoEstimadoEntrega,
        unitPrice: state?.PrecioUnitario,
        currency: orderSelected.ClaveMoneda,
        publication: {
          nameAuthor: vProducto?.Autor,
          formatPublication: vProducto?.FormatoPublicacion,
        },
        training: {
          typeMode: vProducto?.MedioDifusion,
          timeEvent: vProducto?.DuracionEvento,
          numberPerson: vProducto?.NumeroDePersonasPorGrupo,
        },
      };
    }

    return {} as SeeItemDetailsPopTop;
  },
);

export const selectDetailsItemPopBottom = createSelector(
  [selectEntrySelected, selectedPurchaseOrder],
  (state: IPurchaseOrderItem, orderSelected: IOrdersC): SeeItemDetailsPopBottom => {
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
          state?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.NombreLote, //DOCS: Nombre del lote
        edition: vProducto?.Edicion,
      };
    }
    return {} as SeeItemDetailsPopBottom;
  },
);
