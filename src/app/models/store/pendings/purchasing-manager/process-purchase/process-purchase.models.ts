import {
  initialIProcessPurchaseList,
  IProcessPurchaseList,
} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-list/process-purchase-list.models';
import {
  initialIProcessPurchaseDetails,
  IProcessPurchaseDetails,
} from '@appModels/store/pendings/purchasing-manager/process-purchase/process-purchase-details/process-purchase-details.models';

export const TITLE_PROCESS_PURCHASE = 'OC POR ELABORAR · MATERIALES Internacionales';

export interface IProcessPurchase {
  title: string;
  detailsMode: boolean;
  processPurchaseList: IProcessPurchaseList;
  processPurchaseDetails: IProcessPurchaseDetails;
}

export const initialIProcessPurchase = (): IProcessPurchase => ({
  title: TITLE_PROCESS_PURCHASE,
  detailsMode: false,
  processPurchaseList: initialIProcessPurchaseList(),
  processPurchaseDetails: initialIProcessPurchaseDetails(),
});
