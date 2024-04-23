import * as importStrategySelectors from '@appSelectors/pendings/strategy/strategy.selectors';
import * as importStrategyDetailsSelectors from '@appSelectors/pendings/strategy/strategy-details/strategy-details.selectors';
import * as importNotProcessedSelectors from '@appSelectors/pendings/not-processed';
import * as importValidateAdjustmentSelectors from '@appSelectors/pendings/validate-adjustment';
import * as importDailyMeetingSelectors from '@appSelectors/pendings/daily-meeting/daily-meeting.selectors';
import * as importCheckoutSelectors from '@appSelectors/pendings/checkout/checkout.selectors';
import * as importProcessSelectors from '@appSelectors/pendings/process/process.selectors';
import * as importOfferAdjustmentSelectors from '@appSelectors/pendings/offer-adjustment/offer-adjustment.selectors';
import * as importpurchasePromiseSelectors from '@appSelectors/pendings/purchase-promise';

export const strategySelectors = importStrategySelectors;
export const strategyDetailsSelectors = importStrategyDetailsSelectors;
export const notProcessedSelectors = importNotProcessedSelectors;
export const validateAdjustmentSelectors = importValidateAdjustmentSelectors;
export const dailyMeetingSelectors = importDailyMeetingSelectors;
export const checkoutSelectors = importCheckoutSelectors;
export const processSelectors = importProcessSelectors;
export const offerAdjustmentSelectors = importOfferAdjustmentSelectors;
export const purchasePromiseSelectors = importpurchasePromiseSelectors;
