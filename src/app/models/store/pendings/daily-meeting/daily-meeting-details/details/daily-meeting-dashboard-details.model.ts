import {Resumen, VClienteCotizaciones} from 'api-logistica';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {AttributeDashboard} from 'api-catalogos';

export interface IDashboardClients {
  tabsOptionsApi?: Array<AttributeDashboard>;
  tabsOptions: Array<ITabOption>;
  tabSelectedMacBook: ITabOption;
  tabSelectedIpad: DropListOption;
  searchTerm: string;
  searchTypes: Array<DropListOption>;
  searchTypeSelected: DropListOption;
  typeFilterOptions: Array<DropListOption>;
  typeFilterOptionSelected: DropListOption;
  filterTabsMacBook: Array<ITabOption>;
  filterTabsIpad: Array<DropListOption>;
}

export interface IClientQuotation extends VClienteCotizaciones, Resumen {
  Index?: number | string;
  IdAjOfEstrategiaCotizacion: string;
  IdCliente: string;
  Nombre: string;
  Estrategia: string;
  Total: number;
  TotalCotizado: number;
  IdCotCotizacion: number;
  HorasCaducidadMasReciente: number;
  currency: string;
}

export interface SearchTypeOptions {
  label: string;
  value: string;
}

export const MapTabsStatus = ['Total', 'TieneContratotrue', 'TieneContratofalse'];
