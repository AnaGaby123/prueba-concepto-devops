import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientContractContractComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/client-contract-contract/client-contract-contract.component';
import {UploadViewFileModule} from '@appComponents/shared/upload-view-file/upload-view-file.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ClientContractContractComponent],
  imports: [CommonModule, UploadViewFileModule, TranslateModule],
  exports: [ClientContractContractComponent],
})
export class ClientContractContractModule {}
