import {NgModule} from '@angular/core';
import {BotoneraCardComponent} from './botonera-card.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [BotoneraCardComponent],
  declarations: [BotoneraCardComponent],
})
export class BotoneraCardModule {}
