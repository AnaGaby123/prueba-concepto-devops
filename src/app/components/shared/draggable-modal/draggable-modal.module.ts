import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DraggableModalComponent} from './draggable-modal.component';
import {LoadingModule} from '@appComponents/shared/loading/loading.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalModule} from 'ng-modal-lib-sab';

@NgModule({
  declarations: [DraggableModalComponent],
  exports: [DraggableModalComponent],
  imports: [CommonModule, LoadingModule, DragDropModule, MatDialogModule, ModalModule],
})
export class DraggableModalModule {}
