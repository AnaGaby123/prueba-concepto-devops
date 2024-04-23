/* Models Imports */
import {
  initialStrategyState,
  StrategyState,
} from '@appModels/store/pendings/strategy/strategy.model';
import {
  initialNotProcessedState,
  NotProcessedState,
} from '@appModels/store/pendings/not-processed/not-processed.models';
import {
  initialValidateAdjustmentState,
  ValidateAdjustmentState,
} from '@appModels/store/pendings/validate-adjustment/validate-adjustment.models';
import {
  DailyMeetingState,
  initialDailyMeetingState,
} from '@appModels/store/pendings/daily-meeting/daily-meeting.model';
import {
  CheckoutState,
  initialCheckoutState,
} from '@appModels/store/pendings/checkout/checkout.model';
import {
  CloseOfferState,
  initialCloseOfferState,
} from '@appModels/store/pendings/close-offer/close-offer.models';
import {initialProcessState, ProcessState} from '@appModels/store/pendings/process/process.models';
import {
  initialOfferAdjustmentState,
  OfferAdjustmentState,
} from '@appModels/store/pendings/offer-adjustment/offer-adjustment.model';
import {
  initialPurchasePromiseState,
  IPurchasePromiseState,
} from '@appModels/store/pendings/purchase-promise/purchase-promise.model';
import {
  IFollowPurchasePromiseState,
  initialFollowPurchasePromiseState,
} from '@appModels/store/pendings/follow-purchase-promise/follow-purchase-promise.models';
import {
  initialIOrderModificationState,
  IOrderModificationState,
} from '@appModels/store/pendings/order-modification/order-modification.model';
import {
  initialIPurchasingManagerState,
  IPurchasingManagerState,
} from '@appModels/store/pendings/purchasing-manager/purchasing-manager.models';
import {
  IImportsState,
  initialIImportsState,
} from '@appModels/store/pendings/imports/imports.models';
import {
  IChargesState,
  initialIChargesState,
} from '@appModels/store/pendings/charges/charges.models';
import {
  initialIPaymentManagerState,
  IPaymentManagerState,
} from '@appModels/store/pendings/payment-manager/payment-manager.models';
import {
  IImportsPhsState,
  initialIImportsPhsState,
} from '@appModels/store/pendings/imports-phs/imports-phs.models';
import {
  IAssortingManager,
  initialIAssortingManager,
} from '@appModels/store/pendings/assorting-manager/assorting-manager.models';
import {
  IMaterialReceiver,
  initialIMaterialReceiver,
} from '@appModels/store/pendings/material receiver/material receiver.models';
import {
  IChangeNotices,
  initialIChangeNotices,
} from '@appModels/store/pendings/change-notices/change-notices.models';
import {
  initialIOperationsManager,
  IOperationsManager,
} from '@appModels/store/pendings/operations-manager/operations-manager.models';
import {
  ILoadBalanceInFavor,
  initialILoadBalanceInFavor,
} from '@appModels/store/pendings/load-balance-in-favor/load-balance-in-favor.models';
import {
  initialIWorkArrivalDocuments,
  IWorkArrivalDocuments,
} from '@appModels/store/pendings/work-arrival-documents/work-arrival-documents.models';
import {
  initialIResourceManagerState,
  IResourceManagerState,
} from '@appModels/store/pendings/resource-manager/resource-manager.models';
import {
  IDeliveryManager,
  initialIDeliveryManagerState,
} from '@appModels/store/pendings/delivery-manager/delivery-manager.model';
import {
  IEventConsole,
  initialIEventConsole,
} from '@appModels/store/pendings/event-console/event-console.models';
import {
  initialIProductToClaimState,
  IProductsToClaimState,
} from '@appModels/store/pendings/product-to-claim/product-to-claim.models';
import {
  IGuideClientState,
  initialIGuideClientState,
} from '@appModels/store/pendings/guide-client/guide-client.models';
import {
  IAttendInvestigation,
  initialAttendInvestigation,
} from '@appModels/store/pendings/attend-investigation/attend-investigation.model';
import * as fromRoot from '@appCore/core.state';
import {
  GENERAL_SUMMARY_KEY,
  PendingNodesKeys,
  PENDINGS_FEATURE_KEY,
  PRE_PROCESSING_FEATURE_KEY,
  QUOTATION_FEATURE_KEY,
} from '@appUtil/common.protocols';
import {
  IGeneralSummaryState,
  initialIGeneralSummary,
} from '@appModels/store/general-summary/general-summary.models';
import {initialQuotationState, QuotationState} from '@appModels/store/quotation/quotation.models';
import {
  initialPreProcessingState,
  IPreProcessingState,
} from '@appModels/store/pre-processing/pre-processing.models';
import {
  initialSecurityGuard,
  ISecurityGuard,
} from '@appModels/store/pendings/security-guard/security-guard.models';
import {initialIStorerState, IStorerState} from '@appModels/store/pendings/storer/storer.models';
import {
  initialNewProductExistingSupplierState,
  NewProductExistingSupplierState,
} from '@appModels/store/pendings/new-product-existing-supplier/new-product-existing-supplier.models';
import {Action} from '@ngrx/store';
import {strategyReducer} from '@appReducers/pendings/strategy/strategy.reducer';
import {quotationReducer} from '@appReducers/quotation/quotation.reducer';
import {closeOfferReducer} from '@appReducers/pendings/close-offer/close-offer.reducer';
import {purchasePromiseReducer} from '@appReducers/pendings/purchase-promise/purchase-promise.reducer';
import {followPPromiseReducer} from '@appReducers/pendings/follow-purchase-promise/follow-purchase-promise.reducer';
import {dailyMeetingReducer} from '@appReducers/pendings/daily-meeting/daily-meeting.reducer';
import {generalSummaryReducer} from '@appReducers/general-summary/general-summary.reducer';
import {offerAdjustmentReducer} from '@appReducers/pendings/offer-adjustment/offer-adjustment.reducer';
import {preProcessingReducer} from '@appReducers/pre-processing/pre-processing.reducer';
import {notProcessedReducer} from '@appReducers/pendings/not-processed/not-processed.reducer';
import {validateAdjustmentReducer} from '@appReducers/pendings/validate-adjustment/validate-adjustment.reducer';
import {checkoutReducer} from '@appReducers/pendings/checkout/checkout.reducer';
import {attendInvestigationReducer} from '@appReducers/pendings/attend-investigation/attend-investigation.reducer';
import {newProductExistingSupplierReducer} from '@appReducers/pendings/new-product-existing-supplier/new-product-existing-supplier.reducer';
import {regulatoryResearchReducer} from '@appReducers/pendings/new-product-existing-supplier/regulatory-research/regulatory-research.reducer';
import {purchasingManageReducer} from '@appReducers/pendings/purchasing-manager/purchasing-manager.reducer';
import {importsReducer} from '@appReducers/pendings/imports/imports.reducer';
import {importsPHSReducer} from '@appReducers/pendings/imports-phs/imports-phs.reducer';
import {chargesReducer} from '@appReducers/pendings/charges/charges.reducer';
import {paymentManageReducer} from '@appReducers/pendings/payment-manager/payment-manager.reducer';
import {assortingManagerReducer} from '@appReducers/pendings/assorting-manager/assorting-manager.reducer';
import {materialReceiverReducer} from '@appReducers/pendings/material-receiver/material-receiver.reducer';
import {deliveryManagerReducer} from '@appReducers/pendings/deliveryManager/delivery-manager.reducer';
import {operationsManagerReducers} from '@appReducers/pendings/operations-manager/operations-manager.reducer';
import {resourceManagerReducer} from '@appReducers/pendings/resource-manager/resource-manager.reducer';
import {workArrivalDocumentsReducer} from '@appReducers/pendings/work-arrival-documents/work-arrival-documents.reducer';
import {ProductToClaimReducer} from '@appReducers/pendings/product-to-claim/product-to-claim.reducer';
import {loadBalanceInFavorReducer} from '@appReducers/pendings/load-balance-in-favor/load-balance-in-favor.reducer';
import {eventConsoleReducer} from '@appReducers/pendings/event-console/event-console.reducer';
import {guideClientReducer} from '@appReducers/pendings/guide-client/guide-client.reducer';
import {storerReducer} from '@appReducers/pendings/storer/storer.reducer';
import {securityGuardReducer} from '@appReducers/pendings/security-guard/security-guard.reducer';
import {orderModificationReducer} from '@appReducers/pendings/order-modification/order-modification.reducer';
import {changeNoticesReducer} from '@appReducers/pendings/change-notices/change-notices.reducer';
import {processReducer} from '@appReducers/pendings/process/process.reducer';

export interface AppState extends fromRoot.AppState {
  [PENDINGS_FEATURE_KEY]: PendingsState;
}

export interface PendingsState {
  newProductExistingSupplier?: NewProductExistingSupplierState;
  strategy?: StrategyState;
  notProcessed?: NotProcessedState;
  validateAdjustment?: ValidateAdjustmentState;
  dailyMeeting?: DailyMeetingState;
  checkout?: CheckoutState;
  closeOffer?: CloseOfferState;
  process?: ProcessState;
  offerAdjustment?: OfferAdjustmentState;
  purchasePromise?: IPurchasePromiseState;
  followPurchasePromise?: IFollowPurchasePromiseState;
  orderModification?: IOrderModificationState;
  changeNotices?: IChangeNotices;
  purchasingManager?: IPurchasingManagerState;
  imports?: IImportsState;
  importsPHS?: IImportsPhsState;
  charges?: IChargesState;
  paymentManager?: IPaymentManagerState;
  assortingManager?: IAssortingManager;
  materialReceiver?: IMaterialReceiver;
  deliveryManager?: IDeliveryManager;
  workArrivalDocuments?: IWorkArrivalDocuments;
  operationsManager?: IOperationsManager;
  productToClaim?: IProductsToClaimState;
  loadBalanceInFavor?: ILoadBalanceInFavor;
  resourceManager?: IResourceManagerState;
  eventConsole?: IEventConsole;
  guideClient?: IGuideClientState;
  attendInvestigation?: IAttendInvestigation;
  [GENERAL_SUMMARY_KEY]?: IGeneralSummaryState;
  [QUOTATION_FEATURE_KEY]?: QuotationState;
  [PRE_PROCESSING_FEATURE_KEY]?: IPreProcessingState;
  securityGuard?: ISecurityGuard;
  storer?: IStorerState;
}

export const initialPendingsState = (): PendingsState => ({
  newProductExistingSupplier: initialNewProductExistingSupplierState(),
  strategy: initialStrategyState(),
  notProcessed: initialNotProcessedState(),
  validateAdjustment: initialValidateAdjustmentState(),
  dailyMeeting: initialDailyMeetingState(),
  checkout: initialCheckoutState(),
  closeOffer: initialCloseOfferState(),
  process: initialProcessState(),
  offerAdjustment: initialOfferAdjustmentState(),
  purchasePromise: initialPurchasePromiseState(),
  followPurchasePromise: initialFollowPurchasePromiseState(),
  orderModification: initialIOrderModificationState(),
  changeNotices: initialIChangeNotices(),
  purchasingManager: initialIPurchasingManagerState(),
  imports: initialIImportsState(),
  importsPHS: initialIImportsPhsState(),
  charges: initialIChargesState(),
  paymentManager: initialIPaymentManagerState(),
  assortingManager: initialIAssortingManager(),
  materialReceiver: initialIMaterialReceiver(),
  workArrivalDocuments: initialIWorkArrivalDocuments(),
  operationsManager: initialIOperationsManager(),
  productToClaim: initialIProductToClaimState(),
  loadBalanceInFavor: initialILoadBalanceInFavor(),
  resourceManager: initialIResourceManagerState(),
  deliveryManager: initialIDeliveryManagerState(),
  eventConsole: initialIEventConsole(),
  guideClient: initialIGuideClientState(),
  attendInvestigation: initialAttendInvestigation(),
  [GENERAL_SUMMARY_KEY]: initialIGeneralSummary(),
  [QUOTATION_FEATURE_KEY]: initialQuotationState(),
  [PRE_PROCESSING_FEATURE_KEY]: initialPreProcessingState(),
  securityGuard: initialSecurityGuard(),
  storer: initialIStorerState(),
});
export const getReducers = (pendingsState: PendingsState, action: Action, node: string) => {
  //DOCS: Cotizador lo cotizable -> Rol: EVI (Asesor Comercial) (Vendedor)
  if (pendingsState.quotation || PendingNodesKeys.quotation === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.quotation]: quotationReducer(pendingsState.quotation, action),
    };
  }

  //DOCS: Atender Cierre -> Rol: EVI (Asesor Comercial) (Vendedor)
  if (pendingsState.strategy || PendingNodesKeys.strategy === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.strategy]: strategyReducer(pendingsState.strategy, action),
    };
  }

  //DOCS: Cerrar Oferta -> Rol: EVI (Asesor Comercial) (Vendedor)
  if (pendingsState.closeOffer || PendingNodesKeys.closeOffer === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.closeOffer]: closeOfferReducer(pendingsState.closeOffer, action),
    };
  }

  //DOCS: Atender Promesa de Compra -> Rol: EVI (Asesor Comercial) (Vendedor)
  if (pendingsState.purchasePromise || PendingNodesKeys.purchasePromise === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.purchasePromise]: purchasePromiseReducer(
        pendingsState.purchasePromise,
        action,
      ),
    };
  }

  //DOCS: Atender Seguimiento a Promesa de Compra -> Rol: EVI (Asesor Comercial)
  if (pendingsState.followPurchasePromise || PendingNodesKeys.followPurchasePromise === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.followPurchasePromise]: followPPromiseReducer(
        pendingsState.followPurchasePromise,
        action,
      ),
    };
  }

  //DOCS: Junta Diaria -> Rol: Coord. EVI -> (Lider Comercial)
  if (pendingsState.dailyMeeting || PendingNodesKeys.dailyMeeting === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.dailyMeeting]: dailyMeetingReducer(pendingsState.dailyMeeting, action),
    };
  }

  //DOCS: Resumen -> Rol: Coord. EVI -> (Lider Comercial)
  if (pendingsState.generalSummary || PendingNodesKeys.generalSummary === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.generalSummary]: generalSummaryReducer(
        pendingsState.generalSummary,
        action,
      ),
    };
  }

  //DOCS: Ajustar Oferta -> Rol: Coord. EVI -> (Lider Comercial)
  if (pendingsState.offerAdjustment || PendingNodesKeys.offerAdjustment === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.offerAdjustment]: offerAdjustmentReducer(
        pendingsState.offerAdjustment,
        action,
      ),
    };
  }

  //DOCS: Pretramitar Pedido -> Rol: ESAC y COORD. ESAC
  if (pendingsState.preProcessing || PendingNodesKeys.preProcessing === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.preProcessing]: preProcessingReducer(pendingsState.preProcessing, action),
    };
  }

  //DOCS: Gestionar Pedido Intramitable -> Rol: ESAC y COORD. ESAC
  if (pendingsState.notProcessed || PendingNodesKeys.notProcessed === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.notProcessed]: notProcessedReducer(pendingsState.notProcessed, action),
    };
  }

  //DOCS: Validar Ajustes a la OC -> Rol: ESAC y COORD. ESAC
  if (pendingsState.validateAdjustment || PendingNodesKeys.validateAdjustment === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.validateAdjustment]: validateAdjustmentReducer(
        pendingsState.validateAdjustment,
        action,
      ),
    };
  }

  //DOCS: Tramitar -> Rol: ESAC y COORD. ESAC
  if (pendingsState.checkout || PendingNodesKeys.checkout === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.checkout]: checkoutReducer(pendingsState.checkout, action),
    };
  }

  //DOCS: Atender Investigación Técnico Comercial -> Rol: Analista de Contenido
  if (pendingsState.attendInvestigation || PendingNodesKeys.attendInvestigation === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.attendInvestigation]: attendInvestigationReducer(
        pendingsState.attendInvestigation,
        action,
      ),
    };
  }

  /*
    DOCS: Rol:- Determinar Familia  (regulatoryResearch)-> Rol: Gestor de regulatorios y sustancias controladas  ,
              - Determinar costo de venta (purchasingConfiguration) -> Rol: Gestor de Finanzas (Configurar familia  ,
              - Configurar familia - Determinar tiempo logístico (logisticConfiguration) -> Rol: Coordinador De Compras E Importaciones,
              - Configurar familia  Determinar rentabilidad (salesConfiguration) -> Rol: Gerente de ventas
   */
  if (
    pendingsState.newProductExistingSupplier ||
    PendingNodesKeys.newProductExistingSupplier === node
  ) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.newProductExistingSupplier]: newProductExistingSupplierReducer(
        pendingsState.newProductExistingSupplier,
        action,
      ),
    };
  }

  /*
    DOCS: Tramitar Compra (processPurchase) -> Rol: (Agregarlo Cuando se tenga definido)
          Cargar Factura (uploadInvoice)->  Rol: (Agregarlo Cuando se tenga definido)
          Registrar Arribo (registerArrival) ->  Rol: (Agregarlo Cuando se tenga definido)
          Registrar Confirmación  (registerConfirmation) -> Rol: (Agregarlo Cuando se tenga definido)
          Confirmar Despacho (confirmDispatch) -> Rol: (Agregarlo Cuando se tenga definido)
          Monitor Despacho (dispatchMonitoring) -> Rol: (Agregarlo Cuando se tenga definido)
          Monitorear OC No Arribada (checkoutOcNoArrived) -> Rol: (Agregarlo Cuando se tenga definido)
          Gestionar Back order (manageBackOrder) -> Rol: (Agregarlo Cuando se tenga definido)
          Declara Arribo (declareArrival): ->  Rol: (Agregarlo Cuando se tenga definido)
          Planear Recoleccion (planColletion) -> Rol:  (Agregarlo Cuando se tenga definido)
          **Atender No Arribdas (DEFINIR REDUCER) -> Rol: (Agregarlo Cuando se tenga definido)
          **Asegurar Embarque (DEFINIR REDUCER) -> Rol: (Agregarlo Cuando se tenga definido)
  * */
  //TODO: Falta Crear Reducer Atender No Arribadas y Asegurar Embarque
  if (pendingsState.purchasingManager || PendingNodesKeys.purchasingManager === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.purchasingManager]: purchasingManageReducer(
        pendingsState.purchasingManager,
        action,
      ),
    };
  }

  /*
    DOCS: Planificar Despacho (planDispach) -> Rol: (Agregarlo Cuando se tenga definido)
          Cargar Documentación Faltante (loadMissing) -> Rol: (Agregarlo Cuando se tenga definido)
          Registrar Despacho -> Rol: (registerDispacth) -> Rol: (Agregarlo Cuando se tenga definido)
  **/
  if (pendingsState.imports || PendingNodesKeys.imports === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.imports]: importsReducer(pendingsState.imports, action),
    };
  }

  /*
  DOCS: Declarar Arribo Transito (declareTransitArrival) -> Rol: (Agregarlo Cuando se tenga definido)
        Cargar Acuse de Recibo  (upload Receipt) ->   Rol: (Agregarlo Cuando se tenga definido)
        Controlar Entrega Material (controlMaterialDelivery) ->  Rol: (Agregarlo Cuando se tenga definido)
**/
  if (pendingsState.importsPHS || PendingNodesKeys.importsPHS === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.importsPHS]: importsPHSReducer(pendingsState.importsPHS, action),
    };
  }

  /*
   DOCS: Atender Revisión (attendReview) ->  Rol: (Agregarlo Cuando se tenga definido)
         Resultados de Revisiones (reviewResults) ->  Rol: (Agregarlo Cuando se tenga definido)
         Ejecutar Cobranza (ExecuteCollection) ->  Rol: (Agregarlo Cuando se tenga definido)
         Monitoreo de Cobro (collectionMonitoring) ->  Rol: (Agregarlo Cuando se tenga definido)
         **  Gestionar Cobro Anticipado (DEFINIR REDUCER) ->  Rol: (Agregarlo Cuando se tenga definido)
   **/
  //TODO: Falta Crear Reducer Gestionar Cobro Anticipado

  if (pendingsState.charges || PendingNodesKeys.charges === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.charges]: chargesReducer(pendingsState.charges, action),
    };
  }

  /*
 DOCS: Atender Revision (attendReviewPayment) ->  Rol: (Agregarlo Cuando se tenga definido)
       Ejecutar Pago (executePayment) ->  Rol: (Agregarlo Cuando se tenga definido)
       Cargar pago indirecto (indirectPayment) ->  Rol: (Agregarlo Cuando se tenga definido)
       Orden de Pago (paymentOrder)  ->  Rol: (Agregarlo Cuando se tenga definido)
 **/
  if (pendingsState.paymentManager || PendingNodesKeys.paymentManager === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.paymentManager]: paymentManageReducer(pendingsState.paymentManager, action),
    };
  }

  /*
   DOCS:  Trabajar rutas - Envio (shipping) ->  Rol: (Agregarlo Cuando se tenga definido)
          Trabajar Ruta Almacen (warehouse) ->  Rol: (Agregarlo Cuando se tenga definido)
          Trabajar rutas-  Envio pagado por cliente -> Rol: (Agregarlo Cuando se tenga definido)
   */

  if (pendingsState.assortingManager || PendingNodesKeys.assortingManager === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.assortingManager]: assortingManagerReducer(
        pendingsState.assortingManager,
        action,
      ),
    };
  }

  /*
   DOCS:  Declarar Arribo de Guia (declareArrivalGuide) -> Rol: (Agregarlo Cuando se tenga definido)
   */
  if (pendingsState.materialReceiver || PendingNodesKeys.materialReceiver === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.materialReceiver]: materialReceiverReducer(
        pendingsState.materialReceiver,
        action,
      ),
    };
  }

  /*
     DOCS:Asignar Mensajero (assignMessenger) -> Rol: (Agregarlo Cuando se tenga definido)
 */
  if (pendingsState.deliveryManager || PendingNodesKeys.deliveryManager === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.deliveryManager]: deliveryManagerReducer(
        pendingsState.deliveryManager,
        action,
      ),
    };
  }

  /*
   DOCS:Asignar Mensajero (assignMessenger) -> Rol: (Agregarlo Cuando se tenga definido)
 */
  if (pendingsState.operationsManager || PendingNodesKeys.operationsManager === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.operationsManager]: operationsManagerReducers(
        pendingsState.operationsManager,
        action,
      ),
    };
  }
  /*
    DOCS: Gestor de Cuarentena (quarentineManager) -> Rol: (Agregarlo Cuando se tenga definido)
  */
  if (pendingsState.resourceManager || PendingNodesKeys.resourceManager === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.resourceManager]: resourceManagerReducer(
        pendingsState.resourceManager,
        action,
      ),
    };
  }

  /*
   DOCS: Productos Con Documentación Faltante (workArrivalDocuments) -> Rol: (Agregarlo Cuando se tenga definido)
  */
  if (pendingsState.workArrivalDocuments || PendingNodesKeys.workArrivalDocuments === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.workArrivalDocuments]: workArrivalDocumentsReducer(
        pendingsState.workArrivalDocuments,
        action,
      ),
    };
  }

  /*
   DOCS: Producto a Reclamo (ProductToClaim) -> Rol: (Agregarlo Cuando se tenga definido)
         Controlar Reclamo Proveedor (controlSupplierClaim) -> Rol:(Agregarlo Cuando se tenga definido)
  */
  if (pendingsState.productToClaim || PendingNodesKeys.productToClaim === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.productToClaim]: ProductToClaimReducer(
        pendingsState.productToClaim,
        action,
      ),
    };
  }

  /*
   DOCS: Cargar Saldo a Favor (loadBalanceInFavor) -> Rol: (Agregarlo Cuando se tenga definido)
  */
  if (pendingsState.loadBalanceInFavor || PendingNodesKeys.loadBalanceInFavor === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.loadBalanceInFavor]: loadBalanceInFavorReducer(
        pendingsState.loadBalanceInFavor,
        action,
      ),
    };
  }

  /*
   DOCS: Consola de Eventos (eventConsole) -> Rol: (Agregarlo Cuando se tenga definido)
  */
  if (pendingsState.eventConsole || PendingNodesKeys.eventConsole === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.eventConsole]: eventConsoleReducer(pendingsState.eventConsole, action),
    };
  }

  /*
   DOCS: Guía Cliente (guideClient) -> Rol: (Agregarlo Cuando se tenga definido)
 */
  if (pendingsState.guideClient || PendingNodesKeys.guideClient === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.guideClient]: guideClientReducer(pendingsState.guideClient, action),
    };
  }

  /*
   DOCS: Inspeccionar Productos (inspector) -> Rol: (Agregarlo Cuando se tenga definido)
  */
  if (pendingsState.storer || PendingNodesKeys.storer === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.storer]: storerReducer(pendingsState.storer, action),
    };
  }

  /*
 DOCS: Registrar Visita (securytyGuard) -> Rol: (Agregarlo Cuando se tenga definido)
*/
  if (pendingsState.securityGuard || PendingNodesKeys.securityGuard === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.securityGuard]: securityGuardReducer(pendingsState.securityGuard, action),
    };
  }

  /*
  DOCS: Modificar OC -> Rol: (Agregarlo Cuando se tenga definido)
  */
  if (pendingsState.orderModification || PendingNodesKeys.orderModification === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.orderModification]: orderModificationReducer(
        pendingsState.orderModification,
        action,
      ),
    };
  }

  /*
     DOCS: Gestionar Avisos de Cambios -> Rol: (Agregarlo Cuando se tenga definido)
  */
  if (pendingsState.changeNotices || PendingNodesKeys.changeNotices === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.changeNotices]: changeNoticesReducer(pendingsState.changeNotices, action),
    };
  }

  /*
   DOCS: Tramitar -> Rol: (Agregarlo Cuando se tenga definido)
*/
  if (pendingsState.process || PendingNodesKeys.process === node) {
    pendingsState = {
      ...pendingsState,
      [PendingNodesKeys.process]: processReducer(pendingsState.process, action),
    };
  }

  return pendingsState;
};
