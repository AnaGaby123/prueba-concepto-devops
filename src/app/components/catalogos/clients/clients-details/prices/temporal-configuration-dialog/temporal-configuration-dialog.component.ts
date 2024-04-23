import {Component, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {pricesActions} from '@appActions/forms/client-form';
import {Observable} from 'rxjs';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {clientPricesSelectors} from '@appSelectors/forms/clients-form';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-temporal-configuration-dialog',
  templateUrl: './temporal-configuration-dialog.component.html',
  styleUrls: ['./temporal-configuration-dialog.component.scss'],
})
export class TemporalConfigurationDialogComponent {
  viewType$: Observable<string> = this.store.select(selectViewType);
  itemsConfig$: Observable<Array<DropListOption>> = this.store.select(
    clientPricesSelectors.selectConfigurationTypes,
  );
  itemConfigSelected$: Observable<DropListOption> = this.store.select(
    clientPricesSelectors.selectConfigurationTypeSelected,
  );

  readonly viewTypes = AppViewTypes;
  readonly alertConfig = 'Los cambios realizados aplican para una configuración';

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<TemporalConfigurationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  selectedOptionChange(event: DropListOption): void {
    this.store.dispatch(pricesActions.SET_CONFIGURATION_TYPE({value: event}));
  }

  onClose(event: boolean): void {
    this.dialog.close(event);
  }
}
