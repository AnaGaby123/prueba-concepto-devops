const catalogClientsRoutes = {
  address: 'address',
  charges: 'charges',
  clients: 'clients',
  contracts: 'contracts',
  deliveryBilling: 'delivery-billing',
  details: 'details',
  generalData: 'general-data',
  list: 'list',
  listProducts: 'list-products',
  prices: 'prices',
};

const catalogProductsRoutes = {
  details: 'details',
  linkAlternativeComplementary: 'link-alternative-complementary',
  list: 'list',
  logistic: 'logistic',
  products: 'products',
  regulationRestrictionsNonTariff: 'regulation-restrictions-non-tariff',
  technicalCommercialInvestigation: 'technical-commercial-investigation',
};

const catalogsBrandsRoutes = {
  brands: 'brands',
  details: 'details',
  list: 'list',
};

const catalogsCustomsAgentsRoutes = {
  customsAgents: 'customs-agents',
  details: 'details',
  list: 'list',
};

const providersRoutes = {
  addEditProviders: 'add-edit-providers',
  listProviders: 'list-providers',
  providers: 'providers',
};

const catalogsRoutes = {
  brands: catalogsBrandsRoutes,
  catalogs: 'catalogs',
  clients: catalogClientsRoutes,
  customsAgents: catalogsCustomsAgentsRoutes,
  products: catalogProductsRoutes,
  providers: providersRoutes,
};

const pedingsRoutes = {
  home: 'home',
  pendings: 'pendings',
};

const logisticConfigurationRoutes = {
  details: 'details',
  logisticConfiguration: 'logistic-configuration',
};

const quoterRoutes = {
  dashboard: 'dashboard',
  details: 'details',
  main: 'main',
  newClient: 'new-client',
  offlineProducts: 'offline-product',
  totalQuotePdf: 'total-quote-pdf',
  quotationPreview: 'quotation-preview',
  quoter: 'quoter',
  saved: 'saved',
  sent: 'sent',
  notSent: 'not-sent',
};

const regulatoryResearchRoutes = {
  commercialTechnicalResearch: 'commercial-technical-research',
  dashboard: 'dashboard',
  details: 'details',
  regulationAndNonTariffRestrictions: 'regulation-and-non-tariff-restrictions',
  regulatoryResearch: 'regulatory-research',
};

const purchasingConfigurationRoutes = {
  details: 'details',
  purchasingConfiguration: 'purchasing-configuration',
};

const salesConfigurationRoutes = {
  details: 'details',
  salesConfiguration: 'sales-configuration',
};

const mailRoutes = {
  linkMail: 'link-mail',
  mailbox: 'mailbox',
  mailsList: 'mails-list',
};

const preProcessingRoutes = {
  dashboard: 'dashboard',
  details: 'details',
  orderDetails: 'order-details',
  preAddItem: 'add-oc-items',
  preItems: 'quoted-items',
  preProcess: 'preProcess',
  preReplaceItem: 'replace-oc-item',
};

const strategyRoutes = {
  details: 'details',
  list: 'list',
  sectionList: 'list',
  strategy: 'strategy',
  strategyDetails: 'strategy-details',
};

const dailyMeetingRoutes = {
  dailyMeeting: 'daily-meeting',
  dailyMeetingDetails: 'daily-meeting-details',
  details: 'details',
  list: 'list',
  sectionList: 'list',
};

const offerAdjustmentRoutes = {
  adjustmentDetails: 'offer-adjustment-details',
  details: 'details',
  list: 'list',
  offerAdjustment: 'offer-adjustment',
  sectionList: 'list',
};

const notProcessedRoutes = {
  details: 'details',
  dashboard: 'dashboard',
  notProcessed: 'not-processed',
};

const validateAdjustmentRoutes = {
  details: 'details',
  dashboard: 'dashboard',
  validateAdjustment: 'validate-adjustment',
};

const attendInvestigationRoutes = {
  addProduct: 'add-product',
  attendInvestigation: 'attend-investigation',
  details: 'details',
  list: 'list',
  productDetails: 'product-details',
};

const closeOfferRoutes = {
  closeOffer: 'close-offer',
  details: 'details',
  generalData: 'general-data',
  generalDataAdjustment: 'adjustment',
  generalDataInProgress: 'in-progress',
  generalDataNew: 'new',
  list: 'list',
  resume: 'resume',
};

const configurationRoutes = {
  configuration: 'configuration',
};

const improvementsRoutes = {
  improvements: 'improvements',
};

const incidentRoutes = {
  incident: 'incident',
};

const requestRoutes = {
  request: 'request',
};

const managementRoutes = {
  management: 'management',
};

const generalSummaryRoutes = {
  generalSummary: 'general-summary',
};

const checkoutRoutes = {
  checkout: 'checkout',
  details: 'details',
  list: 'list',
  processing: 'processing',
  resume: 'resume',
};

const processRoutes = {
  details: 'details',
  list: 'list',
  processed: 'processed',
};

const purchasePromiseRoutes = {
  details: 'details',
  list: 'list',
  purchasePromise: 'purchase-promise',
};

const followPurchasePromiseRoutes = {
  details: 'details',
  followPurchasePromise: 'follow-purchase-promise',
  list: 'list',
};

const orderModificationRoutes = {
  details: 'details',
  list: 'list',
  orderModification: 'order-modification',
};

const changeNoticesRoutes = {
  changeNotices: 'change-notices',
  details: 'details',
  list: 'list',
};

const processPurchaseRoutes = {
  details: 'details',
  generateOrder: 'generate-order',
  list: 'list',
  orderPurchase: 'order-purchase',
  purchaseDetails: 'purchase-details',
};

const uploadInvoiceRoutes = {
  details: 'details',
  list: 'list',
  uploadInvoice: 'upload-invoice',
};

const attendNotArrivedRoutes = {
  attendNotArrived: 'attend-not-arrived',
  details: 'details',
  list: 'list',
};

const planCollectionRoutes = {
  details: 'details',
  list: 'list',
  planCollection: 'plan-collection',
};

const secureShipmentRoutes = {
  associateItems: 'associate-items',
  details: 'details',
  list: 'list',
  secureShipment: 'secure-shipment',
  seeResume: 'see-resume',
};

const registerConfirmationRoutes = {
  details: 'details',
  list: 'list',
  registerConfirmation: 'register-confirmation',
};

const checkOcNotArrivedRoutes = {
  checkOcNotArrived: 'check-oc-not-arrived',
  details: 'details',
  list: 'list',
};

const confirmDispatchRoutes = {
  confirmDispatch: 'confirm-dispatch',
  details: 'details',
  list: 'list',
};

const manageBackOrderRoutes = {
  details: 'details',
  list: 'list',
  manageBackOrder: 'manage-back-order',
};

const declareArrivalRoutes = {
  declareArrival: 'declare-arrival',
  details: 'details',
  list: 'list',
};

const registerArrivalRoutes = {
  barcode: 'barcode',
  details: 'details',
  list: 'list',
  registerArrival: 'register-arrival',
  stepsToFinalize: 'steps-to-finalize',
};

const planDispatchRoutes = {
  dashboard: 'dashboard',
  details: 'details',
  list: 'list',
  planDispatch: 'plan-dispatch',
  steps: 'steps',
};

const loadMisssingRoutes = {
  details: 'details',
  list: 'list',
  loadMissing: 'load-missing',
};

const registerDispatchRoutes = {
  details: 'details',
  list: 'list',
  registerDispatch: 'register-dispatch',
};

const executeCollectionRoutes = {
  calendar: 'calendar',
  details: 'details',
  executeCollection: 'execute-collection',
  executePayment: 'execute-payment',
  paymentInformation: 'payment-information',
};

const attendReviewRoutes = {
  attendReview: 'attend-review',
  details: 'details',
  list: 'list',
  results: 'review-results',
};

const indirectPaymentRoutes = {
  indirectPayment: 'indirect-payment',
};

const attendReviewPaymentRoutes = {
  attendReviewPayment: 'attend-review-payment',
  details: 'details',
  list: 'list',
};

const executePaymentRoutes = {
  calendar: 'calendar',
  executePayment: 'execute-payment',
};

const paymentOrderRoutes = {
  list: 'list',
  paymentOrder: 'payment-order',
};

const collectionMonitoringRoutes = {
  collectionMonitoring: 'collection-monitoring',
  details: 'details',
  list: 'list',
};

const dispatchMonitoringRoutes = {
  details: 'details',
  dispatchMonitoring: 'dispatch-monitoring',
  list: 'list',
};

const declareTransitArrivalRoutes = {
  declareTransitArrival: 'declare-transit-arrival',
  details: 'details',
  list: 'list',
};

const uploadReceiptRoutes = {
  details: 'details',
  list: 'list',
  uploadReceipt: 'upload-receipt',
};

const controlMaterialDeliveryRoutes = {
  controlMaterialDelivery: 'control-material-delivery',
  details: 'details',
  list: 'list',
};

const warehouseRoutes = {
  clientInfo: 'client-info',
  clients: 'clients',
  dashboard: 'dashboard',
  details: 'details',
  warehouse: 'warehouse',
};

const shippingRoutes = {
  console: 'console',
  consoleList: 'console-list',
  dashboard: 'dashboard',
  details: 'details',
  paidByCustomer: 'paid-by-customer',
  paidByCustomerDetails: 'paid-by-customer-details',
  paidByCustomerList: 'paid-by-customer-list',
  shipping: 'shipping',
};

const declareArrivalGuideRoutes = {
  declareArrivalGuide: 'declare-arrival-guide',
  details: 'details',
  list: 'list',
};

const deliveryManagerRoutes = {
  deliveryManager: 'delivery-manager',
};

const assignMessengerChartsRoutes = {
  assignMessengerCharts: 'assign-messenger-charts',
  details: 'details',
};

const priorityConsoleRoutes = {
  list: 'list',
  priorityConsole: 'priority-console',
};

const quarantineManagerRoutes = {
  details: 'details',
  list: 'list',
  quarantineManager: 'quarantine-manager',
};

const workArrivalDocumentsRoutes = {
  details: 'details',
  list: 'list',
  workArrivalDocuments: 'work-arrival-documents',
};

const productToClaimRoutes = {
  details: 'details',
  list: 'list',
  productToClaim: 'product-to-claim',
};

const loadBalanceInFavorRoutes = {
  details: 'details',
  list: 'list',
  loadBalanceInFavor: 'load-balance-in-favor',
};

const eventConsoleRoutes = {
  eventConsole: 'event-console',
  list: 'list',
};

const controlSupplierClaimRoutes = {
  controlSupplierClaim: 'control-supplier-claim',
  details: 'details',
  list: 'list',
};

const guideClientRoutes = {
  guideClient: 'guide-client',
  list: 'list',
};

const reviewRoutes = {
  review: 'review',
};

const rebillRoutes = {
  details: 'details',
  rebill: 'rebill',
};

const invoicesRoutes = {
  invoices: 'invoices',
};

const orderStoppedByCreditRoutes = {
  orderStoppedByCredit: 'order-stopped-by-credit',
};

const manageAdvancePaymentRoutes = {
  manageAdvancePayment: 'manage-advance-payment',
};

const inspectorRoutes = {
  dashboard: 'dashboard',
  details: 'details',
  inspector: 'inspector',
  step0: 'step0',
  step1: 'step1',
  step2: 'step2',
  step3: 'step3',
  steps: 'steps',
};

const packagingRoutes = {
  dashboard: 'dashboard',
  details: 'details',
  packaging: 'packaging',
};

const securityGuardRoutes = {
  details: 'details',
  securityGuard: 'security-guard',
};

const appRoutes = {
  assignMessengerCharts: assignMessengerChartsRoutes,
  attendInvestigation: attendInvestigationRoutes,
  attendNotArrived: attendNotArrivedRoutes,
  attendReview: attendReviewRoutes,
  attendReviewPayment: attendReviewPaymentRoutes,
  catalogs: catalogsRoutes,
  changeNotice: changeNoticesRoutes,
  checkOcNotArrived: checkOcNotArrivedRoutes,
  checkout: checkoutRoutes,
  closeOffer: closeOfferRoutes,
  collectionMonitoring: collectionMonitoringRoutes,
  confirmDispatch: confirmDispatchRoutes,
  construction: configurationRoutes,
  controlMaterialDelivery: controlMaterialDeliveryRoutes,
  controlSupplierClaim: controlSupplierClaimRoutes,
  dailyMeeting: dailyMeetingRoutes,
  declareArrival: declareArrivalRoutes,
  declareArrivalGuide: declareArrivalGuideRoutes,
  declareTransitArrival: declareTransitArrivalRoutes,
  deliveryManager: deliveryManagerRoutes,
  dispatchMonitoring: dispatchMonitoringRoutes,
  empty: '',
  eventConsole: eventConsoleRoutes,
  executeCollection: executeCollectionRoutes,
  executePayment: executePaymentRoutes,
  followPurchasePromise: followPurchasePromiseRoutes,
  forgotPassword: 'forgot-password',
  generalSummary: generalSummaryRoutes,
  guideClient: guideClientRoutes,
  improvements: improvementsRoutes,
  incident: incidentRoutes,
  indirectPayment: indirectPaymentRoutes,
  inspector: inspectorRoutes,
  invoices: invoicesRoutes,
  loadBalanceInFavor: loadBalanceInFavorRoutes,
  loadMissing: loadMisssingRoutes,
  login: 'login',
  logisticConfiguration: logisticConfigurationRoutes,
  mails: mailRoutes,
  manageAdvancePayment: manageAdvancePaymentRoutes,
  manageBackOrder: manageBackOrderRoutes,
  management: managementRoutes,
  notFound: '**',
  notProcessed: notProcessedRoutes,
  offerAdjustment: offerAdjustmentRoutes,
  orderModification: orderModificationRoutes,
  orderStoppedByCredit: orderStoppedByCreditRoutes,
  packaging: packagingRoutes,
  paymentOrder: paymentOrderRoutes,
  pendings: pedingsRoutes,
  planCollection: planCollectionRoutes,
  planDispatch: planDispatchRoutes,
  preProcessing: preProcessingRoutes,
  priorityConsole: priorityConsoleRoutes,
  process: processRoutes,
  processPurchase: processPurchaseRoutes,
  productToClaim: productToClaimRoutes,
  protected: 'protected',
  purchasePromise: purchasePromiseRoutes,
  purchasingConfiguration: purchasingConfigurationRoutes,
  quarantineManager: quarantineManagerRoutes,
  quoter: quoterRoutes,
  rebill: rebillRoutes,
  registerArrival: registerArrivalRoutes,
  registerConfirmation: registerConfirmationRoutes,
  registerDispatch: registerDispatchRoutes,
  regulatoryResearch: regulatoryResearchRoutes,
  request: requestRoutes,
  review: reviewRoutes,
  salesConfiguration: salesConfigurationRoutes,
  secureShipment: secureShipmentRoutes,
  securityGuard: securityGuardRoutes,
  shipping: shippingRoutes,
  strategy: strategyRoutes,
  uploadInvoice: uploadInvoiceRoutes,
  uploadReceipt: uploadReceiptRoutes,
  validateAdjustment: validateAdjustmentRoutes,
  warehouse: warehouseRoutes,
  workArrivalDocuments: workArrivalDocumentsRoutes,
};

export {appRoutes};
