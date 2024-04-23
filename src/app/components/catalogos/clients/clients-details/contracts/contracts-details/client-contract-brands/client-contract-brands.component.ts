import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {VirtualScrollerComponent} from '@iharbeck/ngx-virtual-scroller';
import {Observable} from 'rxjs';
import {selectPaymentConditionsForDropDown} from '@appSelectors/catalogs/catalogs.selectors';
import {
  BrandItem,
  IContract,
  ITrademark,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {CalendarDay} from '@appModels/calendario/calendar';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {CoreContainerComponent} from '@appComponents/core-container/core-container.component';
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {debounce, isEmpty} from 'lodash-es';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
import {GET_CAT_PAYMENT_CONDITIONS_LOAD} from '@appActions/catalogs/catalogos.actions';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {clientContractsSelectors} from '@appSelectors/forms/clients-form';
import {
  currentDateWithHoursInZeroUTCFormatDate,
  currentDateWithoutHoursUTCFormatDate,
} from '@appUtil/dates';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

const FILE_NAME = 'contracts-center-sections.component.ts';

@Component({
  selector: 'app-client-contract-brands',
  templateUrl: './client-contract-brands.component.html',
  styleUrls: ['./client-contract-brands.component.scss'],
})
export class ClientContractBrandsComponent implements OnInit, AfterContentChecked {
  @Output() validateBtn: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild(VirtualScrollerComponent)
  private virtualScroller: VirtualScrollerComponent;
  itemsCondicionPago: Observable<any[]> = this.store.select(selectPaymentConditionsForDropDown);
  selectedPaymentCondition$: Observable<DropListOption> = this.store.select(
    clientContractsSelectors.selectedPaymentCondition,
  );
  brandsList$: Observable<BrandItem[]> = this.store.select(
    clientContractsSelectors.selectBrandsList,
  );
  brandsStatus$: Observable<number> = this.store.select(
    clientContractsSelectors.selectBrandsStatus,
  );
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  contrato$: Observable<IContract> = this.store.select(clientContractsSelectors.selectNewContract);
  brands: Array<BrandItem> = [];
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  lodashIsEmpty = isEmpty;
  rangeStart = currentDateWithoutHoursUTCFormatDate();
  scrollBrands: Array<BrandItem> = [];
  timer;

  constructor(
    private store: Store<AppState>,
    private core: CoreContainerComponent,
    private logger: NGXLogger,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(contractActions.GET_BRANDS_DATES_UPDATE());
    this.store.dispatch(contractActions.GET_INITIAL_DATA_CONTRACT_COMPONENT_EFFECT());
    this.store.dispatch(GET_CAT_PAYMENT_CONDITIONS_LOAD());
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  handleDate(value: any, type: string): void {
    const dates = currentDateWithHoursInZeroUTCFormatDate(value);
    this.store.dispatch(
      contractActions.SET_DATES_CONTRACT({
        typeDate: type,
        payload: {dateF: dates.stringDate, fecha: dates.date},
      }),
    );
  }

  changeSearchTerm(searchTerm): void {
    this.store.dispatch(
      contractActions.SET_SEARCH_TERM_BY_BRAND({
        searchTerm,
        queryInfo: {desiredPage: 1},
      }),
    );
    this.resetScroll();
  }

  setPaymentConditions(value: DropListOption): void {
    this.store.dispatch(
      contractActions.SET_ID_CONDICIONES_PAGO({
        IdCatCondicionesDePago: value.value.toString(),
      }),
    );
  }

  deleteMark(item: ITrademark): void {
    this.store.dispatch(contractActions.DELETE_BRAND({brand: item}));
  }

  resetScroll(): void {
    try {
      this.virtualScroller.scrollToPosition(0);
    } catch (e) {
      this.logger.debug(
        servicesLogger.generateMessage(FILE_NAME, '@resetScroll: No se puede scrollear'),
      );
    }
  }

  dropBrand(event: CdkDragDrop<ITrademark[]>): void {
    this.store.dispatch(
      contractActions.SET_BRAND({
        brand: event.item.data,
      }),
    );
  }

  handleAddBrand(brand: ITrademark): void {
    this.store.dispatch(
      contractActions.SET_BRAND({
        brand,
      }),
    );
  }
}
