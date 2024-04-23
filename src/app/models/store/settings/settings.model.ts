import {AppState} from '@appCore/core.state';

export type Language = 'es' | 'en';

export interface State extends AppState {
  settings: SettingsState;
}

export interface SettingsState {
  language: string;
  appSettings: AppSettings;
  initializationComplete: boolean;
  currentBrowser: string;
}

export interface AppSettings {
  newClientName: string; // DOCS: Nombre genérico que recibe un prospecto de cliente
  googleMaps: GoogleMaps;
}

export interface GoogleMaps {
  apiKey: string;
  styles: Array<string>;
  clientPinImage: string;
  proquifaPinImage: string;
  proquifaCDMX: LocationCords;
  proquifaGuadalajara: LocationCords;
}

export interface LocationCords {
  cords: Cords;
  route: string;
}

export interface Cords {
  lat: string;
  lng: string;
}
