import {
  IAttendReviewList,
  initialIAttendReviewList,
} from '@appModels/store/pendings/charges/attend-review/attend-review-list/attend-review-list.models';
import {
  IAttendReviewDetails,
  initialIAttendReviewDetails,
} from '@appModels/store/pendings/charges/attend-review/attend-review-details/attend-review-details.models';

export const TITLE_ATTEND_VIEW = 'Atender Revisión';

export interface IAttendView {
  title: string;
  detailsMode: boolean;
  allowedToDetails: boolean;
  attendReviewList: IAttendReviewList;
  attendReviewDetails: IAttendReviewDetails;
  isInRebillView: boolean;
}

export const initialIAttendView = (): IAttendView => ({
  title: TITLE_ATTEND_VIEW,
  detailsMode: false,
  allowedToDetails: false,
  attendReviewList: initialIAttendReviewList(),
  attendReviewDetails: initialIAttendReviewDetails(),
  isInRebillView: false,
});
