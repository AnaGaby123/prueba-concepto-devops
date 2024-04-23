/* Store Imports */
import {createSelector} from '@ngrx/store';

/* Models Imports */
import {
  IMenuOption,
  IModel,
  IPopFile,
  IPopNotes,
  UtilsState,
} from '@appModels/store/utils/utils.model';
import {CalendarDay} from '@appModels/calendario/calendar';

/* Utils Imports */
import {filter, find, flow, intersection, isEmpty, map as _map} from 'lodash-es';

import * as moment from 'moment';

/* Selectors Imports */
import {selectUtilsState} from '@appCore/core.state';
import {selectUser} from '@appSelectors/auth/auth.selectors';
import {UserInfo} from '@appModels/auth/user-info.model';

export const selectUtils = createSelector(
  selectUtilsState,
  (state: UtilsState): UtilsState => state,
);
export const selectUtilsLoading = createSelector(
  selectUtils,
  (state: UtilsState): boolean => state.loading,
);
export const selectMenuIsOpen = createSelector(
  selectUtils,
  (state: UtilsState): boolean => state.menuIsOpen,
);
export const selectSubmenuIsOpen = createSelector(
  selectUtils,
  (state: UtilsState): boolean => state.submenuIsOpen,
);
// DOCS: Obtiene el menu de opciones completo
export const selectMainMenuOptions = createSelector(
  selectUtils,
  (state: UtilsState): Array<IMenuOption> => state.mainMenuOptions,
);
// DOCS: Obtiene el menu de opciones filtrado por funciones y roles del usuario
export const selectMainMenuOptionsByUserPermissions = createSelector(
  [selectMainMenuOptions, selectUser],
  (mainMenuOptions: Array<IMenuOption>, user: UserInfo): Array<IMenuOption> => {
    const filterAllowedMenuOptions = (options: Array<IMenuOption>) =>
      filter(options, (option: IMenuOption) => {
        if (option.containOptions) {
          option.options = filterAllowedMenuOptions(option.options);
        }
        return (
          !isEmpty(intersection(option.allowedFunctions, user.Funciones)) &&
          !isEmpty(intersection(option.allowedRoles, user.Roles))
        );
      });

    const newMainMenuOptions = JSON.parse(JSON.stringify([...mainMenuOptions]));
    return filterAllowedMenuOptions(newMainMenuOptions);
  },
);
// DOCS: Obtiene la opción seleccionada del primer nivel
export const selectFirstLevelSelectedMenuOption = createSelector(
  selectMainMenuOptionsByUserPermissions,
  (state: IMenuOption[]): IMenuOption => state.find((o: IMenuOption) => o.active === true),
);
// DOCS: Obtiene las opciones de la opción del primer nivel seleccionada
export const selectOptionsOfFirstLevelSelectedMenuOption = createSelector(
  selectMainMenuOptionsByUserPermissions,
  (state: IMenuOption[]): Array<IMenuOption> =>
    flow(
      () => find(state, (o: IMenuOption) => o.active && o.showSubmenu),
      (menuOption: IMenuOption) => (!isEmpty(menuOption) ? menuOption.options : []),
    )(),
);
// DOCS: Obtiene la opción seleccionada del segundo nivel
export const selectedSecondLevelSelectedMenuOption = createSelector(
  selectOptionsOfFirstLevelSelectedMenuOption,
  (secondLevelOptions: Array<IMenuOption>): IMenuOption =>
    find(secondLevelOptions, (o: IMenuOption) => o.active),
);
// DOCS: Obtiene las opciones de la opción del segundo nivel seleccionada
export const selectOptionsOfSecondLevelSelectedMenuOption = createSelector(
  selectedSecondLevelSelectedMenuOption,
  (secondLevelOptions: IMenuOption): Array<IMenuOption> => secondLevelOptions?.options,
);
export const selectNonWorkingDays = createSelector(
  selectUtils,
  (state: UtilsState): Array<CalendarDay> => {
    return _map(state.nonWorkingDays, (o: string) => ({
      day: moment(o, 'YYYY-MM-DD').toDate(),
      enable: false,
    }));
  },
);
// DOCS: Indica si la opción seleccionada del primer nivel muestra un submenu
export const selectShowSubmenu = createSelector(
  selectFirstLevelSelectedMenuOption,
  (selectedOption: IMenuOption): boolean => selectedOption?.showSubmenu,
);
export const selectUtilsLoadingError = createSelector(
  selectUtils,
  (state: UtilsState): boolean => state.modalError.modalIsOpen,
);
export const selectMessageError = createSelector(
  selectUtils,
  (state: UtilsState): string => state.modalError.message,
);
export const selectUtilsLoadingSuccess = createSelector(
  selectUtils,
  (state: UtilsState): IModel => state.modalSuccess,
);
export const selectUtilModalFile = createSelector(
  selectUtils,
  (state: UtilsState): IPopFile => state.modalFile,
);
export const selectNotesPop = createSelector(
  selectUtils,
  (state: UtilsState): IPopNotes => state.notesPop,
);
export const selectViewType = createSelector(
  selectUtils,
  (state: UtilsState): string => state.viewType,
);
export const selectAppVersion = createSelector(
  selectUtils,
  (state: UtilsState): string => state.appVersion,
);
