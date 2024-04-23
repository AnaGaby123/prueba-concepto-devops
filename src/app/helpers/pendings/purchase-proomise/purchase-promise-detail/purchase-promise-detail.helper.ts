import {
  IPurchasePromiseClient,
  IPurchasePromiseOrder,
  IPurchasePromiseQuotation,
  IQuoteItem,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';
import {DEFAULT_DATE, DEFAULT_UUID, OptionsGetTotals} from '@appUtil/common.protocols';
import {
  GMCotFleteUltimaMilla,
  GMPartidaPromesaDeCompra,
  GMPretramitarPromesaDeCompra,
  PcIncidenciaPartidaPromesaDeCompra,
  PcPartidaPromesaDeCompra,
  PpPartidaPedidoAddendaSanofi,
} from 'api-logistica';
import {QuoteItemExtension} from '@appModels/purchase-promise/QuoteItemExtension';
import {
  InternalSalesItem,
  StylesColumnTotalValue,
  TypeOptionsColumn,
} from '@appModels/table/internal-sales-item';
import {filter, isEmpty} from 'lodash-es';
import {getTotalsItem} from '@appUtil/math';

export const OF_CONTRACT = 'De Contrato';
export const buildGMPartidaPromesaDeCompra = (
  quoteItems: Array<IQuoteItem>,
  purchaseOrder: IPurchasePromiseOrder,
  quote,
): GMPartidaPromesaDeCompra[] => {
  return quoteItems.map((it: IQuoteItem): GMPartidaPromesaDeCompra & QuoteItemExtension => {
    return {
      quote: it,
      quotation: quote,
      imageHover: `assets/Images/logos/${it?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
      PcPartidaPromesaDeCompra: {
        ...it,
        Activo: it.Activo,
        IdCotPartidaCotizacion: it.IdCotPartidaCotizacion,
        IdPcPartidaPromesaDeCompra: DEFAULT_UUID,
        IdProducto: it.IdProducto,
        IdValorConfiguracionTiempoEntrega: it.IdValorConfiguracionTiempoEntrega,
        Numero: it.Numero,
        NumeroDePiezas: it.NumeroDePiezas,
        PrecioTotalUSD: it.PrecioTotalUSD,
        Verificada: null,
        // TODO: Datos que vienen de la orden de compra
        IdPcPromesaDeCompra: purchaseOrder.IdPcPromesaDeCompra,
        FechaUltimaActualizacion: DEFAULT_DATE,
        FechaRegistro: DEFAULT_DATE,
        PrecioTotal: purchaseOrder.USD ? it.PrecioTotalUSD : it.PrecioTotalMXN,
        // TODO: Estas variables no se llenan
        DeContrato: it?.label === OF_CONTRACT,
        PrecioUnitarioMonedaCliente: null,
        Observaciones: false,
        PorcentajeVariacionPrecio: null,
        FechaEstimadaEntrega: it.FechaEstimadaEntrega,
        Programada: it.Programada,
        Comentarios: it.Comentarios,
        TiempoEstimadoEntrega: it.TiempoEstimadoEntrega,
        // freightsGmCotFletes: ''
      } as PcPartidaPromesaDeCompra,
      PcIncidenciaPartidaPromesaDeCompra: {
        Activo: true,
        Catalogo: false,
        Comentarios: '',
        Descripcion: false,
        FechaRegistro: DEFAULT_DATE,
        FechaUltimaActualizacion: DEFAULT_DATE,
        IdPcIncidenciaPartidaPromesaDeCompra: DEFAULT_UUID,
        IdPcPartidaPromesaDeCompra: DEFAULT_UUID,
        Marca: false,
        Moneda: false,
        Precio: false,
        Presentacion: false,
        FechaRealizacionEnCapacitacion: false,
        TEE: false,
      } as PcIncidenciaPartidaPromesaDeCompra,
    };
  });
};

export const insertFleteExpres = (
  IdsCotCotizacionFleteExpress: string[] = [],
  selectedFleteExpress: IPurchasePromiseQuotation,
): string[] => {
  if (!selectedFleteExpress) {
    return [...IdsCotCotizacionFleteExpress];
  }
  const fletesExpress: string[] = [...IdsCotCotizacionFleteExpress].concat([
    selectedFleteExpress?.FleteExpress?.IdCotCotizacionFleteExpress,
  ]);
  return eliminarRepetidos(fletesExpress);
};

export const insertFleteUtilmaMilla = (
  IdsCotCotizacionFleteUltimaMilla: string[] = [],
  selectedFlete: IPurchasePromiseQuotation,
): string[] => {
  if (selectedFlete?.FletesUltimaMilla.length === 0) {
    return [...IdsCotCotizacionFleteUltimaMilla];
  }
  const fletes: string[] = IdsCotCotizacionFleteUltimaMilla.concat(
    selectedFlete?.FletesUltimaMilla.map(
      (it: GMCotFleteUltimaMilla) => it.IdCotCotizacionFleteUltimaMilla,
    ),
  );
  return eliminarRepetidos(fletes).filter((it) => it !== null && it !== undefined);
};

const eliminarRepetidos = (arreglo): string[] => {
  return arreglo.filter((valor, indice, self) => {
    return self.indexOf(valor) === indice;
  });
};

export const buildParamsGMPartidaPromesaDeCompra = (
  purchasePromise: GMPretramitarPromesaDeCompra,
  purchaseOrder: IPurchasePromiseOrder,
  isFreightFull: boolean,
): GMPretramitarPromesaDeCompra => {
  return {
    IdPcPromesaDeCompra: purchasePromise?.IdPcPromesaDeCompra || null,
    IdsCotCotizacionFleteExpress: purchasePromise?.IdsCotCotizacionFleteExpress?.filter((it) => it),
    IdsCotCotizacionFleteUltimaMilla: purchasePromise?.IdsCotCotizacionFleteUltimaMilla?.filter(
      (it) => it,
    ),
    EsFleteDesglosado: isFreightFull,
    Observaciones: purchaseOrder?.Observaciones || null,
    TieneObservaciones: purchaseOrder?.TieneObservaciones || null,
    PartidasPromesaDeCompra: purchasePromise.PartidasPromesaDeCompra.map(
      (it: GMPartidaPromesaDeCompra): GMPartidaPromesaDeCompra => {
        if (it.PcIncidenciaPartidaPromesaDeCompra.Comentarios) {
          return {
            PcPartidaPromesaDeCompra: getPcPartidaPromesaDeCompra(it),
            PcIncidenciaPartidaPromesaDeCompra: {...it.PcIncidenciaPartidaPromesaDeCompra},
            PpPartidaPedidoAddendaSanofi: it?.PpPartidaPedidoAddendaSanofi || null,
          };
        }
        return {
          PcPartidaPromesaDeCompra: getPcPartidaPromesaDeCompra(it),
          PcIncidenciaPartidaPromesaDeCompra: null,
          PpPartidaPedidoAddendaSanofi: it?.PpPartidaPedidoAddendaSanofi || null,
        };
      },
    ),
  } as GMPretramitarPromesaDeCompra;
};
const getPcPartidaPromesaDeCompra = (
  it: GMPartidaPromesaDeCompra & QuoteItemExtension,
): PcPartidaPromesaDeCompra => {
  return {
    ...it.PcPartidaPromesaDeCompra,
    NumeroDePiezas: it?.quote?.NumeroDePiezas,
    IdCotPartidaCotizacion:
      it?.quote?.label !== OF_CONTRACT
        ? it?.PcPartidaPromesaDeCompra?.IdCotPartidaCotizacion
        : null,
    PrecioTotal: getTotalsItem(
      OptionsGetTotals.total,
      it?.quote?.NumeroDePiezas,
      it?.quote?.PrecioCotizadoUnitarioPactado,
      it?.quote?.GravaIVA,
      it?.quote?.PorcentajeIVA,
      it?.quote?.PrecioFleteNoDesglosado,
    ),
    PrecioUnitarioMonedaCliente: it?.quote?.PrecioCotizadoUnitarioPactado,
    FechaEstimadaEntrega: it?.PcPartidaPromesaDeCompra?.FechaEstimadaEntrega
      ? it?.PcPartidaPromesaDeCompra?.FechaEstimadaEntrega
      : '',
    PorcentajeVariacionPrecio: it?.PcPartidaPromesaDeCompra?.PorcentajeVariacionPrecio
      ? it?.PcPartidaPromesaDeCompra?.PorcentajeVariacionPrecio
      : 0,
  } as PcPartidaPromesaDeCompra;
};

export const buildInternalSalesItem = (
  isItemizedFreight = false,
  item: IQuoteItem,
  quote: IPurchasePromiseQuotation,
  client: IPurchasePromiseClient,
  order,
  optional?: {
    index?: number;
    isCheckHeader?: boolean;
    allItemsChecked?: boolean;
  },
): InternalSalesItem => {
  let config: InternalSalesItem = {
    data: item,
    index: optional?.index,
    backgroundColorByTypeItem: item?.TipoPartidaCotizacion,
    columnBrand: {
      nameBrand: item?.NombreMarca,
      src: item?.imageHover,
    },
    columnConcept: {
      availabilityKey: item?.DisponibilidadClave,
      cat: item?.Catalogo,
      control: item?.Control,
      controlled: item?.Controlado,
      dateValidation: item?.FechaCaducidadVigenciaCuraduria,
      description: item?.Descripcion,
      presentation: item?.Presentacion,
      proratedExpress: item?.AplicaFleteExpress && item?.PrecioFleteNoDesglosado > 0,
      subType: item?.Subtipo,
      type: item?.Tipo,
      typePresentation: item?.TipoPresentacion,
      unity: item?.Unidad,
      author: item?.Autor ?? 'N/D',
      formatPublication: item?.FormatoPublicacion ?? 'N/D',
      typeMode: item?.MedioDifusion ?? 'N/D',
      dateAvailability: item?.FechaDisponibilidadBackOrder,
      alternate: item?.TotalAlternativo,
      complementary: item?.TotalComplementario,
      datesSuggested: item?.FechasRealizacionCapacitacion,
      supplements: item?.TotalSuplementario,
    },
    columnNotes: !isEmpty(filter(quote?.items, (o: IQuoteItem) => o.Comentarios))
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
      days: item?.TiempoEstimadoEntrega,
      isEdit: false,
      isFreight: item?.AplicaFleteExpress,
      percentagePaidProquifa: quote?.FleteExpress?.PorcentajeProquifa,
    },
    columnImgTypeItem: {
      value: item?.TipoPartidaCotizacion,
    },
    columnNumberItem: {
      number: optional?.index + 1,
    },
    columnNumberPieces: {
      isEdit: false,
      value: item?.NumeroDePiezas,
    },
    columnUnitPrice: {
      currency: quote?.ClaveMoneda ?? order?.ClaveMoneda,
      isEdit: false,
      showComments: false,
      value: item?.PrecioCotizadoUnitarioPactado,
    },
    columnOptions: {
      isCheckHeader: optional?.isCheckHeader,
      typeOption: TypeOptionsColumn.CheckBoxNormal,
      // DOCS: COLOCA EN TRUE EL CHECK DEL HEADER SI TODOS LOS ITEMS ESTÁN SELECCIONADOS
      value: optional?.isCheckHeader ? optional?.allItemsChecked : item?.isSelected,
    },
    columnProFreight: {
      currency: quote?.ClaveMoneda ?? order?.ClaveMoneda,
      showColumn:
        quote?.FleteExpress !== null || quote?.FletesUltimaMilla?.length > 0
          ? !quote?.FleteDesglosado
          : false,
      value: item?.PrecioFleteNoDesglosado || 'N/A',
    },
    columnSubtotal: {
      currency: quote?.ClaveMoneda ?? order?.ClaveMoneda,
      value: item?.PrecioCotizadoSubtotal,
    },
    columnIva: {
      currency: quote?.ClaveMoneda ?? order?.ClaveMoneda,
      value: item?.PrecioIVA,
    },
    columnTotalValue: {
      currency: quote?.ClaveMoneda ?? order?.ClaveMoneda,
      style: StylesColumnTotalValue.General,
      value: item?.PrecioCotizadoTotal,
      // TODO: Descomentar cuando se actualice el componente
      // listPrice: item.CotProductoOferta?.PrecioListaConvertido
    },
    columnState: {
      cancellation: item?.Cancelacion,
      following: item?.Seguimiento,
      purchasePromise: item?.PromesaDeCompra,
    },
  };

  // DOCS: Caso para flete desglosado

  if (item?.freightItem) {
    // DOCS: Se deja toda la configuración vacía para el header
    Object.keys(config).forEach((key) => {
      config[key] = {};
    });
    // DOCS: Se agrega la configuración de los fletes
    config = {
      ...config,
      data: item,
      index: optional?.index,
      columnNotes: !isEmpty(filter(quote?.items, (o: IQuoteItem) => o.Comentarios))
        ? {
            systemNotes: null,
            itemNotes: null,
          }
        : null,
      columnConcept: {
        nameFreight: item?.freightItem?.descriptionFreight,
      },
      columnNumberItem: {
        number: optional?.index + 1,
      },
      columnProFreight: {
        showColumn:
          quote?.FleteExpress !== null || quote?.FletesUltimaMilla?.length > 0
            ? !quote?.FleteDesglosado
            : false,
      },
      columnOptions: {
        typeOption: TypeOptionsColumn.CheckBoxNormal,
        value: item?.isSelected,
      },
      columnSubtotal: {
        value: item?.freightItem?.subtotal,
        currency: quote?.ClaveMoneda ?? order?.ClaveMoneda,
      },
      columnIva: {
        value: item?.freightItem?.iva || 0,
        currency: quote?.ClaveMoneda ?? order?.ClaveMoneda,
      },
      columnTotalValue: {
        currency: quote?.ClaveMoneda ?? order?.ClaveMoneda,
        style: StylesColumnTotalValue.General,
        value: item?.freightItem?.total,
      },
    };
  }

  return config;
};

export const buildInternalSalesItemResume = (
  showNotes: boolean,
  item: GMPartidaPromesaDeCompra & QuoteItemExtension,
  client: IPurchasePromiseClient,
  order: IPurchasePromiseOrder,
  optional?: {
    index?: number;
    number?: number;
    isCheckHeader?: boolean;
    containsProFreight?: boolean;
  },
): InternalSalesItem => {
  const config: InternalSalesItem = {
    activeGenericEmitter: true,
    backgroundColorByTypeItem: item?.quote?.TipoPartidaCotizacion,
    columnBrand: {
      nameBrand: item?.quote?.NombreMarca,
      src: item?.imageHover,
    },
    columnConcept: {
      availabilityKey: item?.quote?.DisponibilidadClave,
      cat: item?.quote?.Catalogo,
      control: item?.quote?.Control,
      controlled: item?.quote?.Controlado,
      dateValidation: item?.quote?.FechaCaducidadVigenciaCuraduria,
      description: item?.quote?.Descripcion,
      presentation: item?.quote?.Presentacion,
      proratedExpress: item?.quote?.AplicaFleteExpress && item?.quote?.PrecioFleteNoDesglosado > 0,
      subType: item?.quote?.Subtipo,
      type: item?.quote?.Tipo,
      typePresentation: item?.quote?.TipoPresentacion,
      unity: item?.quote?.Unidad,
      author: item?.quote?.Autor ?? 'N/D',
      formatPublication: item?.quote?.FormatoPublicacion ?? 'N/D',
      typeMode: item?.quote?.MedioDifusion ?? 'N/D',
      dateAvailability: item?.quote?.FechaDisponibilidadBackOrder,
      alternate: item?.quote?.TotalAlternativo,
      complementary: item?.quote?.TotalComplementario,
      datesSuggested: item?.quote?.FechasRealizacionCapacitacion,
      supplements: item?.quote?.TotalSuplementario,
    },
    columnNotes: showNotes
      ? item?.quote?.Comentarios
        ? {
            systemNotes: null,
            itemNotes: item?.quote?.Comentarios,
          }
        : {
            systemNotes: null,
            itemNotes: null,
          }
      : null,
    columnDelete: {
      showArrow: true,
      showColumn: true,
    },
    columnDeliveryTime: {
      days: item?.quote?.Programada
        ? item.quote.FechaEstimadaEntrega
        : item?.quote?.TiempoEstimadoEntrega,
      isEdit: true,
      isFreight: item?.quote?.AplicaFleteExpress,
      isProgramming: item?.quote?.Programada,
      percentagePaidProquifa: item?.quotation?.FleteExpress?.PorcentajeProquifa,
    },
    columnImgTypeItem: {
      value: item?.quote?.TipoPartidaCotizacion ?? 'Original',
    },
    columnNumberItem: {
      number: optional?.index + 1,
    },
    columnNumberPieces: {
      isEdit: true,
      value: item?.quote?.NumeroDePiezas,
    },
    columnUnitPrice: {
      currency: item?.quote?.ClaveMoneda ?? order?.ClaveMoneda,
      isEdit: true,
      showComments: false,
      showTooltip: true,
      textUnderline: true,
      value: item?.quote?.PrecioCotizadoUnitarioPactado,
      valuePriceOriginal: item?.quote?.valuePriceOriginal,
    },
    columnOptions: {
      isCheckHeader: optional?.isCheckHeader,
      typeOption: TypeOptionsColumn.ChecksBoxRedGreen,
      value: item?.PcPartidaPromesaDeCompra?.Verificada,
    },
    columnProFreight: {
      currency: item?.quote?.ClaveMoneda ?? order?.ClaveMoneda,
      showColumn: optional?.containsProFreight,
      value: item?.quote?.PrecioFleteNoDesglosado || 'N/A',
    },
    columnState: {
      cancellation: item?.quote?.Cancelacion,
      following: item?.quote?.Seguimiento,
      purchasePromise: item?.quote?.PromesaDeCompra,
    },
    columnSubtotal: {
      currency: item?.quote?.ClaveMoneda ?? order?.ClaveMoneda,
      value: getTotalsItem(
        OptionsGetTotals.subtotal,
        item?.quote?.NumeroDePiezas,
        item?.quote?.PrecioCotizadoUnitarioPactado,
        item?.quote?.GravaIVA,
        item?.quote?.PorcentajeIVA,
        item?.quote?.PrecioFleteNoDesglosado,
      ),
    },
    columnIva: {
      currency: item?.quote?.ClaveMoneda ?? order?.ClaveMoneda,
      value: getTotalsItem(
        OptionsGetTotals.iva,
        item?.quote?.NumeroDePiezas,
        item?.quote?.PrecioCotizadoUnitarioPactado,
        item?.quote?.GravaIVA,
        item?.quote?.PorcentajeIVA,
        item?.quote?.PrecioFleteNoDesglosado,
      ),
    },
    columnTotalValue: {
      currency: item?.quote?.ClaveMoneda ?? order?.ClaveMoneda,
      style: StylesColumnTotalValue.General,
      value: getTotalsItem(
        OptionsGetTotals.total,
        item?.quote?.NumeroDePiezas,
        item?.quote?.PrecioCotizadoUnitarioPactado,
        item?.quote?.GravaIVA,
        item?.quote?.PorcentajeIVA,
        item?.quote?.PrecioFleteNoDesglosado,
      ),
    },
    data: item,
    index: optional?.index,
  };
  if (!item?.freightItem) {
    return config;
  }

  Object.keys(config).forEach((key) => {
    config[key] = {};
  });
  return {
    ...config,
    activeGenericEmitter: false,
    columnConcept: {
      nameFreight: item?.freightItem?.descriptionFreight,
    },
    columnProFreight: {
      showColumn: optional?.containsProFreight,
    },
    columnNotes: showNotes
      ? {
          systemNotes: null,
          itemNotes: null,
        }
      : null,
    columnDelete: {
      showArrow: true,
      showColumn: true,
    },
    columnNumberItem: {
      number: optional?.index + 1,
    },
    columnSubtotal: {
      value: item?.freightItem?.subtotal,
      currency: item?.freightItem?.currency,
    },
    columnIva: {
      value: item?.freightItem?.iva || 0,
      currency: item?.freightItem?.currency,
    },
    columnTotalValue: {
      currency: item?.freightItem?.currency,
      style: StylesColumnTotalValue.General,
      value: item?.freightItem?.total,
    },
    data: item,
    index: optional?.index,
  };
};

export const buildPpPartidaPedidoAddendaSanofi = (
  sanofi: PpPartidaPedidoAddendaSanofi,
  field: string,
  value: string | boolean,
  IdPPPartidaPedido = DEFAULT_UUID,
): PpPartidaPedidoAddendaSanofi => {
  const caseSanofi: PpPartidaPedidoAddendaSanofi = {
    Activo: true,
    CorreoContactoClienteAddenda: sanofi?.CorreoContactoClienteAddenda || null,
    CorreoEmpresaAddenda: sanofi?.CorreoEmpresaAddenda || null,
    CuentaPuente: sanofi?.CuentaPuente || null,
    FechaRegistro: sanofi?.FechaRegistro || DEFAULT_DATE,
    FechaUltimaActualizacion: DEFAULT_DATE,
    IdCatUnidad: sanofi?.IdCatUnidad || null,
    IdPPPartidaPedido,
    IdPPPartidaPedidoAddendaSanofi: sanofi?.IdPPPartidaPedidoAddendaSanofi || DEFAULT_UUID,
    LineaDeOrden: sanofi?.LineaDeOrden || null,
  };
  if (field) {
    caseSanofi[field] = value;
  }
  return caseSanofi;
};
