import {QueryInfo} from 'api-catalogos';

export interface IFilters {
  Filters: IFilter[];
  GroupColumn?: string;
  SortDirection?: string;
  SortField?: string;
  desiredPage?: number;
  pageSize?: number;
  defineSort?(SortField: string, SortDirection: string): void;
}

export interface IFilter {
  NombreFiltro: string;
  ValorFiltro: any;
}

export class FiltersOnlyActive implements IFilters {
  Filters: IFilter[];
  GroupColumn?: string;
  SortDirection?: string;
  SortField?: string;
  desiredPage?: number;
  pageSize?: number;
  reloadStates?: boolean;
  constructor(private isActive?: boolean) {
    this.Filters = [
      {
        NombreFiltro: 'Activo',
        ValorFiltro: typeof isActive === 'undefined' ? true : isActive,
      },
    ];
    this.GroupColumn = '';
  }

  defineSort?(SortField: string, SortDirection: 'asc' | 'desc' = 'asc'): void {
    this.SortField = SortField;
    this.SortDirection = SortDirection;
  }
}

export interface IFilterDate {
  startDate: Date;
  endDate: Date;
}

export const queryInfoWithActiveFilter = (
  active: boolean = true,
  addActiveFilter: boolean = true,
): QueryInfo => ({
  Filters: addActiveFilter
    ? [
        {
          NombreFiltro: 'Activo',
          ValorFiltro: active,
        },
      ]
    : [],
});
