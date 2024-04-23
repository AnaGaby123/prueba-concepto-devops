import {createSelector} from '@ngrx/store';
import {selectRegulatoryResearch} from '@appSelectors/pendings/new-product-existing-supplier/regulatory-research/regulatory-research.selectors';
import {IRegulatoryResearchState} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research.models';
import {
  IRegulatoryResearchDashboard,
  ProviderListItemForRegulatoryResearch,
} from '@appModels/store/pendings/new-product-existing-supplier/regulatory-research/regulatory-research-dashboard/regulatory-research-dashboard.models';
import {filter, flow, forEach, map} from 'lodash-es';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {AttributeDashboard, ResumeGroupQueryInfo} from 'api-logistica';
import {IDoughnutChart, IDoughnutChartDetails} from '@appModels/chart/chart';

export const selectRegulatoryResearchDashboard = createSelector(
  selectRegulatoryResearch,
  (state: IRegulatoryResearchState) => state.regulatoryResearchDashboard,
);
export const selectSearchTerm = createSelector(
  selectRegulatoryResearchDashboard,
  (state: IRegulatoryResearchDashboard): string => state.searchTerm,
);
export const selectFilterOptions = createSelector(
  selectRegulatoryResearchDashboard,
  (state: IRegulatoryResearchDashboard) => state.filters,
);
export const selectedFilterOption = createSelector(
  selectRegulatoryResearchDashboard,
  (state: IRegulatoryResearchDashboard): FilterOptionPqf =>
    filter(state.filters, (f: FilterOptionPqf) => f.isActive)[0],
);
export const selectProviderList = createSelector(
  selectRegulatoryResearchDashboard,
  (state: IRegulatoryResearchDashboard) => state.listItems,
);
export const selectApistatus = createSelector(
  selectRegulatoryResearchDashboard,
  (state: IRegulatoryResearchDashboard) => state.apiStatus,
);
export const dashboardListGroupQueryInfo = createSelector(
  [selectSearchTerm, selectedFilterOption],
  (searchTerm: string, filterOption: FilterOptionPqf): ResumeGroupQueryInfo => {
    let filters: ResumeGroupQueryInfo = {
      Filters: [],
      CountElements: [
        {
          NombreFiltro: 'Total',
          ValorFiltro: '',
        },
        {
          NombreFiltro: 'EstadoInvestigacion',
          ValorFiltro: 'En Ratificacion',
        },
      ],
      DistinctFields: [
        {
          NombreFiltro: 'IdCotCotizacion',
          ValorFiltro: '',
        },
      ],
      Fields: [
        {
          Campo: 'NombreProveedor',
        },
      ],
      GroupColumn: 'IdProveedor',
      SortField: 'FechaRegistro',
      SortDirection: filterOption.id === '1' ? 'asc' : 'desc',
    };
    if (searchTerm !== '') {
      filters.Filters.push({
        NombreFiltro: 'FiltradoPorNombreProveedor',
        ValorFiltro: searchTerm,
      });
    }
    return filters;
  },
);
export const selectMappedProviderList = createSelector(
  selectProviderList,
  (
    state: Array<ProviderListItemForRegulatoryResearch>,
  ): Array<ProviderListItemForRegulatoryResearch> => {
    return map(state, (o: ProviderListItemForRegulatoryResearch) => {
      const newObject = {...o};
      forEach(o.Atributos, (i: AttributeDashboard) => {
        newObject[i.DescriptionField] = i.ValueField;
      });
      return newObject;
    });
  },
);
export const selectDataDonutChart = createSelector(
  selectMappedProviderList,
  (list: Array<ProviderListItemForRegulatoryResearch>) => {
    let data: IDoughnutChart;
    const labels: Array<string> = [];
    const values: Array<number> = [];
    list.forEach((item: ProviderListItemForRegulatoryResearch) => {
      labels.push(item.NombreProveedor);
      values.push(item.Total);
    });
    data = {labels, values};
    return data;
  },
);
export const selectDoughnutChartOptionsDetails = createSelector(
  selectMappedProviderList,
  (list: Array<ProviderListItemForRegulatoryResearch>) =>
    flow([
      (): Array<IDoughnutChartDetails> => {
        let totalProv = 0;
        let totalPod = 0;
        let totalCot = 0;

        forEach(list, (o: ProviderListItemForRegulatoryResearch) => {
          totalProv++;
          totalPod += o.Total;
          totalCot += o.IdCotCotizacion;
        });
        return [
          {
            label: 'Proveedores',
            value: totalProv.toString(),
          },
          {
            label: 'Productos',
            value: totalPod.toString(),
          },
          {
            label: 'Cotizaciones',
            value: totalCot.toString(),
          },
        ];
      },
    ])(),
);
export const selectDoughnutOptionDetailHover = createSelector(
  selectMappedProviderList,
  (list: Array<ProviderListItemForRegulatoryResearch>) =>
    flow([
      (): Array<Array<IDoughnutChartDetails>> => {
        const data: Array<Array<IDoughnutChartDetails>> = [];
        forEach(list, (o: ProviderListItemForRegulatoryResearch) => {
          const details: Array<IDoughnutChartDetails> = [];
          details.push(
            {
              label: 'Productos',
              value: o.Total.toString(),
            },
            {
              label: 'Cotizaciones',
              value: o.IdCotCotizacion.toString(),
            },
          );
          data.push(details);
        });
        return data;
      },
    ])(),
);
