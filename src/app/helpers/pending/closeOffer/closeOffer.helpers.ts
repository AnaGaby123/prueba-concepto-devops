import {
  AttributeDashboard,
  GMCotFletes,
  GMEnvioCorreoCotizacion,
  GMSolicitarAjustesCerrarOferta,
  PartidaAjuste,
  Resumen,
} from 'api-logistica';
import {addRowIndex, getTotalFreights} from '@appUtil/util';
import {concat, find, forEach, isEmpty, map as _map} from 'lodash-es';

import {ClientsListItemForCloseOffer} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import {
  AJUSTE_DE_OFERTA,
  CANCELACION,
  CONFIGIRACION_ESTADOS,
  ESTADOS_COTIZACION,
  IItemQuotation,
  initialAjOfCondicionesdePagoCotizacion,
  initialAjOfFleteExpressCotizacion,
  initialAjOfPrecioCotizacion,
  initialAjOfValorConfiguracionTiempoEntregaCotizacion,
  initialCloseOfferDetailsState,
  initialFormPrice,
  IQuotation,
  PROMESA_DE_COMPRA,
  ResumeSection,
  SEARCH_OPTIONS,
  SEGUIMIENTO,
} from '@appModels/store/pendings/close-offer/close-offer-details/close-offer-details.models';
import {
  IFreightItem,
  InternalSalesItem,
  StylesColumnTotalValue,
  typeColorsInternalSalesItem,
  TypeOptionsColumn,
} from '@appModels/table/internal-sales-item';
import {
  DEFAULT_UUID,
  FREIGHT_EXPRESS,
  FREIGHTS_LAST_MILE,
  ITEM_QUOTATION_TYPE_ORIGINAL,
} from '@appUtil/common.protocols';
import {CatTipoPartidaCotizacion, CorreoEnviado} from 'api-catalogos';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import * as apiLogistic from 'api-logistica';
import {FiltersOnlyActive} from '@appModels/filters/Filters';

enum CloseOfferStatus {
  Todas = 'Todas',
  Nueva = 'Nueva',
  EnProgreso = 'En Progreso',
  AjusteDeOferta = 'Ajuste De Oferta',
}

enum CloseOfferStatusApiResponse {
  Total = 'Total',
  EstadoCotizacionEnviada = 'EstadoCotizacionEnviada',
  EstadoCotizacionEnProgreso = 'EstadoCotizacionEnProgreso',
  EstadoCotizacionAjusteDeOferta = 'EstadoCotizacionAjusteDeOferta',
}

enum CloseOfferStatusApiRequest {
  Nueva = 'Enviada',
  EnProgreso = 'EnProgreso',
  AjusteDeOferta = 'AjusteDeOferta',
}

enum CloseOfferTypes {
  MasNuevas = 'Más Nuevas',
  MasAntiguas = 'Más Antíguas',
}

const mapCloseOfferStatusFromApi = {
  [CloseOfferStatus.Todas]: CloseOfferStatusApiResponse.Total,
  [CloseOfferStatus.Nueva]: CloseOfferStatusApiResponse.EstadoCotizacionEnviada,
  [CloseOfferStatus.EnProgreso]: CloseOfferStatusApiResponse.EstadoCotizacionEnProgreso,
  [CloseOfferStatus.AjusteDeOferta]: CloseOfferStatusApiResponse.EstadoCotizacionAjusteDeOferta,
};
const buildClientsFromCloseOfferDashboard = (
  clientsList: Array<Resumen>,
): Array<ClientsListItemForCloseOffer> => {
  clientsList = addRowIndex(0, 0, clientsList);
  return _map(clientsList, (o: Resumen) => {
    const newObject: ClientsListItemForCloseOffer = {...o, IdCliente: o.DescripcionLlave};
    forEach(o.Atributos, (i: AttributeDashboard) => {
      newObject[i.DescriptionField] = i.ValueField;
    });
    return newObject;
  });
};

const buildParamsAdjustOffer = (
  resume: ResumeSection,
  items: Array<IItemQuotation>,
  selectedQuotation: IQuotation,
): GMSolicitarAjustesCerrarOferta => {
  return {
    ajOfCondicionesdePagoCotizacion: resume.paymentConditionsIsSelected
      ? {
          ...initialAjOfCondicionesdePagoCotizacion,
          DiasAdicionales: resume.additionalDays,
          IdCatCondicionesDePago: resume.selectedAdjustmentPaymentConditions
            ? resume.selectedAdjustmentPaymentConditions?.value
            : selectedQuotation?.generalData?.paymentConditions?.IdCatCondicionesDePago,
          JustificacionAjuste: resume.adjustmentJustification,
          IdCotCotizacion: selectedQuotation.IdCotCotizacion,
        }
      : null,
    ajOfFleteExpressCotizacion: resume.freightIsSelected
      ? {
          ...initialAjOfFleteExpressCotizacion,
          PorcentajeProquifa: Number(resume.selectedAdjustmentPercentage.value),
          Comentarios: resume.adjustmentJustification,
        }
      : null,
    ListaPartidaAjuste: resume.minusTwoDaysIsSelected
      ? _map(
          items,
          (o: IItemQuotation): PartidaAjuste => ({
            IdcotPartidaCotizacion: o.IdCotPartidaCotizacion,
            ajOfValorConfiguracionTiempoEntregaCotizacion: {
              ...initialAjOfValorConfiguracionTiempoEntregaCotizacion,
              IdCotPartidaCotizacion: o.IdCotPartidaCotizacion,
              IdCotCotizacion: o.IdCotCotizacion,
              TiempoEstimadoEntrega: o.TiempoEstimadoEntrega,
              Comentarios: resume.adjustmentJustification,
              IdMarca: o.IdMarca,
              IdValorConfiguracionTiempoEntrega: o.IdValorConfiguracionTiempoEntrega,
            },
          }),
        )
      : resume.priceIsSelected
      ? _map(
          items,
          (o: IItemQuotation): PartidaAjuste => ({
            IdcotPartidaCotizacion: o.IdCotPartidaCotizacion,
            ajOfPrecioCotizacion: {
              ...initialAjOfPrecioCotizacion,
              IdCotPartidaCotizacion: o.IdCotPartidaCotizacion,
              PrecioUnitarioPactado: Number(o.formPrice.valueAmount),
              Comentarios: o.formPrice.comments,
            },
          }),
        )
      : resume.freightIsSelected
      ? _map(
          items,
          (o: IItemQuotation): PartidaAjuste => ({
            IdcotPartidaCotizacion: o.IdCotPartidaCotizacion,
            ajOfPrecioCotizacion: null,
            ajOfValorConfiguracionTiempoEntregaCotizacion: null,
          }),
        )
      : [
          {
            IdcotPartidaCotizacion: null,
            ajOfPrecioCotizacion: null,
            ajOfValorConfiguracionTiempoEntregaCotizacion: null,
          },
        ],
    IdCotCotizacion: selectedQuotation.IdCotCotizacion,
    IdProveedor: resume.freightIsSelected ? resume.selectedProviderId : null,
    Justificion: resume.adjustmentJustification,
  };
};

//DOCS: Construccion de las columnas generales de los items
const buildBodyGeneralItem = (
  showNotes: boolean,
  item: IItemQuotation = {} as IItemQuotation,
  index: number,
  freight: GMCotFletes,
  quoteSelected: IQuotation,
): InternalSalesItem => {
  let itemInternal: InternalSalesItem;
  if (!item.freightItem) {
    itemInternal = {
      data: item,
      index,
      backgroundColorByTypeItem: item.TipoPartidaCotizacion,
      columnNumberItem: {
        number: item.Index,
        showArrow:
          (item.TipoPartidaCotizacion === 'Original' && item.IdCotPartidaCotizacionMadre) ||
          item.TipoPartidaCotizacion !== 'Original'
            ? true
            : false,
      },
      columnImgTypeItem: {
        value: item?.TipoPartidaCotizacion,
      },
      columnConcept: {
        availabilityKey: item?.vProducto?.DisponibilidadClave,
        cat: item?.Catalogo,
        typePresentation: item?.TipoPresentacion,
        presentation: item?.Presentacion,
        unity: item?.Unidad,
        description: item?.Descripcion,
        type: item?.Tipo,
        subType: item?.Subtipo,
        control: item?.Control,
        controlled: item?.Controlado,
        dateValidation: item?.FechaCaducidadVigenciaCuraduria,
        proratedExpress:
          freight?.FleteExpress &&
          freight?.FleteExpress?.IdProveedor === item?.vProducto?.IdProveedorPrincipal &&
          !quoteSelected?.FleteDesglosado,
        author: item?.vProducto?.Autor ?? 'N/D',
        formatPublication: item?.vProducto?.FormatoPublicacion ?? 'N/D',
        typeMode: item?.vProducto?.MedioDifusion ?? 'N/D',
        datesSuggested: item?.FechasRealizacionCapacitacion,
        dateAvailability: item?.vProducto?.FechaDisponibilidadBackOrder,
        alternate: item?.vProducto?.TotalAlternativo,
        complementary: item?.vProducto?.TotalComplementario,
        supplements: item?.vProducto?.TotalSuplementario,
      },
      // TODO: AGREGAR NOTAS DEL SISTEMA CUANDO SE DEFINAN
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
        src: item?.imageHover,
        nameBrand: item?.NombreMarca,
      },
      columnNumberPieces: {
        value: item?.NumeroDePiezas,
      },
      columnUnitPrice: {
        value: item?.PrecioCotizadoUnitarioConvertido,
        currency: quoteSelected?.claveMoneda,
      },
      columnDeliveryTime: {
        days: item?.TiempoEstimadoEntrega,
        isEdit: false,
        isFreight: freight?.FleteExpress?.IdProveedor === item?.vProducto?.IdProveedorPrincipal,
        percentagePaidProquifa: freight?.FleteExpress?.PorcentajeProquifa,
      },
      columnProFreight: {
        showColumn:
          freight?.FleteExpress !== null || freight?.FletesUltimaMilla?.length > 0
            ? !quoteSelected?.FleteDesglosado
            : false,
        value: item?.PrecioFleteNoDesglosado || 'N/A',
        currency: quoteSelected?.claveMoneda,
      },
      columnSubtotal: {
        value: item?.PrecioCotizadoSubtotal,
        currency: quoteSelected?.claveMoneda,
      },
      columnIva: {
        value: item?.PrecioIVA,
        currency: quoteSelected?.claveMoneda,
      },
      columnTotalValue: {
        value: item?.PrecioCotizadoTotal,
        style: StylesColumnTotalValue.General,
        listPrice: item?.PrecioListaConvertido,
        currency: quoteSelected?.claveMoneda,
        pieces: item?.NumeroDePiezas,
      },
    };
  } else {
    itemInternal = {
      data: item,
      index,
      backgroundColorByTypeItem: item.TipoPartidaCotizacion,
      columnNumberItem: {
        number: index + 1,
      },
      columnImgTypeItem: {},
      columnConcept: {
        nameFreight: item?.freightItem?.descriptionFreight,
      },
      // TODO: AGREGAR NOTAS DEL SISTEMA CUANDO SE DEFINAN
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
      columnBrand: {},
      columnNumberPieces: {},
      columnUnitPrice: {},
      columnDeliveryTime: {},
      columnProFreight: {
        showColumn: !(
          (freight?.FleteExpress !== null || freight?.FletesUltimaMilla?.length > 0) &&
          quoteSelected?.FleteDesglosado
        ),
      },
      columnSubtotal: {
        value: item?.freightItem?.subtotal,
        currency: quoteSelected?.claveMoneda,
      },
      columnIva: {
        value: item?.freightItem?.iva || 0,
        currency: quoteSelected?.claveMoneda,
      },
      columnTotalValue: {
        value: item.freightItem.total,
        currency: quoteSelected?.claveMoneda,
      },
    };
  }

  if (quoteSelected?.FleteDesglosado) {
    delete itemInternal.columnProFreight;
  }

  return itemInternal;
};

//DOCS: Crear columnas faltantes en quotation-new.component
const buildColumnsSectionQuotationNew = (
  itemQuotation: IItemQuotation,
  itemInternal: InternalSalesItem,
  isHeader: boolean,
  seeResumeActive: boolean,
  optional?: {
    allCheckedFollowing?: boolean;
    allCheckedAdjustmentOffer?: boolean;
    allCheckedPurchasePromise?: boolean;
    allCheckedCancellation?: boolean;
  },
): InternalSalesItem => {
  if (seeResumeActive && !itemQuotation.freightItem) {
    itemInternal = {
      ...itemInternal,
      columnDelete: {
        showColumn: true,
        showArrow: true,
      },
      columnSeeResume: {
        text: itemQuotation?.Seguimiento
          ? 'Programar Seguimiento'
          : itemQuotation?.AjusteDeOferta
          ? 'Ajuste de Ofera'
          : itemQuotation?.PromesaDeCompra
          ? 'Promesa de Compra'
          : 'Cancelar',
        color: itemQuotation?.Seguimiento
          ? 'ocean'
          : itemQuotation?.AjusteDeOferta
          ? 'yellow'
          : itemQuotation?.PromesaDeCompra
          ? 'green'
          : 'red',
        elementId: itemQuotation?.commentsPop?.elementId,
      },
    };
  } else if (!itemQuotation.freightItem) {
    itemInternal = {
      ...itemInternal,
      columnChecksTypeAdjustment: {
        showColumn: true,
        areChecksBoxHeader: isHeader,
        valueCheckBoxBlueFollowing: isHeader
          ? optional?.allCheckedFollowing
          : itemQuotation?.Seguimiento,
        valueCheckBoxYellowAdjustmentOffer: isHeader
          ? optional?.allCheckedAdjustmentOffer
          : itemQuotation?.AjusteDeOferta,
        valueCheckBoxGreenPurchasePromise: isHeader
          ? optional?.allCheckedPurchasePromise
          : itemQuotation?.PromesaDeCompra,
        valueCheckBoxRedCancel: isHeader
          ? optional?.allCheckedCancellation
          : itemQuotation?.Cancelacion,
        showCheckBoxRedCancel: true,
        showCheckBoxGreenPurchasePromise: true,
        showCheckBoxYellowAdjustmentOffer: true,
        showCheckBoxBlueFollowing: true,
        numberChecksActive: 4,
        showAddQuotation: !itemQuotation.EnCerrarOferta && !isHeader,
      },
    };
  }
  //DOCS: Si es la partida de flete agregar las columnas vacias
  if (seeResumeActive && itemQuotation.freightItem) {
    itemInternal = {
      ...itemInternal,
      columnDelete: {
        showColumn: true,
      },
      columnSeeResume: {},
    };
  } else if (itemQuotation.freightItem) {
    itemInternal = {
      ...itemInternal,
      columnChecksTypeAdjustment: {
        showColumn: true,
      },
    };
  }

  return itemInternal;
};

//DOCS: Crear Columnas en resume.component
const buildColumnsSectionResume = (
  itemQuotation: IItemQuotation,
  itemInternal: InternalSalesItem,
  quoteSelected: IQuotation,
  isHeader: boolean,
  optional?: {
    validatorForFooter?: boolean;
    resumeData?: ResumeSection;
    allCheckedResume?: boolean;
    showColumnAgreedPrice?: boolean;
  },
): InternalSalesItem => {
  if (!itemQuotation.freightItem) {
    itemInternal = {
      ...itemInternal,
      columnOptions: {
        typeOption: TypeOptionsColumn.CheckBoxNormal,
        isCheckHeader: isHeader,
        value: isHeader ? optional?.allCheckedResume : itemQuotation?.isSelectedInResume,
      },
      columnAgreedPrice: {
        currency: quoteSelected?.claveMoneda,
        value: itemQuotation?.cotProductoOferta?.PrecioCotizadoUnitarioPactado,
      },
      columnUnitPrice: {
        ...itemInternal.columnUnitPrice,
        value:
          itemQuotation?.formPrice?.valueAmount && itemQuotation?.formPrice?.comments
            ? itemQuotation?.formPrice?.valueAmount
            : itemQuotation?.PrecioCotizadoUnitarioConvertido,
        activeGenericEmitter:
          optional?.resumeData?.priceIsSelected && itemQuotation?.isSelectedInResume,
        isEdit: optional?.resumeData?.priceIsSelected && itemQuotation?.isSelectedInResume,
        textUnderline: optional?.resumeData?.priceIsSelected && itemQuotation?.isSelectedInResume,
        showTooltip: false,
        textBold:
          itemQuotation?.formPrice?.valueAmount && itemQuotation?.formPrice?.comments
            ? true
            : false,
        idElementsUnitPrice: itemQuotation?.popUpByAmount?.elementId,
      },
    };
  }

  if (itemQuotation.freightItem) {
    itemInternal = {
      ...itemInternal,
      columnAgreedPrice: {},
      columnOptions: {},
      columnUnitPrice: {},
    };
  }

  if (
    (!itemQuotation?.isSelectedInResume ||
      !optional?.validatorForFooter ||
      !optional?.resumeData?.priceIsSelected) &&
    !itemQuotation.freightItem
  ) {
    itemInternal.columnUnitPrice.activeGenericEmitter = false;
  }

  if (optional?.showColumnAgreedPrice) {
    delete itemInternal.columnAgreedPrice;
  }

  delete itemInternal.columnNumberItem;
  return itemInternal;
};

//DOCS: Agregar Columnas faltantes en  quotation-adjustment.component
const buildColumnsSectionAdjustmentOffer = (
  itemQuotation: IItemQuotation,
  itemInternal: InternalSalesItem,
  seeResumeActive: boolean,
  quoteSelected: IQuotation,
  isHeader: boolean,
  optional?: {
    tab?: string;
    allCheckedFollowing?: boolean;
    allCheckedAdjustmentOffer?: boolean;
    allCheckedPurchasePromise?: boolean;
    allCheckedCancellation?: boolean;
  },
): InternalSalesItem => {
  //DOCs: Validaciones de ajuste de oferta
  let colorCarFreight: typeColorsInternalSalesItem;
  let colorUnitPrice: typeColorsInternalSalesItem;
  let colorIndicatorStatus: typeColorsInternalSalesItem;

  if (
    !seeResumeActive &&
    optional?.tab === '1' &&
    isEmpty(itemQuotation.ajOfFleteExpressCotizacion)
  ) {
    colorCarFreight = itemQuotation.ajOfValorConfiguracionTiempoEntregaCotizacion?.Aceptado
      ? 'green'
      : 'red';
  }
  if (
    !seeResumeActive &&
    optional?.tab === '1' &&
    !isEmpty(itemQuotation.ajOfFleteExpressCotizacion)
  ) {
    colorCarFreight = itemQuotation.ajOfFleteExpressCotizacion?.ParcialmenteAceptado
      ? 'yellow'
      : itemQuotation.ajOfFleteExpressCotizacion?.Aceptado
      ? 'green'
      : 'red';
  }

  if (optional?.tab === '3') {
    colorUnitPrice =
      optional?.tab === '3' && itemQuotation.ajOfPrecioCotizacion?.ParcialmenteAceptado
        ? 'yellow'
        : optional?.tab === '3' && itemQuotation.ajOfPrecioCotizacion?.Aceptado
        ? 'green'
        : optional?.tab === '3' && itemQuotation.ajOfPrecioCotizacion?.Rechazado
        ? 'red'
        : 'red';

    colorIndicatorStatus = itemQuotation.ajOfPrecioCotizacion?.ParcialmenteAceptado
      ? 'yellow'
      : itemQuotation.ajOfPrecioCotizacion?.Aceptado
      ? 'green'
      : !itemQuotation.ajOfPrecioCotizacion?.Rechazado
      ? 'red'
      : 'red';
  }

  if (optional?.tab === '1') {
    colorIndicatorStatus =
      itemQuotation.ajOfFleteExpressCotizacion &&
      itemQuotation.ajOfFleteExpressCotizacion?.ParcialmenteAceptado
        ? 'yellow'
        : itemQuotation.ajOfFleteExpressCotizacion?.Aceptado ||
          (itemQuotation.ajOfValorConfiguracionTiempoEntregaCotizacion?.Aceptado &&
            isEmpty(itemQuotation.ajOfFleteExpressCotizacion))
        ? 'green'
        : !itemQuotation.ajOfFleteExpressCotizacion?.Aceptado ||
          (itemQuotation.ajOfValorConfiguracionTiempoEntregaCotizacion?.Rechazado &&
            isEmpty(itemQuotation.ajOfFleteExpressCotizacion))
        ? 'red'
        : 'red';
  }

  if (!itemQuotation.freightItem) {
    itemInternal = {
      ...itemInternal,
      columnOptions: {
        typeOption: TypeOptionsColumn.IndicatorStatus,
        colorIndicator: colorIndicatorStatus,
      },
      columnConcept: {
        ...itemInternal.columnConcept,
        carFreight: {
          showCar: optional?.tab === '1',
          color: colorCarFreight,
          idElementFreight: itemQuotation?.freightPop?.elementId,
        },
      },
      columnAgreedPrice: {
        currency: quoteSelected?.claveMoneda,
        value: itemQuotation?.cotProductoOferta?.PrecioCotizadoUnitarioPactado,
        colorLabel: colorUnitPrice,
      },
      columnUnitPrice: {
        ...itemInternal.columnUnitPrice,
        color: colorUnitPrice,
        showComments: true,
        idElementComments: itemQuotation?.pricePop?.elementId,
      },
      columnChecksTypeAdjustment: {
        showColumn: true,
        areChecksBoxHeader: isHeader,
        valueCheckBoxGreenPurchasePromise: isHeader
          ? optional?.allCheckedPurchasePromise
          : itemQuotation?.PromesaDeCompra,
        valueCheckBoxRedCancel: isHeader
          ? optional?.allCheckedCancellation
          : itemQuotation?.Cancelacion,
        showCheckBoxBlueFollowing: false,
        showCheckBoxYellowAdjustmentOffer: false,
        showCheckBoxRedCancel: true,
        showCheckBoxGreenPurchasePromise: true,
        numberChecksActive: 2,
      },
    };
  } else {
    itemInternal = {
      ...itemInternal,
      columnConcept: {
        nameFreight: itemQuotation?.freightItem?.descriptionFreight,
      },
      columnAgreedPrice: {},
      columnUnitPrice: {},
      columnOptions: {},
      columnChecksTypeAdjustment: {
        showColumn: true,
        numberChecksActive: 2,
      },
    };
  }

  if (optional?.tab !== '3' && !itemQuotation.freightItem) {
    delete itemInternal.columnUnitPrice.color;
    delete itemInternal.columnUnitPrice.showComments;
    delete itemInternal.columnAgreedPrice;
  }

  if (optional?.tab !== '3' && itemQuotation.freightItem) {
    delete itemInternal.columnAgreedPrice;
  }

  if (seeResumeActive) {
    delete itemInternal.columnOptions;
    delete itemInternal.columnChecksTypeAdjustment;
    itemInternal = {
      ...itemInternal,
      columnDelete: {
        showColumn: true,
        showArrow: true,
      },
      columnSeeResume: {
        text: itemQuotation?.Seguimiento
          ? 'Programar Seguimiento'
          : itemQuotation?.AjusteDeOferta
          ? 'Ajuste de Ofera'
          : itemQuotation?.PromesaDeCompra
          ? 'Promesa de Compra'
          : 'Cancelar',
        color: itemQuotation?.Seguimiento
          ? 'ocean'
          : itemQuotation?.AjusteDeOferta
          ? 'yellow'
          : itemQuotation?.PromesaDeCompra
          ? 'green'
          : 'red',
        elementId: itemQuotation?.commentsPop?.elementId,
      },
    };

    if (itemQuotation?.freightItem) {
      itemInternal = {
        ...itemInternal,
        columnDelete: {
          showColumn: true,
        },
        columnSeeResume: {},
      };
    }
  }

  return itemInternal;
};

//DOCS: Agregar Columnas faltantes en quotation-in-progress.component
const buildColumnsSectionInProgress = (
  itemQuotation: IItemQuotation,
  itemInternal: InternalSalesItem,
  seeResumeActive: boolean,
  quoteSelected: IQuotation,
  isHeader: boolean,
  optional: {
    reasonCancel?: string;
    tabTracing?: boolean;
    tabAdjustment?: boolean;
    tabBuyPromise?: boolean;
    tabCancel?: boolean;
    allCheckedFollowing?: boolean;
    allCheckedAdjustmentOffer?: boolean;
    allCheckedPurchasePromise?: boolean;
    allCheckedCancellation?: boolean;
  },
): InternalSalesItem => {
  if (optional?.tabTracing && !itemQuotation.freightItem && !seeResumeActive) {
    itemInternal = {
      ...itemInternal,
      columnDateLastFollow: {
        date: itemQuotation?.lastTracing?.FechaProximoSeguimiento,
        expiredTracking:
          itemQuotation?.lastTracing !== null && itemQuotation?.lastTracing !== undefined,
        isSelected: itemQuotation?.tracingPop?.isOpen,
        elementIdComment: itemQuotation?.tracingPop?.elementId,
      },
      columnChecksTypeAdjustment: {
        showColumn: true,
        areChecksBoxHeader: isHeader,
        valueCheckBoxBlueFollowing: isHeader
          ? optional?.allCheckedFollowing
          : itemQuotation?.Seguimiento,
        valueCheckBoxYellowAdjustmentOffer: isHeader
          ? optional?.allCheckedAdjustmentOffer
          : itemQuotation?.AjusteDeOferta,
        valueCheckBoxGreenPurchasePromise: isHeader
          ? optional?.allCheckedPurchasePromise
          : itemQuotation?.PromesaDeCompra,
        valueCheckBoxRedCancel: isHeader
          ? optional?.allCheckedCancellation
          : itemQuotation?.Cancelacion,
        showCheckBoxRedCancel: true,
        showCheckBoxGreenPurchasePromise: true,
        showCheckBoxYellowAdjustmentOffer: true,
        showCheckBoxBlueFollowing: true,
        numberChecksActive: 4,
      },
    };
  } else if (optional?.tabTracing && itemQuotation.freightItem && !seeResumeActive) {
    itemInternal = {
      ...itemInternal,
      columnDateLastFollow: {},
      columnChecksTypeAdjustment: {
        showColumn: true,
      },
    };
  }

  if (optional?.tabAdjustment && !itemQuotation.freightItem && !seeResumeActive) {
    itemInternal = {
      ...itemInternal,
      columnComments: {
        color: 'yellow',
        elementIdComment: itemQuotation?.commentsPop?.elementId,
      },
    };
  } else if (optional?.tabAdjustment && itemQuotation.freightItem && !seeResumeActive) {
    itemInternal = {
      ...itemInternal,
      columnComments: {},
    };
  }

  if (optional?.tabBuyPromise && !itemQuotation.freightItem && !seeResumeActive) {
    itemInternal = {
      ...itemInternal,
      columnArrivalDate: {
        date: itemQuotation?.cotPromesaDeCompraPartida?.FechaPromesaDeCompra,
        color: 'green',
        elementIdComment: itemQuotation?.commentsPop?.elementId,
        showComments: true,
      },
    };
  } else if (optional?.tabBuyPromise && itemQuotation.freightItem && !seeResumeActive) {
    itemInternal = {
      ...itemInternal,
      columnArrivalDate: {},
    };
  }

  if (optional?.tabCancel && !itemQuotation.freightItem && !seeResumeActive) {
    itemInternal = {
      ...itemInternal,
      columnCancelReason: {
        reasonCancel: optional?.reasonCancel,
        elementIdComment: itemQuotation?.commentsPop?.elementId,
      },
    };
  } else if (optional?.tabCancel && itemQuotation.freightItem && !seeResumeActive) {
    itemInternal = {
      ...itemInternal,
      columnCancelReason: {},
    };
  }
  if (seeResumeActive && !itemQuotation.freightItem) {
    itemInternal = {
      ...itemInternal,
      columnSeeResume: {
        text: itemQuotation?.Seguimiento
          ? 'Programar Seguimiento'
          : itemQuotation?.AjusteDeOferta
          ? 'Ajuste de Ofera'
          : itemQuotation?.PromesaDeCompra
          ? 'Promesa de Compra'
          : 'Cancelar',
        color: itemQuotation?.Seguimiento
          ? 'ocean'
          : itemQuotation?.AjusteDeOferta
          ? 'yellow'
          : itemQuotation?.PromesaDeCompra
          ? 'green'
          : 'red',
        elementId: itemQuotation?.commentsPop?.elementId,
      },
    };
  } else if (seeResumeActive && itemQuotation.freightItem) {
    itemInternal = {
      ...itemInternal,
      columnSeeResume: {},
    };
  }
  return itemInternal;
};

const buildItemFreight = (quoteSelected: IQuotation, freight: GMCotFletes): IItemQuotation[] => {
  let itemsQuotation = quoteSelected?.itemsQuotation;
  if (freight?.FleteExpress !== null || freight?.FletesUltimaMilla?.length > 0) {
    if (quoteSelected?.FleteDesglosado) {
      //DOCS: Crear la partida de flete
      const freightItem: IFreightItem = {
        descriptionFreight: freight?.FleteExpress?.IdCotCotizacionFleteExpress
          ? FREIGHT_EXPRESS
          : FREIGHTS_LAST_MILE,
        subtotal: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress, {
          subtotal: true,
        }),
        iva: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress, {iva: true}),
        total: getTotalFreights(freight?.FletesUltimaMilla, freight?.FleteExpress),
      };
      itemsQuotation = concat(quoteSelected?.itemsQuotation, [{freightItem} as IItemQuotation]);
    }
  }
  return itemsQuotation;
};

const buildSendQuotationBody = (
  typesQuotation: Array<CatTipoPartidaCotizacion>,
  IdQuotation: string,
  additionalComments: string,
  mailData: CorreoEnviado,
): GMEnvioCorreoCotizacion => {
  const originalQuotation: CatTipoPartidaCotizacion = find(
    typesQuotation,
    (o: CatTipoPartidaCotizacion) => o.TipoPartidaCotizacion === ITEM_QUOTATION_TYPE_ORIGINAL,
  );
  return {
    Contacto: mailData.ReceptoresCSV,
    ComentariosAdicionales: additionalComments,
    ConCopiaCSV: mailData.ConCopiaCSV,
    IdCatTipoPartidaCotizacion: originalQuotation.IdCatTipoPartidaCotizacion,
    IdCotCotizacion: IdQuotation,
    Asunto: mailData.Asunto,
  };
};
const buildGetEntriesBody = (
  selectedQuote: IQuotation,
  quoteStatus: string,
  selectedInProgressTab: ITabOption,
  selectedAdjustmentTab: ITabOption,
  defaultSearchOption: DropListOption,
  defaultSearchTerm: string,
  selectedResumeTab: ITabOption,
  resumeSearchOption: DropListOption,
  resumeSearchTerm: string,
  isInResumeView: boolean,
  providerId: string,
  selectedBrandId: string,
): apiLogistic.QueryInfo => {
  const body = new FiltersOnlyActive();
  body.SortField = 'Orden';
  body.SortDirection = 'asc';
  body.Filters.push({
    NombreFiltro: 'IdCotCotizacion',
    ValorFiltro: selectedQuote.IdCotCotizacion,
  });
  const filters = [];
  const status = {
    [ESTADOS_COTIZACION.enviada]: () => {
      // TODO: Esta en la vista Resumir
      if (isInResumeView) {
        if (selectedResumeTab.id === '1') {
          filters.push(
            {
              NombreFiltro: SEGUIMIENTO,
              ValorFiltro: true,
            },
            {
              NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionSeguimiento,
              ValorFiltro: false,
            },
          );
        }
        if (selectedResumeTab.id === '2') {
          filters.push(
            {
              NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionFleteExpress,
              ValorFiltro: false,
            },
            {
              NombreFiltro: AJUSTE_DE_OFERTA,
              ValorFiltro: true,
            },
            {
              NombreFiltro: 'IdProveedorPrincipal',
              ValorFiltro: providerId,
            },
            //TODO Agregar el filtro de IdProveedorPrincipal Y QUITAR EL IdMarca
          );
        }
        if (selectedResumeTab.id === '3') {
          filters.push(
            {
              NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionPromesaDeCompra,
              ValorFiltro: false,
            },
            {
              NombreFiltro: PROMESA_DE_COMPRA,
              ValorFiltro: true,
            },
          );
        }
        if (selectedResumeTab.id === '4') {
          filters.push(
            {
              NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionCancelacionPartida,
              ValorFiltro: false,
            },
            {
              NombreFiltro: CANCELACION,
              ValorFiltro: true,
            },
          );
        }
        if (resumeSearchTerm) {
          filters.push({
            NombreFiltro: SEARCH_OPTIONS[resumeSearchOption.label],
            ValorFiltro: resumeSearchTerm,
          });
        }
      }
      // TODO: Esta en la vista Ver resumen
      if (!isInResumeView && selectedQuote.seeResumeActive) {
        filters.push({
          NombreFiltro: 'Configurada',
          ValorFiltro: true,
        });
        if (defaultSearchTerm) {
          filters.push({
            NombreFiltro: SEARCH_OPTIONS[defaultSearchOption.label],
            ValorFiltro: defaultSearchTerm,
          });
        }
      }
      // TODO: Esta en la vista Principal
      if (!isInResumeView && !selectedQuote.seeResumeActive) {
        filters.push(
          {
            NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionPromesaDeCompra,
            ValorFiltro: false,
          },
          {
            NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionFleteExpress,
            ValorFiltro: false,
          },
          {
            NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionSeguimiento,
            ValorFiltro: false,
          },
          {
            NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionCancelacionPartida,
            ValorFiltro: false,
          },
        );
        if (defaultSearchTerm) {
          filters.push({
            NombreFiltro: SEARCH_OPTIONS[defaultSearchOption.label],
            ValorFiltro: defaultSearchTerm,
          });
        }
      }
      return filters;
    },
    [ESTADOS_COTIZACION.enProgreso]: () => {
      // TODO: Esta en la vista Resumir
      if (isInResumeView) {
        if (selectedResumeTab.id === '1') {
          filters.push(
            {
              NombreFiltro: SEGUIMIENTO,
              ValorFiltro: true,
            },
            {
              NombreFiltro: 'ConfiguracionSeguimientoPendiente',
              ValorFiltro: true,
            },
          );
        }
        if (selectedResumeTab.id === '2') {
          filters.push(
            {
              NombreFiltro: AJUSTE_DE_OFERTA,
              ValorFiltro: true,
            },
            {
              NombreFiltro: 'IdProveedorPrincipal',
              ValorFiltro: providerId,
            },
          );
        }
        if (selectedResumeTab.id === '3') {
          filters.push(
            {
              NombreFiltro: PROMESA_DE_COMPRA,
              ValorFiltro: true,
            },
            {
              NombreFiltro: 'ConfiguracionPromesaDeCompra',
              ValorFiltro: false,
            },
          );
        }
        if (selectedResumeTab.id === '4') {
          filters.push(
            {
              NombreFiltro: CANCELACION,
              ValorFiltro: true,
            },
            {
              NombreFiltro: 'ConfiguracionCancelacionPartida',
              ValorFiltro: false,
            },
          );
        }
        if (resumeSearchTerm) {
          filters.push({
            NombreFiltro: SEARCH_OPTIONS[resumeSearchOption.label],
            ValorFiltro: resumeSearchTerm,
          });
        }
      }
      // TODO: Esta en la vista Principal
      if (!isInResumeView && !selectedQuote.seeResumeActive) {
        if (selectedInProgressTab.id === '1') {
          filters.push(
            {
              NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionSeguimiento,
              ValorFiltro: true,
            },
            {
              NombreFiltro: CANCELACION,
              ValorFiltro: false,
            },
            {
              NombreFiltro: PROMESA_DE_COMPRA,
              ValorFiltro: false,
            },
            {
              NombreFiltro: AJUSTE_DE_OFERTA,
              ValorFiltro: false,
            },
            {
              NombreFiltro: SEGUIMIENTO,
              ValorFiltro: true,
            },
          );
        }
        if (selectedInProgressTab.id === '2') {
          filters.push(
            {
              NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionFleteExpress,
              ValorFiltro: true,
            },
            {
              NombreFiltro: CANCELACION,
              ValorFiltro: false,
            },
            {
              NombreFiltro: SEGUIMIENTO,
              ValorFiltro: false,
            },
            {
              NombreFiltro: PROMESA_DE_COMPRA,
              ValorFiltro: false,
            },
            {
              NombreFiltro: AJUSTE_DE_OFERTA,
              ValorFiltro: true,
            },
          );
        }
        if (selectedInProgressTab.id === '3') {
          filters.push(
            {
              NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionPromesaDeCompra,
              ValorFiltro: true,
            },
            {
              NombreFiltro: CANCELACION,
              ValorFiltro: false,
            },
            {
              NombreFiltro: SEGUIMIENTO,
              ValorFiltro: false,
            },
            {
              NombreFiltro: AJUSTE_DE_OFERTA,
              ValorFiltro: false,
            },
            {
              NombreFiltro: PROMESA_DE_COMPRA,
              ValorFiltro: true,
            },
          );
        }
        if (selectedInProgressTab.id === '4') {
          filters.push(
            {
              NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionCancelacionPartida,
              ValorFiltro: true,
            },
            {
              NombreFiltro: SEGUIMIENTO,
              ValorFiltro: false,
            },
            {
              NombreFiltro: PROMESA_DE_COMPRA,
              ValorFiltro: false,
            },
            {
              NombreFiltro: AJUSTE_DE_OFERTA,
              ValorFiltro: false,
            },
            {
              NombreFiltro: CANCELACION,
              ValorFiltro: true,
            },
          );
        }
        if (defaultSearchTerm) {
          filters.push({
            NombreFiltro: SEARCH_OPTIONS[defaultSearchOption.label],
            ValorFiltro: defaultSearchTerm,
          });
        }
      }
      // TODO: Esta en la vista Ver resumen
      if (!isInResumeView && selectedQuote.seeResumeActive) {
        filters.push({
          NombreFiltro: 'Configurada',
          ValorFiltro: true,
        });
        if (defaultSearchTerm) {
          filters.push({
            NombreFiltro: SEARCH_OPTIONS[defaultSearchOption.label],
            ValorFiltro: defaultSearchTerm,
          });
        }
      }
      return filters;
    },
    [ESTADOS_COTIZACION.ajusteDeOferta]: () => {
      // TODO: Esta en la vista Resumir
      if (isInResumeView) {
        if (selectedResumeTab.id === '1') {
          filters.push({
            NombreFiltro: SEGUIMIENTO,
            ValorFiltro: true,
          });
        }
        if (selectedResumeTab.id === '2') {
          filters.push(
            {
              NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionFleteExpress,
              ValorFiltro: false,
            },
            {
              NombreFiltro: AJUSTE_DE_OFERTA,
              ValorFiltro: true,
            },
            {
              NombreFiltro: 'IdProveedorPrincipal',
              ValorFiltro: providerId,
            },
          );
        }
        if (selectedResumeTab.id === '3') {
          filters.push(
            {
              NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionPromesaDeCompra,
              ValorFiltro: false,
            },
            {
              NombreFiltro: PROMESA_DE_COMPRA,
              ValorFiltro: true,
            },
            {
              NombreFiltro: 'EnCerrarOferta',
              ValorFiltro: true,
            },
          );
        }
        if (selectedResumeTab.id === '4') {
          filters.push(
            {
              NombreFiltro: CONFIGIRACION_ESTADOS.ConfiguracionCancelacionPartida,
              ValorFiltro: false,
            },
            {
              NombreFiltro: CANCELACION,
              ValorFiltro: true,
            },
            {
              NombreFiltro: 'EnCerrarOferta',
              ValorFiltro: true,
            },
          );
        }
        if (resumeSearchTerm) {
          filters.push({
            NombreFiltro: SEARCH_OPTIONS[resumeSearchOption.label],
            ValorFiltro: resumeSearchTerm,
          });
        }
      }
      // TODO: Esta en la vista Ver resumen
      if (!isInResumeView && selectedQuote.seeResumeActive) {
        filters.push({
          NombreFiltro: 'Configurada',
          ValorFiltro: true,
        });
        if (defaultSearchTerm) {
          filters.push({
            NombreFiltro: SEARCH_OPTIONS[defaultSearchOption.label],
            ValorFiltro: defaultSearchTerm,
          });
        }
        if (selectedBrandId !== DEFAULT_UUID) {
          filters.push({
            NombreFiltro: 'IdMarca',
            ValorFiltro: selectedBrandId,
          });
        }
      }
      // TODO: Esta en la vista Principal
      if (!isInResumeView && !selectedQuote.seeResumeActive) {
        filters.push({
          NombreFiltro: 'EnCerrarOferta',
          ValorFiltro: true,
        });
        if (
          selectedAdjustmentTab.label ===
          initialCloseOfferDetailsState().adjustmentTabOptions[0].label
        ) {
          filters.push(
            {
              NombreFiltro: 'AjustesDeTiempoDeEntrega',
              ValorFiltro: '',
            },
            {
              NombreFiltro: 'Configurada',
              ValorFiltro: false,
            },
          );
        }
        if (
          selectedAdjustmentTab.label ===
          initialCloseOfferDetailsState().adjustmentTabOptions[1].label
        ) {
          filters.push({
            NombreFiltro: 'AjustesDeCondicionesDePago',
            ValorFiltro: true,
          });
        }
        if (
          selectedAdjustmentTab.label ===
          initialCloseOfferDetailsState().adjustmentTabOptions[2].label
        ) {
          filters.push(
            {
              NombreFiltro: 'AjustesDePrecio',
              ValorFiltro: '',
            },
            {
              NombreFiltro: 'Configurada',
              ValorFiltro: false,
            },
          );
        }
        if (defaultSearchTerm) {
          filters.push({
            NombreFiltro: SEARCH_OPTIONS[defaultSearchOption.label],
            ValorFiltro: defaultSearchTerm,
          });
        }
      }
      return filters;
    },
  };

  body.Filters = [...body.Filters, ...status[quoteStatus]()];
  return body;
};

const generateItemsQuotation = (
  list: Array<apiLogistic.PartidaCotizacionCerrarOfertaObj>,
): Array<IItemQuotation> => {
  return _map(
    list,
    (o: apiLogistic.PartidaCotizacionCerrarOfertaObj, index: number) =>
      ({
        ...o,
        Index: index + 1,
        isSelectedInResume: false,
        isChild: false,
        lastTracing: !isEmpty(o.ListaCotPartidaCotizacionSeguimiento)
          ? o.ListaCotPartidaCotizacionSeguimiento[0]
          : null,
        commentsPop: {
          isOpen: false,
          isInRange: false,
          elementId: `commentsPop${index + 1}`,
          target: null,
          position: 'left-center',
          zIndex: 2,
        },
        tracingPop: {
          isOpen: false,
          isInRange: false,
          elementId: `tracingPop${index + 1}`,
          target: null,
          position: 'left-start',
          zIndex: 2,
        },
        freightPop: {
          isOpen: false,
          isInRange: false,
          elementId: `freightPop${index + 1}`,
          target: null,
          position: 'right-start',
          zIndex: 2,
        },
        ratePop: {
          isOpen: false,
          isInRange: false,
          elementId: `ratePop${index + 1}`,
          target: null,
          position: 'top-center',
          zIndex: 2,
        },
        pricePop: {
          isOpen: false,
          isInRange: false,
          elementId: `pricePop${index + 1}`,
          target: null,
          position: 'bottom-center',
          zIndex: 2,
        },
        popUpByAmount: {
          isOpen: false,
          isInRange: false,
          elementId: `amount_${index + 1}`,
          target: null,
          position: 'bottom-start',
          zIndex: 2,
        },
        children: [],
        formPrice: {
          ...initialFormPrice,
          price: o?.PrecioCotizadoUnitarioConvertido,
        },
        imageHover: `assets/Images/logos/${o.NombreMarca?.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')}_hover.svg`,
      } as IItemQuotation),
  );
};
export {
  mapCloseOfferStatusFromApi,
  CloseOfferStatus,
  CloseOfferStatusApiResponse,
  CloseOfferStatusApiRequest,
  CloseOfferTypes,
  buildClientsFromCloseOfferDashboard,
  buildParamsAdjustOffer,
  buildBodyGeneralItem,
  buildColumnsSectionQuotationNew,
  buildColumnsSectionResume,
  buildColumnsSectionAdjustmentOffer,
  buildColumnsSectionInProgress,
  buildItemFreight,
  buildSendQuotationBody,
  buildGetEntriesBody,
  generateItemsQuotation,
};
