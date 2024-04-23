import {createReducer, on} from '@ngrx/store';
import {
  IFamily,
  initialIPurchasingConfigurationDetailsState,
  IPurchasingConfigurationDetails,
  ITrademarkFamilyProviderConsolidation,
  IVMarcaFamilia,
} from '@appModels/store/pendings/new-product-existing-supplier/purchasing-configuration/purchasing-configuration-details.model';
import {purchasingConfigurationActions} from '@appActions/pendings/new-product-existing-supplier/purchasing-configuration';
import {filter, find, isEmpty, map as _map} from 'lodash-es';

import {OfferFields} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {DropListOptionPqf} from '@appModels/drop-down-list-pqf/drop-down-list-pqf';
import {ConceptoAgenteAduanal, MarcaFamiliaProveedorConsolidacion} from 'api-catalogos';
import {DEFAULT_DATE, DEFAULT_UUID} from '@appUtil/common.protocols';

export const purchasingConfigurationDetailsReducer = createReducer(
  initialIPurchasingConfigurationDetailsState(),
  on(
    purchasingConfigurationActions.SET_INITIAL_STATE,
    (state: IPurchasingConfigurationDetails): IPurchasingConfigurationDetails =>
      initialIPurchasingConfigurationDetailsState(),
  ),
  on(
    purchasingConfigurationActions.SET_SEARCH_TERM,
    (state: IPurchasingConfigurationDetails, {searchTerm}): IPurchasingConfigurationDetails => ({
      ...state,
      searchTerm,
      listFamilies: [],
    }),
  ),
  on(
    purchasingConfigurationActions.SET_FILTER_OPTIONS,
    (state: IPurchasingConfigurationDetails, {filterOptions}): IPurchasingConfigurationDetails => ({
      ...state,
      filters: filterOptions,
      listFamilies: [],
    }),
  ),
  on(
    purchasingConfigurationActions.SET_FAMILIES_LIST_STATUS,
    (state: IPurchasingConfigurationDetails, {status}): IPurchasingConfigurationDetails => ({
      ...state,
      listFamiliesStatus: status,
    }),
  ),
  on(
    purchasingConfigurationActions.SET_FAMILY_DETAILS_STATUS,
    (state: IPurchasingConfigurationDetails, {status}): IPurchasingConfigurationDetails => ({
      ...state,
      detailsFamilyStatus: status,
    }),
  ),
  on(
    purchasingConfigurationActions.FETCH_FAMILIES_LIST_LOAD,
    (state: IPurchasingConfigurationDetails): IPurchasingConfigurationDetails => ({
      ...state,
      selectedFamily: {},
    }),
  ),
  on(
    purchasingConfigurationActions.FETCH_FAMILIES_LIST_SUCCESS,
    (state: IPurchasingConfigurationDetails, {listFamilies}): IPurchasingConfigurationDetails => ({
      ...state,
      listFamilies,
    }),
  ),
  on(
    purchasingConfigurationActions.SET_TITLE,
    (state: IPurchasingConfigurationDetails, {title}): IPurchasingConfigurationDetails => ({
      ...state,
      title,
    }),
  ),
  on(
    purchasingConfigurationActions.ACTIVE_POP,
    (state: IPurchasingConfigurationDetails, {value}): IPurchasingConfigurationDetails => ({
      ...state,
      isActivePop: value,
    }),
  ),
  on(
    purchasingConfigurationActions.SET_PRESELECTED_FAMILY,
    (
      state: IPurchasingConfigurationDetails,
      {preSelectedFamily},
    ): IPurchasingConfigurationDetails => ({
      ...state,
      preSelectedFamily,
    }),
  ),
  on(
    purchasingConfigurationActions.RESTORE_BACKUP_SELECTED_FAMILY,
    (state: IPurchasingConfigurationDetails): IPurchasingConfigurationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configuration: state.selectedFamily.configurationBackUp,
      },
    }),
  ),
  on(
    purchasingConfigurationActions.SET_FAMILY_ITEM,
    (state: IPurchasingConfigurationDetails, {family}): IPurchasingConfigurationDetails => ({
      ...state,
      listFamilies: _map(
        state.listFamilies,
        (o: IFamily): IFamily => {
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
    purchasingConfigurationActions.FETCH_FAMILY_SELECTED_DETAILS_SUCCESS,
    (state: IPurchasingConfigurationDetails, {configuration}): IPurchasingConfigurationDetails => ({
      ...state,
      listFamilies: _map(
        state.listFamilies,
        (o: IFamily): IFamily => {
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
    purchasingConfigurationActions.SET_FAMILY_PROVIDER_PRICE_CONFIGURATION_VALUE,
    (state: IPurchasingConfigurationDetails, {field, value}): IPurchasingConfigurationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configuration: {
          ...state.selectedFamily.configuration,
          ConfiguracionPrecioProveedorFamilia: {
            ...state.selectedFamily.configuration.ConfiguracionPrecioProveedorFamilia,
            [field]: value,
          },
        },
      },
    }),
  ),
  on(
    purchasingConfigurationActions.SET_PROVIDER_PRICE_CONFIGURATION_VALUE,
    (state: IPurchasingConfigurationDetails, {field, value}): IPurchasingConfigurationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configuration: {
          ...state.selectedFamily.configuration,
          ConfiguracionPrecioProveedor: {
            ...state.selectedFamily?.configuration?.ConfiguracionPrecioProveedor,
            [field]: value,
          },
        },
      },
    }),
  ),
  on(
    purchasingConfigurationActions.SET_TRADEMARK_FAMILY_PROVIDER_CONFIGURATION_VALUE,
    (state: IPurchasingConfigurationDetails, {field, value}): IPurchasingConfigurationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configuration: {
          ...state.selectedFamily.configuration,
          MarcaFamiliaProveedor: {
            ...state.selectedFamily.configuration.MarcaFamiliaProveedor,
            [field]: value,
          },
          trademarkFamiliesList:
            field === OfferFields.AplicaConsolidacion
              ? value
                ? _map(
                    state.selectedFamily.configuration.trademarkFamiliesList,
                    (o: IVMarcaFamilia) => {
                      return {
                        ...o,
                        isSelected: !isEmpty(
                          find(
                            state.selectedFamily.configuration
                              .trademarkFamilyProviderConsolidationToDelete,
                            (it: ITrademarkFamilyProviderConsolidation) =>
                              it.IdMarcaFamilia === o.IdMarcaFamilia,
                          ),
                        ),
                      };
                    },
                  )
                : _map(
                    state.selectedFamily.configuration?.trademarkFamiliesList,
                    (o: IVMarcaFamilia) => ({
                      ...o,
                      isSelected: false,
                    }),
                  )
              : state.selectedFamily.configuration?.trademarkFamiliesList,
          trademarkFamilyProviderConsolidation:
            field === OfferFields.AplicaConsolidacion
              ? value /*DOCS: Esta marcando el check recuperar todos los elementos que se iban a eliminar*/
                ? [
                    ...state.selectedFamily.configuration?.trademarkFamilyProviderConsolidation,
                    ...state.selectedFamily.configuration
                      .trademarkFamilyProviderConsolidationToDelete,
                  ]
                : /*DOCS: Esta desmarcando el check vaciar todos los elementos*/
                  []
              : state.selectedFamily.configuration?.trademarkFamilyProviderConsolidation,
          trademarkFamilyProviderConsolidationToDelete:
            field === OfferFields.AplicaConsolidacion
              ? value /*DOCS: Se esta marcando el check, se vacía el arreglo ya que aquí solo llegaron elementos originales y se van a recuperar*/
                ? []
                : [
                    /*DOCS: Se esta desmarcando, se mantienen los que ya están y se agregan todos los elementos originales*/
                    ...state.selectedFamily.configuration
                      ?.trademarkFamilyProviderConsolidationToDelete,
                    ...filter(
                      state.selectedFamily.configuration?.trademarkFamilyProviderConsolidation,
                      (o) => o.isOriginal,
                    ),
                  ]
              : state.selectedFamily.configuration?.trademarkFamilyProviderConsolidationToDelete,
        },
      },
    }),
  ),
  on(
    purchasingConfigurationActions.SET_TRADEMARK_FAMILY_ITEM_IS_SELECTED,
    (state: IPurchasingConfigurationDetails, {item}): IPurchasingConfigurationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configuration: {
          ...state.selectedFamily.configuration,
          /*DOCS: Marcamos o desmarcamos el check en la lista que se le manda al drop*/
          trademarkFamiliesList: _map(
            state.selectedFamily.configuration.trademarkFamiliesList,
            (o: IVMarcaFamilia) => ({
              ...o,
              isSelected: o.IdMarcaFamilia === item.id ? !item.isSelected : o.isSelected,
            }),
          ),
          /*DOCS: Agregamos el elemento a lista que se va a guardar
              Si se esta seleccionando validamos si ya existe en los eliminados para restaurarlo*/
          trademarkFamilyProviderConsolidation: !item.isSelected
            ? find(
                state.selectedFamily.configuration.trademarkFamilyProviderConsolidationToDelete,
                (o: MarcaFamiliaProveedorConsolidacion) => o.IdMarcaFamilia === item.id,
              )
              ? [
                  ...state.selectedFamily.configuration.trademarkFamilyProviderConsolidation,
                  {
                    ...find(
                      state.selectedFamily.configuration
                        .trademarkFamilyProviderConsolidationToDelete,
                      (o: MarcaFamiliaProveedorConsolidacion) => o.IdMarcaFamilia === item.id,
                    ),
                    Activo: true,
                  },
                ]
              : [
                  // DOCS entra cuando es una nueva consolidación
                  ...state.selectedFamily.configuration.trademarkFamilyProviderConsolidation,
                  {
                    Activo: true,
                    FechaRegistro: DEFAULT_DATE,
                    FechaUltimaActualizacion: DEFAULT_DATE,
                    IdMarcaFamilia: item.id,
                    IdMarcaFamiliaProveedor: state.selectedFamily.IdMarcaFamiliaProveedor,
                    IdMarcaFamiliaProveedorConsolidacion: DEFAULT_UUID,
                    isChecked: !item.isSelected,
                    isOriginal: false,
                  },
                ]
            : /*DOCS: Si se esta desmarcando se elimina del arreglo*/
              filter(
                state.selectedFamily.configuration.trademarkFamilyProviderConsolidation,
                (o: ITrademarkFamilyProviderConsolidation) => o.IdMarcaFamilia !== item.id,
              ),
          /*DOCS: Si se esta desmarcando
             (validar si se tiene que agregar al arreglo de eliminados.*/
          trademarkFamilyProviderConsolidationToDelete: item.isSelected
            ? find(
                state.selectedFamily.configuration.trademarkFamilyProviderConsolidation,
                (o: ITrademarkFamilyProviderConsolidation) =>
                  o.IdMarcaFamilia === item.id && o.isOriginal,
              )
              ? [
                  ...state.selectedFamily.configuration
                    .trademarkFamilyProviderConsolidationToDelete,
                  {
                    /*DOCS: Agregamos el elemento al arreglo para eliminar, manteniendo todas sus propiedades
                únicamente desactivándolo*/
                    ...find(
                      state.selectedFamily.configuration.trademarkFamilyProviderConsolidation,
                      (o: ITrademarkFamilyProviderConsolidation) =>
                        o.IdMarcaFamilia === item.id && o.isOriginal,
                    ),
                    Activo: false,
                  },
                ]
              : state.selectedFamily.configuration.trademarkFamilyProviderConsolidationToDelete
            : filter(
                state.selectedFamily.configuration.trademarkFamilyProviderConsolidationToDelete,
                (o: ITrademarkFamilyProviderConsolidation) => o.IdMarcaFamilia !== item.id,
              ),
        },
      },
    }),
  ),
  on(
    purchasingConfigurationActions.SET_PRICE_lIST_TOGGLE_CHANGE,
    (state: IPurchasingConfigurationDetails, {value}): IPurchasingConfigurationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configuration: {
          ...state.selectedFamily.configuration,
          ConfiguracionPrecioProveedorFamilia: {
            ...state.selectedFamily.configuration.ConfiguracionPrecioProveedorFamilia,
            AplicaPorPieza: value,
            NumPiezas: value
              ? state.selectedFamily.configuration.ConfiguracionPrecioProveedorFamilia.NumPiezas
              : null,
            MontoMinimoOC: !value
              ? state.selectedFamily.configuration.ConfiguracionPrecioProveedorFamilia.MontoMinimoOC
              : 0,
          },
        },
      },
    }),
  ),
  on(
    purchasingConfigurationActions.SET_CUSTOMS_AGENT_CONFIGURATION_VALUE,
    (state: IPurchasingConfigurationDetails, {value, field}): IPurchasingConfigurationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configuration: {
          ...state.selectedFamily.configuration,
          /* DOCS: Se esta guardando un DropListOption que va en actualConfiguration y ConceptoAgenteAduanal */
          [field]: value as DropListOptionPqf,
          /* DOCS: Si cambia el valor de un drop del cual depende, se limpia el valor*/
          selectedCustoms:
            field === OfferFields.selectedCustomsAgent
              ? null
              : field === OfferFields.selectedCustoms
              ? (value as DropListOptionPqf)
              : state.selectedFamily.configuration.selectedCustoms,
          /* DOCS: Si cambia el valor de un drop del cual depende, se limpia el valor*/
          selectedCustomsAgentConcept:
            field === OfferFields.selectedCustomsAgent || field === OfferFields.selectedCustoms
              ? null
              : field === OfferFields.selectedCustomsAgentConcept
              ? (value as DropListOptionPqf)
              : state.selectedFamily.configuration.selectedCustomsAgentConcept,
          /* DOCS: Se cambian los Ids de los drops en ConceptoAgenteAduanal y ConfiguracionPrecioProveedor*/
          ConceptoAgenteAduanal:
            field === OfferFields.selectedCustomsAgent || field === OfferFields.selectedCustoms
              ? {}
              : find(
                  state.customsAgentsConceptList,
                  (o: ConceptoAgenteAduanal) =>
                    o.IdConceptoAgenteAduanal === (value as DropListOptionPqf).id.toString(),
                ),
          ConfiguracionPrecioProveedor: {
            ...state.selectedFamily.configuration.ConfiguracionPrecioProveedor,
            IdConceptoAgenteAduanal:
              field === OfferFields.selectedCustomsAgent || field === OfferFields.selectedCustoms
                ? null
                : field === OfferFields.selectedCustomsAgentConcept
                ? (value as DropListOptionPqf).id.toString()
                : state.selectedFamily.configuration.ConfiguracionPrecioProveedor
                    .IdConceptoAgenteAduanal,
          },
        },
      },
    }),
  ),
  on(
    purchasingConfigurationActions.GET_PROVIDER_CUSTOMS_AGENT_CONCEPT_SUCCESS,
    (
      state: IPurchasingConfigurationDetails,
      {customsAgentsConceptList},
    ): IPurchasingConfigurationDetails => ({
      ...state,
      customsAgentsConceptList,
    }),
  ),
  on(
    purchasingConfigurationActions.GET_TRADEMARK_FAMILIES_LIST_SUCCESS,
    (
      state: IPurchasingConfigurationDetails,
      {trademarkFamiliesList},
    ): IPurchasingConfigurationDetails => ({
      ...state,
      selectedFamily: {
        ...state.selectedFamily,
        configuration: {
          ...state.selectedFamily.configuration,
          trademarkFamiliesList,
        },
      },
    }),
  ),
  on(
    purchasingConfigurationActions.SAVE_CONFIGURATION_SUCCESS,
    (
      state: IPurchasingConfigurationDetails,
      {selectedFamily},
    ): IPurchasingConfigurationDetails => ({
      ...state,
      selectedFamily: {
        ...selectedFamily,
        configurationBackUp: selectedFamily.configuration,
      },
    }),
  ),
);
