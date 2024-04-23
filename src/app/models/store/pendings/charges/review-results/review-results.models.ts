import {
  initialIReviewResultsList,
  IReviewResultsList,
} from '@appModels/store/pendings/charges/review-results/review-results-list/review-results-list.models';

export const TITLE_REVIEW_RESULTS = 'Resultados de Revisiones';

export interface IReviewResults {
  title: string;
  detailsMode: boolean;
  reviewResultsList: IReviewResultsList;
}

export const initialIReviewResults = (): IReviewResults => ({
  title: TITLE_REVIEW_RESULTS,
  detailsMode: false,
  reviewResultsList: initialIReviewResultsList(),
});
