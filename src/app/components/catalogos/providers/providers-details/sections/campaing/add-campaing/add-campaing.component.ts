import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';

// Actions
import {campaingsProviderActions} from '@appActions/forms/providers';

// Selectors
import {campaignsProviderSelectors} from '@appSelectors/forms/providers';
import * as catalogsSelectors from '@appSelectors/catalogs/catalogs.selectors';

// Models
import {
  Campana,
  QueryResultVMarca,
  QueryResultVProducto,
  VAgrupadorCaracteristica,
  VMarca,
  VMarcaFamilia,
  VProducto,
} from 'api-catalogos';
import {CampaignsViewConfigurations} from '@appModels/catalogos/providers/campaigns/campaigns';
import {IPageInfo} from '@iharbeck/ngx-virtual-scroller';

// Utils
import {debounce, findIndex, isEmpty, sumBy} from 'lodash-es';
import {CalendarDay} from '@appModels/calendario/calendar';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {
  currentDateWithHoursInZeroUTCFormatDate,
  currentDateWithoutHoursUTCFormatDate,
} from '@appUtil/dates';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-add-campaing',
  templateUrl: './add-campaing.component.html',
  styleUrls: ['./add-campaing.component.scss'],
})
export class AddCampaingComponent implements AfterViewInit, OnDestroy {
  FIELD_CAMPAING_BY = 'Campaña por';
  FIELD_CAMPAIGN_NAME = 'Nombre';
  FIELD_CAMPAIGN_START = 'FechaInicio';
  FIELD_CAMPAIGN_END = 'FechaFin';
  FIELD_CAMPAIGN_OBJECTIVE = 'Objetivo';
  FIELD_CAMPAIGN_MONEY_VALUE = 'ValorComisionDinero';
  FIELD_CAMPAIGN_PERCENTAGE_VALUE = 'ValorComisionPorcentaje';

  readonly FIELD_INPUT = 'input';
  readonly FIELD_DROP_LIST = 'dropList';
  readonly FIELD_DATE = 'date';
  readonly FIELD_GENERIC = 'textArea';

  itemsForCampaign$: Observable<Array<DropListOption>> = this.store.select(
    catalogsSelectors.selectCatTipoCampanaForDropDown,
  );
  filterItemSelected$: Observable<DropListOption> = this.store.select(
    campaignsProviderSelectors.selectCampaignFilterSelected,
  );
  editCampaign$: Observable<boolean> = this.store.select(campaignsProviderSelectors.editCampaign);
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  campaignGeneralData$: Observable<Campana> = this.store.select(
    campaignsProviderSelectors.selectCampaignGeneralData,
  );
  campaignDates$: Observable<Array<Date>> = this.store.select(
    campaignsProviderSelectors.selectDates,
  );
  viewConfigurations$: Observable<CampaignsViewConfigurations> = this.store.select(
    campaignsProviderSelectors.labelTexts,
  );

  apiStatusProducts$: Observable<number> = this.store.select(
    campaignsProviderSelectors.apiStatusProducts,
  );
  needsToReloadProducts$: Observable<boolean> = this.store.select(
    campaignsProviderSelectors.needsToReloadProducts,
  );
  products$: Observable<QueryResultVProducto> = this.store.select(
    campaignsProviderSelectors.getProducts,
  );
  itemsRelated$: Observable<
    Array<VProducto | VAgrupadorCaracteristica | VMarcaFamilia | VMarca>
  > = this.store.select(campaignsProviderSelectors.selectCampaignItemsRelated);
  trademark$: Observable<QueryResultVMarca> = this.store.select(
    campaignsProviderSelectors.getTrademark,
  );
  apiStatusTrademark$: Observable<number> = this.store.select(
    campaignsProviderSelectors.apiStatusTrademark,
  );
  classifications$: Observable<any> = this.store.select(
    campaignsProviderSelectors.getClassifications,
  );
  apiStatusClassifications$: Observable<number> = this.store.select(
    campaignsProviderSelectors.apiStatusClassifications,
  );
  familiesProvider$: Observable<any> = this.store.select(
    campaignsProviderSelectors.getFamiliesProvider,
  );
  apiStatusFamiliesProvider$: Observable<number> = this.store.select(
    campaignsProviderSelectors.apiStatusFamiliesProvider,
  );
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  readonly inputValidators = InputValidators;

  lodashIsEmpty = isEmpty;
  lodashFindIndex = findIndex;
  timer;
  productsVsUpdate: Array<VProducto> = [];
  itemsRelatedVsUpdate: Array<VProducto | any | VMarca> = [];
  trademarkVsUpdate: Array<VMarca> = [];
  classificationVsUpdate: Array<VAgrupadorCaracteristica> = [];
  familiesProviderVsUpdate: Array<VMarcaFamilia> = [];
  productsSum = 0;
  searchText = '';

  handleKeySearch = debounce(
    (data, viewConfigurations) => this.textSearchHandler(data, viewConfigurations),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  // Docs inicializador fecha actual sin horas para date picker
  rangeStart = currentDateWithoutHoursUTCFormatDate();

  constructor(private store: Store<AppState>) {}

  ngAfterViewInit(): void {
    this.store.dispatch(campaingsProviderActions.SET_DETAILS_BACKUP());
  }

  ngOnDestroy(): void {
    this.store.dispatch(campaingsProviderActions.INITIAL_STATE_ADD_CAMPAIGN());
  }

  getDataHandler(data, from: string): void {
    this.searchText = '';
    this.store.dispatch(campaingsProviderActions.GET_DATA_HANDLER_COMPONENT_EFFECT({data, from}));
  }

  textFieldHandler(fieldValueData, fieldName: string, typeField: string): void {
    let fieldValue =
      typeField === this.FIELD_DROP_LIST
        ? fieldValueData.id
        : typeField === this.FIELD_DATE
        ? currentDateWithHoursInZeroUTCFormatDate(fieldValueData).stringDate
        : fieldValueData;
    if (
      fieldName === this.FIELD_CAMPAIGN_MONEY_VALUE ||
      fieldName === this.FIELD_CAMPAIGN_PERCENTAGE_VALUE
    ) {
      fieldValue = Number(fieldValue);
    }
    this.store.dispatch(
      campaingsProviderActions.SET_FORM_GENERAL_DATA_BY_FIELD_NAME({
        fieldName,
        fieldValue,
      }),
    );
  }

  textSearchHandler(fieldValue: any, viewConfiguration: CampaignsViewConfigurations): void {
    this.searchText = fieldValue;
    this.store.dispatch(
      campaingsProviderActions.TEXT_SEARCH_HANDLER_COMPONENT_EFFECT({
        fieldValue,
        viewConfiguration,
      }),
    );
  }

  fetchMore(event: IPageInfo, CVC: CampaignsViewConfigurations): void {
    this.store.dispatch(
      campaingsProviderActions.FETCH_MORE_COMPONENT_EFFECT({
        event,
        listName: CVC.fetchMoreConfiguration.selectListName,
      }),
    );
  }

  addCampaignItemHandler(item: any, idByType: string): void {
    this.store.dispatch(campaingsProviderActions.ADD_CAMPAIGN_ITEM({item, idByType}));
  }

  removeCampaignItemHandler(item: any): void {
    this.store.dispatch(campaingsProviderActions.REMOVE_CAMPAIGN_ITEM({item}));
  }

  relatedProductsSum(items: Array<any>): number {
    this.productsSum = sumBy(items, (o) => o?.Productos || o?.TotalProductos);
    return this.productsSum;
  }

  setRadioOption(input: string): void {
    this.store.dispatch(campaingsProviderActions.SET_RADIO_VALUE({label: input}));
  }
}
