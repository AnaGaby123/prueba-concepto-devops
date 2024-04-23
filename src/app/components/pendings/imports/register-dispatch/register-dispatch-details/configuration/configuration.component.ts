import {Component, Input} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

// Models
import {IDispatchOrder} from '@appModels/store/pendings/imports/register-dispatch/register-dispatch-details/register-dispatch-details.models';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IUploadFile} from '@appModels/UploadFile/UploadFile';
import {IFile} from '@appModels/files/files.models';

// Actions
import {registerDispatchDetailsActions} from '@appActions/pendings/imports/register-dispatch';

// Selectors
import {registerDispatchDetailsSelectors} from '@appSelectors/pendings/imports/register-dispatch';

// Utils
import {map} from 'lodash-es';
import {lastValueFrom, Observable} from 'rxjs';
import {CalendarDay} from '@appModels/calendario/calendar';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {AppState} from '@appCore/core.state';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {
  readonly inputValidators = InputValidators;
  @Input() viewType: string;
  dispatchOrder$: Observable<IDispatchOrder> = this.store.select(
    registerDispatchDetailsSelectors.selectedDispatchOrder,
  );
  usersList$: Observable<Array<DropListOption>> = this.store.select(
    registerDispatchDetailsSelectors.selectUsersList,
  );
  hoursList$: Observable<Array<DropListOption>> = this.store.select(
    registerDispatchDetailsSelectors.selectHoursList,
  );
  minutesList$: Observable<Array<DropListOption>> = this.store.select(
    registerDispatchDetailsSelectors.selectMinutesList,
  );
  validatorForFinalizeButton$: Observable<boolean> = this.store.select(
    registerDispatchDetailsSelectors.validatorForFinalizeButton,
  );
  popAlert = false;
  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );

  constructor(private store: Store<AppState>) {}

  async handleDate(value: any, node: string): Promise<void> {
    const dateTimeRegex = /T[0-1][0-9]:[0-5][0-9]/;
    let newDate = '';
    const order: IDispatchOrder = await lastValueFrom(
      this.store.pipe(select(registerDispatchDetailsSelectors.selectedDispatchOrder), take(1)),
    );

    const year = value.substr(0, 4);
    const month = value.substr(4, 2);
    const day = value.substr(6, 2);
    const date = new Date(year, month - 1, day);
    const stringDate = date.toISOString();

    if (node === 'FechaHoraEstimadaArribo') {
      const enterHours = order.selectedEnterHrs?.label || '00';
      const enterMinutes = order.selectedEnterMinutes?.label || '00';
      newDate = stringDate.replace(dateTimeRegex, `T${enterHours}:${enterMinutes}`);
    } else {
      const outHours = order.selectedOutHrs?.label || '00';
      const outMinutes = order.selectedOutMinutes?.label || '00';
      newDate = stringDate.replace(dateTimeRegex, `T${outHours}:${outMinutes}`);
    }
    this.setFieldValue(`${node}Date`, date);
    this.setFieldValue(node, newDate);
  }

  setFieldValue(node: string, value: string | DropListOption | Date): void {
    this.store.dispatch(
      registerDispatchDetailsActions.SET_DISPATCH_ORDER_FIELD_VALUE({
        node,
        value,
      }),
    );
  }

  setPetitionFile(value: IUploadFile): void {
    this.store.dispatch(
      registerDispatchDetailsActions.SET_PETITION_FILE({
        file: value.file,
      }),
    );
  }

  setEvidenceFile(files: Array<IFile>): void {
    this.store.dispatch(
      registerDispatchDetailsActions.SET_EVIDENCE_FILES({
        files: map(files, (o: IFile) => o.file),
      }),
    );
  }

  openAlertModal(): void {
    this.popAlert = true;
  }

  closeAlertModal(event: boolean): void {
    this.popAlert = false;
    if (event) {
      this.store.dispatch(registerDispatchDetailsActions.FINALIZE_OD_LOAD());
    }
  }
}
