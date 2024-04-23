import {
  AttributeDashboard,
  CorreoRecibidoClienteRequerimientoObj,
  GMPartidaPedido,
  GMPretramitarPedido,
  PretramitarPedidoPartidaDetalle,
  QueryResultVPpPedidoObj,
  Resumen,
} from 'api-logistica';
import {addRowIndex} from '@appUtil/util';
import {IValidateAdjustment} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-dashboard/validate-adjustment-dashboard.models';

import {filter, forEach, isEmpty, map as _map} from 'lodash-es';

import {
  initialPPIncidenceItemValidateAdjustment,
  IOrder,
  IPpPartidaPedidoDetalleValidateAdjustment,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment-details/validate-adjustment-details.models';
import * as apiCat from 'api-catalogos';
import {
  InternalSalesItem,
  StylesColumnTotalValue,
  TypeOptionsColumn,
} from '@appModels/table/internal-sales-item';

const typeOptions = TypeOptionsColumn;
const stylesColumnTotalValue = StylesColumnTotalValue;

const buildClientsStrategyFromDashboard = (clientsList: Resumen[]): IValidateAdjustment[] => {
  clientsList = addRowIndex(0, 0, clientsList);
  return _map(clientsList, (o: IValidateAdjustment) => {
    const newObject = {...o, IdCliente: o.DescripcionLlave};
    forEach(o.Atributos, (i: AttributeDashboard) => {
      newObject[i.DescriptionField] = i.ValueField;
    });
    return newObject;
  });
};

const buildOrdersFromSubDashboardDetails = (response: QueryResultVPpPedidoObj): IOrder[] =>
  /* FIXME: Revisar propiedades user, usuario, parece que están repetidas */
  _map(
    response.Results,
    (o, index): IOrder => {
      return {
        ...o,
        IdCatMonedaTemp: response.Results[index].IdCatMoneda,
        ppPedidoConfiguracion: {
          ...o.ppPedidoConfiguracion,
          DireccionClienteEntregaValidado: true,
          ContactoClienteEntregaValidado: true,
          IdContactoClienteEntrega: o.IdContactoCliente,
        },
        mailData: {} as CorreoRecibidoClienteRequerimientoObj,
        usuario: {} as apiCat.Usuario,
        user: {} as apiCat.Usuario,
        needsToReload: true,
        index: index + 1,
      };
    },
  );

const buildItemsOrderDetails = (
  response: PretramitarPedidoPartidaDetalle[],
): IPpPartidaPedidoDetalleValidateAdjustment[] =>
  _map(
    response,
    (o: PretramitarPedidoPartidaDetalle): IPpPartidaPedidoDetalleValidateAdjustment => ({
      ...o,
      quantityInputIsOpen: false,
      priceInputIsOpen: false,
      isNegative: o.PorcentajeSobrePrecioLista < 0,
      percentage: o.PorcentajeSobrePrecioLista,
      hasInheritIncidences: !!o.ppIncidenciaPartida,
      ppIncidenciaPartida: o.ppIncidenciaPartida
        ? o.ppIncidenciaPartida
        : initialPPIncidenceItemValidateAdjustment(),
      ListaPPPartidaPedidoOriginales: isEmpty(o.ListaPPPartidaPedidoOriginales)
        ? o.ListaPPPartidaPedidoOriginales
        : _map(o.ListaPPPartidaPedidoOriginales, (i) => ({
            ...i,
            tempUnitPrice: i.PrecioUnitario.toFixed(2),
            tempQuantity: i.NumeroDePiezas,
            quantityInputIsOpen: false,
            priceInputIsOpen: false,
            isNegative: o.PorcentajeSobrePrecioLista < 0,
            percentage: o.PorcentajeSobrePrecioLista,
          })),
      agreedUnitPrice: o.PrecioUnitario,
    }),
  );

const buildBodyRequestSaveOrderTransactionValidate = (
  order: IOrder,
  validator: any,
): GMPretramitarPedido => {
  const listItemsOrderActive: IPpPartidaPedidoDetalleValidateAdjustment[] = filter(
    order.itemsOrderSelected,
    (o: IPpPartidaPedidoDetalleValidateAdjustment) => o.Activo === true,
  );

  const body: GMPretramitarPedido = {
    GMPedidoTramitado: null,
    PartidasPedido: _map(listItemsOrderActive, (o: IPpPartidaPedidoDetalleValidateAdjustment) => {
      const item: GMPartidaPedido = {
        PartidaPedido: {
          ...o,
        },
        ppPartidaPedidoConfiguracion: o.ppPartidaPedidoConfiguracion,
        ppPartidaPedidoAddendaSanofi: o.ppPartidaPedidoAddendaSanofi,
      };

      if (o.ppIncidenciaPartida.Comentarios === null) {
        return item;
      }
      item.IncidenciaPartida = {
        ...o.ppIncidenciaPartida,
      };
      return item;
    }) as GMPartidaPedido[],

    Pedido: {
      ...order,
      Activo: order.Activo,
      CambioAceptado: order.CambioAceptado,
      ConCorreo: order.ConCorreo,
      Consecutivo: order.Consecutivo,
      DOF: order.DOF,
      EsFleteDesglosado: order.EsFleteDesglosado,
      FechaEstimadaAjuste: order.FechaEstimadaAjuste,
      FechaRegistro: order.FechaRegistro,
      FechaUltimaActualizacion: order.FechaUltimaActualizacion,
      IdArchivo: order.IdArchivo,
      IdCatEstadoPretramitacionPedido: order.IdCatEstadoPretramitacionPedido,
      IdCatMoneda: order.IdCatMoneda,
      IdContactoCliente: order.IdContactoCliente,
      IdCorreoRecibidoCliente: order.IdCorreoRecibidoCliente,
      IdFlete: order.IdFlete,
      IdPPPedido: order.IdPPPedido,
      IdPPPedidoCorregido: order.IdPPPedidoCorregido,
      IdSolicitudAutorizacionCambio: order.IdSolicitudAutorizacionCambio,
      IdUsuarioESAC: order.IdUsuarioESAC,
      MontoTotalMXN: order.MontoTotalMXN,
      MontoTotalUSD: order.MontoTotalUSD,
      ObservacionesFEA: order.ObservacionesFEA,
      OcInterna: order.OcInterna,
      OrdenDeCompra: order.OrdenDeCompra,
      PrecioFlete: order.PrecioFlete,
      TipoCambioUSD: order.TipoCambioUSD,
      Tramitado: validator.tramitable,
      Intramitable: validator.intramitable,
    },
    PedidoConfiguracion: {
      ...order.ppPedidoConfiguracion,
    },
  };

  return body;
};

const buildInternalSalesItem = (
  showNotes: boolean,
  item: IPpPartidaPedidoDetalleValidateAdjustment,
  optional?: {
    currency?: string;
    index?: number;
    showColumnProFreight?: boolean;
  },
): InternalSalesItem => {
  if (!item?.freightItem) {
    return {
      backgroundColorByTypeItem:
        item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
          ?.TipoPartidaCotizacion,
      columnBrand: {
        nameBrand:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.NombreMarca,
        src: `assets/Images/logos/${item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.NombreImagenMarca}_hover.svg`,
      },
      columnConcept: {
        availabilityKey: item?.cotPartidaCotizacionDetalle?.vProducto?.DisponibilidadClave,
        cat: item?.cotPartidaCotizacionDetalle?.vProducto?.Catalogo,
        control: item?.cotPartidaCotizacionDetalle?.vProducto?.Control,
        controlled: item?.cotPartidaCotizacionDetalle?.vProducto?.Controlado,
        dateValidation:
          item?.cotPartidaCotizacionDetalle?.vProducto?.FechaCaducidadVigenciaCuraduria,
        description: item?.cotPartidaCotizacionDetalle?.vProducto?.Descripcion,
        presentation: item?.cotPartidaCotizacionDetalle?.vProducto?.Presentacion,
        subType: item?.cotPartidaCotizacionDetalle?.vProducto?.Subtipo,
        type: item?.cotPartidaCotizacionDetalle?.vProducto?.Tipo,
        typePresentation: item?.cotPartidaCotizacionDetalle?.vProducto?.TipoPresentacion,
        unity: item?.cotPartidaCotizacionDetalle?.vProducto?.Unidad,
        proratedExpress: item?.AplicaFleteExpress && item?.PrecioFleteNoDesglosado > 0,
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
      columnDeliveryTime: {
        days: item?.Programada
          ? item?.FechaEstimadaEntrega
          : item?.TiempoEstimadoEntrega ||
            item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
              ?.TiempoEstimadoEntrega,
        isEdit: false,
        isFreight: item?.AplicaFleteExpress,
        isProgramming: item?.Programada,
      },
      columnImgTypeItem: {
        value:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.TipoPartidaCotizacion,
      },
      columnIva: {
        currency: optional?.currency,
        value: item?.IVA,
      },
      columnNumberItem: {
        number: item?.Numero,
      },
      columnNumberPieces: {
        isEdit: true,
        value: item?.NumeroDePiezas,
      },
      columnOptions: {
        typeOption: typeOptions.ChecksBoxRedGreen,
        value: item?.Validada,
      },
      columnProFreight: {
        currency: optional?.currency,
        showColumn: optional?.showColumnProFreight,
        value: item?.PrecioFleteNoDesglosado || 'N/A',
      },
      columnSubtotal: {
        currency: optional?.currency,
        value: item?.Subtotal,
      },
      columnTotalValue: {
        currency: optional?.currency,
        listPrice:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
            ?.PrecioListaConvertido,
        style: stylesColumnTotalValue?.General,
        value: item?.Total,
        pieces: item?.NumeroDePiezas,
      },
      columnUnitPrice: {
        currency: optional?.currency,
        isEdit: true,
        showTooltip: true,
        textUnderline: true,
        value: item?.PrecioUnitario,
        valuePriceOriginal: item?.agreedUnitPrice,
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
        currency: optional?.currency,
      },
      columnNumberItem: {},
      columnNumberPieces: {},
      columnOptions: {},
      columnProFreight: {
        showColumn: optional?.showColumnProFreight,
      },
      columnSubtotal: {
        value: item?.freightItem?.subtotal,
        currency: optional?.currency,
      },
      columnTotalValue: {
        style: stylesColumnTotalValue?.General,
        currency: optional?.currency,
        value: item?.freightItem?.total,
      },
      columnUnitPrice: {},
      data: item,
      index: optional?.index,
    };
  }
};

export {
  buildClientsStrategyFromDashboard,
  buildOrdersFromSubDashboardDetails,
  buildItemsOrderDetails,
  buildBodyRequestSaveOrderTransactionValidate,
  buildInternalSalesItem,
};
