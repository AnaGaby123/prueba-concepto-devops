import {NgModule} from '@angular/core';
import {DropListComponent} from './drop-list.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule],
  exports: [DropListComponent],
  declarations: [DropListComponent],
})
export class DropListModule {}
