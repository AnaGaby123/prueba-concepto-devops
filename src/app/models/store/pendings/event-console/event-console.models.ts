import {
  IEventConsoleList,
  initialIEventConsoleList,
} from '@appModels/store/pendings/event-console/event-console-list/event-console-list.models';

export const TITLE_EVENT_CONSOLE = 'Consola de Eventos';

export interface IEventConsole {
  title: string;
  eventConsoleList: IEventConsoleList;
}

export const initialIEventConsole = () => ({
  title: TITLE_EVENT_CONSOLE,
  eventConsoleList: initialIEventConsoleList(),
});
