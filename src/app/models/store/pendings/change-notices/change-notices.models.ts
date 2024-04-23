import {
  IChangeNoticesList,
  initialIChangeNoticesList,
} from '@appModels/store/pendings/change-notices/change-notices-list/change-notices-list.models';
import {
  IChangeNoticesDetails,
  initialIChangeNoticesDetails,
} from '@appModels/store/pendings/change-notices/change-notices-details/change-notices-details.models';

export const TITLE_CHANGE_NOTICES = 'GESTIÓN AVISOS DE CAMBIOS';

export interface IChangeNotices {
  title: string;
  detailsMode: boolean;
  changeNoticesList: IChangeNoticesList;
  changeNoticesDetails: IChangeNoticesDetails;
}

export const initialIChangeNotices = (): IChangeNotices => ({
  title: TITLE_CHANGE_NOTICES,
  detailsMode: false,
  changeNoticesList: initialIChangeNoticesList(),
  changeNoticesDetails: initialIChangeNoticesDetails(),
});
