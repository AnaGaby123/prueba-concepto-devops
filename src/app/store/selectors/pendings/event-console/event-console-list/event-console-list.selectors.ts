import {createSelector} from '@ngrx/store';
import {selectEventConsole} from '@appSelectors/pendings/pendings.selectors';
import {ITabOption} from '@appModels/botonera/botonera-option';

export const selectEventConsoleList = createSelector(
  selectEventConsole,
  (state) => state.eventConsoleList,
);
export const selectOptionsTabs = createSelector(
  selectEventConsoleList,
  (state): Array<ITabOption> => {
    const tabs: Array<ITabOption> = [
      {
        id: '0',
        label: 'todas los eventos',
        activeSubtitle: true,
        labelSubtitle: 'eventos',
        totalSubtitle: 10,
      },
      {
        id: '1',
        label: 'entrega especial',
        activeSubtitle: true,
        labelSubtitle: 'eventos',
        totalSubtitle: 10,
      },
      {
        id: '2',
        label: 'recolección especial',
        activeSubtitle: true,
        labelSubtitle: 'eventos',
        totalSubtitle: 10,
      },
      {
        id: '3',
        label: 'aplicación de devolución',
        activeSubtitle: true,
        labelSubtitle: 'eventos',
        totalSubtitle: 10,
      },
      {
        id: '4',
        label: 'entrega en almacén',
        activeSubtitle: true,
        labelSubtitle: 'eventos',
        totalSubtitle: 10,
      },
    ];
    return tabs;
  },
);
export const selectOptionsOrderFEE = createSelector(
  selectEventConsoleList,
  (state) => state.orderDateData,
);
export const selectOptionsPriority = createSelector(
  selectEventConsoleList,
  (state) => state.filterPriority,
);
export const selectTab = createSelector(selectEventConsoleList, (state) => state.selectedTab);
