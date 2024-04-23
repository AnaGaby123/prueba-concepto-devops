import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {
  getURLContrato,
  selectSignedContract,
} from '@appSelectors/forms/clients-form/clients-details/clients-contracts-form.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {NGXLogger} from 'ngx-logger';
import {IUploadFile} from '@appModels/UploadFile/UploadFile';
import {
  IContract,
  SignedContract,
} from '@appModels/store/forms/clients-form/clients-details-form/contracts/contracts-form.models';
import {clientContractsSelectors} from '@appSelectors/forms/clients-form';
import {clientContractActions} from '@appActions/forms/client-form/clients-details-form';

@Component({
  selector: 'app-client-contract-contract',
  templateUrl: './client-contract-contract.component.html',
  styleUrls: ['./client-contract-contract.component.scss'],
})
export class ClientContractContractComponent {
  @ViewChild('visor') visor: ElementRef;
  signedContract$: Observable<SignedContract> = this.store.select(selectSignedContract);
  contractStatusNumber: Observable<number> = this.store.select(
    clientContractsSelectors.selectedContractStatusNumber,
  );
  contract$: Observable<IContract> = this.store.select(clientContractsSelectors.selectNewContract);

  pathContract: Observable<string> = this.store.select(getURLContrato);

  constructor(private store: Store<AppState>, private logger: NGXLogger) {}

  handleSignedContractUpload(uploadFile: IUploadFile): void {
    this.store.dispatch(
      clientContractActions.HANDLE_SIGNED_CONTRACT_UPLOAD_COMPONENT_EFFECT({
        uploadFile,
      }),
    );
  }
}
