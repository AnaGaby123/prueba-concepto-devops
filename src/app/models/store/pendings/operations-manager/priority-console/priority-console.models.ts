/* Models Imports */
import {
  initialIPriorityConsoleList,
  IPriorityConsoleList,
} from '@appModels/store/pendings/operations-manager/priority-console/priority-console-list/priority-console-list.models';

export const TITLE_PRIORITY_CONSOLE = 'Consola De Prioridades';

export interface IPriorityConsole {
  title: string;
  isInDetailsView: boolean;
  allowedToDetails: boolean;
  priorityConsoleList: IPriorityConsoleList;
}

export const initialIlPriorityConsole = (): IPriorityConsole => ({
  title: TITLE_PRIORITY_CONSOLE,
  isInDetailsView: false,
  allowedToDetails: false,
  priorityConsoleList: initialIPriorityConsoleList(),
});
