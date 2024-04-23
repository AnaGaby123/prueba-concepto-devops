/* Core Imports */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {lastValueFrom, Observable} from 'rxjs';
import {take} from 'rxjs/operators';

/* Tools Imports */
import {debounce} from 'lodash-es';

/* Models Imports */
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IDispatchOder} from '@appModels/store/pendings/purchasing-manager/register-arrival/register-arrival-details/register-arrival-details.models';

/* Actions Imports */
import {registerArrivalDetailsActions} from '@appActions/pendings/purchasing-manager/register-arrival';

/* Selectors Imports */
import {registerArrivalDetailsSelectors} from '@appSelectors/pendings/purchasing-manager/register-arrival';
import {DEFAULT_TIME_DEBOUNCE_SEARCH} from '@appUtil/common.protocols';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
})
export class BarcodeComponent implements OnInit, AfterViewInit {
  @ViewChild('barcodeInput') public barcodeInput: ElementRef;
  barcode: string;
  orderOptions$: Observable<Array<DropListOption>> = this.store.select(
    registerArrivalDetailsSelectors.selectOrderOptions,
  );
  orderSelected$: Observable<DropListOption> = this.store.select(
    registerArrivalDetailsSelectors.selectOrderSelected,
  );
  searchTerm$: Observable<string> = this.store.select(
    registerArrivalDetailsSelectors.selectSearchTerm,
  );
  isLoadingDispatchOrders$: Observable<boolean> = this.store.select(
    registerArrivalDetailsSelectors.selectIsLoadingDispatchOrders,
  );
  dispatchOrders$: Observable<Array<IDispatchOder>> = this.store.select(
    registerArrivalDetailsSelectors.selectDispatchOrders,
  );
  dispatchOrderSelected$: Observable<IDispatchOder> = this.store.select(
    registerArrivalDetailsSelectors.selectDispatchOrderSelected,
  );
  dispatchOrderStatus$: Observable<number> = this.store.select(
    registerArrivalDetailsSelectors.selectDispatchOrderstatus,
  );
  handleKeySearch = debounce(
    (value: string) => this.changeSearchTerm(value),
    DEFAULT_TIME_DEBOUNCE_SEARCH,
  );
  dispatchOrdersResults: Array<IDispatchOder> = [];

  constructor(private cdr: ChangeDetectorRef, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(registerArrivalDetailsActions.RESET_STEPS_COMPONENT());
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.focusInput();
  }

  focusInput(): void {
    this.barcodeInput.nativeElement.focus();
  }

  async handleBarcode(): Promise<void> {
    const dispatchOrderSelected: IDispatchOder = await lastValueFrom(
      this.store.pipe(select(registerArrivalDetailsSelectors.selectDispatchOrderSelected), take(1)),
    );
    if (this.barcode === dispatchOrderSelected.NumeroPedimento) {
      this.store.dispatch(
        registerArrivalDetailsActions.READ_BARCODE_LOAD({
          barcode: this.barcode,
        }),
      );
      this.barcode = '';
      this.focusInput();
    }
  }

  changeSearchTerm(searchTerm: string): void {
    this.store.dispatch(registerArrivalDetailsActions.SET_SEARCH_TERM({searchTerm}));
  }

  selectFilterByType(dataByTypeSelected: DropListOption): void {
    this.store.dispatch(registerArrivalDetailsActions.SET_ORDER_SELECTED({dataByTypeSelected}));
  }

  selectDispatchOrder(dispatchOrderSelected: IDispatchOder): void {
    this.store.dispatch(
      registerArrivalDetailsActions.SET_DISPATCH_ORDER_SELECTED({
        dispatchOrderSelected,
      }),
    );
  }
}
