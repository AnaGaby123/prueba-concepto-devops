import {createSelector} from '@ngrx/store';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {selectProcessNode} from '@appSelectors/pendings/process/process.selectors';
import {ProcessListState} from '@appModels/store/pendings/process/process-list/process-list.models';
import {ProcessState} from '@appModels/store/pendings/process/process.models';
import {ISearchOptions} from '@appModels/store/pendings/close-offer/close-offer-list/close-offer-list.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {API_REQUEST_STATUS_LOADING} from '@appUtil/common.protocols';

export const selectProcessList = createSelector(
  selectProcessNode,
  (state: ProcessState): ProcessListState => state.processList,
);
export const selectClients = createSelector(
  selectProcessList,
  (state: ProcessListState): any => state.clients,
);
export const selectTabOptions = createSelector(
  selectProcessList,
  (state: ProcessListState): Array<ITabOption> => state.tabOptions,
);
export const selectedTabOption = createSelector(
  selectProcessList,
  (state: ProcessListState): ITabOption => state.selectedTabOption,
);
export const selectBurgerOptions = createSelector(
  selectProcessList,
  (state: ProcessListState): Array<DropListOption> => state.burgerOptions,
);
export const selectedBurgerOption = createSelector(
  selectProcessList,
  (state: ProcessListState): DropListOption => state.selectedBurgerOption,
);
export const selectClientsSearchOptions = createSelector(
  selectProcessList,
  (state: ProcessListState): ISearchOptions => state.clientsSearchOptions,
);
export const selectIsLoadingDonutData = createSelector(
  selectProcessList,
  (state: ProcessListState): boolean => state.donutChartStatus === API_REQUEST_STATUS_LOADING,
);
export const selectClientList = createSelector(
  selectClients,
  (state: any): Array<any> => state.Results,
);
