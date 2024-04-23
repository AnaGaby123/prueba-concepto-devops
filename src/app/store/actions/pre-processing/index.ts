import * as importPreProcessingActions from '@appActions/pre-processing/pre-processing.actions';
import * as importPreProcessOrderDashboardActions from '@appActions/pre-processing/preprocess-order-dashboard/preprocess-order-dashboard.actions';
import * as importPreProcesDetailActions from '@appActions/pre-processing/preprocess-order-details/preprocess-order-details.actions';
import * as importQuotedItemsActions from '@appActions/pre-processing/preprocess-order-details/sections/quoted-items/quoted-items.actions';
import * as importAddItemsActions from '@appActions/pre-processing/preprocess-order-details/sections/add-purchase-order-items/add-purchase-order-items.actions';
/*
import * as importReplaceItemActions from '@appActions/pre-processing/preprocess-order-details/sections/replace-purchase-order-item/replace-purchase-order-item-actions';
*/

export const preProcessingActions = importPreProcessingActions;
export const preProcessOrderDashboardActions = importPreProcessOrderDashboardActions;
export const preProcessDetailsActions = importPreProcesDetailActions;
export const quotedItemActions = importQuotedItemsActions;
export const addItemsQuoteActions = importAddItemsActions;
/*
export const replaceItemActions = importReplaceItemActions;
*/
