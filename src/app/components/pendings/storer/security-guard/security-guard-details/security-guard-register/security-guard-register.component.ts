import {Component} from '@angular/core';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {
  securityGuardActions,
  securityGuardActionsDetails,
} from '@appActions/pendings/security-guard';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {lastValueFrom, Observable} from 'rxjs';
import {
  securityGuardDetailsSelectors,
  securityGuardSelectors,
} from '@appSelectors/pendings/security-guard';
import {SegVisitante} from 'api-logistica';
import {
  selectListVehicleBrandForDropDown,
  selectListVehicleTypeForDropDown,
} from '@appSelectors/catalogs/catalogs.selectors';
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import {ISegVisitaVisitanteDetalle} from '@appModels/store/pendings/security-guard/security-guard-details/security-guard-details.models';
import {take} from 'rxjs/operators';
import {IFile} from '@appModels/files/files.models';
import {InputValidators} from '@appHelpers/shared/shared.helpers';

@Component({
  selector: 'app-security-guard-register',
  templateUrl: './security-guard-register.component.html',
  styleUrls: ['./security-guard-register.component.scss'],
})
export class SecurityGuardRegisterComponent {
  constructor(private store: Store<AppState>) {}

  showPopEmptyFields = false;
  readonly inputValidators = InputValidators;
  selectVisitorList$: Observable<Array<DropListOption>> = this.store.select(
    securityGuardDetailsSelectors.selectLisVisitorListForDropDown,
  );
  selectSelectVisitNameSelected$: Observable<DropListOption> = this.store.select(
    securityGuardDetailsSelectors.selectSelectedVisitName,
  );
  selectSelectVehicleType$: Observable<DropListOption> = this.store.select(
    securityGuardDetailsSelectors.selectSelectedVehicleType,
  );
  selectedVisit$: Observable<ISegVisitaVisitanteDetalle> = this.store.select(
    securityGuardDetailsSelectors.selectItemCustomAgentList,
  );
  segVisitorData$: Observable<SegVisitante> = this.store.select(
    securityGuardDetailsSelectors.selectSegVisitorData,
  );
  newSegVisitorData$: Observable<any> = this.store.select(
    securityGuardDetailsSelectors.selectNewVisitorData,
  );
  selectSelectVehicleBrand$: Observable<DropListOption> = this.store.select(
    securityGuardDetailsSelectors.selectSelectedVehicleBrand,
  );
  dropdownListVehicleType$: Observable<DropListOption[]> = this.store.select(
    selectListVehicleTypeForDropDown,
  );
  dropdownListVehicleBrand$: Observable<DropListOption[]> = this.store.select(
    selectListVehicleBrandForDropDown,
  );
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);
  newVisitant$: Observable<boolean> = this.store.select(securityGuardSelectors.newVisitant);
  editMode$: Observable<boolean> = this.store.select(securityGuardSelectors.selectEditMode);
  imageFile$: Observable<IFile> = this.store.select(
    securityGuardDetailsSelectors.selectImageVisitorData,
  );
  apiStatusImage$: Observable<number> = this.store.select(
    securityGuardDetailsSelectors.selectStatusImageCharger,
  );

  addNewUser(): void {
    this.store.dispatch(securityGuardActions.SET_NEW_CONTACT({newContact: true}));
    this.store.dispatch(securityGuardActions.SET_EDIT_MODE({editMode: true}));
  }

  imageSource(imageId: string): any {
    if (imageId !== null) {
      this.store.dispatch(securityGuardActionsDetails.VIEW_FILE_LOAD({value: imageId}));
    }
  }

  completeName(event: DropListOption): void {
    this.store.dispatch(
      securityGuardActionsDetails.SET_VISIT_LIST_SELECTED({
        payload: event,
      }),
    );
  }

  async cancelEdit(): Promise<void> {
    const cancelPopValue = await lastValueFrom(
      this.store.pipe(
        select(securityGuardDetailsSelectors.selectValidationChangeSegVisitor),
        take(1),
      ),
    );

    if (cancelPopValue) {
      const newVisitor: boolean = await lastValueFrom(
        this.store.pipe(select(securityGuardSelectors.newVisitant), take(1)),
      );
      if (!newVisitor) {
        this.store.dispatch(securityGuardActionsDetails.SET_RELOAD_BACKUP_VISITOR_SELECTED());
      }
      this.store.dispatch(securityGuardActionsDetails.SET_RELOAD_IMAGE_VISITOR());
      this.store.dispatch(securityGuardActions.SET_NEW_CONTACT({newContact: false}));
      this.store.dispatch(securityGuardActions.SET_EDIT_MODE({editMode: false}));
      this.store.dispatch(securityGuardActionsDetails.CLEAN_FIELDS_VISITOR());
    } else {
      this.store.dispatch(securityGuardActionsDetails.SET_ERROR_POP({value: true}));
    }
  }

  async acceptEdit(): Promise<void> {
    const validateFields: boolean = await lastValueFrom(
      this.store.pipe(select(securityGuardDetailsSelectors.validatorFields), take(1)),
    );

    if (validateFields) {
      this.store.dispatch(securityGuardActionsDetails.LOAD_SAVE_VISITOR());
      this.store.dispatch(securityGuardActionsDetails.SET_RELOAD_IMAGE_VISITOR());
    } else {
      this.showPopEmptyFields = true;
    }
  }

  editVisitant(): void {
    this.store.dispatch(securityGuardActions.SET_EDIT_MODE({editMode: true}));
    this.store.dispatch(securityGuardActionsDetails.SET_BACKUP_VISITOR_SELECTED());
  }

  vehycleTypeClick(event: DropListOption): void {
    this.store.dispatch(
      securityGuardActionsDetails.SET_VEHICLE_TYPE_SELECTED({
        payload: event,
      }),
    );
  }

  closePop(): void {
    this.showPopEmptyFields = false;
  }

  vehycleBrandClick(event: DropListOption): void {
    this.store.dispatch(
      securityGuardActionsDetails.SET_VEHICLE_BRAND_SELECTED({
        payload: event,
      }),
    );
  }

  setColorVehicle(color: string): void {
    this.store.dispatch(
      securityGuardActionsDetails.SET_COLOR_VEHICLE({
        color,
      }),
    );
  }

  setPlateVehicle(plates: string): void {
    this.store.dispatch(
      securityGuardActionsDetails.SET_PLATES_VEHICLE({
        plates,
      }),
    );
  }

  setApplication(event: boolean, apply: string): void {
    if (apply === 'apply') {
      this.store.dispatch(securityGuardActionsDetails.SET_APPLICATION_VEHICLE({value: event}));
    } else {
      this.store.dispatch(securityGuardActionsDetails.SET_APPLICATION_VEHICLE({value: !event}));
    }
  }

  async setDataVisitor(value: string, field: string): Promise<void> {
    const newVisitor: boolean = await lastValueFrom(
      this.store.pipe(select(securityGuardSelectors.newVisitant), take(1)),
    );
    if (!newVisitor) {
      this.store.dispatch(
        securityGuardActionsDetails.SET_DATA_VISITOR({
          value,
          action: 'edit',
          node: field,
        }),
      );
    } else {
      this.store.dispatch(
        securityGuardActionsDetails.SET_DATA_VISITOR({
          value,
          action: 'add',
          node: field,
        }),
      );
    }
  }

  imageRecovery(file: IFile): void {
    this.store.dispatch(
      securityGuardActionsDetails.SET_IMAGE_SELECTED({
        file,
      }),
    );
  }
}
