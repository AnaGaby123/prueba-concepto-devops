import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomPositionPopUpNotesComponent} from './custom-position-pop-up-notes.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [CustomPositionPopUpNotesComponent],
  imports: [CommonModule, TranslateModule],
  exports: [CustomPositionPopUpNotesComponent],
})
export class CustomPositionPopUpNotesModule {}
