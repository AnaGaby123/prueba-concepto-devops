import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PqfDraggableModalComponent} from './pqf-draggable-modal.component';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';

@NgModule({
  declarations: [PqfDraggableModalComponent],
  exports: [PqfDraggableModalComponent],
  imports: [CommonModule, LoadingModule],
})
export class PqfDraggableModalModule {}
