import {
  AttributeDashboard,
  CorreoRecibidoClienteRequerimientoObj,
  CotPartidaCotizacionDetalle,
  GMCotFletes,
  GMPartidaPedido,
  GMPretramitarPedido,
  PpPedidoFleteExpressObj,
  PretramitarPedidoPartidaDetalle,
  PretramitarPedidoPartidaObj,
  QueryResultPretramitarPedidoPartidaDetalle,
  QueryResultVPpPedidoObj,
  Resumen,
  VPpPedidoObj,
} from 'api-logistica';
import {
  CustomerList,
  IListItemForPreProcessing,
} from '@appModels/store/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.models';
import {concat, filter, find, forEach, isEmpty, map as _map} from 'lodash-es';

import {
  IOrder,
  IPurchaseOrders,
} from '@appModels/store/pre-processing/preprocess-order-details/preprocess-order-details.models';
import {Usuario} from 'api-catalogos';
import {
  IItemsOrders,
  initialIPpPartidaPedidoDetallePretamitar,
  initialPpIncidenceQuote,
  IPpPartidaPedidoDetallePretamitar,
} from '@appModels/store/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.models';
import {DEFAULT_UUID, FREIGHT_EXPRESS, FREIGHTS_LAST_MILE} from '@appUtil/common.protocols';
import {
  IQuoted,
  IQuoteItem,
} from '@appModels/store/pre-processing/preprocess-order-details/sections/add-purchase-order-items/add-purchase-order-items.models';
import {addRowIndex, getTotalFreights} from '@appUtil/util';
import {
  IFreightItem,
  InternalSalesItem,
  StylesColumnTotalValue,
  TypeOptionsColumn,
} from '@appModels/table/internal-sales-item';
import {generateUuid} from '@appUtil/strings';

const typeOptions = TypeOptionsColumn;
const stylesColumnTotalValue = StylesColumnTotalValue;

enum PreProcessingStatus {
  Todos = 'Todos',
  ConOC = 'Con OC',
  SinOC = 'Sin OC',
}

enum PreProcessingStatusApiResponse {
  Total = 'Total',
  ConOrdenDeCompra = 'ConOrdenDeCompratrue',
  SinOrdenDeCompra = 'SinOrdenDeCompraPretramitarPedidotrue',
}

const mapPreProcessingStatusFromApi = {
  [PreProcessingStatus.Todos]: PreProcessingStatusApiResponse.Total,
  [PreProcessingStatus.ConOC]: PreProcessingStatusApiResponse.ConOrdenDeCompra,
  [PreProcessingStatus.SinOC]: PreProcessingStatusApiResponse.SinOrdenDeCompra,
};
const buildListItemsFromPreProcessingDashboard = (
  listItem: Array<Resumen>,
): Array<IListItemForPreProcessing> => {
  listItem = addRowIndex(0, 0, listItem);
  return _map(
    listItem,
    (o: Resumen): IListItemForPreProcessing => {
      const newObject: IListItemForPreProcessing = {...o, IdCliente: o.DescripcionLlave};
      forEach(o.Atributos, (i: AttributeDashboard) => {
        newObject[i.DescriptionField] = i.ValueField;
      });
      return newObject;
    },
  );
};

const buildItemFromPreProcessingOrderDetails = (
  response: QueryResultVPpPedidoObj,
  client: CustomerList,
): IPurchaseOrders => {
  return {
    Results: _map(response.Results, (o: VPpPedidoObj, index) => {
      return {
        ...o,
        IdCatMonedaTemp: response.Results[index].IdCatMoneda,
        ppPedidoConfiguracion: {
          ...o.ppPedidoConfiguracion,
          DireccionClienteEntregaValidado: null,
          ContactoClienteEntregaValidado: null,
          IdContactoClienteEntrega: o.IdContactoCliente,
          CondicionesDePagoValidado: null,
          RazonSocialValidado: null,
          EmpresaValidada: null,
          oCSinIrregularidades: null,
          IdDireccionClienteEntrega:
            response?.Results?.[index]?.DireccionEntrega?.IdDireccionCliente,
        },
        // codeRequest: {} as SolicitudAutorizacionCambio, //DOCS: CODIGOD DE VERFICACIÓN
        // code: [null, null, null, null], //DOCS: CODIGOD DE VERFICACIÓN
        // shaked: false, //DOCS: CODIGOD DE VERFICACIÓN
        mailData: {} as CorreoRecibidoClienteRequerimientoObj,
        user: {} as Usuario,
        needsToReload: true,
      } as IOrder;
    }),
    TotalResults: response.TotalResults,
  };
};

const buildIdCotPartidaCotizacion = (
  cotItemDetails: CotPartidaCotizacionDetalle,
): CotPartidaCotizacionDetalle => {
  return {
    ...cotItemDetails,
    gMCotPartidasDetalle: {
      ...cotItemDetails.gMCotPartidasDetalle,
      VPartidaCotizacion: {
        IdCotPartidaCotizacion: generateUuid(),
      },
    },
  };
};
const buildItemsQuoteOrderPurchase = (
  client: CustomerList,
  response: QueryResultPretramitarPedidoPartidaDetalle,
): IItemsOrders => {
  // TODO: REVISAR POR CAMBIOS EN LA API
  const entriesList: IItemsOrders = {
    TotalResults: response.TotalResults,
    Results: _map(
      response.Results,
      (o: PretramitarPedidoPartidaDetalle): IPpPartidaPedidoDetallePretamitar => ({
        ...o,
        cotPartidaCotizacionDetalle: o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle
          ?.VPartidaCotizacion?.IdCotPartidaCotizacion
          ? {...o.cotPartidaCotizacionDetalle}
          : buildIdCotPartidaCotizacion(o?.cotPartidaCotizacionDetalle),
        ListaPPPartidaPedidoOriginales: isEmpty(o.ListaPPPartidaPedidoOriginales)
          ? o.ListaPPPartidaPedidoOriginales
          : _map(o.ListaPPPartidaPedidoOriginales, (i: PretramitarPedidoPartidaObj) => ({
              ...i,
              validity: 'Vigente', // Calcular la vigencia
              tempUnitPrice: i.PrecioUnitario.toFixed(2),
              tempQuantity: i.NumeroDePiezas,
              quantityInputIsOpen: false,
              priceInputIsOpen: false,
              seeQuotePopIsOpen: false,
              isNegative: 0 < i?.PorcentajeSobrePrecioLista,
              percentage: i?.PorcentajeSobrePrecioLista,
            })),
        ImageHover: `assets/Images/logos/${o?.cotPartidaCotizacionDetalle?.vProducto.NombreImagenMarca?.toLowerCase()}_hover.svg`,
        quantityInputIsOpen: false,
        priceInputIsOpen: false,
        hasInheritIncidences: !!o.ppIncidenciaPartida,
        Tramitada: o.Tramitada,
        Validada: o.ppIncidenciaPartida !== null ? false : o.Validada === null ? null : true,
        //DOCS: OBJETO PretramitarPedidoPartidaObj
        ppIncidenciaPartida: o.ppIncidenciaPartida
          ? o.ppIncidenciaPartida
          : initialPpIncidenceQuote(),
        agreedUnitPrice: o.PrecioUnitario,
      }),
    ),
  };
  return entriesList;
};

const buildAddItemInOrderPurchase = (
  quotesSave: IQuoteItem[],
  orderSelected: IOrder,
  client: CustomerList,
) => {
  const itemsOrder: IPpPartidaPedidoDetallePretamitar[] = [];
  let cont = orderSelected.itemsOrder.length + 1;
  forEach(quotesSave, (o: IQuoteItem) => {
    itemsOrder.push({
      ...initialIPpPartidaPedidoDetallePretamitar(),
      IVA: o?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioIVA || o?.PrecioIVA || 0,
      IdPPPedido: orderSelected.IdPPPedido, // Es el id de la orden de compra
      IdProducto:
        o?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdProducto ?? o?.vProducto?.IdProducto,
      IdValorConfiguracionTiempoEntrega:
        o?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdValorConfiguracionTiempoEntrega ?? null,
      Numero: cont++,
      NumeroDePiezas:
        o?.gMCotPartidasDetalle?.VPartidaCotizacion?.NumeroDePiezas ?? o?.NumeroDePiezas,
      PrecioUnitario:
        o?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioCotizadoUnitarioPactado ??
        o?.PrecioCotizadoUnitarioPactado,
      Programada: false,
      Total:
        o?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioTotalCotizado ?? o?.PrecioTotalCotizado,
      Subtotal:
        o?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioCotizadoSubtotal ??
        o?.PrecioCotizadoSubtotal,
      CotizacionesVinculadas:
        o.gMCotPartidasDetalle?.VPartidaCotizacion?.TotalCotizacionesVinculadas,
      PrecioFleteNoDesglosado:
        o?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioFleteNoDesglosado ??
        o?.PrecioFleteNoDesglosado,
      TiempoEstimadoEntrega:
        o?.gMCotPartidasDetalle?.VPartidaCotizacion?.TiempoEstimadoEntrega ??
        o?.TiempoEstimadoEntrega,
      agreedUnitPrice:
        o?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioCotizadoUnitarioConvertido ??
        o?.PrecioCotizadoUnitarioConvertido,
      ppPartidaPedidoConfiguracion: {
        ...initialIPpPartidaPedidoDetallePretamitar().ppPartidaPedidoConfiguracion,
        IdCotPartidaCotizacion:
          o?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotPartidaCotizacion ?? null,
        IdCotProductoOferta:
          o?.gMCotPartidasDetalle?.VPartidaCotizacion?.IdCotProductoOferta ?? null,
      },
      hasInheritIncidences: null,
      cotPartidaCotizacionDetalle: {
        ...o,
      },
      Tramitada: true,
      Validada: client?.TramitarConOrdenDeCompraInterna ? true : null,
      ImageHover: o.imageHover,
    });
  });
  return itemsOrder;
};

const buildBodyRequestSaveOrderTransaction = (
  order: IOrder,
  validator: any,
): GMPretramitarPedido => {
  const listItemsOrderActive: IPpPartidaPedidoDetallePretamitar[] = filter(
    order.itemsOrder,
    (o: IPpPartidaPedidoDetallePretamitar) => o.Activo === true,
  );
  const body: GMPretramitarPedido = {
    GMPedidoTramitado: null,
    PartidasPedido: _map(listItemsOrderActive, (o: IPpPartidaPedidoDetallePretamitar) => {
      const item: GMPartidaPedido = {
        PartidaPedido: {
          ...o,
          TiempoEstimadoEntrega:
            o?.TiempoEstimadoEntrega ||
            o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
              ?.TiempoEstimadoEntrega,
          GravaIVA:
            o?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta?.GravaIVA ??
            o?.cotPartidaCotizacionDetalle?.vProducto?.GravaIVA,
        },
        ppPartidaPedidoConfiguracion: o.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle
          ?.CotProductoOferta
          ? {...o.ppPartidaPedidoConfiguracion}
          : {...o.ppPartidaPedidoConfiguracion, IdCotPartidaCotizacion: null},
        ppPartidaPedidoAddendaSanofi: o?.ppPartidaPedidoAddendaSanofi
          ? o?.ppPartidaPedidoAddendaSanofi
          : null,
        IncidenciaPartida:
          o?.ppIncidenciaPartida?.IdPPIncidenciaPartida !== DEFAULT_UUID
            ? o?.ppIncidenciaPartida
            : null,
      };
      if (o.ppIncidenciaPartida.Comentarios === null) {
        return item;
      }
      item.IncidenciaPartida = o.Validada && o.ppIncidenciaPartida ? null : o.ppIncidenciaPartida;
      return item;
    }) as GMPartidaPedido[],

    Pedido: {
      ...order,
      Tramitado: validator.tramitable,
      Intramitable: validator.intramitable,
    },
    PedidoConfiguracion: {
      ...order.ppPedidoConfiguracion,
      IdPPPedido: order.IdPPPedido,
      ContactoClienteEntregaValidado: true,
      //DOCS: LOS PONE BACK
      IdCatCondicionesDePago: DEFAULT_UUID,
      IdEmpresa: DEFAULT_UUID,
      IdPPPedidoConfiguracion: DEFAULT_UUID,
    },
  };

  return body;
};

const getFreightsExpressByIdProvider = (
  freightsExpress: PpPedidoFleteExpressObj[],
  idMainProvider: string,
): PpPedidoFleteExpressObj => {
  if (freightsExpress?.length > 0 && idMainProvider) {
    const findExpress = find(
      freightsExpress,
      (freight: PpPedidoFleteExpressObj) => freight.IdProveedor === idMainProvider,
    );
    return findExpress;
  }
};

const buildInternalSalesItem = (
  showNotes: boolean,
  item: IPpPartidaPedidoDetallePretamitar,
  currency: string,
  optional?: {
    orderSelected?: IOrder;
    index?: number;
    showColumnProratedFreight?: boolean;
    freights?: PpPedidoFleteExpressObj[];
  },
): InternalSalesItem => {
  if (!item?.freightItem) {
    return {
      activeGenericEmitter: item?.Activo,
      data: item,
      index: optional?.index,
      isDelete: !item?.Activo,
      backgroundColorByTypeItem:
        item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
          ?.TipoPartidaCotizacion,
      columnOptions: {
        typeOption: typeOptions.ChecksBoxRedGreen,
        value: item?.Validada,
      },
      columnNumberItem: {
        number: item?.Numero,
      },
      columnImgTypeItem: {
        value:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.TipoPartidaCotizacion ?? 'Original',
      },
      columnConcept: {
        availabilityKey: item?.cotPartidaCotizacionDetalle?.vProducto?.DisponibilidadClave,
        cat: item?.cotPartidaCotizacionDetalle?.vProducto?.Catalogo,
        control: item?.cotPartidaCotizacionDetalle?.vProducto?.Control,
        controlled: item?.cotPartidaCotizacionDetalle?.vProducto?.Controlado,
        dateValidation:
          item?.cotPartidaCotizacionDetalle?.vProducto?.FechaCaducidadVigenciaCuraduria,
        dateAvailability:
          item?.cotPartidaCotizacionDetalle?.vProducto?.FechaDisponibilidadBackOrder,
        description: item?.cotPartidaCotizacionDetalle?.vProducto?.Descripcion,
        presentation: item?.cotPartidaCotizacionDetalle?.vProducto?.Presentacion,
        subType: item?.cotPartidaCotizacionDetalle?.vProducto?.Subtipo,
        type: item?.cotPartidaCotizacionDetalle?.vProducto?.Tipo,
        typePresentation: item?.cotPartidaCotizacionDetalle?.vProducto?.TipoPresentacion,
        unity: item?.cotPartidaCotizacionDetalle?.vProducto?.Unidad,
        formatPublication:
          item?.cotPartidaCotizacionDetalle?.vProducto?.FormatoPublicacion ?? 'N/D',
        typeMode: item?.cotPartidaCotizacionDetalle?.vProducto?.MedioDifusion ?? 'N/D',
        alternate: item?.cotPartidaCotizacionDetalle?.vProducto?.TotalAlternativo,
        author: item?.cotPartidaCotizacionDetalle?.vProducto?.Autor ?? 'N/D',
        complementary: item?.cotPartidaCotizacionDetalle?.vProducto?.TotalComplementario,
        supplements: item?.cotPartidaCotizacionDetalle?.vProducto?.TotalSuplementario,
        datesSuggested:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.fechasRealizacionCapacitacion,
        proratedExpress: item?.PrecioFleteNoDesglosado > 0 && item?.AplicaFleteExpress,
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
      columnBrand: {
        nameBrand: item?.cotPartidaCotizacionDetalle?.vProducto?.NombreMarca,
        src: item?.ImageHover,
      },
      columnDeliveryTime: {
        days: item?.Programada
          ? item.FechaEstimadaEntrega
          : item?.TiempoEstimadoEntrega ||
            item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
              ?.TiempoEstimadoEntrega,
        isEdit: true,
        isFreight: item?.AplicaFleteExpress,
        isProgramming: item?.Programada,
        percentagePaidProquifa:
          getFreightsExpressByIdProvider(
            optional?.freights,
            item?.cotPartidaCotizacionDetalle?.vProducto?.IdProveedorPrincipal,
          )?.PorcentajeProquifa || null,
      },
      columnNumberPieces: {
        isEdit: true,
        value: item?.NumeroDePiezas,
      },
      columnIva: {
        currency: currency,
        value: item?.IVA,
      },
      columnSubtotal: {
        currency: currency,
        value: item?.Subtotal,
      },
      columnUnitPrice: {
        currency: currency,
        isEdit: true,
        textUnderline: true,
        showTooltip: true,
        showComments: false,
        value: item?.PrecioUnitario,
        valuePriceOriginal: item?.agreedUnitPrice,
      },
      columnProFreight: {
        currency: currency,
        showColumn: optional?.showColumnProratedFreight,
        value: item?.PrecioFleteNoDesglosado || 'N/A',
      },
      columnTotalValue: {
        currency: currency,
        listPrice:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
            ?.PrecioListaConvertido,
        style: stylesColumnTotalValue?.General,
        value: item?.Total,
        pieces: item?.NumeroDePiezas,
      },
      columnTrashReverseSetting: {
        isRemoved: !item?.Activo,
      },
    };
  } else {
    return {
      columnBrand: {},
      columnConcept: {
        nameFreight: item.freightItem.descriptionFreight,
      },
      columnNotes: showNotes
        ? {
            systemNotes: null,
            itemNotes: null,
          }
        : null,
      columnDeliveryTime: {},
      columnImgTypeItem: {},
      columnNumberItem: {
        number: optional?.index + 1,
      },
      columnNumberPieces: {},
      columnOptions: {
        typeOption: typeOptions.ChecksBoxRedGreen,
      },
      columnProFreight: {
        showColumn:
          optional?.orderSelected?.ppPedidoFletesExpressObj?.length > 0 ||
          optional?.orderSelected?.ppPedidoFletesUltimaMilla?.length > 0
            ? !optional?.orderSelected?.EsFleteDesglosado
            : false,
      },
      columnSubtotal: {
        value: item?.freightItem?.subtotal,
        currency,
      },
      columnIva: {
        value: item?.freightItem?.iva || 0,
        currency,
      },
      columnTotalValue: {
        currency,
        style: StylesColumnTotalValue.General,
        value: item?.freightItem?.total,
      },
      columnTrashReverseSetting: {},
      columnUnitPrice: {},
      data: item,
      index: optional?.index,
    };
  }
};

const buildInternalSalesItemAddQuotation = (
  showNotes: boolean,
  item: IQuoteItem,
  quoteSelected: IQuoted,
  freight: GMCotFletes,
  optional?: {
    isHeader?: boolean;
    allChecked?: boolean;
    currency?: string;
    index?: number;
    showColumnFreight?: boolean;
  },
): InternalSalesItem => {
  if (!item.freightItem) {
    return {
      data: item,
      index: optional?.index,
      backgroundColorByTypeItem:
        item?.gMCotPartidasDetalle?.VPartidaCotizacion?.TipoPartidaCotizacion,
      columnOptions: {
        typeOption: typeOptions.CheckBoxNormal,
        isCheckHeader: optional?.isHeader,
        value: optional?.isHeader ? optional?.allChecked : item?.isSelected,
      },
      columnNumberItem: {
        number: optional?.index + 1,
      },
      columnImgTypeItem: {
        value: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.TipoPartidaCotizacion ?? 'Original',
      },
      columnConcept: {
        availabilityKey: item?.vProducto?.DisponibilidadClave,
        cat: item?.vProducto?.Catalogo,
        control: item?.vProducto?.Control,
        controlled: item?.vProducto?.Controlado,
        dateValidation: item?.vProducto?.FechaCaducidadVigenciaCuraduria,
        dateAvailability: item?.vProducto?.FechaDisponibilidadBackOrder,
        description: item?.vProducto?.Descripcion,
        presentation: item?.vProducto?.Presentacion,
        subType: item?.vProducto?.Subtipo,
        type: item?.vProducto?.Tipo,
        typePresentation: item?.vProducto?.TipoPresentacion,
        unity: item?.vProducto?.Unidad,
        formatPublication: item?.vProducto?.FormatoPublicacion ?? 'N/D',
        typeMode: item?.vProducto?.MedioDifusion ?? 'N/D',
        alternate: item?.vProducto?.TotalAlternativo,
        complementary: item?.vProducto?.TotalComplementario,
        supplements: item?.vProducto?.TotalSuplementario,
        author: item?.vProducto?.Autor ?? 'N/D',
        datesSuggested: item?.gMCotPartidasDetalle?.fechasRealizacionCapacitacion,
        proratedExpress:
          freight?.FleteExpress &&
          freight?.FleteExpress?.IdProveedor === item?.vProducto?.IdProveedorPrincipal &&
          !quoteSelected.FleteDesglosado,
      },
      // TODO: AGREGAR NOTAS DEL SISTEMA CUANDO SE DEFINAN
      columnNotes: showNotes
        ? item?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios
          ? {
              systemNotes: null,
              itemNotes: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios,
            }
          : {
              systemNotes: null,
              itemNotes: null,
            }
        : null,
      columnBrand: {
        nameBrand: item?.vProducto?.NombreMarca,
        src: item?.imageHover,
      },
      columnDeliveryTime: {
        days:
          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.TiempoEstimadoEntrega ??
          item?.TiempoEstimadoEntrega,
        isEdit: false,
        isFreight: item?.vProducto?.IdProveedorPrincipal === freight?.FleteExpress?.IdProveedor,
        percentagePaidProquifa: freight?.FleteExpress?.PorcentajeProquifa,
      },
      columnNumberPieces: {
        isEdit: false,
        value:
          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.NumeroDePiezas ?? item?.NumeroDePiezas,
      },
      columnIva: {
        currency: optional?.currency,
        value: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioIVA ?? item?.PrecioIVA ?? 0,
      },
      columnSubtotal: {
        currency: optional?.currency,
        value:
          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioCotizadoSubtotal ??
          item?.PrecioCotizadoSubtotal,
      },
      columnUnitPrice: {
        currency: optional?.currency,
        value:
          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioCotizadoUnitarioPactado ??
          item?.PrecioCotizadoUnitarioPactado,
      },
      columnProFreight: {
        currency: optional?.currency,
        showColumn: optional?.showColumnFreight,
        value:
          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioFleteNoDesglosado ??
          item?.PrecioFleteNoDesglosado ??
          'N/A',
      },
      columnTotalValue: {
        currency: optional?.currency,
        listPrice: item?.gMCotPartidasDetalle?.CotProductoOferta?.PrecioListaConvertido,
        style: stylesColumnTotalValue?.General,
        value:
          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioTotalCotizado ??
          item?.PrecioTotalCotizado,
        pieces:
          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.NumeroDePiezas ?? item?.NumeroDePiezas,
      },
      columnState: {
        purchasePromise:
          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.PromesaDeCompra ??
          item?.PromesaDeCompra ??
          false,
        cancellation:
          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.Cancelacion ?? item?.Cancelacion ?? false,
        following:
          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.Seguimiento ?? item?.Seguimiento ?? false,
        adjustmentOffer:
          item?.gMCotPartidasDetalle?.VPartidaCotizacion?.AjusteDeOferta ??
          item?.AjusteDeOferta ??
          false,
      },
    };
  } else {
    return {
      data: item,
      index: optional?.index + 1,
      columnOptions: {},
      columnNumberItem: {
        number: item?.freightItem?.index,
      },
      columnImgTypeItem: {},
      columnConcept: {
        nameFreight: item?.freightItem?.descriptionFreight,
      },
      columnBrand: {},
      columnDeliveryTime: {},
      columnNumberPieces: {},
      columnIva: {
        value: item?.freightItem?.iva || 0,
        currency: optional?.currency,
      },
      columnSubtotal: {
        value: item?.freightItem?.subtotal,
        currency: optional?.currency,
      },
      columnUnitPrice: {},
      columnProFreight: {
        value: item?.freightItem?.total,
        showColumn: optional?.showColumnFreight,
      },
      columnTotalValue: {
        currency: optional?.currency,
        value: item?.freightItem?.total,
      },
      columnState: {},
    };
  }
};

const buildItemFreight = (
  itemList: IQuoteItem[],
  quoteSelected: IQuoted,
  freight: GMCotFletes,
): IQuoteItem[] => {
  let itemsQuotation = itemList;

  if (quoteSelected?.FleteDesglosado) {
    //DOCS: Crear la partida de flete
    const freightItem: IFreightItem = {
      index: itemsQuotation?.length + 1,
      descriptionFreight: freight?.FleteExpress?.IdCotCotizacionFleteExpress
        ? FREIGHT_EXPRESS
        : FREIGHTS_LAST_MILE,
      subtotal: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress, {
        subtotal: true,
      }),
      iva: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress, {iva: true}),
      total: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress),
    };
    itemsQuotation = concat(itemList, [{freightItem}]);
  }
  return itemsQuotation;
};

export {
  mapPreProcessingStatusFromApi,
  PreProcessingStatus,
  PreProcessingStatusApiResponse,
  buildListItemsFromPreProcessingDashboard,
  buildItemFromPreProcessingOrderDetails,
  buildItemsQuoteOrderPurchase,
  buildAddItemInOrderPurchase,
  buildBodyRequestSaveOrderTransaction,
  buildInternalSalesItem,
  buildInternalSalesItemAddQuotation,
  buildItemFreight,
  getFreightsExpressByIdProvider,
};
