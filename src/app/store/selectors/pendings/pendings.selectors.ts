/* Store Imports */
import {createFeatureSelector, createSelector} from '@ngrx/store';

/* Selectors Imports */
/* Models Imports */
import {PendingsState} from '@appModels/store/pendings/pendings.models';
import {
  GENERAL_SUMMARY_KEY,
  PendingNodesKeys,
  PENDINGS_FEATURE_KEY,
  PRE_PROCESSING_FEATURE_KEY,
  QUOTATION_FEATURE_KEY,
} from '@appUtil/common.protocols';

export const selectPendingsState = createFeatureSelector<PendingsState>(PENDINGS_FEATURE_KEY);

export const selectQuotationState = createSelector(
  selectPendingsState,
  (state: PendingsState) => state?.[PendingNodesKeys.quotation],
);
export const selectStrategy = createSelector(
  selectPendingsState,
  (state: PendingsState) => state?.strategy,
);
export const selectCloseOffer = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.closeOffer,
);
export const selectPurchasePromise = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.purchasePromise,
);
export const selectFollowPurchasePromise = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.followPurchasePromise,
);
export const selectNewProductExistingSupplier = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.newProductExistingSupplier,
);
export const selectNotProcessed = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.notProcessed,
);
export const selectValidateAdjustment = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.validateAdjustment,
);
export const selectDailyMeeting = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.dailyMeeting,
);
export const selectCheckout = createSelector(
  selectPendingsState,
  (state: PendingsState) => state?.checkout,
);

export const selectProcess = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.process,
);
export const selectOfferAdjustment = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.offerAdjustment,
);

export const selectOrderModificationS = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.orderModification,
);
export const selectChangeNotices = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.changeNotices,
);
export const selectPurchasingManager = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.purchasingManager,
);
export const selectImports = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.imports,
);
export const selectCharges = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.charges,
);
export const selectPaymentManager = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.paymentManager,
);
export const selectImportsPhs = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.importsPHS,
);
export const selectAssortingManager = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.assortingManager,
);
export const selectMaterialReceiver = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.materialReceiver,
);
export const selectWorkArrivalDocuments = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.workArrivalDocuments,
);
export const selectOperationsManager = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.operationsManager,
);
export const selectProductToClaim = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.productToClaim,
);
export const selectLoadBalanceInFavor = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.loadBalanceInFavor,
);
export const selectResourceManager = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.resourceManager,
);
export const selectDeliveryManager = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.deliveryManager,
);
export const selectEventConsole = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.eventConsole,
);
export const selectGuideClientState = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.guideClient,
);
export const selectAttendInvestigation = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.attendInvestigation,
);
export const selectGeneralSummary = createSelector(
  selectPendingsState,
  (state: PendingsState) => state[GENERAL_SUMMARY_KEY],
);

export const selectPreProcessingState = createSelector(
  selectPendingsState,
  (state: PendingsState) => state[PRE_PROCESSING_FEATURE_KEY],
);
export const selectSecurityGuard = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.securityGuard,
);
export const selectStorerState = createSelector(
  selectPendingsState,
  (state: PendingsState) => state.storer,
);
