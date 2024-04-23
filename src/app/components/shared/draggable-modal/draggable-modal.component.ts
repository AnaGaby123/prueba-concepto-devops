import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {ModalComponent} from 'ng-modal-lib-sab';

@Component({
  selector: 'app-draggable-modal',
  templateUrl: './draggable-modal.component.html',
  styleUrls: ['./draggable-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DraggableModalComponent implements AfterViewInit {
  @ViewChild('modalRoot', {static: false}) modalRoot: ModalComponent;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() titleHeader = 'PROQUIFA NET';
  @Input() isResizable = true;
  @Input() backGroundColor = '#FFFFFF';
  @Input() isLoading = false;

  ngAfterViewInit(): void {
    this.modalRoot.show();
  }

  onclose(): void {
    this.closeModal.emit(false);
  }

  sendStatus(status: boolean): void {
    this.modalRoot.hide();
    this.closeModal.emit(status);
  }
}
