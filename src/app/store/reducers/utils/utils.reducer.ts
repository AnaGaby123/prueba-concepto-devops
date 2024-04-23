import {Action, createReducer, on} from '@ngrx/store';
import {IMenuOption, initialUtilsState, UtilsState} from '@appModels/store/utils/utils.model';
import * as utils from '@appActions/utils/utils.action';
import {includes, map} from 'lodash-es';

export const initialState: UtilsState = {
  ...initialUtilsState(),
};

const reducer = createReducer(
  initialState,
  on(utils.SET_LOADING, (state, {payload}) => ({
    ...state,
    loading: payload,
  })),
  on(
    utils.SET_ACTIVE_A_MENU_OPTION,
    (state: UtilsState, {mainMenuOptions}): UtilsState => ({
      ...state,
      mainMenuOptions,
    }),
  ),
  on(
    utils.SET_MENU_IS_OPEN,
    (state: UtilsState, {isOpen}): UtilsState => ({
      ...state,
      menuIsOpen: isOpen,
    }),
  ),
  on(
    utils.SET_SUBMENU_IS_OPEN,
    (state: UtilsState, {isOpen}): UtilsState => ({
      ...state,
      submenuIsOpen: isOpen,
    }),
  ),
  on(utils.SET_FIRST_LEVEL_OPTION_FROM_MENU, (state, {selectedOption}) => ({
    ...state,
    mainMenuOptions: map(
      state.mainMenuOptions,
      (o: IMenuOption): IMenuOption => {
        if (o.title === selectedOption.title) {
          return {
            ...o,
            active: !o.active,
          };
        }
        return {
          ...o,
          active: false,
        };
      },
    ),
  })),
  on(
    utils.SET_LOADING_ERROR,
    (state: UtilsState, {active, message}): UtilsState => ({
      ...state,
      modalError: {modalIsOpen: active, message},
    }),
  ),
  on(
    utils.SET_LOADING_SUCCESS,
    (state: UtilsState, {active, message, extraMessage, successText}): UtilsState => ({
      ...state,
      modalSuccess: {
        modalIsOpen: active,
        message,
        extraMessage,
        successText: successText ? successText : state.modalSuccess.successText,
      },
    }),
  ),
  on(
    utils.SET_ACTIVE_MENUOPTIONS,
    (state: UtilsState, {url, roles}): UtilsState => {
      return {
        ...state,
        mainMenuOptions: map(state.mainMenuOptions, (option) => ({
          ...option,
          active: includes(url, option.url),
        })),
      };
    },
  ),
  on(
    utils.FETCH_NON_WORKING_DAYS_SUCCESS,
    (state: UtilsState, {nonWorkingDays}): UtilsState => ({
      ...state,
      nonWorkingDays,
    }),
  ),
  on(
    utils.SET_VIEW_TYPE,
    (state: UtilsState, {viewType, screenSize}): UtilsState => ({
      ...state,
      viewType,
      screenSize,
    }),
  ),
  on(
    utils.SET_IS_POP_FILE_EMAIL_OPEN,
    (state: UtilsState, {titleHeader}): UtilsState => ({
      ...state,
      modalFile: {
        ...state.modalFile,
        isLoading: true,
        modalIsOpen: true,
        titleHeader,
      },
    }),
  ),
  on(
    utils.SET_IS_POP_FILE_EMAIL_CLOSE,
    (state: UtilsState): UtilsState => ({
      ...state,
      modalFile: {
        ...state.modalFile,
        base64File: '',
        isLoading: false,
        modalIsOpen: false,
        titleHeader: '',
      },
    }),
  ),
  on(
    utils.VIEW_FILE_EMAIL_SUCCESS,
    (state: UtilsState, {fileBase64Email}): UtilsState => ({
      ...state,
      modalFile: {
        ...state.modalFile,
        base64File: fileBase64Email,
        isLoading: false,
      },
    }),
  ),
  on(
    utils.VIEW_FILE_ERROR,
    (state: UtilsState): UtilsState => ({
      ...state,
      modalFile: {
        ...state.modalFile,
        isLoading: false,
      },
    }),
  ),
  on(
    utils.SET_APP_VERSION,
    (state: UtilsState, {appVersion}): UtilsState => {
      return {
        ...state,
        appVersion,
      };
    },
  ),
  on(
    utils.SET_POP_UP_NOTES_DATA,
    (state: UtilsState, {modalIsOpen, notes}): UtilsState => ({
      ...state,
      notesPop: {
        ...state.notesPop,
        modalIsOpen,
        notes,
      },
    }),
  ),
);

export function utilsReducer(state: UtilsState | undefined, action: Action) {
  return reducer(state, action);
}
