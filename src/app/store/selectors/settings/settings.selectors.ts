import {createSelector} from '@ngrx/store';

import {
  AppSettings,
  GoogleMaps,
  LocationCords,
  SettingsState,
} from '@appModels/store/settings/settings.model';
import {selectSettingsState} from '@appCore/core.state';

export const selectSettings = createSelector(selectSettingsState, (state: SettingsState) => state);

export const selectSettingsLanguage = createSelector(
  selectSettings,
  (state: SettingsState) => state.language,
);

export const selectAppSettings = createSelector(
  selectSettings,
  (state: SettingsState) => state.appSettings,
);
export const selectInitializationComplete = createSelector(
  selectSettings,
  (state: SettingsState) => state.initializationComplete,
);

export const selectNewClientName = createSelector(
  selectAppSettings,
  (state: AppSettings) => state.newClientName,
);
export const selectGoogleMapsConfiguration = createSelector(
  selectAppSettings,
  (state: AppSettings) => state.googleMaps,
);
export const selectApiKeyMaps = createSelector(
  selectGoogleMapsConfiguration,
  (state: GoogleMaps) => state.apiKey,
);
export const selectMapStyles = createSelector(
  selectGoogleMapsConfiguration,
  (state: GoogleMaps) => state.styles,
);
export const selectClientPinImage = createSelector(
  selectGoogleMapsConfiguration,
  (state: GoogleMaps) => state.clientPinImage,
);
export const selectProquifaPinImage = createSelector(
  selectGoogleMapsConfiguration,
  (state: GoogleMaps) => state.proquifaPinImage,
);
export const selectProquifaCdmx = createSelector(
  selectGoogleMapsConfiguration,
  (state: GoogleMaps) => state.proquifaCDMX,
);
export const selectProquifaGuadalajara = createSelector(
  selectGoogleMapsConfiguration,
  (state: GoogleMaps) => state.proquifaGuadalajara,
);
export const selectProquifaCdmxCords = createSelector(
  selectProquifaCdmx,
  (state: LocationCords) => state.cords,
);
export const selectProquifaGuadalajaraCords = createSelector(
  selectProquifaGuadalajara,
  (state: LocationCords) => state.cords,
);
export const selectCurrentBrowser = createSelector(
  selectSettings,
  (state: SettingsState): string => state.currentBrowser,
);
