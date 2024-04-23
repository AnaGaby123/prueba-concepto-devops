import {Component} from '@angular/core';

// Utils

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.scss'],
})
export class ProcessDetailsComponent {
  leftContainerIsOpen;

  constructor() {}

  handleLeftContainer(): void {
    this.leftContainerIsOpen = !this.leftContainerIsOpen;
  }
}
