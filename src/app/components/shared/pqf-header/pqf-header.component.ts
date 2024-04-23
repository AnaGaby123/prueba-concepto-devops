import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'pqf-header',
  templateUrl: './pqf-header.component.html',
  styleUrls: ['./pqf-header.component.scss'],
})
export class PqfHeaderComponent {
  @Input() activeBack = true;
  @Input() title: string = '';
  @Output() goBack: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  handleGoBack(): void {
    if (this.activeBack) {
      this.goBack.emit();
    }
  }
}
