import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Output() emitChangeView: EventEmitter<string> = new EventEmitter();

  emitValue(): void {
    this.emitChangeView.emit('graphic');
  }
}
