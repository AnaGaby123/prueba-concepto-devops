import {CotPartidaCotizacionCapacitacionFecha} from 'api-logistica';

export interface InternalSalesItem extends GenericColumProperties {
  data: any; // DOCS: EL ITEM COMPLETO DE TU ESTADO
  index: number; // DOCS: INDEX DEL ITEM
  isSelected?: boolean;
  isDelete?: boolean;
  backgroundHeader?: 'white' | 'gray';
  backgroundColorByTypeItem?: string; // DOCS: Tipo de Partida para el Background del item (Original, Ahorro, Complementaria etc...)
  columnOptions?: ColumnOptions; // DOCS: opcione de configuración ( CHECKSBOX, RADIO BUTTON, VECTORES, ETC)
  columnNumberItem?: ColumnNumberItem; // DOCS: valor del numero de partida
  columnImgTypeItem?: ColumnImgTypeItem; // DOCS: imagen del tipo de partida
  columnImgTypePresentationProduct?: ColumnImgTypePresentationProduct; // DOCS: imagen tipo de presentación del producto
  columnConcept?: ColumnConcept; // DOCS: Sirve para el componente image (punto rojo)
  columnNotes?: ColumnNotes; // DOCS: Notas en la partida
  columnBrand?: ColumnBrand; // DOCS: Configuración de columna de  -> MARCA
  columnDeliveryTime?: ColumnDeliveryTime; // DOCS: Configuración de  columna de ->  TEE (Dias Habiles)

  columnDeliveryTimeSuggested?: ColumnDeliveryTimeSuggested; //DOCS: Configuracón  de columna de -> TEE (Dias Habiles) Sugerido
  columnNumberPieces?: ColumnNumberPieces; // DOCS: Configuración de columna de  ->  Numero de Piezas
  columnUnitPrice?: ColumnUnitPrice; // DOCS: Configuración de columna de  -> Precio Unitario
  columnAdjustmentPrice?: ColumnAdjustmentPrice; //DOCS: Columna de Precio Ajustado
  columnRequestedPrice?: ColumnRequestedPrice; //DOCS: Columna de Precio Solictado
  columnAgreedPrice?: ColumnAgreedPrice; //DOCS: Columna de Precio Pactado
  columnSubtotal?: ColumnSubtotal; // DOCS: Configuración de  columna de  -> Subtotal
  columnIva?: ColumnIva; // DOCS: Configuración de  columna de  -> Iva
  columnDeliveryRestrictions?: ColumnDeliveryRestrictions; // DOCS: Configuración de  columna de  -> Restricciones de Entrega
  columnTotalValue?: ColumnTotalValue; // DOCS: Configuración de  columna de   -> Valor Total

  columnCancelReason?: ColumnCancelReason;
  columnSeeResume?: ColumnSeeResume; // DOCS: Mostrar el resumen de la partida (Candelar, ajuste de oferta, promesa de compra, seguimiento)
  columnState?: ColumnState; //DOCS: Ver el estado de la partida
  columnProFreight?: ColumnProFreight; // DOCS: Configuración de  columna de -> Prorrata Freight
  columnDateLastFollow?: ColumnDateLastFollow; // DOCS: Configuración de  columna de  -> Último Seguimiento
  columnArrivalDate?: ColumnArrivalDate; // DOCS: Configuración de  columna de   -> Fecha Arribo Compra
  columnResearchResponse?: ColumnResearchResponse; // DOCS: Configuración de  columna de  ->  Respuesta de Investigacion
  columnChecksTypeAdjustment?: ColumnChecksTypeAdjustment; // DOCS: Configuración de  columna de  -> "los Checks de Colores"
  columnArrow?: ColumnArrow; // DOCS: Configuración de  columna de   -> "Imagen de la flecha"
  columnComments?: ColumnComments; // DOCS: Configuración de  columna de   -> "Imagen de comentarios"
  columnDelete?: ColumnDelete; // DOCS: Configuración de  columna de   -> "Imagen de Borrar (X)"
  columnTrashReverseSetting?: ColumnTrashReverseSetting; // DOCS: Configuración de  columna de   -> "Imagen del Bote" y "Revertir"
  columnSeeMore?: ColumnSeeMore; // DOCS: Configuración de  columna de  -> "Ver más"
}

export interface ColumnOptions {
  typeOption?: TypeOptionsColumn; // DOCS: Tipo de opciones
  value?: boolean; // DOCS:
  isCheckHeader?: boolean; // DOCS: Valor del recibido del item

  colorIndicator?: typeColorsInternalSalesItem;
}

export interface ColumnNumberItem extends GenericColumProperties {
  number?: number; // DOCS: Tipo de Componente a mostrar
  showArrow?: boolean; //DOCS: Mostrar la flecha
}

export interface ColumnImgTypeItem {
  value?: string; // DOCS: Si es una partida hija
}

export interface ColumnImgTypePresentationProduct {
  src?: string; // DOCS: Tipo Partida Cotización
}

export interface ColumnConcept extends GenericColumProperties {
  stateInvestigation?: string; //DOCS: ESTADO DEL PRODUCTO EN INVESTIGACIÓN
  cat?: string; // DOCS: NUMERO DE CATALOGO
  typePresentation?: string; // DOCS: TIPO DE PRESENTACIÓN
  presentation?: string; // DOCS: CANTIDAD DE PRESENTACIÓN
  unity?: string; // DOCS: UNIDAD DE MEDIDA DE LA PRESENTACIÓN
  description?: string; // DOCS: DESCRIPCIÓN GENERAL DEL PRODUCTO
  type?: string; // DOCS: TIPO DE FAMILIA
  subType?: string; // DOCS: SUBTIPO DE FAMILIA
  control?: string; // DOCS: CONTROL DE FAMILIA
  whoBill?: string; // DOCS: QUIEN FACTURA (EJMPLO: GOLOCAER)
  formatPublication?: string; // DOCS: FORMATO DE PUBLICACIÓN
  author?: string; // DOCS: AUTOR EN CASO DE SER PRODUCTO DE TIPO PUBLICACIONES
  typeMode?: string; // DOCS: TIPO DE VISUALIZACIÓN DE LA CAPACITACIÓN, (EN LINEA, PRESENCIAL, PRESENCIAL EN LINEA)
  controlled?: boolean; // DOCS: CUANDO EL PRODUCTO ES CONTROLADO
  dateValidation?: string; // DOCS: FECHA DE VIGENCIA (FECHA DE CURADURIA)
  dateAvailability?: string; // DOCS: FECHA DE DISPONIBILIDAD (CUANDO EL PRODUCTO ES BACK ORDER)
  seeHistory?: boolean; //DOCS: MOSTRAR LEYENDA "Ver Hsitorial de Promesas de Compra"
  availabilityKey?: string; // DOCS: DISPONIBILIDAD DEL PRODUCTO (BACK ORDER, DISPONIBLE, NO COMERCIABLE ETC)
  datesSuggested?: CotPartidaCotizacionCapacitacionFecha[]; // DOCS: FECHAS DE SUGERIDAS (PRODUCTO DE TIPO CAPACITACIÓN)
  conversionRate?: number; // DOCS: TASA DE CONVERSIÓN
  carFreight?: ConceptCarFreight;
  alternate?: number; // DOCS: PRODUCTO ALTERNOS CON LA PARTIDA
  complementary?: number; // DOCS: PRODUCTOS COMPLEMENTARIOS CON LA PARTIDA
  supplements?: number; //DOCS: TOTAL DE PRODUCTOS SUPLEMENTARIOS
  inContract?: boolean; // DOCS: LABEL "En Contrato"
  // linkedQuoted?: ILinkedQuoteCon[]; // DOCS: COTIZACIONES VINCULADAS //TODO: SE COMENTA DEBIDO A QUE NO SE VA USAR POR AHORA
  withoutQuotes?: boolean; // DOCS:  APARECE EL LABEL "SIN COTIZACION"
  addItemSaving?: boolean; // DOCS: Muestra leyenda para agregar partidas de ahorro
  // numberItemSaving?: number; // DOCS: Número de Partidas de Ahorro
  proratedExpress?: boolean; // DOCS: LABEL "Partida con Flete Express prorrateado"
  isDisabled?: boolean; // DOCS: Copy para cuando está deshabilitada
  isSelectConversionRate?: boolean; // DOCS: EMIT si da click sobre la Tasa De Conversión
  isSelectAddItemSaving?: boolean; // DOCS: Habilita el emit si da click sobre Agregar una partida de Ahorro
  nameFreight?: string; // DOCS: Nombre del Fletes
}

export interface ColumnNotes extends GenericColumProperties {
  systemNotes?: string;
  itemNotes?: string;
}

export interface ColumnBrand extends GenericColumProperties {
  src?: string; // DOCS: Src de la Marca (se recomienda el ImageHover)
  nameBrand?: string; // DOCS: nombre de la Marca
  showConversionRate?: boolean; // DOCS: mostrar o no la Tasa de Converstion
  conversionRate?: number; // DOCS: Porcentage de la Tasa de Conversion
  isSelectPercentageConversion?: boolean; // DOCS: EMIT al selecciona la tasa de conversión
}

export interface ColumnDeliveryTime {
  days?: string | number; // DOCS: Tiempo de Estimado de Entrega (Dias)
  isEdit?: boolean; // DOCS: Marcar si es posible programar partidas
  isProgramming?: boolean; // DOCS: Es Partida Programada (Si es False = Regular)
  isFreight?: boolean; // DOCS: Si tiene Flete Express
  percentagePaidProquifa?: number; //DOCS: porcentaje que pagará proquifa
  // isSelected?: boolean; // DOCS: EMIT al querer programar una partida
}

export interface ColumnDeliveryTimeSuggested {
  days?: string | number; // DOCS: Tiempo de Estimado de Entrega (Dias)
}

export interface ColumnNumberPieces extends CurrencyOptions {
  isEdit?: boolean; // DOCS: Si es posible editar el numero de piezas
}

export interface ColumnUnitPrice
  extends CurrencyOptions,
    GenericColumProperties,
    DetailsProductTraining {
  isEdit?: boolean; // DOCS: Si es Posible Editar el Precio Unitario
  showComments?: boolean; // DOCS: Si se quiere mostrar el icono de comentarios
  showTooltip?: boolean; // DOCS: Mostrar el tooltip interno de ajuste de precio
  color?: typeColorsInternalSalesItem;
  idElementComments?: string;
  idElementsUnitPrice?: string;
  textUnderline?: boolean;
  textBold?: boolean;
  valuePriceOriginal?: number; // DOCS: Valor del precio original para validaciones únicamente
}

export interface ColumnRequestedPrice
  extends CurrencyOptions,
    GenericColumProperties,
    DetailsProductTraining {
  isEdit?: boolean; // DOCS: Si es Posible Editar el Precio
  color?: typeColorsInternalSalesItem;
  idElementComments?: string;
  idElementsUnitPrice?: string;
  textUnderline?: boolean;
  textBold?: boolean;
}

export interface ColumnAdjustmentPrice
  extends CurrencyOptions,
    GenericColumProperties,
    DetailsProductTraining {
  isEdit?: boolean; // DOCS: Si es Posible Editar el Precio
  color?: typeColorsInternalSalesItem;
  idElementComments?: string;
  idElementsUnitPrice?: string;
  textUnderline?: boolean;
  textBold?: boolean;
}

export interface ColumnAgreedPrice extends CurrencyOptions {
  color?: typeColorsInternalSalesItem;
}

export interface ColumnProFreight extends CurrencyOptions, GenericColumProperties {}

export interface ColumnSubtotal extends CurrencyOptions {}

export interface ColumnIva extends CurrencyOptions {}

export interface ColumnDeliveryRestrictions extends GenericColumProperties {
  value?: string; // DOCS: Valor de las Restricciones de compra
}

export interface ColumnTotalValue
  extends CurrencyOptions,
    DetailsProductTraining,
    GenericColumProperties {
  style?: StylesColumnTotalValue; // DOCS: En la columna de Valor Total hay  tres posibles estilos, uno propio del Cotizador, uno general y otro cuando la partida es de Tipo Capacitación
  listPrice?: number; // DOCS: Precio de Lista
  showTimeDelivery?: boolean;
  timeDelivery?: string;
  type?: string; //DOCS: Tipo de Familia
  pieces?: number; // DOCS: Número de piezas para calcular el porcentaje sobre precio lista
}

export interface ColumnCancelReason {
  reasonCancel?: string;
  elementIdComment?: string;
}

export interface ColumnSeeResume extends GenericColorsProperties {
  elementId?: string;
}

export interface ColumnState extends StateOptions {
  pending?: boolean;
}

export interface ColumnDateLastFollow {
  date?: string; // DOCS: Valor de la Fecha de Ultimo Seguimiento
  expiredTracking?: boolean; //DOCS: La fecha de seguimiento a caducado
  isSelected?: boolean;
  elementIdComment?: string;
}

export interface ColumnArrivalDate {
  date?: string;
  color?: typeColorsInternalSalesItem;
  showComments?: boolean;
  elementIdComment?: string; //DOCs: Id de la imagen del comnetario
}

export interface ColumnResearchResponse {
  productNotFound?: boolean;
  productFound?: boolean;
  productAvailable?: boolean;
  productSuggested?: boolean;
}

export interface ColumnChecksTypeAdjustment extends GenericColumProperties {
  isDisableCheckBoxBlueFollowing?: boolean | null;
  isDisableCheckBoxYellowAdjustmentOffer?: boolean | null;
  isDisableCheckBoxGreenPurchasePromise?: boolean | null;
  isDisableCheckBoxRedCancel?: boolean | null;
  valueCheckBoxBlueFollowing?: boolean | null;
  valueCheckBoxYellowAdjustmentOffer?: boolean | null;
  valueCheckBoxGreenPurchasePromise?: boolean | null;
  valueCheckBoxRedCancel?: boolean | null;
  areChecksBoxHeader?: boolean | null;
  showCheckBoxBlueFollowing?: boolean;
  showCheckBoxYellowAdjustmentOffer?: boolean;
  showCheckBoxGreenPurchasePromise?: boolean;
  showCheckBoxRedCancel?: boolean;
  numberChecksActive?: number;

  showAddQuotation?: boolean;
}
export interface ColumnArrow {
  isSelected?: boolean; // DOCS: EMIT Mostrar la imagen
}

export interface ColumnComments {
  color?: typeColorsInternalSalesItem;
  elementIdComment?: string;
}

export interface ColumnDelete extends GenericColumProperties {
  typeItem?: string;
  showArrow?: boolean;
}

export interface ColumnTrashReverseSetting {
  isRemoved?: boolean; // DOCS: EMIT Mostrar la imagen
}

export interface ColumnSeeMore extends GenericColumProperties {}

export interface ILinkedQuoteCon {
  folio?: string; // DOCS:
  idPdf?: string; // DOCS:
}

interface CurrencyOptions {
  colorLabel?: typeColorsInternalSalesItem;
  value?: number | string; // DOCS: Valor a mostrar
  currency?: string; // DOCS: Clave de la Moneda
}

interface StateOptions {
  purchasePromise?: boolean;
  cancellation?: boolean;
  following?: boolean;
  adjustmentOffer?: boolean;
}

interface GenericColumProperties {
  showColumn?: boolean; // DOCS: Indica si se muestra la columna
  activeGenericEmitter?: boolean; // DOCS: Indica si se habilita el emitter de la columna
  activeGenericEmitterFreight?: boolean;
  isDisabled?: boolean;
}

interface GenericColorsProperties {
  color?: typeColorsInternalSalesItem; // DOCS: Propiedad para aplicar colores
  text?: string; // DOCS: Texto personalizado
}

interface ConceptCarFreight {
  showCar: boolean;
  color?: typeColorsInternalSalesItem;
  idElementFreight?: string;
}

//DOCS: ESTILOS DEL VALOR TOTAL, HASTA EL MOMENTO SE SABE QUE UNICAMENTE EL COTIZADOR TIENE UN VALOT TOTAL DISTINTO
export enum StylesColumnTotalValue {
  General = 'general',
  Quotation = 'quotation',
}

export enum TypeOptionsColumn {
  ChecksBoxRedGreen = 'checksBoxRedGreen',
  OnlyCheckBoxRedGreen = 'onlyCheckBoxRedGreen',
  CheckBoxNormal = 'checkBoxNormal',
  IndicatorStatus = 'indicatorStatus',
  RadioButton = 'radioButton',
  CheckBoxYellowGreen = 'checkBoxYellowGreen',
}

interface DetailsProductTraining {
  priceGroup?: boolean; // DOCS: precio por grupo (para productos de tipo capacitacion se requiere)
  pricePerson?: boolean; //DOCS: Precio por persona (para productos de tipo capacitacion se requiere)
  numberPeopleGroup?: number; // DOCS: Número de personas por grupo (para productos de tipo capacitacion se requiere)
}

/*DOCS: ENUM DE LAS ACCIONES QUE EMITIRÁ CADA COMPONENTE

 */
export enum NameActionsInternalSalesItem {
  CheckBoxRedGreenAction = 'CheckBoxRedGreenAction',
  CheckBoxYellowGreenAction = 'CheckBoxYellowGreenAction',
  CheckBoxNormalAction = 'CheckBoxNormalAction',
  RadioButtonAction = 'RadioButtonAction',
  ConceptConversionRateAction = 'ConceptConversionRateAction',
  ConceptAddItemSavingAction = 'ConceptAddItemSavingAction',
  ConceptCarFreightAction = 'ConceptCarFreightAction',
  ConceptSeeHistoryAction = 'ConceptSeeHistoryAction',
  ConceptLinkedQuote = 'ConceptItem',
  BrandItemRateConversionAction = 'BrandItemRateConversionAction',
  DeliveryTimeScheduleAction = 'DeliveryTimeScheduleAction',
  NumberPiecesAction = 'NumberPiecesAction',
  UnitPriceEditNumberAction = 'UnitPriceEditNumberAction',
  UnitPriceCommentsAction = 'UnitPriceCommentsAction',
  UnitPriceClickNumberAction = 'UnitPriceClickNumberAction',
  RequestedPriceClickNumberAction = 'RequestedPriceClickNumberAction',
  ArrivalDateCommentsAction = 'ArrivalDateCommentsAction',
  CheckBoxFollowingItemAction = 'CheckFollowingItemAction',
  CheckBoxAdjustmentOfferItemAction = 'ChecksAdjustmentOfferItemAction',
  CheckBoxPurchasePromiseItemAction = 'ChecksPurchasePromiseItemAction',
  CheckBoxCancelItemAction = 'ChecksCancelItemAction',
  ArrowAction = 'ArrowAction',
  CommentsAction = 'CommentsAction',
  DeleteAction = 'DeleteAction',
  TrashReverseSettingAction = 'TrashReverseSettingAction',
  SeeMoreAction = 'SeeMoreAction',
  InternalSalesAction = 'InternalSalesAction-ClickAction',
  InternalSalesFreightAction = 'InternalSalesFreightAction-ClickAction',
  CheckBoxHeaderBoxNormalItem = 'CheckHeaderInternalSalesItem',
  CheckBoxFollowingHeaderAction = 'CheckFollowingHeaderAction',
  CheckBoxAdjustmentOfferHeaderAction = 'ChecksAdjustmentOfferHeaderAction',
  CheckBoxPurchasePromiseHeaderAction = 'ChecksPurchasePromiseHeaderAction',
  CheckBoxCancelHeaderAction = 'ChecksCancelIHeaderAction',
  AddItemToQuotationAction = 'AddItemToQuotationAction',
  DateLastFollowingAction = 'DateLastFollowingAction',
  SeeCommentsResumeAction = 'SeeCommentsResumeAction',
  SeeCommentsCancelReasonAction = 'SeeCommentsCancelReasonAction',
  SeeNotesItemAction = 'SeeNotesItemAction',
}

// DOCS: MODELO QUE EMITIRÁ EL ITEM PADRE
export interface ModelEmitInternalSalesItem {
  event?: Event;
  data?: any; //DOCS: Data del item que se tiene en el estado, no es el internal sales item
  dataInternal?: InternalSalesItem; //DOCS: Data del internal sales item armado
  index?: number;
  value?: boolean | string | number;
  action?: NameActionsInternalSalesItem;
  target?: any;
}

//DOCS: Interfaz para la partida de flete express o ultima milla
export interface IFreightItem {
  index?: number;
  total: number;
  subtotal: number;
  iva: number;
  descriptionFreight: string;
  currency?: string;
}

export type typeColorsInternalSalesItem = 'red' | 'green' | 'yellow' | 'ocean' | 'black';
