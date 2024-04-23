import {Component, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {CalendarDay} from '@appModels/calendario/calendar';
import {ITabOption} from '@appModels/botonera/botonera-option';
import {dispatchMonitoringDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/dispatch-monitoring';
import {
  dispatchMonitoringActions,
  dispatchMonitoringDetailsActions,
} from '@appActions/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring.dictionaty.actions';

/* Tools Imports */
import {debounce, isEmpty} from 'lodash-es';

import {IProvidersDispatchMonitoring} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-list/dispatch-monitoring-list.models';
import {
  IGuidesDispatchMonitoring,
  IItem,
  IItemsConfigTotals,
  ITotalItems,
  STATUS,
} from '@appModels/store/pendings/purchasing-manager/dispatch-monitoring/dispatch-monitoring-details/dispatch-monitoring-details.models';
import {Archivo} from 'api-catalogos';
import {DOWLOAD_FILE_LOAD} from '@appActions/utils/utils.action';

import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {declareArrivalDetailsActions} from '@appActions/pendings/purchasing-manager/declare-arrival';
import {IProviderContact} from '@appModels/provider-contacts/provider-contacts.model';
import {currentDateWithoutHoursUTCFormatDate, dateWithHoursFormatDate} from '@appUtil/dates';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-dispatch-monitoring-details',
  templateUrl: './dispatch-monitoring-details.component.html',
  styleUrls: ['./dispatch-monitoring-details.component.scss'],
})
export class DispatchMonitoringDetailsComponent implements OnDestroy {
  selectedConfig: boolean;
  cancelButtonActive = false;
  cancelJustificacion = '';
  impactButtonActive = false;
  impactJustificacion = '';
  FEA = '';
  popCancel = false;
  popFee = false;
  confirm = false;
  configActive = '';
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  tabSelected$: Observable<ITabOption> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectTab,
  );
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectTabOptions,
  );
  searchTerm$: Observable<string> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectSearchTerm,
  );
  provider$: Observable<IProvidersDispatchMonitoring> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectProvider,
  );
  guideStatus$: Observable<number> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectGuideStatus,
  );
  guides$: Observable<Array<IGuidesDispatchMonitoring>> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectGuides,
  );
  guideSelected$: Observable<IGuidesDispatchMonitoring> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectGuideSelected,
  );
  items$: Observable<Array<IItem>> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectItems,
  );
  itemsStatus$: Observable<number> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectItemsStatus,
  );
  totalsItem$: Observable<ITotalItems> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectTotalOfItem,
  );
  configTotals$: Observable<IItemsConfigTotals> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectItemsConfiguredTotals,
  );
  selectCancelJustificacion$: Observable<any> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectCancelJustificacion,
  );
  selectImpacFeeConfig$: Observable<any> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectImpactFeeConfig,
  );
  selectGuideFile$: Observable<{IdArchivo; FileKey}> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectGuideFile,
  );
  selectPLFile$: Observable<{IdArchivo; FileKey}> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectPLFile,
  );
  providerContactSelected$: Observable<IProviderContact> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectedProviderContact,
  );
  selectContactsProvidersDropList$: Observable<Array<DropListOption>> = this.store.select(
    dispatchMonitoringDetailsSelectors.selectContactsProviderDropList,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  fileSelected: Archivo = {} as Archivo;
  isPdf = false;
  guidesScroll: Array<IGuidesDispatchMonitoring> = [];
  items: Array<IItem> = [];
  lodashIsEmpty = isEmpty;
  readonly STATUS = STATUS;
  status = STATUS;
  guideSelected;

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(
      dispatchMonitoringActions.SET_IS_IN_DETAILS_VIEW({
        isInDetailsView: false,
      }),
    );
    this.store.dispatch(
      dispatchMonitoringActions.SET_ALLOWED_TO_DETAILS_VALUE({
        allowedToDetails: false,
      }),
    );
    this.store.dispatch(dispatchMonitoringDetailsActions.CLEAN_ALL_DETAILS_STATE());
  }

  feaInitialDate(feaDateString: string): Date {
    const feaDate = currentDateWithoutHoursUTCFormatDate(dateWithHoursFormatDate(feaDateString));
    feaDate.setDate(feaDate.getDate() + 1);
    return feaDate;
  }

  handleTrackBy(index: number, item: any): string {
    return item.IdOcOrdenDeCompra;
  }

  setTab(tab: ITabOption): void {
    this.store.dispatch(dispatchMonitoringDetailsActions.SET_TAB_SELECTED({tab}));
  }

  changeItemsStatus(typeOfCheck): void {
    if (typeOfCheck === 'cancel') {
      this.popCancel = !this.popCancel;
      this.store.dispatch(dispatchMonitoringDetailsActions.CHECK_CANCEL_ITEMS({active: true}));
    } else if (typeOfCheck === 'withImpactFee') {
      this.popFee = !this.popFee;

      this.store.dispatch(dispatchMonitoringDetailsActions.CHECK_IMPACT_ITEMS({active: true}));
    } else {
      this.confirm = !this.confirm;
      this.selectedConfig = this.confirm;
      this.configActive = 'confirm';
      this.store.dispatch(
        dispatchMonitoringDetailsActions.CHECK_CONFIRM_ITEMS({
          active: this.confirm,
        }),
      );
      this.store.dispatch(dispatchMonitoringDetailsActions.CHECK_IMPACT_ITEMS({active: false}));
      this.store.dispatch(dispatchMonitoringDetailsActions.CHECK_CANCEL_ITEMS({active: false}));
    }
  }

  handelClousePop(pop: string, emit: boolean): void {
    if (pop === 'cancel') {
      if (emit) {
        if (this.cancelJustificacion !== '') {
          this.store.dispatch(
            dispatchMonitoringDetailsActions.ACCEPT_CANCEL_GUIDE({
              value: this.cancelJustificacion,
            }),
          );
          this.popCancel = !this.popCancel;
          this.confirm = false;
          this.store.dispatch(
            dispatchMonitoringDetailsActions.CHECK_CONFIRM_ITEMS({
              active: false,
            }),
          );
          this.store.dispatch(
            dispatchMonitoringDetailsActions.CHECK_IMPACT_ITEMS({
              active: false,
            }),
          );
        }
        this.selectedConfig = true;
        this.configActive = 'cancel';
      } else {
        this.cancelJustificacion = '';
        this.guideCancelConfiguration(this.cancelJustificacion);
        this.popCancel = !this.popCancel;
        this.store.dispatch(dispatchMonitoringDetailsActions.CHECK_CANCEL_ITEMS({active: false}));
      }
    } else {
      if (emit) {
        if (this.impactJustificacion !== '' && this.FEA !== '') {
          this.store.dispatch(
            dispatchMonitoringDetailsActions.ACCEPT_IMPORT_FEE_GUIDE({
              FEA: this.FEA,
              justificacion: this.impactJustificacion,
            }),
          );
          this.store.dispatch(
            dispatchMonitoringDetailsActions.CHECK_CANCEL_ITEMS({
              active: false,
            }),
          );
          this.store.dispatch(
            dispatchMonitoringDetailsActions.CHECK_CONFIRM_ITEMS({
              active: false,
            }),
          );
        }
        this.configActive = 'impact';
        this.selectedConfig = true;
        this.popFee = !this.popFee;
        this.confirm = false;
      } else {
        this.FEA = '';
        this.impactJustificacion = '';
        this.guideImpactConfiguration('');
        this.popFee = !this.popFee;
        this.store.dispatch(dispatchMonitoringDetailsActions.CHECK_IMPACT_ITEMS({active: false}));
      }
    }
  }

  handleTrackByItem(index: number, item: any): string {
    return item.tempId;
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(dispatchMonitoringDetailsActions.SET_SEARCH_TERM({searchTerm}));
  }

  selectGuide(index: string): void {
    if (index) {
      this.store.dispatch(dispatchMonitoringDetailsActions.SET_GUIDE_SELECTED({index}));
    }
  }

  guideCancelConfiguration(justificacion: string): void {
    this.cancelButtonActive = justificacion !== '';
    this.cancelJustificacion = justificacion;
  }

  guideFEADate(FEA): void {
    const year = FEA.substr(0, 4);
    const month = FEA.substr(4, 2);
    const day = FEA.substr(6, 2);
    const date = new Date(year, month - 1, day);
    this.FEA = date.toISOString();
  }

  guideImpactConfiguration(justificacion: string): void {
    this.impactJustificacion = justificacion;
    if (this.impactJustificacion !== '' && this.FEA !== '') {
      this.impactButtonActive = true;
    }
  }

  openFile({IdArchivo, FileKey}: {IdArchivo; FileKey}): void {
    this.store.dispatch(DOWLOAD_FILE_LOAD({IdArchivo, FileKey, newTab: true}));
  }

  sendGuideConfig(config: string): void {
    if (config === 'cancel') {
      this.store.dispatch(
        dispatchMonitoringDetailsActions.SET_SELECTED_GUIDE_CANCEL_CONFIGURATION(),
      );
    } else if (config === 'impact') {
      this.store.dispatch(
        dispatchMonitoringDetailsActions.SET_SELECTED_GUIDE_IMPACT_FEE_CONFIGURATION(),
      );
    } else if (config === 'confirm') {
      this.store.dispatch(dispatchMonitoringDetailsActions.SET_CONFIRM_GUIDE());
    }
  }

  setFile(file: File): void {
    this.store.dispatch(dispatchMonitoringDetailsActions.SET_FEE_FILE({file}));
  }

  setContactSelectedProvider(contactSelected: DropListOption): void {
    this.store.dispatch(
      declareArrivalDetailsActions.SET_SELECTED_CONTACT_PROVIDER({
        contactSelected,
      }),
    );
  }
}
