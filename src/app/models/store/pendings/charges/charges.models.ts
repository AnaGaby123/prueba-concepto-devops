/* Models Imports */
import {
  IAttendView,
  initialIAttendView,
} from '@appModels/store/pendings/charges/attend-review/attend-review.models';
import {
  initialIReviewResults,
  IReviewResults,
} from '@appModels/store/pendings/charges/review-results/review-results.models';

import {
  IExecuteCollection,
  initialIExecuteCollection,
} from '@appModels/store/pendings/charges/execute-collection/execute-collection.models';

import {
  ICollectionMonitoring,
  initialICollectionMonitoring,
} from '@appModels/store/pendings/charges/collection-monitoring/collection-monitoring.models';

export interface IChargesState {
  attendReview: IAttendView;
  reviewResults: IReviewResults;
  executeCollection: IExecuteCollection;
  collectionMonitoring: ICollectionMonitoring;
}

export const initialIChargesState = (): IChargesState => ({
  attendReview: initialIAttendView(),
  reviewResults: initialIReviewResults(),
  executeCollection: initialIExecuteCollection(),
  collectionMonitoring: initialICollectionMonitoring(),
});
