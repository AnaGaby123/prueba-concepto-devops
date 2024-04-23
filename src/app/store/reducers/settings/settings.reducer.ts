import {Action, createReducer, on} from '@ngrx/store';
import {SettingsState} from '@appModels/store/settings/settings.model';
import * as actions from '@appActions/settings/settings.actions';

export const initialState: SettingsState = {
  language: 'es',
  appSettings: {
    newClientName: null,
    googleMaps: {
      apiKey: null,
      styles: [],
      proquifaGuadalajara: null,
      clientPinImage: '',
      proquifaCDMX: null,
      proquifaPinImage: '',
    },
  },
  initializationComplete: false,
  currentBrowser: '',
};

const reducer = createReducer(
  initialState,
  on(actions.CHANGE_LANGUAGE, (state, action) => ({...state, ...action})),
  on(
    actions.SET_APPLICATION_CONFIGURATION,
    (state: SettingsState, {appSettings}): SettingsState => ({
      ...state,
      appSettings: {
        ...state.appSettings,
        ...appSettings,
      },
    }),
  ),
  on(
    actions.SET_INITIALIZATION_COMPLETE,
    (state: SettingsState): SettingsState => ({
      ...state,
      initializationComplete: true,
    }),
  ),
  on(actions.SET_BROWSER, (state, {currentBrowser}) => ({
    ...state,
    currentBrowser,
  })),
);

export function settingsReducer(state: SettingsState | undefined, action: Action) {
  return reducer(state, action);
}
