import {ActionReducer, createReducer, on} from '@ngrx/store';
import {
  IImpOrdenDespacho,
  initialNewVisitor,
  initialSecurityGuardDetailsState,
  IOcEnvio,
  ISecurityGuardDetails,
  ISegVisitaVisitanteDetalle,
} from '@appModels/store/pendings/security-guard/security-guard-details/security-guard-details.models';
import {
  securityGuardActions,
  securityGuardActionsDetails,
} from '@appActions/pendings/security-guard';
import {
  API_REQUEST_STATUS_FAILED,
  API_REQUEST_STATUS_LOADING,
  API_REQUEST_STATUS_SUCCEEDED,
  DEFAULT_DATE,
  DEFAULT_UUID,
} from '@appUtil/common.protocols';
import {concat, filter, find, map} from 'lodash-es';
import {SegVehiculoVisitante, SegVisitante} from 'api-logistica';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export const securityGuardDetailsReducer: ActionReducer<ISecurityGuardDetails> = createReducer(
  initialSecurityGuardDetailsState(),
  on(
    securityGuardActionsDetails.SET_SEARCH_TERM,
    (state: ISecurityGuardDetails, {searchTerm}): ISecurityGuardDetails => ({
      ...state,
      searchTerm,
      customAgentList: [],
      desiredPage: 1,
      totalItems: 0,
      selectedCustomAgent: null,
    }),
  ),

  on(
    securityGuardActionsDetails.SET_ACTUAL_STEP,
    (state: ISecurityGuardDetails, {actualStep}): ISecurityGuardDetails => ({
      ...state,
      actualStep,
    }),
  ),
  on(securityGuardActionsDetails.SET_TAB_SELECTED, (state, {tabSelected}) => ({
    ...state,
    tabSelected,
    customAgentList: [],
    selectedCustomAgent: null,
    desiredPage: 1,
    totalItems: 0,
    imageFile: '',
    visitorImage: {},
  })),

  on(
    securityGuardActionsDetails.FETCH_CUSTOM_AGENT_FAILED,
    (state: ISecurityGuardDetails): ISecurityGuardDetails => ({
      ...state,
      customLegendStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(
    securityGuardActionsDetails.FETCH_CUSTOMS_AGENT_LOAD,
    (state: ISecurityGuardDetails, {isFirstPage}): ISecurityGuardDetails => ({
      ...state,
      desiredPage: isFirstPage ? 1 : state.desiredPage + 1,
      customLegendStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    securityGuardActionsDetails.FETCH_CUSTOM_AGENT_SUCCESS,
    (state: ISecurityGuardDetails, {customAgentListResult, total}): ISecurityGuardDetails => ({
      ...state,
      customLegendStatus: API_REQUEST_STATUS_SUCCEEDED,
      customAgentList:
        state.desiredPage === 1
          ? customAgentListResult
          : concat(state.customAgentList, customAgentListResult),
      totalItems: total,
    }),
  ),
  on(
    securityGuardActionsDetails.SET_STATUS_CHARGER_IMAGE,
    (state: ISecurityGuardDetails, {statusImageCharger}): ISecurityGuardDetails => ({
      ...state,
      statusImageCharger,
    }),
  ),
  on(
    securityGuardActionsDetails.SET_OPTION_SELECTED,
    (state: ISecurityGuardDetails, {selectedCustomAgent}): ISecurityGuardDetails => ({
      ...state,
      selectedCustomAgent,
      packageImages: [],
      imageFile: '',
      visitorImage: {},
    }),
  ),
  on(
    securityGuardActionsDetails.FETCH_VISIT_LIST_FAILED,
    (state: ISecurityGuardDetails): ISecurityGuardDetails => ({
      ...state,
      customLegendStatus: API_REQUEST_STATUS_FAILED,
    }),
  ),
  on(
    securityGuardActionsDetails.FETCH_VISIT_LIST_LOAD,
    (state: ISecurityGuardDetails): ISecurityGuardDetails => ({
      ...state,
      customLegendStatus: API_REQUEST_STATUS_LOADING,
    }),
  ),
  on(
    securityGuardActionsDetails.FETCH_VISIT_LIST_SUCCESS,
    (state: ISecurityGuardDetails, {visitorList}): ISecurityGuardDetails => ({
      ...state,
      customLegendStatus: API_REQUEST_STATUS_SUCCEEDED,
      selectedCustomAgent: {
        ...state.selectedCustomAgent,
        visitorList,
        selectedNameVisitor: map(
          filter(
            visitorList,
            (i: SegVisitante) =>
              i.IdSegVisitante === state.selectedCustomAgent?.segVisitante?.IdSegVisitante,
          ),
          (o: SegVisitante) =>
            ({
              value: o.IdSegVisitante,
              label: o.NombreCompleto,
            } as DropListOption),
        )[0],
      },
    }),
  ),
  on(
    securityGuardActionsDetails.VIEW_FILE_SUCCESS,
    (state: ISecurityGuardDetails, {value}): ISecurityGuardDetails => ({
      ...state,
      visitorImage: {
        ...state.visitorImage,
        base64: value,
      },
      customLegendStatus: 3,
    }),
  ),
  on(
    securityGuardActionsDetails.SET_VISIT_LIST_SELECTED,
    (state: ISecurityGuardDetails, {payload}): ISecurityGuardDetails => ({
      ...state,
      selectedCustomAgent: {
        ...state.selectedCustomAgent,
        segVisitante: find(
          state.selectedCustomAgent?.visitorList,
          (o: SegVisitante) => o.IdSegVisitante === payload.value,
        ),
        selectedNameVisitor: payload,
        IdSegVisitante: payload.value.toString(),
      },
      imageFile: '',
      visitorImage: {},
    }),
  ),

  on(
    securityGuardActionsDetails.SET_IMAGE_SELECTED,
    (state: ISecurityGuardDetails, {file}): ISecurityGuardDetails => ({
      ...state,
      visitorImage: file,
      imageFile: '',
    }),
  ),
  on(
    securityGuardActionsDetails.CLEAN_FIELDS_VISITOR,
    (state: ISecurityGuardDetails): ISecurityGuardDetails => ({
      ...state,
      newVisitor: initialNewVisitor(),
    }),
  ),
  on(
    securityGuardActionsDetails.SUCCESS_SAVE_VISITOR,
    (state: ISecurityGuardDetails, {value, action}): ISecurityGuardDetails => ({
      ...state,
      newVisitor: initialNewVisitor(),
      selectedCustomAgent: {
        ...state.selectedCustomAgent,
        IdSegVisitante: value,
        segVisitante: action
          ? {...state.newVisitor, IdSegVisitante: value}
          : state.selectedCustomAgent.segVisitante,
      },
    }),
  ),
  on(
    securityGuardActionsDetails.SET_BACKUP_VISITOR_SELECTED,
    (state: ISecurityGuardDetails): ISecurityGuardDetails => ({
      ...state,
      backupVisitor: state.selectedCustomAgent.segVisitante,
    }),
  ),
  on(
    securityGuardActionsDetails.SET_RELOAD_BACKUP_VISITOR_SELECTED,
    (state: ISecurityGuardDetails): ISecurityGuardDetails => ({
      ...state,
      selectedCustomAgent: {
        ...state.selectedCustomAgent,
        segVisitante: state.backupVisitor,
      },
      imageFileBackUp: null,
      backupVisitor: null,
    }),
  ),
  on(
    securityGuardActionsDetails.SET_DATA_VISITOR,
    (state: ISecurityGuardDetails, {value, action, node}): ISecurityGuardDetails => ({
      ...state,
      selectedCustomAgent:
        action === 'edit'
          ? {
              ...state.selectedCustomAgent,
              segVisitante: {
                ...state.selectedCustomAgent?.segVisitante,
                [node]: value,
              },
            }
          : state.selectedCustomAgent,
      newVisitor:
        action === 'add'
          ? {
              ...state.newVisitor,
              [node]: value,
              IdCatOrigenVisitante:
                state.selectedCustomAgent?.catOrigenVisitante.IdCatOrigenVisitante,
            }
          : state.newVisitor,
    }),
  ),
  on(
    securityGuardActionsDetails.SET_VEHICLE_TYPE_SELECTED,
    (state: ISecurityGuardDetails, {payload}): ISecurityGuardDetails => ({
      ...state,
      selectedCustomAgent: {
        ...state.selectedCustomAgent,
        selectedVehicleType: payload,
        segVehiculoVisitante: {
          ...state.selectedCustomAgent?.segVehiculoVisitante,
          IdCatTipoVehiculo: payload.value.toString(),
        },
      },
    }),
  ),
  on(
    securityGuardActionsDetails.SET_VEHICLE_BRAND_SELECTED,
    (state: ISecurityGuardDetails, {payload}): ISecurityGuardDetails => ({
      ...state,
      selectedCustomAgent: {
        ...state.selectedCustomAgent,
        selectedVehicleBrand: payload,
        segVehiculoVisitante: {
          ...state.selectedCustomAgent?.segVehiculoVisitante,
          IdCatMarcaVehiculo: payload.value.toString(),
        },
      },
    }),
  ),
  on(
    securityGuardActionsDetails.SET_APPLICATION_VEHICLE,
    (state: ISecurityGuardDetails, {value}): ISecurityGuardDetails => ({
      ...state,
      selectedCustomAgent: {
        ...state.selectedCustomAgent,
        AplicaVehiculo: value,
        segVehiculoVisitante: state.selectedCustomAgent.AplicaVehiculo
          ? ({
              Color: '',
              IdCatMarcaVehiculo: null,
              IdSegVehiculoVisitante: DEFAULT_UUID,
              Placas: '',
              Activo: true,
              IdCatTipoVehiculo: null,
              FechaRegistro: DEFAULT_DATE,
              FechaUltimaActualizacion: DEFAULT_DATE,
            } as SegVehiculoVisitante)
          : state.selectedCustomAgent.segVehiculoVisitante,
        selectedVehicleBrand: null,
        selectedVehicleType: null,
      },
    }),
  ),
  on(
    securityGuardActionsDetails.SET_COLOR_VEHICLE,
    (state: ISecurityGuardDetails, {color}): ISecurityGuardDetails => ({
      ...state,
      selectedCustomAgent: {
        ...state.selectedCustomAgent,
        segVehiculoVisitante: {
          ...state.selectedCustomAgent?.segVehiculoVisitante,
          Color: color,
        },
      },
    }),
  ),
  on(
    securityGuardActions.SET_NEW_CONTACT,
    (state: ISecurityGuardDetails): ISecurityGuardDetails => ({
      ...state,
      visitorImage: {},
    }),
  ),
  on(
    securityGuardActionsDetails.SET_PLATES_VEHICLE,
    (state: ISecurityGuardDetails, {plates}): ISecurityGuardDetails => ({
      ...state,
      selectedCustomAgent: {
        ...state.selectedCustomAgent,
        segVehiculoVisitante: {
          ...state.selectedCustomAgent?.segVehiculoVisitante,
          Placas: plates,
        },
      },
    }),
  ),
  on(
    securityGuardActionsDetails.SET_COMMENT_GUIDE,
    (state: ISecurityGuardDetails, {comment, incidence}): ISecurityGuardDetails => ({
      ...state,
      selectedCustomAgent: {
        ...state.selectedCustomAgent,
        guideSelected: {
          ...state.selectedCustomAgent.guideSelected,
          ComentariosIncidencia: comment,
          Incidencias: incidence,
        },
      },
    }),
  ),
  on(
    securityGuardActionsDetails.SET_ARRAY_IMAGES,
    (state: ISecurityGuardDetails, {images}): ISecurityGuardDetails => ({
      ...state,
      packageImages: images,
    }),
  ),
  on(
    securityGuardActionsDetails.SET_SUCCESS_VISIT_DATA,
    (state: ISecurityGuardDetails, {selectedCustomAgent}): ISecurityGuardDetails => ({
      ...state,
      selectedCustomAgent,
      customAgentList: map(state.customAgentList, (o: ISegVisitaVisitanteDetalle) => {
        return o.IdSegVisitaVisitante === selectedCustomAgent.IdSegVisitaVisitante
          ? selectedCustomAgent
          : o;
      }),
      packageImages: [],
    }),
  ),
  on(
    securityGuardActionsDetails.SET_ERROR_POP,
    (state: ISecurityGuardDetails, {value}): ISecurityGuardDetails => ({
      ...state,
      errorPop: value,
    }),
  ),
  on(
    securityGuardActionsDetails.SUCCESS_TOTALS_FILTERS,
    (state: ISecurityGuardDetails, {totals}): ISecurityGuardDetails => ({
      ...state,
      tabSteps: map(state.tabSteps, (o: ITabOption) => {
        return o.id === '1'
          ? {
              ...o,
              totalSubtitle: totals.Total,
            }
          : o.id === '2'
          ? {
              ...o,
              totalSubtitle: totals.Fleteras,
            }
          : {
              ...o,
              totalSubtitle: totals.AA,
            };
      }),
    }),
  ),
  on(
    securityGuardActionsDetails.SET_GUIDE_VISIT,
    (state: ISecurityGuardDetails, {guide}): ISecurityGuardDetails => ({
      ...state,
      selectedCustomAgent: {
        ...state.selectedCustomAgent,
        guideSelected: guide,
        ListaimpOrdenDespacho:
          state.selectedCustomAgent.ListaimpOrdenDespacho.length > 0
            ? map(state.selectedCustomAgent.ListaimpOrdenDespacho, (o: IImpOrdenDespacho) => {
                if (o.IdImpOrdenDespacho === guide.IdImpOrdenDespacho) {
                  return {...o, isSelected: true};
                }
                return {...o, isSelected: false};
              })
            : [],
        ListaocEnvioList:
          state.selectedCustomAgent.ListaocEnvioList.length > 0
            ? map(state.selectedCustomAgent.ListaocEnvioList, (o: IOcEnvio) => {
                if (o.IdOcEnvio === guide.IdOcEnvio) {
                  return {...o, isSelected: true};
                }
                return {...o, isSelected: false};
              })
            : [],
      },
      packageImages: [],
    }),
  ),
  on(
    securityGuardActionsDetails.SET_STATUS_CHARGER,
    (state: ISecurityGuardDetails, {status}): ISecurityGuardDetails => ({
      ...state,
      customLegendStatus: status,
    }),
  ),
  on(
    securityGuardActionsDetails.SET_INITIAL_STATE,
    (state: ISecurityGuardDetails): ISecurityGuardDetails => initialSecurityGuardDetailsState(),
  ),
);
