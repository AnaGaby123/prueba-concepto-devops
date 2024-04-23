import {minioSettings} from '@env/environment';
import {currentLocaleDateUTCFormat} from '@appUtil/dates';

// Store
export const AUTH_FEATURE_KEY = 'auth';
export const PRE_PROCESSING_FEATURE_KEY = 'preProcessing';
export const CATALOGS_FEATURE_KEY = 'catalogs';
export const FORMS_FEATURE_KEY = 'forms';
export const MAILBOX_FEATURE_KEY = 'mailbox';
export const QUOTATION_FEATURE_KEY = 'quotation';
export const ROUTER_FEATURE_KEY = 'router';
export const SETTINGS_FEATURE_KEY = 'settings';
export const UTILS_FEATURE_KEY = 'utils';
export const PENDINGS_FEATURE_KEY = 'pendings';
export const DIALOGS_FEATURE_KEY = 'dialogs';
export const GENERAL_SUMMARY_KEY = 'generalSummary';
// Storage
export const APP_PREFIX = 'P_NET_';
export const AUTH_KEY = 'AUTH';
export const SETTINGS_KEY = 'SETTINGS';

// Default data
export const DEFAULT_UUID = '00000000-0000-0000-0000-000000000000';
export const DEFAULT_DATE = currentLocaleDateUTCFormat();

// Session (Time in seconds)
// Session (Time in seconds)
export const SESSION_IDLE = 900; // 15 minutos - Tiempo de inactividad
export const SESSION_TIMEOUT = 30; // 30 segundos - Tiempo extra para finalizar la sesión (Activar alerta, si la hay)
export const SESSION_PING = 120; // 2 minutos - Tiempo para monitorear la sesión

// Service Response
export const SERVICE_RESPONSE_DATA_INFO_SUCCESS = 'success';
export const SERVICE_RESPONSE_DATA_INFO_OK = 'OK';
export const SERVICE_RESPONSE_DATA_INFO_ERROR = 'error';
export const SERVICE_RESPONSE_OK = 200;
export const SERVICE_RESPONSE_BAD_REQUEST = 400;
export const SERVICE_RESPONSE_UNAUTHORIZED = 401;
export const SERVICE_RESPONSE_INTERNAL_SERVER_ERROR = 500;

// Phones
export const PHONE_1 = 'Telefono 1';
export const PHONE_2 = 'Telefono 2';
export const MOBILE = 'Móvil';

// Número limite de items por página
export const PAGING_LIMIT = 24;

// API Status
export const API_REQUEST_STATUS_DEFAULT = -1;
export const API_REQUEST_STATUS_LOADING = 1;
export const API_REQUEST_STATUS_FAILED = 2;
export const API_REQUEST_STATUS_SUCCEEDED = 3;

// Settings MinIO
export const MINIO_HOST = minioSettings.host;
export const MINIO_PORT = minioSettings.port;
export const MINIO_USE_SSL = minioSettings.useSSL;
export const MINIO_ACCESS_KEY = minioSettings.accessKey;
export const MINIO_SECRET_KEY = minioSettings.secretKey;

// Tiempo para realizar petición bucle, hasta que cambie la condición en especifico
export const TIMER_SCHEDULE = 10000; // TODO: Tiempo en milisegundos

// Estatus de cotizaciones
export const QUOTATION_NEW = 'Nueva';
export const QUOTATION_SAVED = 'Guardada';
export const QUOTATION_SENT = 'Enviada';

// Tipos Cotización
export const QUOTATION_TYPE_TOTAL = 'Total';
export const QUOTATION_TYPE_PARTIAL = 'Parcial';

// Tipos Partida Cotización
export const ITEM_QUOTATION_TYPE_ORIGINAL = 'Original';
export const ITEM_QUOTATION_TYPE_PROMOTION = 'Promoción';
export const ITEM_QUOTATION_TYPE_SAVING = 'Ahorro';
export const ITEM_QUOTATION_TYPE_ALTERNATIVES = 'Alternativa';
export const ITEM_QUOTATION_TYPE_COMPLEMENTARY = 'Complementaria';
export const ITEM_QUOTATION_TYPE_SCHEDULED = 'Programada';

// Status Partida Cotización
export const STATUS_FOLLOW_UP = 'Seguimiento';
export const STATUS_CANCELED = 'Canceladas';
export const STATUS_PURCHASE_PROMISE = 'PromesaDeCompra';
export const STATUS_AJ_OFFER = 'AjustarOferta';

// Toggle switch States
export const SWITCH_LEFT = 'left';
export const SWITCH_RIGHT = 'right';
export const SWITCH_DEFAULT = 'default';

// Limite para menu responsivo
export const RESPONSIVE_MENU_WIDTH_LIMIT = 1920;
export const RESPONSIVE_MENU_WIDTH_LIMIT_2100 = 2100;
export const RESPONSIVE_MENU_WIDTH_LIMIT_2200 = 2200;

// Funciones de Usuario
export const FUNCTION_BUYER = 'Comprador';
export const FUNCTION_SELLER = 'Vendedor';

export const USER_FUNCTIONS = [FUNCTION_BUYER, FUNCTION_SELLER];

// Roles de Usuario
export const ROL_EVI = 'EVI';
export const ROL_EVE = 'EVE';
export const ROL_ESAC = 'ESAC';
export const ROL_COMPRADOR = 'Comprador';
export const ROL_COBRADOR = 'Cobrador';
export const ROL_SUPER_USER = 'Superusuario';
export const ROL_VISITANTE = 'Visitante';

// IVA para los fletes Desglosados

export const IVA_FREIGHT_ITEM = 0.16;

export const getIvaWithGravaIVA = (gravaIVA) => (gravaIVA ? IVA_FREIGHT_ITEM : 0);

export const roundUpIVA = (IVA) => {
  const decimals = IVA % 1;
  return decimals >= 0.5 ? Math.ceil(IVA) : Math.floor(IVA);
};
export const TOTAL_WITH_IVA_FREIGHT_ITEM = 1.16;
export const USER_ROLES = [
  ROL_EVI,
  ROL_EVE,
  ROL_ESAC,
  ROL_COMPRADOR,
  ROL_COBRADOR,
  ROL_SUPER_USER,
  ROL_VISITANTE,
];

export enum ENUM_USER_FUNCTIONS {
  functionEvi = 'EVI',
  functionEve = 'EVE',
  functionEsac = 'ESAC',
  functionComprador = 'Comprador',
  functionAnalistaDeCuentasPorCobrar = 'AnalistaDeCuentasPorCobrar',
  functionCoordinadorDeServicioAlCliente = 'CoordinadorDeServicioAlCliente',
  functionSuper = 'Superusuario',
  functionVisitante = 'Visitante',
  functionCoordinadorDeVentaInterna = 'CoordinadorDeVentaInterna',
}

export enum ENUM_PRODUCT_FAMILY {
  standarBiologicNormal = 'Estándares · Biológico · Normal',
  standarBiologicNational = 'Estándares · Biológico · Nacionales',
  standarBiologicMundial = 'Estándares · Biológico · Mundiales',
  standarBiologicOrigin = 'Estándares · Biológico · Origen',
  standarChemistNormal = 'Estándares · Químico · Normal',
  standarChemistNotional = 'Estándares · Químico · Nacionales',
  standarChemistMundial = 'Estándares · Químico · Mundiales',
  standarChemistOrigin = 'Estándares · Químico · Origen',
  reagentBiologicNormal = 'Reactivos · Biológico · Normal',
  reagentBiologicNational = 'Reactivos · Biológico · Nacionales',
  reagentBiologicMundial = 'Reactivos · Biológico · Mundiales',
  reagentBiologicOrigin = 'Reactivos · Biológico · Origen',
  reagentChemistNormal = 'Reactivos · Químico · Normal',
  reagentChemistNational = 'Reactivos · Químico · Nacionales',
  reagentChemistcMundial = 'Reactivos · Químico · Mundiales',
  reagentChemistOrigin = 'Reactivos · Químico · Origen',
  publications = 'Publicaciones',
  labware = 'Labware',
  training = 'Capacitaciones',
  medicalDevices = 'Dispositivo Médico',
}

export enum ENUM_PRODUCT_FAMILY_B {
  standarBiologicNormal = 'estandaresbiologiconormal',
  standarBiologicNational = 'estandaresbiologiconacionales',
  standarBiologicMundial = 'estandaresbiologicomundiales',
  standarBiologicOrigin = 'estandaresbiologicoorigen',
  standarChemistNormal = 'estandaresquimiconormal',
  standarChemistNotional = 'estandaresquimiconacionales',
  standarChemistMundial = 'estandaresquimicomundiales',
  standarChemistOrigin = 'estandaresquimicoorigen',
  reagentBiologicNormal = 'reactivosbiologiconormal',
  reagentBiologicNational = 'reactivosbiologiconacionales',
  reagentBiologicMundial = 'reactivosbiologicomundiales',
  reagentBiologicOrigin = 'reactivosbiologicoorigen',
  reagentChemistNormal = 'reactivosquimiconormal',
  reagentChemistNational = 'reactivosquimiconacionales',
  reagentChemistcMundial = 'reactivosquimicomundiales',
  reagentChemistOrigin = 'reactivosquimicoorigen',
  publications = 'publicaciones',
  labware = 'labware',
  training = 'capacitaciones',
  medicalDevices = 'dispositivomedico',
  standards = 'estandares',
  reagents = 'reactivos',
}

// DOCS: Clave para string del tipo de familia
export enum ENUM_PRODUCT_FAMILY_KEY {
  labware = 'labware',
  medicalDevice = 'dispositivomedico',
  publications = 'publicaciones',
  reactives = 'reactivos',
  standards = 'estandares',
  trainings = 'capacitaciones',
}
// DOCS: Clave para string del tipo de familia usado en validaciones
export enum ENUM_PRODUCT_FAMILY_KEY_VALIDATION {
  LABWARE = 'labware',
  MEDICAL_DEVICE = 'dispositivo_medico',
  PUBLICATION = 'publicacion',
  BIOLOGIC = 'biologico',
  CHEMIST = 'quimico',
  TRAINING = 'capacitacion',
}

export enum ENUM_TYPE_POP {
  error = 'error',
  success = 'success',
  warning = 'warning',
}

export enum ENUM_SECURE_POP {
  error = 'error',
  success = 'success',
  default = 'default',
  expired = 'expired',
}

export enum MINIO_BUCKETS {
  Temporal = 'temporales',
  Contracts = 'contratos',
  MailBot = 'mailbot',
  Clients = 'clientes',
  Purchases = 'compras',
  Imports = 'importaciones',
  Charges = 'cobranza',
  Security = 'seguridad',
  Products = 'productos',
  Quotations = 'cotizaciones',
}

export enum paymentMethods {
  creditCard = 'tarjetadecredito',
  transferAccount = 'transferenciacuenta',
  transferKey = 'transferenciaclabe',
  bankCheck = 'cheque',
  swiftCode = 'swift',
  abaCode = 'aba',
  none = 'ninguno',
}

export enum ENUM_PAYMENT_CONDITIONS {
  '90Days' = '90dias',
  prepaid = 'prepago',
  paymentOnDelivery = 'pagocontraentrega',
  '8Days' = '8dias',
  '45Days' = '45dias',
  advance = 'anticipo50',
  '60Days' = '60dias',
  '15Days' = '15dias',
  '21Days' = '21dias',
  NA = 'n/a',
}

// Document type for generate PDF
export const TYPE_OF_DOCUMENT_TO_GENERATE_PDF = 'Cotizacion';
export const TYPE_OF_DOCUMENT_CONTRACT_CLIENT_TO_GENERATE_PDF = 'ContratoCliente';
export const TYPE_OF_DOCUMENT_BILL_TO_GENERATE_PDF = 'Factura';
// List Buckets
export const BUCKET_QUOTES = 'cotizaciones';

// Strategies
export const QUOTATION_STRATEGY_OFFENSIVE = 'Ofensiva';
export const QUOTATION_STRATEGY_BALANCED = 'Equilibrada';
export const QUOTATION_STRATEGY_DEFENSIVE = 'Defensiva';
export const QUOTATION_STRATEGY_TACTIC_1 = 'Venta Por Valor';
export const QUOTATION_STRATEGY_TACTIC_2 = 'Tiempo de Entrega';
export const QUOTATION_STRATEGY_TACTIC_3 = 'Condiciones de Pago';
export const QUOTATION_STRATEGY_TACTIC_4 = 'Precio';
export const QUOTATION_STRATEGY_SUB_TACTIC_1_1 = 'Menos 2 días';
export const QUOTATION_STRATEGY_SUB_TACTIC_1_2 = 'Sugerir Flete Express';
export const QUOTATION_STRATEGY_SUB_TACTIC_2_1 = 'Aumentar tiempo de Condiciones';
export const QUOTATION_STRATEGY_SUB_TACTIC_2_2 = 'Pago con American Express';
export const QUOTATION_STRATEGY_SUB_TACTIC_3_1 = 'Acercar';
export const QUOTATION_STRATEGY_SUB_TACTIC_3_2 = 'Igualar';
export const QUOTATION_STRATEGY_SUB_TACTIC_3_3 = 'Mejorar';
export const CREDIT_NOTES = 'Notas de Crédito';
export const HEALTHY_DEBT = 'Deuda Sana';
export const DELINQUENT = 'Morosidad';
export const ONE_DAY = '1 Día';
export const TOW_DAYS = '2 Días';
export const THREE_DAYS = '3 Días';
export const MORE_THAN_THREE_DAYS = '+ De 3 Días';
export const CHANGE_NOTICE = 'Aviso de Cambio';

// Daily Meeting
export const QUOTATION_DAILY_MEETING_OFFENSIVE = 'Ofensiva';
export const QUOTATION_DAILY_MEETING_BALANCED = 'Equilibrada';
export const QUOTATION_DAILY_MEETING_DEFENSIVE = 'Defensiva';

// Currencies
export const CURRENCY_USD = 'USD';
export const CURRENCY_MXN = 'MXN';
export const CURRENCY_EUR = 'EUR';

// Mensajes genericos
export const CANCEL_EDITION_MESSAGE = '¿Seguro que deseas salir sin guardar cambios?';

// Nombre de tamaño de Pantallas
export const VIEW_IPAD = 'iPad';
export const VIEW_MACBOOKAIR = 'macBookAir';

// Incidencias de partidas
export const INCIDENCE_CATALOG = 'Catalogo';
export const INCIDENCE_DESCRIPTION = 'Descripcion';
export const INCIDENCE_PRESENTATION = 'Presentacion';
export const INCIDENCE_TRADEMARK = 'Marca';
export const INCIDENCE_TEE = 'TiempoEstimadoEntrega';
export const INCIDENCE_TEE_SHORT = 'TEE';
export const INCIDENCE_IVA = 'IVA';
export const INCIDENCE_DATE_TRAINING = 'FechaRealizacionEnCapacitacion';
export const INCIDENCE_MONEDA = 'Moneda';
export const INCIDENCE_UNIT_PRICE = 'PrecioUnitario';
export const INCIDENCE_PRICE = 'Precio';
export const INCIDENCE_COMMENTS = 'Comentarios';
export const INCIDENCE_DATE = 'FechaRealizacionEnCapacitacion';

// Regex para restringir decimales
export const REGEX_8_DECIMALS = /(\d*.\d{0,8})/;
export const REGEX_2_DECIMALS = /(\d*.\d{0,2})/;

// Condiciones de Pago
export const PAYMENT_CONDITION_ADVANCED_FIFTY_PERCENTAGE = 'Anticipo 50%';
export const PAYMENT_CONDITION_PAYMENT_AGAINST_DELIVERY = 'Pago contra entrega';

// Nombres de clientes
// TODO:ROllBACK
export const CLIENT_SANOFI = 'Sanofi';

// Origenes de partidas
export const DE_CATALOGO = 'De Catálogo';
export const DE_CONTRATO = 'De Contrato';

// Nombre de componentes
export const REGISTER_CONFIRMATION = 'registerConfirmation';
export const CHECK_PURCHASE_ORDER = 'checkOcNotArrived';
export const CONFIRM_DISPATCH = 'confirmDispatch';

// Filtros
export const ALL_VALUE = 'Todos';
export const OLDER_VALUE = 'Más Antiguos';
export const NEWER_VALUE = 'Más Nuevos';
export const LOWER_VALUE = 'Menor Valor $';
export const HIGHER_VALUE = 'Mayor Valor $';
export const NEAREST_VALUE = 'Más Próxima';
export const LESS_VALUE = 'Menos Próxima';

// Días de la semana
export const DAYS_OF_WEEK = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miercoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
};

// Meses del año
export const MONTHS_OF_YEAR = {
  0: 'Enero',
  1: 'Febrero',
  2: 'Marzo',
  3: 'Abril',
  4: 'Mayo',
  5: 'Junio',
  6: 'Julio',
  7: 'Agosto',
  8: 'Septiembre',
  9: 'Octubre',
  10: 'Noviembre',
  11: 'Diciembre',
};

// Meses del año
export const MONTHS_OF_YEAR_SHORTS = {
  0: 'Ene',
  1: 'Feb',
  2: 'Mar',
  3: 'Abr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Ago',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dic',
};

// DOCS: Tipos de autorización
export enum AuthorizationTypesDescription {
  tipodecambiodof = 'Tipo de cambio DOF',
  configuracionventasutilidad = 'Configuracion Ventas Utilidad',
  tramitarpedidoconerrores = 'Tramitar pedido con errores',
}

export enum AuthorizationTypesClave {
  tipoDeCambioDOf = 'tipodecambiodof',
  configuracionVentasUtilidad = 'configuracionventasutilidad',
  tramitarPedidoConErrores = 'tramitarpedidoconerrores',
}

// DOCS: Decripciones en peticiones para códigos de autorización
export enum AuthorizationTypesDescriptions {
  tipodecambiodof = 'Solicitud para tipo de cambio',
  configuracionventasutilidad = '',
  tramitarpedidoconerrores = '',
}

export const FREIGHT_EXPRESS = 'Flete Express';
export const FREIGHTS_LAST_MILE = 'Flete Última Milla';

export enum PUBLICATION {
  online = 'online',
  usb = 'usb',
}

export const EMAIL_NOT_AVAILABLE = 'Correo no disponible';

export enum OptionsGetTotals {
  subtotal = 'subtotal',
  iva = 'iva',
  total = 'total',
}

export const DEFAULT_TIME_DEBOUNCE_SEARCH = 500;

export const SRC_IMG_TYPE_ITEM = {
  Original: 'assets/Images/pre-processing/originales.svg',
  Promoción: 'assets/Images/pre-processing/promocion.svg',
  Ahorro: 'assets/Images/pre-processing/ahorro.svg',
  Alternativa: 'assets/Images/pre-processing/alternativas.svg',
  Complementaria: 'assets/Images/pre-processing/complementarias.svg',
};

export const SRC_IMG_TYPE_AVAILABILITY = {
  Disponible: 'assets/Images/labels/productos/available.svg',
  Descontinuado: 'assets/Images/labels/productos/discontinued.svg',
  BackOrder: 'assets/Images/labels/productos/back-order.svg',
  NoComercializable: 'assets/Images/labels/productos/not-marketed.svg',
};

export enum KeyCatDestination {
  Usuario = 'usuario',
}

export const AVAILABILITY_TYPES = {
  available: 'disponible',
  discontinued: 'descontinuado',
  backorder: 'backorder',
  notmarketable: 'nocomercializable',
};

export const FREIGHT_PROPERTY = {
  subtotalLastMille: 'PrecioVentaConvertido',
  ivaLastMille: 'PrecioIVA',
  totalLastMile: 'PrecioTotal',
  subtotalExpress: 'PrecioFlete',
  ivaExpress: 'PrecioIVA',
  totalExpress: 'PrecioTotal',
};
export enum ENUM_CONTROL_FAMILY {
  Mundiales = 'mundiales',
  NA = 'n/a',
  Nacionales = 'nacionales',
  Normal = 'normal',
  Origen = 'origen',
}

export const INVESTIGATION_STATUS = {
  added: 'agregada',
  attended: 'atendida',
  awaitingResponse: 'enesperaderespuesta',
  canceled: 'cancelada',
  finished: 'finalizada',
  forReattending: 'porreatender',
  inConfigurationPurchases: 'enconfiguracioncompras',
  inLogisticsConfiguration: 'enconfiguracionlogistica',
  inRatification: 'enratificacion',
  inSalesConfiguration: 'enconfiguracionventas',
  investigation: 'investigacion',
  new: 'nueva',
};

//DOCS: keys de los nodos para los pendientes
export enum PendingNodesKeys {
  //DOCS: Rol EVI (Ejecutivo Venta Interna) -> (Asesor Comercial) -> (Vendedor)
  quotation = 'quotation',
  strategy = 'strategy',
  closeOffer = 'closeOffer',
  followPurchasePromise = 'followPurchasePromise',
  purchasePromise = 'purchasePromise',
  //DOCS: Rol: Coord. EVI -> (Lider Comercial)
  dailyMeeting = 'dailyMeeting',
  generalSummary = 'generalSummary',
  offerAdjustment = 'offerAdjustment',
  //DOCS: Rol: ESAC y Coordinador ESAC (Coordinador de Servicios al Cliente)
  preProcessing = 'preProcessing',
  notProcessed = 'notProcessed',
  validateAdjustment = 'validateAdjustment',
  checkout = 'checkout',
  //DOCS: --- Rol: Analista de Contenido ----
  attendInvestigation = 'attendInvestigation',
  /*
    DOCS: Rol:- Gestor de regulatorios y sustancias controladas,
              - Gestor de Finanzas,
              - Coordinador De Compras E Importaciones,
              - Gerente de ventas
   */
  newProductExistingSupplier = 'newProductExistingSupplier',
  //DOCS: --- ROl: (Desconocido, agregar cuando se tenga)  Administrar OC ---
  process = 'process',
  orderModification = 'orderModification',
  changeNotices = 'changeNotices',
  purchasingManager = 'purchasingManager',
  imports = 'imports',
  importsPHS = 'importsPHS',
  charges = 'charges',
  paymentManager = 'paymentManager',
  assortingManager = 'assortingManager',
  materialReceiver = 'materialReceiver',
  deliveryManager = 'deliveryManager',
  workArrivalDocuments = 'workArrivalDocuments',
  operationsManager = 'operationsManager',
  productToClaim = 'productToClaim',
  loadBalanceInFavor = 'loadBalanceInFavor',
  resourceManager = 'resourceManager',
  eventConsole = 'eventConsole',
  guideClient = 'guideClient',
  securityGuard = 'securityGuard',
  storer = 'storer',
}

export enum FormsNodeKeys {
  clientsForm = 'clientsForm',
  providersForm = 'providersForm',
  productsForm = 'productsForm',
  brandsForm = 'brandsForm',
  customsAgentsForm = 'customsAgentsForm',
}

export const DEFAULT_BUFFER_AMOUNT = 3;
