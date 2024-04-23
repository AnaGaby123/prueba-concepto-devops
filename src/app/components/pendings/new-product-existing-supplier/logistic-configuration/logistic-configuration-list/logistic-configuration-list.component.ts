// Core imports
import {Component, OnInit} from '@angular/core';
import {FilterOptionPqf} from '@appModels/filter-options-pqf/filter-option-pqf';
import {Store} from '@ngrx/store';

// imports actions
import {logisticConfigurationDetailsActions} from '@appActions/pendings/new-product-existing-supplier/logistic-configuration';
import {Observable} from 'rxjs';

// imports model
import {IFamilyLogisticConfiguration} from '@appModels/store/pendings/new-product-existing-supplier/logistic-configuration/logistic-configuration.model';

// imports selectors
import {logisticConfigurationDetailsSelectors} from '@appSelectors/pendings/new-product-existing-supplier/logistic-configuration';

//Util imports
import {debounce, isEmpty} from 'lodash-es';
import {IPopUp} from '@appModels/shared-components/pqf-pop-up';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-logistic-configuration-list',
  templateUrl: './logistic-configuration-list.component.html',
  styleUrls: ['./logistic-configuration-list.component.scss'],
})
export class LogisticConfigurationListComponent implements OnInit {
  searchTerm$: Observable<string> = this.store.select(
    logisticConfigurationDetailsSelectors.selectSearchTerm,
  );
  filterOptions$: Observable<Array<FilterOptionPqf>> = this.store.select(
    logisticConfigurationDetailsSelectors.selectFilterList,
  );
  apiStatusDashboard$: Observable<number> = this.store.select(
    logisticConfigurationDetailsSelectors.selectApiStatusDashboard,
  );

  isActivePopUp$: Observable<boolean> = this.store.select(
    logisticConfigurationDetailsSelectors.selectIsActivePopUp,
  );

  hasChangesFamilySelected$: Observable<boolean> = this.store.select(
    logisticConfigurationDetailsSelectors.selectHasChangesFamilySelected,
  );
  saveChangesValidation$: Observable<boolean> = this.store.select(
    logisticConfigurationDetailsSelectors.selectSaveChangesValidation,
  );

  selectFinishValidation$: Observable<boolean> = this.store.select(
    logisticConfigurationDetailsSelectors.selectFinishValidation,
  );
  configurationLogisticList$: Observable<Array<IFamilyLogisticConfiguration>> = this.store.select(
    logisticConfigurationDetailsSelectors.selectLogisticConfigurationList,
  );
  apiStatusDetails$: Observable<number> = this.store.select(
    logisticConfigurationDetailsSelectors.selectApiStatusDetails,
  );
  lodashIsEmpty = isEmpty;

  handleKeySearch = debounce(this.changeSearchTerm, DEFAULT_TIME_DEBOUNCE_SEARCH);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(logisticConfigurationDetailsActions.GET_INITIAL_CONFIGURATION());
  }

  ngOnDestroy(): void {
    this.store.dispatch(logisticConfigurationDetailsActions.CLEAN_DATA());
  }

  changeSearchTerm(searchTerm: string) {
    this.store.dispatch(logisticConfigurationDetailsActions.SET_SEARCH_TERM({searchTerm}));
  }

  setFilterSelected(filters: Array<FilterOptionPqf>) {
    this.store.dispatch(logisticConfigurationDetailsActions.SET_FILTER_SELECTED({filters}));
  }

  saveConfigurationLogistic(): void {
    this.store.dispatch(
      logisticConfigurationDetailsActions.FETCH_SAVE_DELIVERY_ROUTE({finisConfiguration: false}),
    );
  }

  finishConfigurationLogistic(): void {
    this.store.dispatch(
      logisticConfigurationDetailsActions.FETCH_SAVE_DELIVERY_ROUTE({finisConfiguration: true}),
    );
  }

  cancelConfigurationLogistic(): void {
    this.store.dispatch(logisticConfigurationDetailsActions.SHOW_POP_UP({value: true}));
  }

  eventPopUp(event: IPopUp): void {
    this.store.dispatch(logisticConfigurationDetailsActions.SET_EVENT_POP_UP({popUp: event}));
  }
}
