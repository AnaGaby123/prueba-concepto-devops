import {IOfferAdjustment} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-list/offer-adjustment-list.model';
import {addRowIndex} from '@appUtil/util';
import {
  AjOfRechazo,
  AjusteMenosDosDiasPartidaObj,
  AjustePrecioPartidaObj,
  AjustesOferta,
  AttributeDashboard,
  CotPartidaCotizacionDetalle,
  Resumen,
} from 'api-logistica';
import {filter, forEach, isEmpty, map} from 'lodash-es';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';
import {
  IConfigExpressFreight,
  offerAdjustCarrousel,
  quotationOfferAdjustmentConfig,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment-details/details/details.model';
import {
  InternalSalesItem,
  StylesColumnTotalValue,
  TypeOptionsColumn,
} from '@appModels/table/internal-sales-item';

enum OfferAdjustmentStatus {
  Todos = 'Todos',
  tiempoEntrega = 'T.Entrega',
  condicionesPago = 'C.Pago',
  precio = 'Precio',
}

enum FollowPurchasePromiseApiResponse {
  Total = 'Total',
  TiempoEntregatrue = 'TiempoEntregatrue',
  CondicionesPagotrue = 'CondicionesPagotrue',
  Preciotrue = 'Preciotrue',
}

const mapOfferAdjustmentPromiseState = {
  [OfferAdjustmentStatus.Todos]: OfferAdjustmentStatus.Todos,
  [OfferAdjustmentStatus.tiempoEntrega]: true,
  [OfferAdjustmentStatus.condicionesPago]: true,
  [OfferAdjustmentStatus.precio]: true,
};

const mapOfferAdjustmentPromiseApiResponse = {
  [OfferAdjustmentStatus.Todos]: FollowPurchasePromiseApiResponse.Total,
  [OfferAdjustmentStatus.tiempoEntrega]: FollowPurchasePromiseApiResponse.TiempoEntregatrue,
  [OfferAdjustmentStatus.condicionesPago]: FollowPurchasePromiseApiResponse.CondicionesPagotrue,
  [OfferAdjustmentStatus.precio]: FollowPurchasePromiseApiResponse.Preciotrue,
};

const buildOfferAdjustmentFromDashboard = (list: Resumen[]): IOfferAdjustment[] => {
  list = addRowIndex(0, 0, list);
  return map(list, (item: IOfferAdjustment) => {
    const newObject = {...item, IdCliente: item.IdCliente};
    forEach(item.Atributos, (i: AttributeDashboard) => {
      newObject[i.DescriptionField] = i.ValueField;
    });
    return newObject;
  });
};

const findTabFilter = (tab: string): string => {
  switch (tab) {
    case 'T.Entrega':
      return 'TiempoEntrega';
    case 'C.Pago':
      return 'CondicionesPago';
    case 'Precio':
      return 'Precio';
    default:
      return 'Todos';
  }
};

const buildAjustesOfertaArray = (
  configObj: quotationOfferAdjustmentConfig,
): Array<AjustesOferta> => {
  const data: Array<AjustesOferta> = [];
  if (!isEmpty(configObj.twoDaysConfig)) {
    configObj.twoDaysConfig.forEach((o: AjusteMenosDosDiasPartidaObj) =>
      data.push({
        ajOfValorConfiguracionTiempoEntregaCotizacion:
          o.ajOfValorConfiguracionTiempoEntregaCotizacion,
      }),
    );
  }
  if (!isEmpty(configObj.expressFreight)) {
    configObj.expressFreight.forEach((o: IConfigExpressFreight) =>
      data.push({
        ajOfFleteExpressCotizacion: o.ajOfFleteExpressCotizacion,
      }),
    );
  }
  if (!isEmpty(configObj.paymentConditions)) {
    data.push({
      ajOfCondicionesdePagoCotizacion: configObj.paymentConditions,
    });
  }
  if (!isEmpty(configObj.priceConfig)) {
    configObj.priceConfig.forEach((o: AjustePrecioPartidaObj) =>
      data.push({
        ajOfPrecioCotizacion: o.ajOfPrecioCotizacion,
      }),
    );
  }
  return data;
};

const buildAjOfRechazo = (IdAjOfRazonRechazo: string, IdCotCotizacion: string): AjOfRechazo => ({
  Activo: true,
  FechaRegistro: DEFAULT_DATE,
  FechaUltimaActualizacion: DEFAULT_DATE,
  IdAjOfRazonRechazo,
  IdCotCotizacion,
  IdAjOfRechazo: DEFAULT_UUID,
});

const someoneNeedsAuthorization = (configObj: quotationOfferAdjustmentConfig): boolean => {
  {
    const paymentConditions: boolean = configObj?.paymentConditions?.RequiereAutorizacion || false;
    const adjustmentPrice: boolean =
      filter(
        configObj.priceConfig,
        (o: AjustePrecioPartidaObj) => o.ajOfPrecioCotizacion.RequiereAutorizacion,
      ).length > 0;
    return paymentConditions || adjustmentPrice;
  }
};

const buildInternalSalesItemTwoDays = (
  showNotes: boolean,
  item: IConfigExpressFreight | AjusteMenosDosDiasPartidaObj,
  index: number,
  quoteSelected: offerAdjustCarrousel,
  deliveryTimeControls: any,
): InternalSalesItem => {
  let itemInternal: InternalSalesItem;
  if (deliveryTimeControls?.twoDays) {
    item = item as AjusteMenosDosDiasPartidaObj;
    itemInternal = {
      data: item,
      index,
      backgroundColorByTypeItem:
        item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
          .TipoPartidaCotizacion,
      columnOptions: {
        typeOption: TypeOptionsColumn.ChecksBoxRedGreen,
        value:
          item?.ajOfValorConfiguracionTiempoEntregaCotizacion?.Rechazado === true
            ? false
            : item?.ajOfValorConfiguracionTiempoEntregaCotizacion?.Aceptado === true
            ? true
            : null,
      },
      columnImgTypeItem: {
        value:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            .TipoPartidaCotizacion,
      },
      columnConcept: {
        availabilityKey:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.DisponibilidadClave,
        cat: item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Catalogo,
        typePresentation:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.TipoPresentacion,
        presentation:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Presentacion,
        unity: item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Unidad,
        description:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Descripcion,
        type: item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Tipo,
        subType:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Subtipo,
        control:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Control,
        controlled:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Controlado,
        dateValidation:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.FechaCaducidadVigenciaCuraduria,
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
      // TODO: AGREGAR NOTAS DEL SISTEMA CUANDO SE DEFINAN
      columnNotes: showNotes
        ? item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios
          ? {
              systemNotes: null,
              itemNotes:
                item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
                  ?.Comentarios,
            }
          : {
              systemNotes: null,
              itemNotes: null,
            }
        : null,
      columnBrand: {
        src: `assets/Images/logos/${item?.cotPartidaCotizacionDetalle?.vProducto?.NombreMarca?.trim()}_hover.svg`,
        nameBrand:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.NombreMarca,
      },
      columnNumberPieces: {
        value:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.NumeroDePiezas,
      },
      columnUnitPrice: {
        value:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.PrecioCotizadoUnitarioConvertido,
        currency: quoteSelected?.ClaveMoneda,
      },
      columnDeliveryTimeSuggested: {
        days: item?.ajOfValorConfiguracionTiempoEntregaCotizacion?.TiempoEstimadoEntrega,
      },
      columnDeliveryTime: {
        days:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.TiempoEstimadoEntrega,
        isEdit: false,
      },
      columnSubtotal: {
        value:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.PrecioCotizadoSubtotal,
        currency: quoteSelected?.ClaveMoneda,
      },
      columnIva: {
        value:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioIVA,
        currency: quoteSelected?.ClaveMoneda,
      },
      columnTotalValue: {
        value:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
            ?.PrecioCotizadoTotal,
        style: StylesColumnTotalValue.General,
        listPrice:
          item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
            ?.PrecioListaConvertido,
        currency: quoteSelected?.ClaveMoneda,
      },
      columnComments: {
        color: 'ocean',
      },
    };
  }
  if (deliveryTimeControls?.expressFreight) {
    item = item as IConfigExpressFreight;
    itemInternal = {
      data: item,
      index,
    };
  }
  return itemInternal;
};

const buildInternalSalesItemExpressFreight = (
  showNotes: boolean,
  item: CotPartidaCotizacionDetalle,
  index: number,
  quoteSelected: offerAdjustCarrousel,
): InternalSalesItem => ({
  data: item,
  index,
  backgroundHeader: 'gray',
  columnNumberItem: {
    number: index + 1,
  },
  columnImgTypeItem: {
    value: item?.gMCotPartidasDetalle?.VPartidaCotizacion.TipoPartidaCotizacion,
  },
  columnConcept: {
    availabilityKey: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.DisponibilidadClave,
    cat: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.Catalogo,
    typePresentation: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.TipoPresentacion,
    presentation: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.Presentacion,
    unity: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.Unidad,
    description: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.Descripcion,
    type: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.Tipo,
    subType: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.Subtipo,
    control: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.Control,
    controlled: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.Controlado,
    dateValidation: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.FechaCaducidadVigenciaCuraduria,
    author: item?.vProducto?.Autor ?? 'N/D',
    formatPublication: item?.vProducto?.FormatoPublicacion ?? 'N/D',
    typeMode: item?.vProducto?.MedioDifusion ?? 'N/D',
    datesSuggested: item?.gMCotPartidasDetalle?.fechasRealizacionCapacitacion,
    dateAvailability: item?.vProducto?.FechaDisponibilidadBackOrder,
    alternate: item?.vProducto?.TotalAlternativo,
    complementary: item?.vProducto?.TotalComplementario,
    supplements: item?.vProducto?.TotalSuplementario,
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
    src: `assets/Images/logos/${item?.vProducto?.NombreMarca?.trim()}_hover.svg`,
    nameBrand: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.NombreMarca,
  },
  columnNumberPieces: {
    value: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.NumeroDePiezas,
  },
  columnUnitPrice: {
    value: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioCotizadoUnitarioConvertido,
    currency: quoteSelected?.ClaveMoneda,
  },
  columnDeliveryTime: {
    days: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.TiempoEstimadoEntrega,
    isEdit: false,
  },
  columnTotalValue: {
    value: item?.gMCotPartidasDetalle?.VPartidaCotizacion?.PrecioCotizadoTotal,
    style: StylesColumnTotalValue.General,
    listPrice: item?.gMCotPartidasDetalle?.CotProductoOferta?.PrecioListaConvertido,
    currency: quoteSelected?.ClaveMoneda,
  },
});

const buildInternalSalesItemPrice = (
  showNotes: boolean,
  item: AjustePrecioPartidaObj,
  index: number,
  quoteSelected: offerAdjustCarrousel,
): InternalSalesItem => ({
  data: item,
  index,
  columnNumberItem: {
    number: index + 1,
  },
  columnImgTypeItem: {
    value:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.TipoPartidaCotizacion,
  },
  columnConcept: {
    availabilityKey:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.DisponibilidadClave,
    cat: item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Catalogo,
    typePresentation:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.TipoPresentacion,
    presentation:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Presentacion,
    unity: item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Unidad,
    description:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Descripcion,
    type: item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Tipo,
    subType: item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Subtipo,
    control: item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Control,
    controlled:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Controlado,
    dateValidation:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.FechaCaducidadVigenciaCuraduria,
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
  // TODO: AGREGAR NOTAS DEL SISTEMA CUANDO SE DEFINAN
  columnNotes: showNotes
    ? item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios
      ? {
          systemNotes: null,
          itemNotes:
            item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
              ?.Comentarios,
        }
      : {
          systemNotes: null,
          itemNotes: null,
        }
    : null,
  columnBrand: {
    src: `assets/Images/logos/${item?.cotPartidaCotizacionDetalle?.vProducto?.NombreMarca?.trim()}_hover.svg`,
    nameBrand:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.NombreMarca,
  },
  columnDeliveryTime: {
    days:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.TiempoEstimadoEntrega,
  },
  //TODO: REVISAR PARA COLOCAR COLUMNA FALTANTE
  // columnDeliveryTimeSuggested: {
  //   days: item?.ajOfValorConfiguracionTiempoEntregaCotizacion?.TiempoEstimadoEntrega,
  // },
  columnNumberPieces: {
    value:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.NumeroDePiezas,
  },
  columnUnitPrice: {
    value:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.PrecioCotizadoUnitarioConvertido,
    currency: quoteSelected?.ClaveMoneda,
  },
  columnRequestedPrice: {
    value: item?.ajOfPrecioCotizacion?.PrecioUnitarioPactado,
    currency: quoteSelected?.ClaveMoneda,
    textUnderline: true,
    isEdit: true,
    activeGenericEmitter: true,
    color: item?.ajOfPrecioCotizacion?.RequiereAutorizacion
      ? 'red'
      : item?.ajOfPrecioCotizacion?.Aceptado
      ? 'ocean'
      : item?.ajOfPrecioCotizacion?.ParcialmenteAceptado
      ? 'yellow'
      : 'black',
  },
  columnTotalValue: {
    value:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.PrecioCotizadoTotal,
    currency: quoteSelected?.ClaveMoneda,
    listPrice:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
        ?.PrecioListaConvertido,
  },
});

const buildInternalSalesItemResumeAdjustment = (
  showNotes: boolean,
  item: any,
  index: number,
  quoteSelected: offerAdjustCarrousel,
): InternalSalesItem => ({
  data: item,
  index,
  columnNumberItem: {
    number: index + 1,
  },
  columnImgTypeItem: {
    value:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.TipoPartidaCotizacion,
  },
  columnConcept: {
    availabilityKey: item?.cotPartidaCotizacionDetalle?.VPartidaCotizacion?.DisponibilidadClave,
    cat: item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Catalogo,
    typePresentation:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.TipoPresentacion,
    presentation:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Presentacion,
    unity: item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Unidad,
    description:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Descripcion,
    type: item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Tipo,
    subType: item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Subtipo,
    control: item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Control,
    controlled:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Controlado,
    dateValidation:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.FechaCaducidadVigenciaCuraduria,
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
  // TODO: AGREGAR NOTAS DEL SISTEMA CUANDO SE DEFINAN
  columnNotes: showNotes
    ? item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.Comentarios
      ? {
          systemNotes: null,
          itemNotes:
            item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
              ?.Comentarios,
        }
      : {
          systemNotes: null,
          itemNotes: null,
        }
    : null,
  columnBrand: {
    src: `assets/Images/logos/${item?.cotPartidaCotizacionDetalle?.vProducto?.NombreMarca?.trim()}_hover.svg`,
    nameBrand:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.NombreMarca,
  },
  columnDeliveryTimeSuggested: {
    days:
      item?.ajOfValorConfiguracionTiempoEntregaCotizacion?.TiempoEstimadoEntrega ||
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.TiempoEstimadoEntregaOriginal,
  },
  columnDeliveryTime: {
    days:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.TiempoEstimadoEntrega,
  },
  columnNumberPieces: {
    value:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion?.NumeroDePiezas,
  },
  columnAdjustmentPrice: {
    value: item?.ajOfPrecioCotizacion?.PrecioUnitarioPactado ?? 'N/A',
    currency: quoteSelected?.ClaveMoneda,
    textUnderline: true,
    isEdit: false,
    color: item?.ajOfPrecioCotizacion?.RequiereAutorizacion
      ? 'red'
      : item?.ajOfPrecioCotizacion?.Aceptado
      ? 'ocean'
      : item?.ajOfPrecioCotizacion?.ParcialmenteAceptado
      ? 'yellow'
      : 'black',
  },
  columnUnitPrice: {
    value:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.PrecioCotizadoUnitarioConvertido,
    currency: quoteSelected?.ClaveMoneda,
  },
  columnTotalValue: {
    value:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.VPartidaCotizacion
        ?.PrecioCotizadoTotal,
    currency: quoteSelected?.ClaveMoneda,
    listPrice:
      item?.cotPartidaCotizacionDetalle?.gMCotPartidasDetalle?.CotProductoOferta
        ?.PrecioListaConvertido,
  },
});

export {
  OfferAdjustmentStatus,
  buildOfferAdjustmentFromDashboard,
  findTabFilter,
  mapOfferAdjustmentPromiseApiResponse,
  buildAjOfRechazo,
  buildAjustesOfertaArray,
  someoneNeedsAuthorization,
  buildInternalSalesItemTwoDays,
  buildInternalSalesItemExpressFreight,
  buildInternalSalesItemPrice,
  buildInternalSalesItemResumeAdjustment,
};
