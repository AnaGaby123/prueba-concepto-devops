import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {API_REQUEST_STATUS_DEFAULT} from '@appUtil/common.protocols';
import {Resumen} from 'api-logistica';

export interface IRegulatoryResearchDashboard {
  searchTerm: string;
  filters: Array<FilterOptionPqf>;
  listItems: Array<ProviderListItemForRegulatoryResearch>;
  apiStatus: number;
}

export const initialIRegulatoryResearchDashboard = (): IRegulatoryResearchDashboard => ({
  searchTerm: '',
  filters: [
    {
      id: '1',
      text: 'Más Recientes',
      isActive: true,
      enable: true,
    },
    {
      id: '2',
      text: 'Más Antiguos',
      isActive: false,
      enable: true,
    },
  ],
  listItems: [],
  apiStatus: API_REQUEST_STATUS_DEFAULT,
});

export interface ProviderListItemForRegulatoryResearch extends Resumen {
  EstadoInvestigacionEnRatificacion?: number;
  FechaRegistro?: string;
  IdCotCotizacion?: number;
  IdProveedor?: string;
  NombreProveedor?: string;
  Total?: number;
}
