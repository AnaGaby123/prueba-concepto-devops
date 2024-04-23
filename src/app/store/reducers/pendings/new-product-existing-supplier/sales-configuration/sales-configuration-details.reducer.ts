import {createReducer, on} from '@ngrx/store';
import {
  IFamiliesSalesConfig,
  initialISalesConfigurationDetailsState,
  ISalesConfigurationDetailsModel,
  IVMarcaFamiliaIndustriaObj,
} from '@appModels/store/pendings/new-product-existing-supplier/sales-configuration/sales-configuration-details.models';
import {salesConfigurationDetailsActions} from '@appActions/pendings/new-product-existing-supplier/sales-configuration';
import {map} from 'lodash-es';
import {ConfiguracionPrecioUtilidadCategoriaProveedorObj} from 'api-catalogos';
import * as actionsUtils from '@appActions/utils/utils.action';
import {ENUM_SECURE_POP} from '@appUtil/common.protocols';

export const salesConfigurationDetailsReducer = createReducer(
  initialISalesConfigurationDetailsState(),
  on(
    salesConfigurationDetailsActions.SET_TITLE,
    (state: ISalesConfigurationDetailsModel, {title}): ISalesConfigurationDetailsModel => ({
      ...state,
      title,
    }),
  ),
  on(
    salesConfigurationDetailsActions.SET_ENABLE_EDIT,
    (state: ISalesConfigurationDetailsModel, {enableEdit}): ISalesConfigurationDetailsModel => ({
      ...state,
      enableEdit,
    }),
  ),
  on(
    salesConfigurationDetailsActions.SET_SEARCH_TERM,
    (state: ISalesConfigurationDetailsModel, {searchTerm}): ISalesConfigurationDetailsModel => ({
      ...state,
      searchTerm,
      familiesList: [],
    }),
  ),
  on(
    salesConfigurationDetailsActions.SET_FILTERS,
    (state: ISalesConfigurationDetailsModel, {filters}): ISalesConfigurationDetailsModel => ({
      ...state,
      filters,
      familiesList: [],
    }),
  ),
  on(
    salesConfigurationDetailsActions.FETCH_FAMILIES_SUCCESS,
    (state: ISalesConfigurationDetailsModel, {families}): ISalesConfigurationDetailsModel => ({
      ...state,
      familiesList: families,
      selectedFamily: families[0],
    }),
  ),
  on(
    salesConfigurationDetailsActions.UPDATE_LIST_ITEMS_API_STATUS,
    (state: ISalesConfigurationDetailsModel, {status}): ISalesConfigurationDetailsModel => ({
      ...state,
      listItemsApiStatus: status,
    }),
  ),
  on(
    salesConfigurationDetailsActions.UPDATE_DETAILS_CONFIGURATION_STATUS,
    (state: ISalesConfigurationDetailsModel, {status}): ISalesConfigurationDetailsModel => ({
      ...state,
      detailsFamilyStatus: status,
    }),
  ),
  on(
    salesConfigurationDetailsActions.SET_SELECTED_FAMILY,
    (state: ISalesConfigurationDetailsModel, {family}): ISalesConfigurationDetailsModel => ({
      ...state,
      familiesList: map(
        state.familiesList,
        (o: IFamiliesSalesConfig): IFamiliesSalesConfig => {
          if (
            family.IdCotPartidaCotizacionInvestigacion === o.IdCotPartidaCotizacionInvestigacion
          ) {
            return {
              ...o,
              isSelected: true,
            };
          } else if (
            state.selectedFamily?.IdCotPartidaCotizacionInvestigacion ===
            o.IdCotPartidaCotizacionInvestigacion
          ) {
            return {...state.selectedFamily, isSelected: false};
          }
          return {...o, isSelected: false};
        },
      ),
      selectedFamily: family,
    }),
  ),
  on(
    salesConfigurationDetailsActions.FETCH_FAMILY_SELECTED_DETAILS_SUCCESS,
    (state: ISalesConfigurationDetailsModel, {configuration}): ISalesConfigurationDetailsModel => ({
      ...state,
      familiesList: map(
        state.familiesList,
        (o: IFamiliesSalesConfig): IFamiliesSalesConfig => {
          if (
            state.selectedFamily.IdCotPartidaCotizacionInvestigacion ===
            o.IdCotPartidaCotizacionInvestigacion
          ) {
            return {
              ...o,
              needsToReload: false,
            };
          }
          return {...o};
        },
      ),
      selectedFamily: {
        ...state.selectedFamily,
        needsToReload: false,
        configuration,
        configurationBackUp: configuration,
      },
    }),
  ),
  on(
    salesConfigurationDetailsActions.SET_PROVIDER_PERFORMANCE_VALUE,
    (state: ISalesConfigurationDetailsModel, {field, value, indexCatIndustryBrandFamily}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configuration: map(
          state.selectedFamily.configuration,
          (performance: IVMarcaFamiliaIndustriaObj, index): IVMarcaFamiliaIndustriaObj => {
            if (index === indexCatIndustryBrandFamily) {
              return {
                ...performance,
                ConfiguracionComisionProveedor: {
                  ...performance.ConfiguracionComisionProveedor,
                  [field]: value,
                },
                needsToSave: true,
                inRevision: true,
              };
            } else {
              return {...performance};
            }
          },
        ),
      },
    }),
  ),
  on(
    salesConfigurationDetailsActions.SET_ACTIVE_CONFIGURATION,
    (state: ISalesConfigurationDetailsModel, {value, indexCatIndustryBrandFamily}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configuration: map(
          state.selectedFamily.configuration,
          (performance: IVMarcaFamiliaIndustriaObj, index): IVMarcaFamiliaIndustriaObj => {
            if (index === indexCatIndustryBrandFamily) {
              return {
                ...performance,
                habilitado: value,
                Activo: value,
                needsToSave: value,
                inRevision: value,

                ConfiguracionPrecioUtilidadCategoriaProveedor:
                  value && performance.isOriginal
                    ? performance.ConfiguracionPrecioUtilidadCategoriaProveedor
                    : map(
                        performance.ConfiguracionPrecioUtilidadCategoriaProveedor,
                        (
                          o: ConfiguracionPrecioUtilidadCategoriaProveedorObj,
                        ): ConfiguracionPrecioUtilidadCategoriaProveedorObj => ({
                          ...o,
                          UtilidadNivelIngreso: null,
                        }),
                      ),
                ConfiguracionComisionProveedor: value
                  ? {
                      ...performance.ConfiguracionComisionProveedor,
                      Activo: value,
                    }
                  : {
                      ...performance.ConfiguracionComisionProveedor,
                      ComisionPharma: null,
                      ComisionFrenteComercial: null,
                      FactorDeCostoFijo: null,
                      Activo: value,
                    },
              };
            } else {
              return {...performance};
            }
          },
        ),
      },
    }),
  ),
  on(
    salesConfigurationDetailsActions.SET_PROVIDER_UTILITIES_CONFIGURATION_VALUE,
    (state: ISalesConfigurationDetailsModel, {field, value, indexCatIndustryBrandFamily}) => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configuration: map(
          state.selectedFamily.configuration,
          (performance: IVMarcaFamiliaIndustriaObj, index): IVMarcaFamiliaIndustriaObj => {
            if (index === indexCatIndustryBrandFamily) {
              return {
                ...performance,
                needsToSave: true,
                inRevision: true,
                ConfiguracionPrecioUtilidadCategoriaProveedor: map(
                  performance.ConfiguracionPrecioUtilidadCategoriaProveedor,
                  (o: ConfiguracionPrecioUtilidadCategoriaProveedorObj) => ({
                    ...o,
                    UtilidadNivelIngreso:
                      field === o.catNivelIngreso.NivelIngreso ? value : o.UtilidadNivelIngreso,
                  }),
                ),
              };
            } else {
              return {...performance};
            }
          },
        ),
      },
    }),
  ),

  on(
    salesConfigurationDetailsActions.RESTORE_BACKUP_SELECTED_FAMILY,
    (state: ISalesConfigurationDetailsModel): ISalesConfigurationDetailsModel => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configuration: state.selectedFamily.configurationBackUp,
      },
    }),
  ),
  on(
    salesConfigurationDetailsActions.ACTIVE_POP_UP,
    (state: ISalesConfigurationDetailsModel, {value}): ISalesConfigurationDetailsModel => ({
      ...state,
      isActivePop: value,
    }),
  ),
  on(
    salesConfigurationDetailsActions.ACTIVE_SECURE_CODE_POP_UP,
    (state: ISalesConfigurationDetailsModel, {value}): ISalesConfigurationDetailsModel => ({
      ...state,
      IsActiveSecureCodePop: value,
    }),
  ),
  on(
    salesConfigurationDetailsActions.RESET_SECURE_CODE_POP_UP,
    (state: ISalesConfigurationDetailsModel): ISalesConfigurationDetailsModel => ({
      ...state,
      authorizationObj: initialISalesConfigurationDetailsState().authorizationObj,
      secureCode: initialISalesConfigurationDetailsState().secureCode,
      IsActiveSecureCodePop: false,
    }),
  ),
  on(
    salesConfigurationDetailsActions.ACTIVE_SECURE_MESSAGE_CODE_POP_UP,
    (state: ISalesConfigurationDetailsModel, {value}): ISalesConfigurationDetailsModel => ({
      ...state,
      IsActiveMessageSecureCodePop: value,
    }),
  ),
  on(
    salesConfigurationDetailsActions.ACTIVE_DISCARD_SECURE_MESSAGE_CODE_POP_UP,
    (state: ISalesConfigurationDetailsModel, {value}): ISalesConfigurationDetailsModel => ({
      ...state,
      IsActiveDiscardMessageSecureCodePop: value,
    }),
  ),
  on(
    salesConfigurationDetailsActions.SET_PRESELECTED_FAMILY,
    (
      state: ISalesConfigurationDetailsModel,
      {preSelectedFamily},
    ): ISalesConfigurationDetailsModel => ({
      ...state,
      preSelectedFamily,
    }),
  ),
  on(
    salesConfigurationDetailsActions.SAVE_CONFIGURATION_SUCCESS,
    (
      state: ISalesConfigurationDetailsModel,
      {familyBrandIndustry},
    ): ISalesConfigurationDetailsModel => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configuration: map(
          state.selectedFamily.configuration,
          (o: IVMarcaFamiliaIndustriaObj): IVMarcaFamiliaIndustriaObj => {
            if (o.Index === familyBrandIndustry.Index) {
              return {
                ...o,
                ...familyBrandIndustry,
              };
            } else {
              return {...o};
            }
          },
        ),
      },
    }),
  ),
  on(
    salesConfigurationDetailsActions.SET_BACKUP_CONFIGURATION,
    (state: ISalesConfigurationDetailsModel): ISalesConfigurationDetailsModel => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configurationBackUp: state.selectedFamily.configuration,
      },
    }),
  ),
  on(
    salesConfigurationDetailsActions.SET_EVENT_SECURE_CODE_ARRAY,
    (state: ISalesConfigurationDetailsModel, {secureCode}): ISalesConfigurationDetailsModel => ({
      ...state,
      secureCode,
      authorizationObj: {
        ...state.authorizationObj,
        valid: null,
        status: ENUM_SECURE_POP.default,
      },
    }),
  ),
  on(
    actionsUtils.REQUEST_VALIDATION_CODE_SUCCESS,
    (state: ISalesConfigurationDetailsModel, {authorization}): ISalesConfigurationDetailsModel => ({
      ...state,
      authorizationObj: {
        ...state.authorizationObj,
        authorization,
      },
    }),
  ),
  on(
    actionsUtils.SEND_AUTHORIZATION_CODE_SUCCESS,
    (state: ISalesConfigurationDetailsModel, {valid}): ISalesConfigurationDetailsModel => ({
      ...state,
      authorizationObj: {
        ...state.authorizationObj,
        valid,
        status: valid ? ENUM_SECURE_POP.success : ENUM_SECURE_POP.error,
      },
    }),
  ),
  on(
    actionsUtils.SEND_AUTHORIZATION_CODE_FAILED,
    (state: ISalesConfigurationDetailsModel): ISalesConfigurationDetailsModel => ({
      ...state,
      authorizationObj: {
        ...state.authorizationObj,
        valid: false,
        status: ENUM_SECURE_POP.error,
      },
    }),
  ),
  on(
    salesConfigurationDetailsActions.SET_CODE_DIGIT,
    (state: ISalesConfigurationDetailsModel, {value}): ISalesConfigurationDetailsModel => ({
      ...state,
      authorizationObj: {
        ...state.authorizationObj,
        CodigoAutorizacion: value,
      },
    }),
  ),
  on(
    salesConfigurationDetailsActions.SET_INITIAL_STATE,
    (state: ISalesConfigurationDetailsModel): ISalesConfigurationDetailsModel =>
      initialISalesConfigurationDetailsState(),
  ),
);
