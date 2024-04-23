import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {Observable} from 'rxjs';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {purchasePromiseDetailsActions} from '@appActions/pendings/purchase-promise';
import {purchasePromiseDetailsSelectors} from '@appSelectors/pendings/purchase-promise';
import {
  IClientRestrictions,
  IQuoteItem,
} from '@appModels/store/pendings/purchase-promise/purchase-promise-details/purchase-promise-details.models';
import {CalendarDay} from '@appModels/calendario/calendar';
import {GMPartidaPromesaDeCompra} from 'api-logistica';
import {IPopUpConfig} from '@appModels/popUp/pop-up.model';
import {QuoteItemExtension} from '@appModels/purchase-promise/QuoteItemExtension';
import {OfferFields} from '../../../../../models/store/forms/providers/providers-details/provider-form-step-8-offer.model';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  SeeItemDetailsPopBottom,
  SeeItemDetailsPopTop,
} from '@appModels/see-details-item-pop/see-item-details-pop.models';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-regular-pop',
  templateUrl: './regular-pop.component.html',
  styleUrls: ['./regular-pop.component.scss'],
})
export class RegularPopComponent {
  @ViewChildren('inputs') inputs: QueryList<ElementRef>;

  readonly viewTypes = AppViewTypes;
  readonly TEE_POP = 'tee';
  protected readonly OfferFields = OfferFields;
  readonly inputValidators = InputValidators;
  popUps: {
    seeMore: IPopUpConfig;
    usage: IPopUpConfig;
    payment: IPopUpConfig;
    code: IPopUpConfig;
    tee: IPopUpConfig;
    defaulter: IPopUpConfig;
    linked: IPopUpConfig;
  };
  viewType$: Observable<string> = this.store.select(selectViewType);
  iQuote$: Observable<GMPartidaPromesaDeCompra & QuoteItemExtension> = this.store.select(
    purchasePromiseDetailsSelectors.selectedIquoteItemDetails,
  );
  selectedPurchasePromises$: Observable<
    GMPartidaPromesaDeCompra & QuoteItemExtension
  > = this.store.select(purchasePromiseDetailsSelectors.selectedIquoteItemDetails);
  selectNonAvailableDays$: Observable<CalendarDay[]> = this.store.select(
    purchasePromiseDetailsSelectors.selectUnavailableDatesCalendarDay,
  );
  selectedDate$: Observable<Date> = this.store.select(
    purchasePromiseDetailsSelectors.selectPurchaseSelectedDate,
  );
  selectAddendaDeLineaDeOrden$: Observable<boolean> = this.store.select(
    purchasePromiseDetailsSelectors.selectAddendaDeLineaDeOrden,
  );

  selectInfoDetailsTop$: Observable<SeeItemDetailsPopTop> = this.store.select(
    purchasePromiseDetailsSelectors.selectDetailsItemPopTop,
  );

  selectDetailsItemPopBottom$: Observable<SeeItemDetailsPopBottom> = this.store.select(
    purchasePromiseDetailsSelectors.selectDetailsItemPopBottom,
  );
  selectListUnidad$: Observable<Array<DropListOption>> = this.store.select(
    purchasePromiseDetailsSelectors.selectListUnidad,
  );
  selectListUnidadPqf$: Observable<DropListOption | null> = this.store.select(
    purchasePromiseDetailsSelectors.selectListUnidadValue,
  );
  validateItemPop$: Observable<boolean> = this.store.select(
    purchasePromiseDetailsSelectors.validateItemPop,
  );
  rangeStart$: Observable<Date> = this.store.select(
    purchasePromiseDetailsSelectors.selectFEERangeStart,
  );
  selectFEERangeEnd$: Observable<Date> = this.store.select(
    purchasePromiseDetailsSelectors.selectFEERangeEnd,
  );
  clientRestrictions$: Observable<IClientRestrictions> = this.store.select(
    purchasePromiseDetailsSelectors.selectClientRestrictions,
  );
  selectFEE$: Observable<Date> = this.store.select(purchasePromiseDetailsSelectors.selectFEE);

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialogRef<RegularPopComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {item: GMPartidaPromesaDeCompra & QuoteItemExtension; i: number},
  ) {}

  onClose(pop: string, isOpen: boolean, target: any, emit?: boolean, item?: IQuoteItem): void {
    this.popUps = {
      ...this.popUps,
      [pop]: {
        isOpen,
        target,
      },
    };
    this.dialog.close({event: isOpen, pop, target, emit, item});
    // DOCS: Cuando se abre el modal
    // TODO: REVISAR SI SE CONSERVA
    /*    if (isOpen) {
      // TODO: Hacer algo cuando se abre el pop
      if (pop === this.TEE_POP) {
        if (item?.IdTPPartidaPedido) {
          // this.store.dispatch(
          //   checkoutDetailsActions.GET_ENTRY_POP_INFO_LOAD({
          //     IdTPPartidaPedido: item?.IdTPPartidaPedido,
          //   }),
          // );
        }
      }
      if (pop === this.CODE_POP) {
        // const request = await this.getRequest();
        // const procedureType = await this.getProcedureType();
        // TODO: Hacer foco solamente si ya existe una solicitud y es del tipo que se esta solicitando
        // if (!_.isEmpty(request) && request.TipoTramite === procedureType) {
        //   this.cdr.detectChanges();
        //   this.setFocus(0);
        // }
      }
    }*/
  }

  handleDate(value): void {
    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const dateString = date.toISOString();
    this.store.dispatch(
      purchasePromiseDetailsActions.SET_IQUOTE_ITEM_DATE_ESTIMATED_FEE({
        date,
        dateString,
      }),
    );
  }

  updateValue(node: string, value: string | number | boolean): void {
    this.store.dispatch(purchasePromiseDetailsActions.UPDATE_IQUOTE_ITEM({node, value}));
  }

  setSanofiValue2(field: string, value: DropListOption | string): void {
    this.store.dispatch(
      purchasePromiseDetailsActions.SET_SANOFI_VALUE_2({
        field,
        value: typeof value === 'string' ? value : value?.value,
      }),
    );
  }
}
