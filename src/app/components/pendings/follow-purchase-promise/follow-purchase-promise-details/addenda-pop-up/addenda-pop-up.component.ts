import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {Store} from '@ngrx/store';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {checkoutDetailsActions} from '@appActions/pendings/checkout';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {checkoutDetailsSelectors} from '@appSelectors/pendings/checkout';
import {TpPedido} from 'api-logistica';

@Component({
  selector: 'app-addenda-pop-up',
  templateUrl: './addenda-pop-up.component.html',
  styleUrls: ['./addenda-pop-up.component.scss'],
})
export class AddendaPopUpComponent {
  viewType$: Observable<string> = this.store.select(selectViewType);
  selectTpPedido$: Observable<TpPedido> = this.store.select(
    checkoutDetailsSelectors.selectTpPedido,
  );
  contacts$: Observable<DropListOption[]> = this.store.select(
    checkoutDetailsSelectors.selectClientContactsForDropList,
  );
  selectClientEmail$: Observable<DropListOption> = this.store.select(
    checkoutDetailsSelectors.selectClientEmail,
  );
  isValid$: Observable<boolean> = this.store.select(
    checkoutDetailsSelectors.selectIsValidAddendaInfo,
  );

  readonly viewTypes = AppViewTypes;

  constructor(private store: Store) {}

  showEvent(isOpen: boolean): void {
    // DOCS: Al dar click en cancelar se hace backup
    if (!isOpen) {
      this.store.dispatch(checkoutDetailsActions.RESTORE_BACKUP_TP_ADDENDA_INFO());
    }
    this.store.dispatch(checkoutDetailsActions.OPEN_ADDENDA_POP_UP({isOpen: false}));
  }

  updateTpPedido(node: string, value: string): void {
    this.store.dispatch(checkoutDetailsActions.UPDATE_TP_PEDIDO({node, value}));
  }
}
