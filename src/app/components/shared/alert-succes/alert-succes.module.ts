import {NgModule} from '@angular/core';
import {AlertSuccesComponent} from './alert-succes.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [AlertSuccesComponent],
  declarations: [AlertSuccesComponent],
})
export class AlertSuccesModule {}
