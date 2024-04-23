import {QueryResultAgenteAduanal} from 'api-catalogos';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface ICustomsAgentsList {
  searchTerm: string;
  filterOptions: Array<DropListOption>;
  filterOptionSelected: DropListOption;
  customsAgents: QueryResultAgenteAduanal;
}

export const initialStateCustomsAgentsList = (): ICustomsAgentsList => ({
  searchTerm: '',
  filterOptions: [
    {
      value: '0',
      label: 'Todos',
    },
    {
      label: 'Habilitados',
      value: '1',
    },
    {
      label: 'Deshabilitados',
      value: '2',
    },
  ],
  filterOptionSelected: {
    value: '0',
    label: 'Todos',
  },
  customsAgents: {TotalResults: 0, Results: []},
});
