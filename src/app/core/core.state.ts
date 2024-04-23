import {ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer} from '@ngrx/store';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';

import {environment} from '@env/environment';

import {initStateFromLocalStorage} from './meta-reducers/init-state-from-local-storage.reducer';

import {storeLogger} from '@zerops/ngrx-store-logger';

import {AuthState} from '@appModels/store/auth/auth.models';
import {authReducer} from '@appReducers/auth/auth.reducer';

import {CatalogsState} from '@appModels/store/catalogs/catalogs.models';
import {catalogsReducer} from '@appReducers/catalogs/catalogs.reducer';

import {UtilsState} from '@appModels/store/utils/utils.model';
import {utilsReducer} from '@appReducers/utils/utils.reducer';

import {SettingsState} from '@appModels/store/settings/settings.model';
import {settingsReducer} from '@appReducers/settings/settings.reducer';

import {RouterStateUrl} from './router/router.state';

import {
  AUTH_FEATURE_KEY,
  CATALOGS_FEATURE_KEY,
  ROUTER_FEATURE_KEY,
  SETTINGS_FEATURE_KEY,
  UTILS_FEATURE_KEY,
} from '@appUtil/common.protocols';
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [initStateFromLocalStorage];

if (!environment.production) {
  // metaReducers.unshift(logger); // TODO: library store-logger
  // metaReducers.unshift(debug); // TODO: custom store-logger
}

// Agregar el selector principal para cada nodo.
// TODO: Los cuáles se utilizarán para crear los selectores ya especificos.
export const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectSettingsState = createFeatureSelector<SettingsState>(SETTINGS_FEATURE_KEY);

export const selectCatalogsState = createFeatureSelector<CatalogsState>(CATALOGS_FEATURE_KEY);

export const selectUtilsState = createFeatureSelector<UtilsState>(UTILS_FEATURE_KEY);

export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>(
  ROUTER_FEATURE_KEY,
);

// Estado general del Store de Redux.
export interface AppState {
  [AUTH_FEATURE_KEY]: AuthState;
  [CATALOGS_FEATURE_KEY]: CatalogsState;
  [SETTINGS_FEATURE_KEY]: SettingsState;
  [UTILS_FEATURE_KEY]: UtilsState;
  [ROUTER_FEATURE_KEY]: RouterReducerState<RouterStateUrl>;
}

// Agregar todos los reducers que se vayan creando.
export const reducers: ActionReducerMap<AppState> = {
  [AUTH_FEATURE_KEY]: authReducer,
  [CATALOGS_FEATURE_KEY]: catalogsReducer,
  [SETTINGS_FEATURE_KEY]: settingsReducer,
  [UTILS_FEATURE_KEY]: utilsReducer,
  [ROUTER_FEATURE_KEY]: routerReducer,
};
