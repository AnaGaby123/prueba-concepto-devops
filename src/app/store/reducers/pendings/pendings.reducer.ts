import {
  GENERAL_SUMMARY_KEY,
  PRE_PROCESSING_FEATURE_KEY,
  QUOTATION_FEATURE_KEY,
} from '@appUtil/common.protocols';
/* Store Imports */
import {ActionReducer, combineReducers} from '@ngrx/store';

/* Models Imports */
import {initialPendingsState, PendingsState} from '@appModels/store/pendings/pendings.models';
/* Reducers Imports */
import {strategyReducer} from '@appReducers/pendings/strategy/strategy.reducer';
import {notProcessedReducer} from '@appReducers/pendings/not-processed/not-processed.reducer';
import {validateAdjustmentReducer} from '@appReducers/pendings/validate-adjustment/validate-adjustment.reducer';
import {dailyMeetingReducer} from '@appReducers/pendings/daily-meeting/daily-meeting.reducer';
import {checkoutReducer} from '@appReducers/pendings/checkout/checkout.reducer';
import {closeOfferReducer} from '@appReducers/pendings/close-offer/close-offer.reducer';
import {processReducer} from '@appReducers/pendings/process/process.reducer';
import {offerAdjustmentReducer} from '@appReducers/pendings/offer-adjustment/offer-adjustment.reducer';
import {purchasePromiseReducer} from '@appReducers/pendings/purchase-promise/purchase-promise.reducer';
import {followPPromiseReducer} from '@appReducers/pendings/follow-purchase-promise/follow-purchase-promise.reducer';
import {orderModificationReducer} from '@appReducers/pendings/order-modification/order-modification.reducer';
import {purchasingManageReducer} from '@appReducers/pendings/purchasing-manager/purchasing-manager.reducer';
import {importsReducer} from '@appReducers/pendings/imports/imports.reducer';
import {chargesReducer} from '@appReducers/pendings/charges/charges.reducer';
import {paymentManageReducer} from '@appReducers/pendings/payment-manager/payment-manager.reducer';
import {importsPHSReducer} from '@appReducers/pendings/imports-phs/imports-phs.reducer';
import {assortingManagerReducer} from '@appReducers/pendings/assorting-manager/assorting-manager.reducer';
import {materialReceiverReducer} from '@appReducers/pendings/material-receiver/material-receiver.reducer';
import {changeNoticesReducer} from '@appReducers/pendings/change-notices/change-notices.reducer';
import {operationsManagerReducers} from '@appReducers/pendings/operations-manager/operations-manager.reducer';
import {loadBalanceInFavorReducer} from '@appReducers/pendings/load-balance-in-favor/load-balance-in-favor.reducer';
import {workArrivalDocumentsReducer} from '@appReducers/pendings/work-arrival-documents/work-arrival-documents.reducer';
import {resourceManagerReducer} from '@appReducers/pendings/resource-manager/resource-manager.reducer';
import {deliveryManagerReducer} from '@appReducers/pendings/deliveryManager/delivery-manager.reducer';
import {eventConsoleReducer} from '@appReducers/pendings/event-console/event-console.reducer';
import {ProductToClaimReducer} from '@appReducers/pendings/product-to-claim/product-to-claim.reducer';
import {guideClientReducer} from '@appReducers/pendings/guide-client/guide-client.reducer';
import {attendInvestigationReducer} from '@appReducers/pendings/attend-investigation/attend-investigation.reducer';
import {generalSummaryReducer} from '@appReducers/general-summary/general-summary.reducer';
import {quotationReducer} from '@appReducers/quotation/quotation.reducer';
import {preProcessingReducer} from '@appReducers/pre-processing/pre-processing.reducer';
import {securityGuardReducer} from '@appReducers/pendings/security-guard/security-guard.reducer';
import {storerReducer} from '@appReducers/pendings/storer/storer.reducer';
import {newProductExistingSupplierReducer} from '@appReducers/pendings/new-product-existing-supplier/new-product-existing-supplier.reducer';

export const pendingsReducer: ActionReducer<PendingsState> = combineReducers(
  {
    newProductExistingSupplier: newProductExistingSupplierReducer,
    strategy: strategyReducer,
    notProcessed: notProcessedReducer,
    validateAdjustment: validateAdjustmentReducer,
    dailyMeeting: dailyMeetingReducer,
    checkout: checkoutReducer,
    closeOffer: closeOfferReducer,
    process: processReducer,
    offerAdjustment: offerAdjustmentReducer,
    purchasePromise: purchasePromiseReducer,
    followPurchasePromise: followPPromiseReducer,
    orderModification: orderModificationReducer,
    changeNotices: changeNoticesReducer,
    purchasingManager: purchasingManageReducer,
    imports: importsReducer,
    importsPHS: importsPHSReducer,
    charges: chargesReducer,
    paymentManager: paymentManageReducer,
    assortingManager: assortingManagerReducer,
    materialReceiver: materialReceiverReducer,
    deliveryManager: deliveryManagerReducer,
    workArrivalDocuments: workArrivalDocumentsReducer,
    operationsManager: operationsManagerReducers,
    productToClaim: ProductToClaimReducer,
    loadBalanceInFavor: loadBalanceInFavorReducer,
    resourceManager: resourceManagerReducer,
    eventConsole: eventConsoleReducer,
    guideClient: guideClientReducer,
    attendInvestigation: attendInvestigationReducer,
    [GENERAL_SUMMARY_KEY]: generalSummaryReducer,
    [QUOTATION_FEATURE_KEY]: quotationReducer,
    [PRE_PROCESSING_FEATURE_KEY]: preProcessingReducer,
    securityGuard: securityGuardReducer,
    storer: storerReducer,
  },
  {...initialPendingsState()},
);
