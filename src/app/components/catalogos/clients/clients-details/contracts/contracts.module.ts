import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContractsComponent} from '@appComponents/catalogos/clients/clients-details/contracts/contracts.component';
import {ContractsRoutingModule} from './contracts-routing.module';
import {ContractsListModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-list/contracts-list.module';
import {ContractsDetailsModule} from '@appComponents/catalogos/clients/clients-details/contracts/contracts-details/contracts-details.module';

@NgModule({
  declarations: [ContractsComponent],
  imports: [CommonModule, ContractsRoutingModule, ContractsListModule, ContractsDetailsModule],
  exports: [ContractsComponent],
})
export class ContractsModule {}
