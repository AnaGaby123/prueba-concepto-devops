import {
  ICustomsAgentsList,
  initialStateCustomsAgentsList,
} from '@appModels/store/forms/custom-agents-forms/custom-agents-list-forms/custom-agents-list-forms.models';
import {
  ICustomsAgentsDetails,
  initialStateAgentsDetails,
} from '@appModels/store/forms/custom-agents-forms/custom-agents-details-forms/custom-agents-details-forms.models';

export const TITLE_HEADER = 'CATÁLOGO DE AGENTES ADUANALES';

export interface ICustomsAgents {
  isInDetails: boolean;
  enableEdit: boolean;
  title: string;
  editMode: boolean;
  allowToDetails: boolean;
  customsAgentsList: ICustomsAgentsList;
  customsAgentsDetails: ICustomsAgentsDetails;
}

export const initialStateCustomAgents = (): ICustomsAgents => ({
  isInDetails: false,
  enableEdit: false,
  title: TITLE_HEADER,
  editMode: false,
  allowToDetails: false,
  customsAgentsDetails: initialStateAgentsDetails(),
  customsAgentsList: initialStateCustomsAgentsList(),
});
