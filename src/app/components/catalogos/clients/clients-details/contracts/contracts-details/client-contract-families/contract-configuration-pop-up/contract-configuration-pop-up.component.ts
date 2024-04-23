import {Component, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {Observable} from 'rxjs';
import {clientContractsSelectors, clientsDetailsSelectors} from '@appSelectors/forms/clients-form';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {VCliente} from 'api-catalogos';
import {IContract} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {InputValidators} from '@appHelpers/shared/shared.helpers';
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
import {SET_SIGNED_CONTRACT} from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
import {DropListOption} from '@appModels/drop-list/drop-list-option';
import {IUploadFile} from '@appModels/UploadFile/UploadFile';
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-contract-configuration-pop-up',
  templateUrl: './contract-configuration-pop-up.component.html',
  styleUrls: ['./contract-configuration-pop-up.component.scss'],
})
export class ContractConfigurationPopUpComponent {
  selectActiveBtnConfiguration$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectActiveBtnConfiguration,
  );
  viewType$: Observable<string> = this.store.select(selectViewType);
  selectedClient$: Observable<VCliente> = this.store.select(clientsDetailsSelectors.selectedClient);
  contract$: Observable<IContract> = this.store.select(clientContractsSelectors.selectNewContract);
  enterprises$: Observable<Array<DropListOption>> = this.store.select(
    clientContractsSelectors.selectvEnterpriseForDropDown,
  );
  enterpriseSelected$: Observable<DropListOption> = this.store.select(
    clientContractsSelectors.selectEnterpriseSelected,
  );
  clientSendContract$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectClientSendContract,
  );
  showInputFile$: Observable<boolean> = this.store.select(
    clientContractsSelectors.selectShowInputFile,
  );
  readonly inputValidators = InputValidators;
  readonly viewTypes = AppViewTypes;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialogRef<ContractConfigurationPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  handleClosePopUpConfiguration(value: boolean): void {
    this.dialog.close(value);
  }

  saveClientContract(file: File) {
    const path = window.URL.createObjectURL(file);
    const uploadFile: IUploadFile = {
      path,
      file,
    };
    this.store.dispatch(
      clientContractActions.HANDLE_SIGNED_CONTRACT_UPLOAD_COMPONENT_EFFECT({
        uploadFile,
      }),
    );
  }

  setDataContract(node: string, payload): void {
    this.store.dispatch(contractActions.SET_CONTRACT_DATA({node, payload}));
  }

  setValueTypeAgreement(payload): void {
    this.store.dispatch(contractActions.SET_VALUE_TYPE_AGREEEMENT({payload: payload}));
    this.logcToDeleteUploadedFile();
  }

  setValueTypeContract(payload): void {
    this.store.dispatch(contractActions.SET_VALUE_TYPE_CONTRACT({payload: payload}));
    this.logcToDeleteUploadedFile();
  }

  logcToDeleteUploadedFile(): void {
    this.store.dispatch(
      contractActions.SET_SIGNED_CONTRACT({
        signedContract: {
          titulo: 'Cargar contrato Firmado',
          file: null,
          path: '',
          hash: '',
        },
      }),
    );
    this.store.dispatch(
      contractActions.SET_SHOW_INPUT_FILE({
        value: false,
      }),
    );
    setTimeout(() => {
      this.store.dispatch(
        contractActions.SET_SHOW_INPUT_FILE({
          value: true,
        }),
      );
    }, 1);
  }

  setDataContractBussinessName(payload: DropListOption): void {
    this.store.dispatch(contractActions.SET_CONTRACT_DATA_BUSSINESSNAME({payload}));
  }

  removeFile(): void {
    this.store.dispatch(
      SET_SIGNED_CONTRACT({
        signedContract: {
          titulo: 'Cargar contrato Firmado',
          file: null,
          path: '',
          hash: '',
        },
      }),
    );
  }
}
