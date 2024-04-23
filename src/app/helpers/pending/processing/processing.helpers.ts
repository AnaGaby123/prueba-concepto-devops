import {InternalSalesItem, StylesColumnTotalValue} from '@appModels/table/internal-sales-item';
import {
  IPurchaseOrderDetails,
  IPurchaseOrderItem,
} from '@appModels/store/pendings/checkout/checkout-details/checkout-details.model';
import {
  AttributeDashboard,
  GMtpPedidoTramitarCorreo,
  HorarioAtencion,
  Resumen,
  TpPartidasPedidoTramitarCorreo,
  TpPedido,
  TpPedidoFleteExpress,
  TpPedidoFleteUltimaMilla,
} from 'api-logistica';
import {ICheckOutDashboardItems} from '@appModels/store/pendings/checkout/checkout-list/checkout-list.model';
import {forEach, map as _map, sumBy} from 'lodash-es';
import {IDataMail} from '@appModels/correo/correo';
import * as moment from 'moment';
import {FREIGHT_PROPERTY} from '@appUtil/common.protocols';

const stylesColumnTotalValue = StylesColumnTotalValue;
enum checkOutStatus {
  Todos = 'Todos',
  OcInterna = 'Oc Interna',
  OcPendiente = 'Oc Pendiente',
}

enum checkOutStatusApiResponse {
  Todos = 'Total',
  OcInternaTrue = 'OcInternatrue',
  OcInternaPendientetTrue = 'OcInternaPendientetrue',
}

const checkOutStatusFormApi = {
  [checkOutStatus.Todos]: checkOutStatusApiResponse.Todos,
  [checkOutStatus.OcInterna]: checkOutStatusApiResponse.OcInternaTrue,
  [checkOutStatus.OcPendiente]: checkOutStatusApiResponse.OcInternaPendientetTrue,
};

const buildCheckoutItemsDashboard = (items: Array<Resumen>): Array<ICheckOutDashboardItems> => {
  return _map(
    items,
    (o: Resumen, Index): ICheckOutDashboardItems => {
      const newObject: ICheckOutDashboardItems = {
        ...o,
        IdCliente: o.DescripcionLlave,
        Index: Index + 1,
        contacts: [],
      };
      forEach(o.Atributos, (i: AttributeDashboard) => {
        newObject[i.DescriptionField] = i.ValueField;
      });
      return newObject;
    },
  );
};

const buildInternalSalesItem = (
  showNotes: boolean,
  item: IPurchaseOrderItem,
  currency: string,
  optional?: {
    index?: number;
    details?: IPurchaseOrderDetails;
    isItemizedFreight?: boolean;
  },
): InternalSalesItem => {
  if (!item?.freightItem) {
    return {
      activeGenericEmitter: true,
      backgroundColorByTypeItem:
        item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
          ?.TipoPartidaCotizacion ?? 'Original',
      columnBrand: {
        nameBrand: item?.cotPartidaCotizacionDetalle?.vProducto?.NombreMarca,
        src: item?.imageHover,
      },
      columnConcept: {
        availabilityKey: item?.cotPartidaCotizacionDetalle?.vProducto?.DisponibilidadClave,
        cat: item?.cotPartidaCotizacionDetalle?.vProducto?.Catalogo,
        control: item?.cotPartidaCotizacionDetalle?.vProducto?.Control,
        controlled: item?.cotPartidaCotizacionDetalle?.vProducto?.Controlado,
        dateValidation:
          item?.cotPartidaCotizacionDetalle?.vProducto?.FechaCaducidadVigenciaCuraduria,
        description: item?.cotPartidaCotizacionDetalle?.vProducto?.Descripcion,
        inContract: item?.TieneContrato,
        presentation: item?.cotPartidaCotizacionDetalle?.vProducto?.Presentacion,
        subType: item?.cotPartidaCotizacionDetalle?.vProducto?.Subtipo,
        type: item?.cotPartidaCotizacionDetalle?.vProducto?.Tipo,
        typePresentation: item?.cotPartidaCotizacionDetalle?.vProducto?.TipoPresentacion,
        unity: item?.cotPartidaCotizacionDetalle?.vProducto?.Unidad,
        proratedExpress:
          item?.tpPartidaPedido?.AplicaFleteExpress && item?.PrecioFleteNoDesglosado > 0,
        author: item?.cotPartidaCotizacionDetalle?.vProducto?.Autor ?? 'N/D',
        formatPublication:
          item?.cotPartidaCotizacionDetalle?.vProducto?.FormatoPublicacion ?? 'N/D',
        typeMode: item?.cotPartidaCotizacionDetalle?.vProducto?.MedioDifusion ?? 'N/D',
        datesSuggested:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.fechasRealizacionCapacitacion,
        dateAvailability:
          item?.cotPartidaCotizacionDetalle?.vProducto?.FechaDisponibilidadBackOrder,
        alternate: item?.cotPartidaCotizacionDetalle?.vProducto?.TotalAlternativo,
        complementary: item?.cotPartidaCotizacionDetalle?.vProducto?.TotalComplementario,
        supplements: item?.cotPartidaCotizacionDetalle?.vProducto?.TotalSuplementario,
      },
      columnNotes: showNotes
        ? item?.tpPartidaPedido?.Comentarios
          ? {
              systemNotes: null,
              itemNotes: item?.tpPartidaPedido?.Comentarios,
            }
          : {
              systemNotes: null,
              itemNotes: null,
            }
        : null,
      columnDeliveryTime: {
        days: item?.tpPartidaPedido?.Programada
          ? item?.tpPartidaPedido?.FechaEstimadaEntrega
          : item?.tpPartidaPedido?.TiempoEstimadoEntrega,
        isEdit: true, // Se manda true para mostrar cursor pointer
        isFreight: item?.tpPartidaPedido?.AplicaFleteExpress,
        isProgramming: item?.tpPartidaPedido?.Programada,
        percentagePaidProquifa: optional?.details?.tpPedidoFleteExpressObj?.PorcentajeProquifa,
      },
      columnImgTypeItem: {
        value: item?.TipoPartidaTramitacion,
      },
      columnIva: {
        currency: currency,
        value: item?.IVA,
      },
      columnNumberItem: {
        number: item?.tpPartidaPedido?.Numero,
      },
      columnNumberPieces: {
        isEdit: false,
        value: item?.tpPartidaPedido?.NumeroDePiezas,
      },
      columnProFreight: {
        currency: currency,
        showColumn: optional?.isItemizedFreight,
        value: item?.PrecioFleteNoDesglosado || 'N/A',
      },
      columnSubtotal: {
        currency: currency,
        value: item?.SubtTotal,
      },
      columnTotalValue: {
        currency: currency,
        listPrice:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
            ?.PrecioListaConvertido,
        style: stylesColumnTotalValue?.General,
        value: item?.ValorTotal,
        pieces: item?.tpPartidaPedido?.NumeroDePiezas,
      },
      columnUnitPrice: {
        currency: currency,
        isEdit: false,
        showComments: false,
        value: item?.PrecioUnitario,
      },
      data: item,
      index: optional?.index,
    };
  } else {
    return {
      columnBrand: {},
      columnConcept: {
        nameFreight: item?.freightItem?.descriptionFreight,
      },
      columnNotes: showNotes
        ? {
            systemNotes: null,
            itemNotes: null,
          }
        : null,
      columnDeliveryTime: {},
      columnImgTypeItem: {},
      columnIva: {
        value: item?.freightItem?.iva || 0,
        currency,
      },
      columnNumberItem: {
        number: optional?.index + 1,
      },
      columnNumberPieces: {},
      columnProFreight: {
        showColumn: optional?.isItemizedFreight,
      },
      columnSubtotal: {
        value: item?.freightItem?.subtotal,
        currency,
      },
      columnTotalValue: {
        value: item?.freightItem?.total,
        listPrice:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
            ?.PrecioListaConvertido,
        style: StylesColumnTotalValue.General,
        currency,
      },
      columnUnitPrice: {},
      data: item,
      index: optional?.index,
    };
  }
};

export const buildInternalSalesItemResume = (
  showNotes: boolean,
  item: IPurchaseOrderItem,
  currency: string,
  optional?: {
    index?: number;
    isItemizedFreight?: boolean;
    details?: IPurchaseOrderDetails;
  },
): InternalSalesItem => {
  if (!item?.freightItem) {
    return {
      backgroundColorByTypeItem: item?.TipoPartidaCotizacion,
      columnBrand: {
        nameBrand:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.NombreMarca,
        src: item.imageHover,
      },
      columnConcept: {
        availabilityKey: item?.cotPartidaCotizacionDetalle?.vProducto?.DisponibilidadClave,
        cat: item?.cotPartidaCotizacionDetalle?.vProducto?.Catalogo,
        control: item?.cotPartidaCotizacionDetalle?.vProducto?.Control,
        controlled: item?.cotPartidaCotizacionDetalle?.vProducto?.Controlado,
        dateValidation:
          item?.cotPartidaCotizacionDetalle?.vProducto?.FechaCaducidadVigenciaCuraduria,
        description: item?.cotPartidaCotizacionDetalle?.vProducto?.Descripcion,
        inContract: item?.TieneContrato,
        presentation: item?.cotPartidaCotizacionDetalle?.vProducto?.Presentacion,
        subType: item?.cotPartidaCotizacionDetalle?.vProducto?.Subtipo,
        type: item?.cotPartidaCotizacionDetalle?.vProducto?.Tipo,
        typePresentation: item?.cotPartidaCotizacionDetalle?.vProducto?.TipoPresentacion,
        unity: item?.cotPartidaCotizacionDetalle?.vProducto?.Unidad,
        proratedExpress:
          item?.tpPartidaPedido?.AplicaFleteExpress && item?.PrecioFleteNoDesglosado > 0,
        author: item?.cotPartidaCotizacionDetalle?.vProducto?.Autor ?? 'N/D',
        formatPublication:
          item?.cotPartidaCotizacionDetalle?.vProducto?.FormatoPublicacion ?? 'N/D',
        typeMode: item?.cotPartidaCotizacionDetalle?.vProducto?.MedioDifusion ?? 'N/D',
        datesSuggested:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.fechasRealizacionCapacitacion,
        dateAvailability:
          item?.cotPartidaCotizacionDetalle?.vProducto?.FechaDisponibilidadBackOrder,
        alternate: item?.cotPartidaCotizacionDetalle?.vProducto?.TotalAlternativo,
        complementary: item?.cotPartidaCotizacionDetalle?.vProducto?.TotalComplementario,
        supplements: item?.cotPartidaCotizacionDetalle?.vProducto?.TotalSuplementario,
      },
      columnNotes: showNotes
        ? item?.tpPartidaPedido?.Comentarios
          ? {
              systemNotes: null,
              itemNotes: item?.tpPartidaPedido?.Comentarios,
            }
          : {
              systemNotes: null,
              itemNotes: null,
            }
        : null,
      columnDeliveryTime: {
        days: item?.tpPartidaPedido?.Programada
          ? item?.tpPartidaPedido?.FechaEstimadaEntrega
          : item?.tpPartidaPedido?.TiempoEstimadoEntrega,
        isEdit: false,
        isFreight: item?.tpPartidaPedido?.AplicaFleteExpress,
        isProgramming: item?.tpPartidaPedido?.Programada,
        percentagePaidProquifa: optional?.details?.tpPedidoFleteExpressObj?.PorcentajeProquifa,
      },
      columnImgTypeItem: {
        value:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.TipoPartidaCotizacion,
      },
      columnIva: {
        currency: currency,
        value: item?.IVA,
      },
      columnNumberItem: {
        number: item?.tpPartidaPedido?.Numero,
      },
      columnNumberPieces: {
        isEdit: false,
        value: item?.tpPartidaPedido?.NumeroDePiezas,
      },
      columnProFreight: {
        currency: currency,
        showColumn: optional?.isItemizedFreight,
        value: item?.PrecioFleteNoDesglosado || 'N/A',
      },
      columnSubtotal: {
        currency: currency,
        value: item?.SubtTotal,
      },
      columnTotalValue: {
        currency: currency,
        listPrice:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
            ?.PrecioListaConvertido,
        style: stylesColumnTotalValue?.General,
        value: item?.ValorTotal,
        pieces: item?.tpPartidaPedido?.NumeroDePiezas,
      },
      columnUnitPrice: {
        currency: currency,
        isEdit: false,
        showComments: false,
        value: item?.PrecioUnitario,
      },
      data: item,
      index: optional?.index,
    };
  } else {
    return {
      columnBrand: {},
      columnConcept: {
        nameFreight: item?.freightItem?.descriptionFreight,
      },
      columnDeliveryTime: {},
      columnImgTypeItem: {},
      columnIva: {
        value: item?.freightItem?.iva || 0,
        currency,
      },
      columnNumberItem: {
        number: optional?.index + 1,
      },
      columnNotes: showNotes
        ? {
            systemNotes: null,
            itemNotes: null,
          }
        : null,
      columnNumberPieces: {},
      columnProFreight: {},
      columnSubtotal: {
        value: item?.freightItem?.subtotal,
        currency,
      },
      columnTotalValue: {
        currency,
        style: StylesColumnTotalValue.General,
        value: item?.freightItem?.total,
      },
      columnUnitPrice: {},
      data: item,
      index: optional?.index,
    };
  }
};

export const buildGMtpPedidoTramitarCorreo = (
  data: IDataMail,
  tpPedido: TpPedido,
  orderEntries: IPurchaseOrderItem[],
  listDeliveryNotification: string[],
): GMtpPedidoTramitarCorreo => {
  const concantString = (array: string[]) => {
    return array.join(',');
  };
  const gMtpPedidoTramitarCorreo: GMtpPedidoTramitarCorreo = {
    tpPedido: {...tpPedido, Liberado: true},
    Contacto: data?.to[0]?.toString(),
    ConCopiaCSV: concantString(data.carbonCopy),
    ComentariosAdicionales: data.additionalComments,
    ListatpPartidasPedido: _map(orderEntries, (entrie: IPurchaseOrderItem) => {
      return {
        tpPartidaPedido: entrie.tpPartidaPedido,
        tpPartidaPedidoAddendaSanofi: entrie?.tpPartidaPedidoAddendaSanofi || null,
      } as TpPartidasPedidoTramitarCorreo;
    }),
    ListaContactoNotificacionEntrega: listDeliveryNotification ? listDeliveryNotification : null,
  };
  return gMtpPedidoTramitarCorreo;
};

const buildSchedule = (day: string, schedule: HorarioAtencion): string => {
  const first = `· ${day} · ${moment(schedule.HoraInicioPrimerHorario, 'hh:mm').format(
    'HH:mm',
  )} - ${moment(schedule.HoraFinPrimerHorario, 'hh:mm').format('HH:mm')}`;

  const second = ` y ${moment(schedule.HoraInicioSegundoHorario, 'hh:mm').format('HH:mm')}-${moment(
    schedule.HoraFinSegundoHorario,
    'hh:mm',
  ).format('HH:mm')}`;

  return (
    first +
    (schedule.HoraInicioSegundoHorario && schedule.HoraFinSegundoHorario ? second : '') +
    ' Hrs'
  );
};

/**
 * Obtener el total de los fletes express y última milla de los servicios vTramitarPedido
 * @param lastMileFreight arreglo de fletes ultima milla
 * @param expressFreight objeto de flete express
 * @param options opciones para obtener el subtotal o el iva
 * */
export const getTotalFreightsProcessing = (
  lastMileFreight: TpPedidoFleteUltimaMilla[],
  expressFreight: TpPedidoFleteExpress,
  options?: {
    subtotal?: boolean;
    iva?: boolean;
  },
): number => {
  const subtotalLastMileFreight = sumBy(lastMileFreight, FREIGHT_PROPERTY.subtotalLastMille); //DOCS: Sumar subtotal de fletes última milla
  const ivaLastMileFreight = sumBy(lastMileFreight, FREIGHT_PROPERTY.ivaLastMille); //DOCS: Sumar iva de fletes última milla
  const totalLastMileFreight = sumBy(lastMileFreight, FREIGHT_PROPERTY.totalLastMile); //DOCS: Sumar Totaltes de fletes última milla

  const sumSubtotalFreights = subtotalLastMileFreight + (expressFreight?.PrecioFlete || 0); // DOCS: Sumar suma de los subtotales última milla y subtotal del flete express
  const sumIvaFreights = ivaLastMileFreight + (expressFreight?.PrecioIVA || 0); // DOCS: Sumar suma del iva última milla e iva de flete express
  const sumTotalsFreights = totalLastMileFreight + (expressFreight?.PrecioTotal || 0); // DOCS: Sumar suma de los totales de fletes última milla y total del flete express
  if (options?.iva) {
    return sumIvaFreights;
  }

  return options?.subtotal ? sumSubtotalFreights : sumTotalsFreights;
};

export {
  buildInternalSalesItem,
  checkOutStatusFormApi,
  checkOutStatus,
  checkOutStatusApiResponse,
  buildCheckoutItemsDashboard,
  buildSchedule,
};
