import {
  IAttendInvestigationList,
  initialIAttendInvestigationList,
} from '@appModels/store/pendings/attend-investigation/attend-investigation-list/attend-investigation-list.model';
import {
  IAttendInvestigationDetails,
  initialIAttendInvestigationDetails,
} from '@appModels/store/pendings/attend-investigation/attend-investigation-details/attend-investigation-details.model';

export const titleAttendInvestigation = 'ATENDER INVESTIGACIÓN TÉCNICO COMERCIAL';

export interface IAttendInvestigation {
  title: string;
  detailsMode: boolean;
  allowToDetails: boolean;
  attendInvestigationList: IAttendInvestigationList;
  attendInvestigationDetails: IAttendInvestigationDetails;
}

export const initialAttendInvestigation = (): IAttendInvestigation => ({
  title: titleAttendInvestigation,
  detailsMode: false,
  allowToDetails: false,
  attendInvestigationDetails: initialIAttendInvestigationDetails(),
  attendInvestigationList: initialIAttendInvestigationList(),
});
