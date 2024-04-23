// CORE
import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {lastValueFrom, Observable} from 'rxjs';
import {take} from 'rxjs/operators';

// MODELS
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {ITabOption} from '@appModels/botonera/botonera-option';
// ACTIONS
import {clientDetailsFormActions, contractsActions} from '@appActions/forms/client-form';
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';
import * as clientsActions from '@appActions/forms/client-form/clients-form.actions';
// SELECTORS
import * as utilsSelectors from '@appSelectors/utils/utils.selectors';
import {
  clientContractsSelectors,
  clientsDetailsSelectors,
  clientsSelectors,
} from '@appSelectors/forms/clients-form';
// UTILS
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import {GET_CAT_CUSTOMER_LOAD} from '@appActions/catalogs/catalogos.actions';
import {MatDialog} from '@angular/material/dialog';
import {ContractConfigurationPopUpComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-families/contract-configuration-pop-up/contract-configuration-pop-up.component';
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';

@Component({
  selector: 'app-clients-details',
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.scss'],
})
export class ClientsDetailsComponent implements OnInit, OnDestroy {
  enableEdit$: Observable<boolean> = this.store.select(clientsSelectors.selectEnableEdit);
  editMode$: Observable<boolean> = this.store.select(clientsSelectors.selectEditMode);
  tabOptions$: Observable<Array<ITabOption>> = this.store.select(
    clientsDetailsSelectors.selectTabOptions,
  );
  selectedTab$: Observable<ITabOption> = this.store.select(
    clientsDetailsSelectors.selectedTabOption,
  );
  saveValidatorsBySteps$: Observable<boolean> = this.store.select(
    clientsSelectors.selectClientsSaveValidatorsBySteps,
  );
  viewType$: Observable<string> = this.store.select(utilsSelectors.selectViewType);
  contractDetails$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectContractDetails,
  );
  activateGenerateContractButton$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectActivateGenerateContractButton,
  );
  showGenerateContract$: Observable<boolean> = this.store.select(
    clientContractsSelectors.showGenerateContract,
  );

  readonly viewTypes = AppViewTypes;
  readonly inputValidators = InputValidators;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(clientsActions.SET_IS_IN_DETAILS({value: true}));
    this.store.dispatch(GET_CAT_CUSTOMER_LOAD());
  }

  ngOnDestroy(): void {
    this.store.dispatch(clientDetailsFormActions.ON_DESTROY_DETAILS_COMPONENT_EFFECT());
  }

  setTab(tab: ITabOption): void {
    this.store.dispatch(clientDetailsFormActions.SET_TAB_COMPONENT_EFFECT({tab}));
  }

  cancelAdd(): void {
    this.store.dispatch(clientDetailsFormActions.CANCEL_ADD_COMPONENT_EFFECT());
  }

  cancelForm(): void {
    this.store.dispatch(clientDetailsFormActions.CANCEL_FORM_COMPONENT_EFFECT());
  }

  enableEditMode(): void {
    this.store.dispatch(clientDetailsFormActions.BACKUP_CLIENTS_SECTION_LOAD());
  }

  saveData(): void {
    this.store.dispatch(clientDetailsFormActions.SAVE_DATA_COMPONENT_EFFECT());
  }

  async generateContract(): Promise<void> {
    const actualStepContract: number = await lastValueFrom(
      this.store.pipe(select(clientContractsSelectors.selectAddContractActualStep), take(1)),
    );
    if (actualStepContract === 1) {
      this.openContractDialog();
      this.store.dispatch(
        clientContractActions.SET_VALUE_TYPE_CONTRACT({
          payload: true,
        }),
      );
    } else {
      this.store.dispatch(contractsActions.SET_ADD_STEP_VALUE({addStep: false}));
      this.store.dispatch(contractsActions.UPLOAD_SIGNED_CONTRACT_FILE());
    }
  }

  openContractDialog(): void {
    const dialogRef = this.dialog.open(ContractConfigurationPopUpComponent, {
      backdropClass: 'mat-dialog-background',
      data: {},
      panelClass: 'mat-dialog-style',
    });

    dialogRef.afterClosed().subscribe((value: boolean) => {
      this.store.dispatch(
        contractActions.HANDLE_SAVE_CONTRACT_CONFIGURATION({
          value,
        }),
      );
    });
  }
}
