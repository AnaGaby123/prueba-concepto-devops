import * as importPreProcessingSelectors from '@appSelectors/pre-processing/pre-processing.selectors';
import * as importPreProcessOrderDashboardSelectors from '@appSelectors/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.selectors';
import * as importPreProcessDetailsSelectors from '@appSelectors/pre-processing/preprocess-order-details/preprocess-order-details.selectors';
import * as importAddItemSelectors from '@appSelectors/pre-processing/preprocess-order-details/details/sections/add-purchase-order-items/add-purchase-order-items.selectors';
/*
import * as importReplaceItemSelectors from '@appSelectors/pre-processing/preprocess-order-details/details/sections/replace-purchase-order-item/replace-purchase-order-item.selectors';
*/

export const preProcessingSelectors = importPreProcessingSelectors;
export const preProcessOrderDashboardSelectors = importPreProcessOrderDashboardSelectors;
export const preProcessOrderDetailsSelectors = importPreProcessDetailsSelectors;
export const addItemSelectors = importAddItemSelectors;
/*
export const replaceItemSelectors = importReplaceItemSelectors;
*/
