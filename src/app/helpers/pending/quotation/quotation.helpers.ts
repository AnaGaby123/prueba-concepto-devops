import {
  ClientsListItemForQuotation,
  QuotationDashboardState,
} from '@appModels/store/quotation/quotation-dashboard/quotation-dashboard.models';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption, IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {ApiRequestStatus} from '@appHelpers/shared/shared.helpers';
import {addRowIndex} from '@appUtil/util';
import {
  AttributeDashboard,
  CotCotizacionFleteExpress,
  CotCotizacionFleteUltimaMilla,
  CotPartidaCotizacion,
  CotPartidaCotizacionCapacitacionFecha,
  CotPartidaInvetigacionAtencionComentariosObj,
  CotPartidasInvetigacionCotizacion,
  CotProductoOferta,
  GMCotCotizacionDetalle,
  GMCotPartidasDetalle,
  GMCotProductoOferta,
  GMEnvioCorreoCotizacion,
  GMProductoOfertaPieza,
  Resumen,
  VCotCotizacion,
  VProducto,
} from 'api-logistica';
import {
  deburr,
  filter,
  find,
  findIndex,
  forEach,
  isEmpty,
  map,
  omit,
  orderBy,
  uniqBy,
} from 'lodash-es';
import {
  ICotPartidaInvetigacionAtencionComentariosObj,
  ICotPartidasInvetigacionCotizacion,
  IGMCotCotizacionDetalle,
  IGMCotPartidasDetalle,
  IQuotation,
  QuotationClientInfo,
  QuotationItemCombined,
} from '@appModels/store/quotation/quotation-details/quotation-details.models';
import {ProductSearchResult} from '@appModels/store/quotation/quotation-details/details/sections/list-quotes.models';
import {
  CatTipoNumeroTelefonico,
  CatTipoPartidaCotizacion,
  ConfiguracionClientesContratoService,
  ContactoDetalleObj,
  CorreoElectronico,
  CorreoEnviado,
  VDireccion,
  VMarcaFamilia,
  VNumeroTelefonico,
} from 'api-catalogos';
import {
  DEFAULT_DATE,
  DEFAULT_UUID,
  getIvaWithGravaIVA,
  ITEM_QUOTATION_TYPE_ORIGINAL,
  ITEM_QUOTATION_TYPE_SAVING,
  MOBILE,
  PHONE_1,
  PHONE_2,
  QUOTATION_NEW,
  QUOTATION_SAVED,
  QUOTATION_SENT,
} from '@appUtil/common.protocols';
import {buildStringFamily} from '@appUtil/strings';
import {IContact, IContactWithId} from '@appModels/catalogos/contacto/contacto';
import {
  IFlete,
  IFreightExpress,
} from '@appModels/store/quotation/quotation-details/details/sections/check-out-quotation.models';
import ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoParams = ConfiguracionClientesContratoService.ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoParams;
import {COLOR_STATUS} from '@appModels/shared-components/pqf-card';

enum QuotationStatus {
  Todas = 'Todas',
  Nuevas = 'Nuevas',
  Guardadas = 'Guardadas',
  Enviadas = 'Enviadas',
}

enum QuotationStatusApiResponse {
  Total = 'Total',
  EstadoCotizacionNueva = 'EstadoCotizacionNueva',
  EstadoCotizacionGuardada = 'EstadoCotizacionGuardada',
  EstadoCotizacionEnviada = 'EstadoCotizacionEnviada',
}

enum CatQuotationState {
  Nueva = 'Nueva',
  Guardada = 'Guardada',
  Enviada = 'Enviada',
}

export enum TypeDelivery {
  unique = 'Unica',
}

enum ProductsTypes {
  labware = 'Labware',
  medicalDevice = 'Dispositivo Medico',
  publications = 'Publicaciones',
  training = 'Capacitacion',
  trainings = 'Capacitaciones',
}

enum BroadcastMediumKey {
  FaceToFace = 'presencial',
  FaceToFaceOnline = 'presencialenlinea',
  Online = 'enlinea',
}

enum ProductsSubtypes {
  biological = 'Biológico',
  chemical = 'Químico',
  na = 'N/A',
}

enum QuotationItemTypes {
  Original = 'Original',
  Promotion = 'Promoción',
  Saving = 'Ahorro',
  Alternative = 'Alternativa',
  Complementary = 'Complementaria',
  Scheduled = 'Programada',
}

const quotationItemTypesClasses = {
  [QuotationItemTypes.Original]: 'original',
  [QuotationItemTypes.Promotion]: 'promotion',
  [QuotationItemTypes.Saving]: 'saving',
  [QuotationItemTypes.Alternative]: 'alternative',
  [QuotationItemTypes.Complementary]: 'complementary',
};
const quotationItemTypes = {
  [QuotationItemTypes.Original]: 'original',
  [QuotationItemTypes.Promotion]: 'promocion',
  [QuotationItemTypes.Saving]: 'ahorro',
  [QuotationItemTypes.Alternative]: 'alternativa',
  [QuotationItemTypes.Complementary]: 'complementaria',
};

const mapQuotationStatusFromApi = {
  [QuotationStatus.Todas]: QuotationStatusApiResponse.Total,
  [QuotationStatus.Nuevas]: QuotationStatusApiResponse.EstadoCotizacionNueva,
  [QuotationStatus.Guardadas]: QuotationStatusApiResponse.EstadoCotizacionGuardada,
  [QuotationStatus.Enviadas]: QuotationStatusApiResponse.EstadoCotizacionEnviada,
};

const mapQuotationStatusCatQuotationState = {
  [QuotationStatus.Nuevas]: CatQuotationState.Nueva,
  [QuotationStatus.Guardadas]: CatQuotationState.Guardada,
  [QuotationStatus.Enviadas]: CatQuotationState.Enviada,
};

enum QuotationTypes {
  TodosLosTipos = 'Todos los Tipos',
  Parcial = 'Parcial',
  Total = 'Total',
}

const initialQuotationListTabOptions = (): Array<ITabOption> => [
  {
    id: '1',
    label: QuotationStatus.Todas,
    activeSubtitle: true,
    labelSubtitle: 'Requisiciones',
    totalSubtitle: 0,
  },
  {
    id: '2',
    label: QuotationStatus.Nuevas,
    activeSubtitle: true,
    labelSubtitle: 'Requisiciones',
    totalSubtitle: 0,
  },
  {
    id: '3',
    label: QuotationStatus.Guardadas,
    activeSubtitle: true,
    labelSubtitle: 'Requisiciones',
    totalSubtitle: 0,
  },
  {
    id: '4',
    label: QuotationStatus.Enviadas,
    activeSubtitle: true,
    labelSubtitle: 'Requisiciones',
    totalSubtitle: 0,
  },
];

const initialTypeFilterOptions = (): Array<DropListOption> => [
  {value: '0', label: QuotationTypes.TodosLosTipos},
  {value: '1', label: QuotationTypes.Parcial},
  {value: '2', label: QuotationTypes.Total},
];
const initialClientQuotations = (): QuotationDashboardState => ({
  tabOptions: initialQuotationListTabOptions(),
  selectedTabOption: initialQuotationListTabOptions()[0],
  typeFilterOptions: initialTypeFilterOptions(),
  selectedTypeFilterOption: initialTypeFilterOptions()[0],
  selectedDateFilterOption: null,
  searchTerm: null,
  searchTypeOptions: [
    {label: 'Cliente', value: 'Nombre'},
    {label: 'Clasificacion', value: 'NivelIngreso'},
  ],
  selectedSearchTypeOption: {label: 'Cliente', value: 'Nombre'},
  totalClients: 0,
  totalQuotes: 0,
  clientsList: [],
  clientsListRequestStatus: ApiRequestStatus.Default,
  totalTypePartial: 0,
  totalTypeTotal: 0,
  mailDetailStatus: ApiRequestStatus.Default,
});

const buildClientsFromDashboard = (
  clientsList: Array<Resumen>,
): Array<ClientsListItemForQuotation> => {
  clientsList = addRowIndex(0, 0, clientsList);
  return map(clientsList, (o: ClientsListItemForQuotation) => {
    const newObject = {...o, IdCliente: o.DescripcionLlave};
    forEach(o.Atributos, (i: AttributeDashboard) => {
      newObject[i.DescriptionField] = i.ValueField;
    });
    return newObject;
  });
};

const buildQuotationsListFromResponse = (
  quotationsList: Array<VCotCotizacion>,
  quotationId?: string,
): Array<IQuotation> => {
  quotationsList = addRowIndex(0, 0, quotationsList);
  return map(
    quotationsList,
    (o: VCotCotizacion, index: number): IQuotation => {
      if (quotationId === o.IdCotCotizacion) {
        return {
          ...o,
          needsToReloadInfo: true,
          isSelected: true,
        };
      }
      return {
        ...o,
        /* DOCS: Se obliga a que sea Flete desglosado true, mientras se implementa la funcionalidad completa */
        FleteDesglosado: o.EstadoCotizacion === CatQuotationState.Nueva ? true : o.FleteDesglosado,
        isSelected: quotationId ? false : index === 0,
        needsToReloadInfo: true,
        freights: {
          listFreightsExpress: {
            needToReload: true,
            list: [],
            listBackUp: [],
          },
          lastMileFreights: {
            needToReload: true,
            list: [],
            listBackUp: [],
          },
        },
        needsToReloadItemsInvestigationQuotation: true,
        freightSelected: null,
        freightExpressSelected: null,
        freightSteps: [
          {id: 1, label: 'Flete Express', activeSubtitle: false},
          {id: 2, label: 'Flete Úlitma Milla', activeSubtitle: false},
        ],
        selectedQuotationDetails: [] as IGMCotCotizacionDetalle,
      };
    },
  );
};

// DOCS: Devuelve el color del estado en el que se encuentra la cotización

const buildColorStateQuotation = (
  {CotizacionDeInvestigacion, EnviadaConInvestigacion, InvestigacionesFinalizadas}: IQuotation,
  EstadoCotizacion: string,
): string => {
  if (EstadoCotizacion === QUOTATION_NEW && !CotizacionDeInvestigacion) {
    return COLOR_STATUS.NEW;
  } else if (
    EstadoCotizacion === QUOTATION_SAVED &&
    !CotizacionDeInvestigacion &&
    !EnviadaConInvestigacion
  ) {
    return COLOR_STATUS.SAVED;
  } else if (
    EstadoCotizacion === QUOTATION_SENT ||
    (EstadoCotizacion === QUOTATION_SENT && (CotizacionDeInvestigacion || EnviadaConInvestigacion))
  ) {
    return COLOR_STATUS.SENT;
  } else if (
    (EnviadaConInvestigacion && InvestigacionesFinalizadas) ||
    (CotizacionDeInvestigacion &&
      InvestigacionesFinalizadas &&
      (EstadoCotizacion === QUOTATION_NEW || EstadoCotizacion === QUOTATION_SAVED))
  ) {
    return COLOR_STATUS.INVESTIGATION_FINISH;
  } else {
    return COLOR_STATUS.INVESTIGATION;
  }
};

const buildTextStateQuotation = (
  {CotizacionDeInvestigacion, InvestigacionesFinalizadas, EnviadaConInvestigacion}: IQuotation,
  EstadoCotizacion: string,
): string => {
  if (
    (!CotizacionDeInvestigacion && !EnviadaConInvestigacion) ||
    EstadoCotizacion === QUOTATION_SENT
  ) {
    return EstadoCotizacion;
  } else if (!InvestigacionesFinalizadas) {
    return 'Con producto en investigación';
  } else {
    return 'Investigación finalizada';
  }
};

// DOCS Construye los datos generales del cliente del panel izquierdo
const buildGeneralData = (
  generalInfoResponses: Array<any>,
  selectedQuotation: IQuotation,
): QuotationClientInfo => ({
  client: generalInfoResponses[0],
  contact: generalInfoResponses[1],
  billingData: generalInfoResponses[2],
  paymentConditions: generalInfoResponses[3],
  user: generalInfoResponses[4],
  address: generalInfoResponses[5].Results,
  addressSelected:
    find(
      generalInfoResponses[5].Results,
      (o: VDireccion) => o.IdDireccion === selectedQuotation.IdDireccion,
    ) ?? null,
});

const patchTypeOfSearch = (type: string): string => {
  return typesSearch[deburr(type)] || typesSearch.Default;
};

enum typesSearch {
  NombreMarca = 'NombreMarca',
  Descripcion = 'Descripcion',
  Marca = 'NombreMarca',
  'Catalogo' = 'Catalogo',
  CAS = 'CAS',
  Default = 'Descripcion',
}

const bodyPrice = (
  idClient: string,
  product: ProductSearchResult,
  idCurrency?: string,
): ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoParams => {
  const body: ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoParams = {} as ContratoClienteExtensionsObtenerPrecioProquifaDotNetClienteContratoParams;
  body.idCliente = idClient;
  body.idProducto = product.IdProducto;
  body.piezas = product.PiezasACotizar;
  if (idCurrency) {
    body.idCatMoneda = idCurrency;
  }
  return body;
};

// DOCS Consutrye el objeto CotPartidaCotizacion
const buildCotQuotation = (
  product: ProductSearchResult,
  productOffer: CotProductoOferta,
  selectedQuotation: IQuotation,
  deliveryRoute: string,
  typeQuotation: CatTipoPartidaCotizacion,
  dates?: Array<CotPartidaCotizacionCapacitacionFecha>,
): IGMCotPartidasDetalle => ({
  product: {
    ...product,
    imageHover: `assets/Images/logos/${product.NombreImagenMarca?.toLowerCase()}_hover.svg`,
    fullFamilyName: buildStringFamily(product.Tipo, product.Subtipo, product.Control, ' · '),
  },
  IdCatRutaEntrega: deliveryRoute,
  CotPartidaCotizacion: {
    ...initialCotQuotationItem(selectedQuotation, typeQuotation),
    TiempoEstimadoEntrega: product.TiempoEstimadoEntrega,
    TiempoEstimadoEntregaOriginal: product.TiempoEstimadoEntrega,
  },
  CotProductoOferta: productOffer,
  fechasRealizacionCapacitacion: dates,
});

// DOCS inicializador por default para el objeto CotPartidaCotizacion cuando se agrega una nueva
//  cotización desde el listado de productos
const initialCotQuotationItem = (
  selectedQuotation: IQuotation,
  typeQuotation: CatTipoPartidaCotizacion,
): CotPartidaCotizacion => ({
  IdCotPartidaCotizacion: DEFAULT_UUID,
  IdCotCotizacion: selectedQuotation.IdCotCotizacion,
  IdCatTipoPartidaCotizacion: typeQuotation.IdCatTipoPartidaCotizacion,
  IdCotProductoOferta: DEFAULT_UUID,
  Nota: '',
  PrecioTotalCotizado: 0,
  IdCotPartidaCotizacionMadre: null,
  IdValorConfiguracionTiempoEntrega: DEFAULT_UUID,
  Activo: true,
  PrecioTotalUSD: 0,
  PrecioTotalMXN: 0,
  Seguimiento: null,
  AjusteDeOferta: null,
  PromesaDeCompra: null,
  Cancelacion: null,
  EnCerrarOferta: null,
  JustificacionAjuste: null,
  IdAjOfFleteExpressCotizacion: null,
  AjusteRealizado: null,
  VerEnAjusteOferta: null,
  Numero: null,
  ConfiguracionSeguimientoPendiente: null,
  IdCotPartidaCotizacionOriginal: null,
  TiempoEstimadoEntrega: 0,
  TiempoEstimadoEntregaOriginal: 0,
});
// TODO Revisar despues para futura implementacion de fletes prorrateados

const buildCotQuotationDetails = (
  data: GMCotCotizacionDetalle,
  addressClient: VDireccion,
  selectedQuotationStatus: string, // TODO Revisar despues para futura implementacion de fletes prorrateados
  offers?: Array<CotProductoOferta>,
): IGMCotCotizacionDetalle => {
  return {
    ...data,
    CotCotizacion: {
      ...data.CotCotizacion,
      IdCatZona:
        data.CotCotizacion?.IdCatZona && data.CotCotizacion?.IdCatZona !== DEFAULT_UUID
          ? data.CotCotizacion?.IdCatZona
          : addressClient?.IdCatZona,
      EntregaUnica: addressClient?.AceptaParciales
        ? data.CotCotizacion.EntregaUnica === null
          ? false
          : data.CotCotizacion.EntregaUnica
        : data.CotCotizacion.EntregaUnica,
      /* DOCS: Se obliga a que sea Flete desglosado true, mientras se implementa la funcionalidad completa */
      FleteDesglosado:
        selectedQuotationStatus === CatQuotationState.Nueva
          ? true
          : data.CotCotizacion.FleteDesglosado,
    },
    CotPartidasCotizacion: map(
      data?.CotPartidasCotizacion,
      (o: GMCotPartidasDetalle, index): IGMCotPartidasDetalle => ({
        ...o,
        IdCatRutaEntrega:
          o.IdCatRutaEntrega && o.IdCatRutaEntrega !== DEFAULT_UUID
            ? o.IdCatRutaEntrega
            : addressClient?.IdCatRutaEntrega,
        VPartidaCotizacion: {
          ...o.VPartidaCotizacion,
          imageHover: `assets/Images/logos/${o?.VPartidaCotizacion?.NombreImagenMarca?.toLowerCase()}_hover.svg`,
          fullFamilyName: buildStringFamily(
            o.VPartidaCotizacion.Tipo,
            o.VPartidaCotizacion.Subtipo,
            o.VPartidaCotizacion.Control,
            ' · ',
          ),
        },
        CotProductoOferta: offers?.length
          ? {
              ...o.CotProductoOferta,
              IdCotProductoOferta:
                o.CotProductoOferta?.IdCotProductoOferta !== DEFAULT_UUID
                  ? o.CotProductoOferta?.IdCotProductoOferta
                  : DEFAULT_UUID,
              ...(omit(offers[index], ['IdCotProductoOferta']) ?? []),
            }
          : o.CotProductoOferta,
        freightItem: null,
        selected: false,
      }),
    ),
    CotPartidasInvetigacionCotizacion: map(
      data?.CotPartidasInvetigacionCotizacion,
      (
        o: CotPartidasInvetigacionCotizacion,
        indexItemInvestigation,
      ): ICotPartidasInvetigacionCotizacion => ({
        ...o,
        ProductoInvestigacionObj: {
          ...o.ProductoInvestigacionObj,
          // TODO: Hace falta el nombre de la imagen (validar si es de la marca o de la presentación)
          imageHover: `assets/Images/logos/${o.ProductoInvestigacionObj.Marca?.toLowerCase()}_hover.svg`,
          fullFamilyName: buildStringFamily(
            o.ProductoInvestigacionObj.Tipo,
            o.ProductoInvestigacionObj.SubTipo,
            o.ProductoInvestigacionObj.Control,
            ' · ',
          ),
          Index: indexItemInvestigation + 1,
        },
      }),
    ),
    selectedProduct: null,
  };
};

const buildCotQuotationSaving = (
  productOffer: CotProductoOferta,
  selectedQuotation: IQuotation,
  deliveryRoute: string,
  typeQuotation: CatTipoPartidaCotizacion,
  item: QuotationItemCombined,
): IGMCotPartidasDetalle => ({
  product: item?.product ?? null,
  IdCatRutaEntrega: deliveryRoute,
  CotPartidaCotizacion: {
    ...initialCotQuotationItem(selectedQuotation, typeQuotation),
    TiempoEstimadoEntrega: item?.CotPartidaCotizacion?.TiempoEstimadoEntrega,
    TiempoEstimadoEntregaOriginal: item?.CotPartidaCotizacion?.TiempoEstimadoEntregaOriginal,
  },
  CotProductoOferta: productOffer,
  VPartidaCotizacion: item?.VPartidaCotizacion
    ? {
        ...item?.VPartidaCotizacion,
        TipoPartidaCotizacion: QuotationItemTypes.Saving,
        ClaveTipoPartidaCotizacion: QuotationItemTypes.Saving?.toLowerCase(),
      }
    : null,
  selected: false,
});

const buildDropOfflineProductBrandFamily = (
  results: Array<VMarcaFamilia>,
): Array<DropListOption> => {
  return map(
    results,
    (o: VMarcaFamilia) =>
      ({
        label: `${o.Tipo ? `${o.Tipo}` : ''}${o.Subtipo !== 'N/A' ? ` · ${o.Subtipo}` : ''}${
          o.Control !== 'N/A' ? ` · ${o.Control}` : ''
        }`,
        value: o.IdMarcaFamilia,
      } as DropListOption),
  );
};
const buildQueryOffers = (
  cotItemQuotation: Array<GMCotPartidasDetalle>,
  selectedQuotation: IQuotation,
): GMCotProductoOferta => ({
  IdCatMoneda: selectedQuotation?.IdCatMoneda,
  IdCliente: selectedQuotation?.IdCliente,
  Productos: map(
    cotItemQuotation,
    (o: GMCotPartidasDetalle): GMProductoOfertaPieza => ({
      IdProducto: o?.CotProductoOferta?.IdProducto,
      NumeroDePiezas: o?.CotProductoOferta?.NumeroDePiezas,
    }),
  ),
});

const buildQueryOffersInvestigationAttended = (
  cotItemInvestigation: Array<ICotPartidasInvetigacionCotizacion>,
  selectedQuotation: IQuotation,
  cotItemsInvestigationData: CotPartidaInvetigacionAtencionComentariosObj[],
): GMProductoOfertaPieza[] =>
  map(
    cotItemInvestigation,
    (o: ICotPartidasInvetigacionCotizacion, index): GMProductoOfertaPieza => ({
      IdProducto: cotItemsInvestigationData[index]?.Producto?.IdProducto,
      NumeroDePiezas: o?.ProductoInvestigacionObj?.piezas,
    }),
  );
const buildQueryOffersInvestigationFinished = (
  cotItemInvestigation: Array<ICotPartidasInvetigacionCotizacion>,
  selectedQuotation: IQuotation,
  cotItemsInvestigationData: VProducto[],
): GMProductoOfertaPieza[] =>
  map(
    cotItemInvestigation,
    (o: ICotPartidasInvetigacionCotizacion, index): GMProductoOfertaPieza => ({
      IdProducto: cotItemsInvestigationData[index]?.IdProducto,
      NumeroDePiezas: o?.ProductoInvestigacionObj?.piezas,
    }),
  );
const builSendQuotationBody = (
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
const buildCotPartidaInvetigacionAtencionComentariosObj = (
  response: CotPartidaInvetigacionAtencionComentariosObj,
): ICotPartidaInvetigacionAtencionComentariosObj => {
  return {
    ...response,
    Producto: {
      ...response.Producto,
      imageHover: `assets/Images/logos/${response.Producto.NombreImagenMarca?.toLowerCase()}_hover.svg`,
      fullFamilyName: buildStringFamily(
        response.Producto.Tipo,
        response.Producto.Subtipo,
        response.Producto.Control,
        ' · ',
      ),
    },
  };
};

enum PurchaseRestrictions {
  limitOfPieces = 'Límite de Piezas',
  none = 'Ninguna',
}

const patchContacts = (
  contacts: Array<ContactoDetalleObj>,
  typePhones: Array<CatTipoNumeroTelefonico>,
): Array<IContact> => {
  const getEmail = (emails: Array<CorreoElectronico>): CorreoElectronico => {
    if (emails.length > 0) {
      return emails[0];
    }
    return {} as CorreoElectronico;
  };
  const getPhone = (phones: Array<VNumeroTelefonico>, idTypePhone: string): VNumeroTelefonico => {
    const index = findIndex(phones, (o) => o.IdCatTipoNumeroTelefonico === idTypePhone);
    if (index !== -1) {
      return phones[index];
    }
    return {} as VNumeroTelefonico;
  };
  return map(
    contacts,
    (contact: IContactWithId): IContact => {
      return {
        ...contact,
        Email: getEmail(contact.CorreoElectronico),
        Phone1: getPhone(
          contact.NumeroTelefonico,
          find(typePhones, (o: CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === PHONE_1)
            ?.IdCatTipoNumeroTelefonico,
        ),
        Phone2: getPhone(
          contact.NumeroTelefonico,
          find(typePhones, (o: CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === PHONE_2)
            ?.IdCatTipoNumeroTelefonico,
        ),
        Mobile: getPhone(
          contact.NumeroTelefonico,
          find(typePhones, (o: CatTipoNumeroTelefonico) => o.TipoNumeroTelefonico === MOBILE)
            ?.IdCatTipoNumeroTelefonico,
        ),
      };
    },
  );
};

const patchContactsMail = (list: Array<IContact>): Array<IDropListMulti> => {
  const array: IDropListMulti[] = [];
  map(list, (o) => {
    if (o.Email?.Correo) {
      array.push({
        value: o.IdContactoCliente,
        labels: [
          {label: `${o.Nombres} ${o.ApellidoPaterno} ${o.ApellidoMaterno}`},
          {
            label: `${o.Puesto}` + ' · ' + `${o.Departamento} `,
          },
          {label: `${o.Email.Correo}`, color: '#008693'},
        ],
        isSelected: false,
      });
    }
  });
  return array;
};

// DOCS Construye los fletes ultima milla de la cotizacion
const buildArrayLastMileFreights = (
  itemsQuotations: Array<IGMCotPartidasDetalle>,
  freightsLastMille: Array<CotCotizacionFleteUltimaMilla>,
  selectedFreight: IFlete,
  quotationId: string,
  acceptPartial: boolean,
  singleDelivery: boolean,
  paySendGuide: boolean,
  internalMessaging: boolean,
): Array<CotCotizacionFleteUltimaMilla> => {
  // DOCS Se mapean los n fletes de acuerdo a la cantidad de FEE diferentes
  const freightsLastMilleQuotation = selectedFreight
    ? map(
        // DOCS Hace la diferencia entre las FEE
        uniqBy(
          // DOCS Filtra las partidas que solo sean originales
          filter(
            itemsQuotations,
            (o: IGMCotPartidasDetalle) =>
              o.VPartidaCotizacion?.TipoPartidaCotizacion !== ITEM_QUOTATION_TYPE_SAVING,
          ),
          'CotPartidaCotizacion.TiempoEstimadoEntrega',
        ),
        (o: IGMCotPartidasDetalle): CotCotizacionFleteUltimaMilla => {
          const hasFreightSaved: CotCotizacionFleteUltimaMilla = find(
            freightsLastMille,
            (it: CotCotizacionFleteUltimaMilla) =>
              it.TiempoEstimadoEntrega === o?.CotPartidaCotizacion?.TiempoEstimadoEntrega,
          );
          const IVA =
            selectedFreight?.PrecioConvertidoMonedaCotizacion *
            getIvaWithGravaIVA(selectedFreight.GravaIVA);

          return {
            Activo: true,
            Descripcion: selectedFreight?.Descripcion,
            FechaRegistro: DEFAULT_DATE,
            FechaUltimaActualizacion: DEFAULT_DATE,
            IdCatFletera: selectedFreight?.IdCatFletera,
            IdCatMoneda: selectedFreight?.IdCatMoneda,
            IdCatUnidadFlete: selectedFreight?.IdCatUnidadFlete,
            IdCotCotizacion: quotationId,
            IdCotCotizacionFleteUltimaMilla: hasFreightSaved
              ? hasFreightSaved?.IdCotCotizacionFleteUltimaMilla
              : DEFAULT_UUID,
            IdFlete: selectedFreight?.IdFlete,
            PrecioLista: selectedFreight?.PrecioLista,
            PrecioVenta: selectedFreight?.PrecioVenta,
            PrecioVentaConvertido: selectedFreight?.PrecioConvertidoMonedaCotizacion,
            TiempoEstimadoEntrega: o?.CotPartidaCotizacion?.TiempoEstimadoEntrega,
            IdCatRutaEntrega: selectedFreight.IdCatRutaEntrega,
            PrecioIVA: IVA,
            PrecioTotal: selectedFreight?.PrecioConvertidoMonedaCotizacion + IVA,
            GravaIVA: selectedFreight.GravaIVA,
          };
        },
      ) ?? []
    : [];
  return selectedFreight && itemsQuotations?.length && !paySendGuide && !internalMessaging // DOCS Evalua que el flete este seleccionado y  que haya cotizaciones
    ? acceptPartial // DOCS Si acepta parciales puede se agregan n fletes ultima milla dependiendo de las diferentes tee que se tengan
      ? singleDelivery || freightsLastMilleQuotation.length === 1
        ? [orderBy(freightsLastMilleQuotation, 'TiempoEstimadoEntrega', 'desc')[0]] // DOCS Si acepta parciales pero tiene la misma fee solo se manda un flete
        : freightsLastMilleQuotation
      : [orderBy(freightsLastMilleQuotation, 'TiempoEstimadoEntrega', 'desc')[0]] // DOCS Si no acepta parciales pero tiene multiples tee, se coloca el flete con tee más lejano
    : [];
};
// DOCS Construye los fletes ultima milla de la cotizacion
const buildArrayExpressFreights = (
  expressFreights: Array<CotCotizacionFleteExpress>,
  quotationId: string,
  selectedExpressFreight?: IFreightExpress,
) => {
  // DOCS Arma el objeto para los fletes express

  const IVA =
    selectedExpressFreight?.PrecioConvertidoMonedaCotizacion *
    getIvaWithGravaIVA(selectedExpressFreight?.GravaIVAFleteExpress);

  const buildObjFreight: CotCotizacionFleteExpress = selectedExpressFreight
    ? {
        Activo: true,
        FechaRegistro: DEFAULT_DATE,
        FechaUltimaActualizacion: DEFAULT_DATE,
        IdCotCotizacion: quotationId,
        IdCotCotizacionFleteExpress: DEFAULT_UUID,
        IdProveedor: selectedExpressFreight?.IdProveedor,
        PorcentajeProquifa: null,
        Precio: selectedExpressFreight?.PrecioConvertidoMonedaCotizacion,
        PrecioAjustado: null,
        PrecioDeOrigen: 0,
        GravaIVA: selectedExpressFreight?.GravaIVAFleteExpress,
        PrecioIVA: IVA,
        PrecioTotal: selectedExpressFreight?.PrecioConvertidoMonedaCotizacion + IVA,
      }
    : null;
  return expressFreights[0]?.IdProveedor !== selectedExpressFreight?.IdProveedor
    ? !isEmpty(buildObjFreight)
      ? [
          {
            ...omit(buildObjFreight, 'IdCotCotizacionFleteExpress'),
            ...buildObjFreight,
          },
        ] // DOCS Se selecciono un nuevo flete express
      : [] // DOCS No cuenta con algun flete express
    : expressFreights[0]
    ? [
        {
          ...expressFreights[0],
          Precio: selectedExpressFreight?.PrecioConvertidoMonedaCotizacion,
          PrecioIVA: IVA,
          PrecioTotal: selectedExpressFreight?.PrecioConvertidoMonedaCotizacion + IVA,
          GravaIVA: selectedExpressFreight?.GravaIVAFleteExpress,
        } as CotCotizacionFleteExpress,
      ] // DOCS Se quedo el flete express previo
    : [];
};

// DOCS Costruye el arreglo de partidas ya considerando el recalculo del TEE cuando existe un flete express
const buildCotPartidaCotizacion = (
  itemsQuotations: Array<IGMCotPartidasDetalle>,
  selectedExpressFreight: IFreightExpress,
  acceptPartial: boolean,
  uniqueDelivery: boolean,
): Array<IGMCotPartidasDetalle> => {
  const uniqueTEE = uniqBy(
    filter(
      itemsQuotations,
      (o: IGMCotPartidasDetalle) =>
        o.VPartidaCotizacion?.TipoPartidaCotizacion !== ITEM_QUOTATION_TYPE_SAVING,
    ),
    'CotPartidaCotizacion.TiempoEstimadoEntregaOriginal',
  );
  return map(
    itemsQuotations,
    (o: IGMCotPartidasDetalle): IGMCotPartidasDetalle => {
      const timeDelivery =
        selectedExpressFreight &&
        selectedExpressFreight?.IdProveedor === o.CotProductoOferta.IdProveedor
          ? selectedExpressFreight?.ValorEsperado
          : acceptPartial
          ? uniqueDelivery
            ? orderBy(uniqueTEE, 'CotPartidaCotizacion.TiempoEstimadoEntregaOriginal', 'desc')[0]
                ?.CotPartidaCotizacion?.TiempoEstimadoEntregaOriginal
            : o?.CotPartidaCotizacion?.TiempoEstimadoEntregaOriginal
          : orderBy(uniqueTEE, 'CotPartidaCotizacion.TiempoEstimadoEntregaOriginal', 'desc')[0]
              ?.CotPartidaCotizacion?.TiempoEstimadoEntregaOriginal;
      // DOCS Valida si el Objeto VPartidaCotizacion existe para hacer el cambio sobre ese objeto
      if (o?.VPartidaCotizacion) {
        return {
          ...o,
          CotPartidaCotizacion: {
            ...o?.CotPartidaCotizacion,
            TiempoEstimadoEntrega: timeDelivery,
          },
          VPartidaCotizacion: {
            ...o?.VPartidaCotizacion,
            TiempoEstimadoEntrega: timeDelivery,
          },
        };
      }
      // DOCS Hace el cambio en el product que es de una partida que no esta guardada
      return {
        ...o,
        CotPartidaCotizacion: {
          ...o?.CotPartidaCotizacion,
          TiempoEstimadoEntrega: timeDelivery,
        },
        product: {
          ...o?.product,
          TiempoEstimadoEntrega: timeDelivery,
        },
      };
    },
  );
};
export {
  CatQuotationState,
  buildGeneralData,
  ProductsSubtypes,
  ProductsTypes,
  PurchaseRestrictions,
  QuotationItemTypes,
  QuotationStatus,
  QuotationStatusApiResponse,
  QuotationTypes,
  BroadcastMediumKey,
  bodyPrice,
  builSendQuotationBody,
  buildClientsFromDashboard,
  buildCotPartidaInvetigacionAtencionComentariosObj,
  buildCotQuotation,
  buildCotQuotationDetails,
  buildCotQuotationSaving,
  buildDropOfflineProductBrandFamily,
  buildQueryOffers,
  buildQuotationsListFromResponse,
  initialClientQuotations,
  initialCotQuotationItem,
  initialQuotationListTabOptions,
  mapQuotationStatusCatQuotationState,
  mapQuotationStatusFromApi,
  patchContacts,
  patchContactsMail,
  patchTypeOfSearch,
  quotationItemTypesClasses,
  buildArrayLastMileFreights,
  buildArrayExpressFreights,
  buildCotPartidaCotizacion,
  quotationItemTypes,
  buildColorStateQuotation,
  buildTextStateQuotation,
  buildQueryOffersInvestigationAttended,
  buildQueryOffersInvestigationFinished,
};
