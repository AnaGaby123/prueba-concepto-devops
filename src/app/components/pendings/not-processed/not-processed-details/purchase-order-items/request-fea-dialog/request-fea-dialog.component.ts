import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

import {Observable} from 'rxjs';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {
  ICustomer,
  IOrderNotProcessed,
  IPpPartidaPedidoObjNotProcess,
} from '@appModels/store/pendings/not-processed/not-processed-details/not-processed-details.models';
import {notProcessedDetailsSelectors} from '@appSelectors/pendings/not-processed';
import {ProductsTypes} from '@appHelpers/pending/quotation/quotation.helpers';
import {buildStringFamily} from '@appUtil/strings';
import {IDropListMulti} from '@appModels/drop-list/drop-list-option';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {CalendarDay} from '@appModels/calendario/calendar';
import {currentDateWithoutHoursUTCFormatDate} from '@appUtil/dates';
import {notProcessedDetailActions} from '@appActions/pendings/not-processed';
import {ShoppingCartTotalsModel} from '@appModels/quotation/ShoppingCartTotals.model';
import {AVAILABILITY_TYPES} from '@appUtil/common.protocols';

@Component({
  selector: 'app-request-fea-dialog',
  templateUrl: './request-fea-dialog.component.html',
  styleUrls: ['./request-fea-dialog.component.scss'],
})
export class RequestFeaDialogComponent implements OnInit {
  @ViewChild('imageElement') imageElement: ElementRef;
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  customer$: Observable<ICustomer> = this.store.select(notProcessedDetailsSelectors.selectClient);
  order$: Observable<IOrderNotProcessed> = this.store.select(
    notProcessedDetailsSelectors.selectOrderSelected,
  );
  selectTotalsOrderSelected$: Observable<ShoppingCartTotalsModel> = this.store.select(
    notProcessedDetailsSelectors.selectTotalsOrderSelected,
  );
  validateRequestFEAPop$: Observable<boolean> = this.store.select(
    notProcessedDetailsSelectors.selectValidateRequestFEAPop,
  );
  selectCurrencyLabel$: Observable<string> = this.store.select(
    notProcessedDetailsSelectors.selectCurrencyLabel,
  );
  invalidateItems$: Observable<Array<IPpPartidaPedidoObjNotProcess>> = this.store.select(
    notProcessedDetailsSelectors.selectInvalidateItemsOrder,
  );
  contactsForDrop$: Observable<Array<IDropListMulti>> = this.store.select(
    notProcessedDetailsSelectors.selectClientContactsForDrop,
  );
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );
  validateProcessWithErrorsPop$: Observable<boolean> = this.store.select(
    notProcessedDetailsSelectors.selectValidateProcessWithErrorsPop,
  );

  errorImageNativeElement = false;
  defaultImageSource = 'assets/Images/clientes/logo_proquifa_hover.svg';
  imageNativeElement;
  availabilitytypes = AVAILABILITY_TYPES;
  productType = ProductsTypes;
  rangeStart = currentDateWithoutHoursUTCFormatDate();
  errors = [];
  readonly inputValidators = InputValidators;

  constructor(
    private store: Store<AppState>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialogRef<RequestFeaDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      activeGenericPop: boolean;
      activeWithErrors: boolean;
      activeRequestFEA: boolean;
    },
  ) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.imageNativeElement = this.renderer.selectRootElement(this.imageElement).nativeElement;
  }

  setImagePop(src?: string): string {
    if (src) {
      if (!this.errorImageNativeElement) {
        return src;
      } else {
        return this.defaultImageSource;
      }
    }
    return this.defaultImageSource;
  }

  errorImagePop(): void {
    if (!this.errorImageNativeElement) {
      this.renderer.setAttribute(this.imageNativeElement, 'src', this.defaultImageSource);
      this.errorImageNativeElement = true;
    }
    this.setImagePop();
  }

  buildStringFamily(type: string, subtype: string, control: string): string {
    return buildStringFamily(type, subtype, control, ' · ');
  }

  handleDate(value: any): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const stringDate = date.toISOString();
    this.store.dispatch(notProcessedDetailActions.SET_PPPEDIDO_FEA({date, stringDate}));
  }

  setComments(value: string): void {
    if (this.data?.activeRequestFEA) {
      this.store.dispatch(
        notProcessedDetailActions.SET_PPPEDIDO_OBSERVATIONS({
          observations: value,
        }),
      );
    }
    if (this.data?.activeWithErrors) {
      this.store.dispatch(
        notProcessedDetailActions.SET_DELIVERY_INSTRUCTIONS({
          instructions: value,
        }),
      );
    }
  }

  setContact(email: string): void {
    if (this.data?.activeRequestFEA) {
      this.store.dispatch(
        notProcessedDetailActions.SET_SELECTED_PPPEDIDO_CONTACT_FOR_DROP({
          email,
        }),
      );
    }
    if (this.data?.activeWithErrors) {
      this.store.dispatch(
        notProcessedDetailActions.SET_SELECTED_DELIVERY_CONTACT_FOR_DROP({
          email,
        }),
      );
    }
  }

  validateEmail(value: any) {
    if (value.errors) {
      this.errors.push({error: value});
    } else {
      this.errors = [];
    }
  }

  onClose(value: string, event: boolean): void {
    this.dialog.close({value, event});
  }
}
