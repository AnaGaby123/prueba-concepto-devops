import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientDataComponent} from './client-data.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ClientDataComponent],
  exports: [ClientDataComponent],
  imports: [CommonModule, TranslateModule],
})
export class ClientDataModule {}
