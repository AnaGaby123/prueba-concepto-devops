import {createSelector} from '@ngrx/store';
/* Selectors Imports */
import {selectGuideClientList} from '@appSelectors/pendings/guide-client/guide-client/guide-client.selectors';
/* Models Imports */
import {IGuideClientList} from '@appModels/store/pendings/guide-client/guide-client/guide-client-list/guide-client-list.models';
/* Utils Imports */
import {isEmpty} from 'lodash-es';

export const selectSearchTerm = createSelector(
  selectGuideClientList,
  (state: IGuideClientList) => state.searchTerm,
);
export const selectedFreightOption = createSelector(
  selectGuideClientList,
  (state: IGuideClientList) => state.selectedFreightOption,
);
export const validatorForGenerateButton = createSelector(
  selectGuideClientList,
  (state: IGuideClientList): boolean =>
    !!(!isEmpty(state.selectedFreightOption) && state.guideNumber !== ''),
);
