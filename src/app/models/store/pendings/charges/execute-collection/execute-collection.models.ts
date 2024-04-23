import {
  IExecuteCollectionCalendar,
  initialIExecuteCollectionCalendar,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-list/execute-collection-list.models';
import {
  IExecuteCollectionDetails,
  initialIExecuteCollectionDetails,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection-details/execute-collection-details.models';

export const TITLE_EXECUTE_COLLECTION = 'Ejecutar Cobranza';

export interface IExecuteCollection {
  title: string;
  detailsMode: boolean;
  allowedToDetails: boolean;
  isInRebillView: boolean;
  executeCollectionCalendar: IExecuteCollectionCalendar;
  executeCollectionDetails: IExecuteCollectionDetails;
}

export const initialIExecuteCollection = (): IExecuteCollection => ({
  title: TITLE_EXECUTE_COLLECTION,
  detailsMode: false,
  allowedToDetails: false,
  isInRebillView: false,
  executeCollectionCalendar: initialIExecuteCollectionCalendar(),
  executeCollectionDetails: initialIExecuteCollectionDetails(),
});
