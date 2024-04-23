import {
  initialIWorkArrivalDocumentsList,
  IWorkArrivalDocumentsList,
} from '@appModels/store/pendings/work-arrival-documents/work-arrival-documents-list/work-arrival-documents-list.models';
import {
  initialIWorkArrivalDocumentsDetails,
  IWorkArrivalDocumentsDetails,
} from '@appModels/store/pendings/work-arrival-documents/work-arrival-documents-details/work-arrival-documents-details.models';

export const TITLE_WORK_ARRIVAL_DOCUMENTS = 'PRODUCTOS CON DOCUMENTACIÓN FALTANTE';

export interface IWorkArrivalDocuments {
  title: string;
  detailsMode: boolean;
  allowToDetails: boolean;
  workArrivalDocumentsList: IWorkArrivalDocumentsList;
  workArrivalDocumentsDetails: IWorkArrivalDocumentsDetails;
}

export const initialIWorkArrivalDocuments = (): IWorkArrivalDocuments => ({
  title: TITLE_WORK_ARRIVAL_DOCUMENTS,
  detailsMode: false,
  allowToDetails: false,
  workArrivalDocumentsList: initialIWorkArrivalDocumentsList(),
  workArrivalDocumentsDetails: initialIWorkArrivalDocumentsDetails(),
});
