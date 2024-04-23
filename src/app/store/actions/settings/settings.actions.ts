import {createAction, props} from '@ngrx/store';

import {AppSettings, Language} from '@appModels/store/settings/settings.model';

export const CHANGE_LANGUAGE = createAction(
  '[Settings] Change Language',
  props<{language: Language}>(),
);
export const SET_APPLICATION_CONFIGURATION = createAction(
  '[Settings] Set application configuration',
  props<{appSettings: AppSettings}>(),
);
export const SET_INITIALIZATION_COMPLETE = createAction(
  '[Settings] Set application initialization complete',
);
export const SET_BROWSER = createAction(
  '[Settings] Set browser',
  props<{currentBrowser: string}>(),
);
