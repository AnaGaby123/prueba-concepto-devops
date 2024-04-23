import {ITabOption} from '@appModels/botonera/botonera-option';
import {AttributeDashboard, Resumen} from 'api-logistica';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';

export interface IAttendInvestigationList {
  tabOptionsApi?: Array<AttributeDashboard>;
  tabOptions: Array<ITabOption>;
  tabOptionSelected: ITabOption;
  listProviders: Array<IProvider>;
  listProviderStatus: number;
  activeChart: boolean;
}

export interface IProvider extends Resumen {
  Index?: number;
  IdProveedor: string;
  NombreProveedor: string;
  Total: number;
  EstadoInvestigacionNueva: number;
  EstadoInvestigacionEnEsperaDeRespuesta: number;
  EstadoInvestigacionPorreatender: number;
  IdCotCotizacion: number;
  FechaRegistro: Date;
}

export enum AttendInvestigationProductsStatus {
  Todos = 'Todos',
  PorInvestigar = 'Por investigar',
  Nueva = 'Nueva',
  Porreatender = 'Por reatender',
  Enesperaderespuesta = 'En espera de respuesta',
}

export enum AttendInvestigationProductsStatusKeys {
  Nueva = 'nueva',
  PorReatender = 'porreatender',
  EnEsperaDeRespuesta = 'enesperaderespuesta',
}

export enum AttendInvestigationApiResponse {
  Total = 'Total',
  EstadoInvestigacionNueva = 'EstadoInvestigacionNueva',
  EstadoInvestigacionPorreatender = 'EstadoInvestigacionPorreatender',
  EstadoInvestigacionEnEsperaDeRespuesta = 'EstadoInvestigacionEnEsperaDeRespuesta',
}

export const mapAttendInvestigationFromApi = {
  [AttendInvestigationProductsStatus.Todos]: AttendInvestigationApiResponse.Total,
  [AttendInvestigationProductsStatus.PorInvestigar]:
    AttendInvestigationApiResponse.EstadoInvestigacionNueva,
  [AttendInvestigationProductsStatus.Porreatender]:
    AttendInvestigationApiResponse.EstadoInvestigacionPorreatender,
  [AttendInvestigationProductsStatus.Enesperaderespuesta]:
    AttendInvestigationApiResponse.EstadoInvestigacionEnEsperaDeRespuesta,
};

export const initialAttendInvestigationTabOptions = (): Array<ITabOption> => [
  {
    id: '1',
    label: 'Todos',
    totalSubtitle: 0,
    activeSubtitle: true,
    labelSubtitle: 'Requisiciones',
  },
  {
    id: '2',
    label: 'Por investigar',
    totalSubtitle: 0,
    activeSubtitle: true,
    labelSubtitle: 'Productos',
  },
  {
    id: '3',
    label: 'En espera de respuesta',
    totalSubtitle: 0,
    activeSubtitle: true,
    labelSubtitle: 'Productos',
  },
];

export const initialIAttendInvestigationList = (): IAttendInvestigationList => ({
  listProviders: [] as Array<IProvider>,
  listProviderStatus: API_REQUEST_STATUS_DEFAULT,
  tabOptions: initialAttendInvestigationTabOptions(),
  tabOptionSelected: initialAttendInvestigationTabOptions()[0],
  activeChart: false,
});
