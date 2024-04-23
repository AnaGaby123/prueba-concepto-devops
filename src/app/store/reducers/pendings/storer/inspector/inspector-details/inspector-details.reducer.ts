/* Core Imports */
import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IInspectorDetails,
  initialIInspectorDetails,
} from '@appModels/store/pendings/storer/inspector/inspector-details/inspector-details.models';
import {inspectorDetailsActions} from '@appActions/pendings/storer/inspector';
import {map as _map} from 'lodash-es';

import {OptionBar} from '@appModels/options-bar/options-bar';

const initialIInspectorDetailsState: IInspectorDetails = {
  ...initialIInspectorDetails(),
};
export const inspectorDetailsReducer: ActionReducer<IInspectorDetails> = createReducer(
  initialIInspectorDetailsState,
  on(inspectorDetailsActions.RESTORE_DETAILS, (state) => ({
    ...initialIInspectorDetails(),
  })),
  on(inspectorDetailsActions.SET_STEP, (state, {step}) => ({
    ...state,
    steps: _map(state.steps, (o: OptionBar, index) => {
      if (index + 1 < step) {
        o = {
          ...o,
          showIcon: true,
        };
      } else {
        o = {
          ...o,
          showIcon: false,
        };
      }
      if (step === o.number) {
        return {
          ...o,
          isEnable: true,
          isSelected: true,
        };
      } else {
        return {...o, isEnable: false, isSelected: false};
      }
    }),
  })),
  on(inspectorDetailsActions.SET_TAB_SELECTED, (state, {tab}) => ({
    ...state,
    step2: {
      ...state.step2,
      popTabSelected: tab,
    },
  })),
);
