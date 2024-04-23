/* Core Imports */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

/* Models Imports */
import {IItemsFamily} from '@appModels/store/pendings/purchasing-manager/register-confirmation/register-confirmation-details/register-confirmation-details.models';
import {IItems} from '@appModels/store/pendings/purchasing-manager/check-oc-not-arrived/check-oc-not-arrived-details/check-oc-not-arrived-details.model';
import {IItem} from '@appModels/store/pendings/purchasing-manager/confirm-dispatch/confirm-dispatch-details/confirm-dispatch-details.models';

/* Actions Imports */
import {registerConfirmationDetailsActions} from '@appActions/pendings/purchasing-manager/register-confirmation';
import {checkOcNotArrivedDetailsActions} from '@appActions/pendings/purchasing-manager/check-oc-not-arrived';
import {confirmDispatchDetailsActions} from '@appActions/pendings/purchasing-manager/confirm-dispatch';

/* Common Imports */
import {
  CHECK_PURCHASE_ORDER,
  CONFIRM_DISPATCH,
  REGISTER_CONFIRMATION,
} from '@appUtil/common.protocols';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-cancel-form',
  templateUrl: './cancel-form.component.html',
  styleUrls: ['./cancel-form.component.scss'],
})
export class CancelFormComponent {
  @Input() arrayLength: number;
  @Input() isTheLastIndex: boolean;
  @Input() item: IItemsFamily | IItems | IItem;
  @Input() mainIndex: number;
  @Input() saveValidator: boolean;
  @Input() viewType: string;
  @Input() nameComponent = REGISTER_CONFIRMATION;
  @Output() cancelPressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() deletePressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() acceptPressed: EventEmitter<boolean> = new EventEmitter<boolean>();
  readonly appViewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;
  registerConfirmation = REGISTER_CONFIRMATION;

  constructor(private store: Store<AppState>) {}

  cancelConfig(): void {
    this.cancelPressed.emit(true);
  }

  deleteConfig(): void {
    this.deletePressed.emit(true);
  }

  saveConfig(): void {
    this.acceptPressed.emit(true);
  }

  saveInputValueRadio(field: string, value: boolean): void {
    if (this.nameComponent === REGISTER_CONFIRMATION) {
      this.store.dispatch(
        registerConfirmationDetailsActions.SET_ITEM_FIELD_VALUE_RADIO_BUTTON_CANCEL({
          i: this.mainIndex,
          itemNumber: this.item.NumberToSave,
          field,
          value,
        }),
      );
    } else if (this.nameComponent === CHECK_PURCHASE_ORDER) {
      this.store.dispatch(
        checkOcNotArrivedDetailsActions.SET_ITEM_FIELD_VALUE_RADIO_BUTTON_CANCEL({
          i: this.mainIndex,
          itemNumber: this.item.NumberToSave,
          field,
          value,
        }),
      );
    } else if (this.nameComponent === CONFIRM_DISPATCH) {
      this.store.dispatch(
        confirmDispatchDetailsActions.SET_ITEM_FIELD_VALUE_RADIO_BUTTON_CANCEL({
          i: this.mainIndex,
          itemNumber: this.item.NumberToSave,
          field,
          value,
        }),
      );
    }
  }

  saveInputValueString(field: string, value: string): void {
    if (this.nameComponent === REGISTER_CONFIRMATION) {
      this.store.dispatch(
        registerConfirmationDetailsActions.SET_ITEM_FIELD_VALUE_STRING_CANCEL({
          i: this.mainIndex,
          itemNumber: this.item.NumberToSave,
          field,
          value,
        }),
      );
    } else if (this.nameComponent === CHECK_PURCHASE_ORDER) {
      this.store.dispatch(
        checkOcNotArrivedDetailsActions.SET_ITEM_FIELD_VALUE_STRING_CANCEL({
          i: this.mainIndex,
          itemNumber: this.item.NumberToSave,
          field,
          value,
        }),
      );
    } else if (this.nameComponent === CONFIRM_DISPATCH) {
      this.store.dispatch(
        confirmDispatchDetailsActions.SET_ITEM_FIELD_VALUE_STRING_CANCEL({
          i: this.mainIndex,
          itemNumber: this.item.NumberToSave,
          field,
          value,
        }),
      );
    }
  }
}
