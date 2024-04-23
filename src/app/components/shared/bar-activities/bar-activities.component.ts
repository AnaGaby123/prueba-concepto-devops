import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BarActivityOption} from '@appModels/bar-activities/bar-activities';

@Component({
  selector: 'app-bar-activities',
  templateUrl: './bar-activities.component.html',
  styleUrls: ['./bar-activities.component.scss'],
})
export class BarActivitiesComponent {
  @Output() handleOptionSelected: EventEmitter<number> = new EventEmitter<number>();
  @Input() enableLeftArrow: boolean;
  @Input() enableRightArrow = true;
  @Input() enableSelectOption = false;
  @Input() options: Array<BarActivityOption>;
  @Input() selectedOption = 0;
  @Input() showArrows = true;
  @Input() labelsAlignment = 'flex-start';
  @Input() showIdInLabel = true;

  selectOption(i: number): void {
    if (this.enableSelectOption) {
      this.handleOptionSelected.emit(i);
    }
  }

  selectPreviousOption(): void {
    this.handleOptionSelected.emit(this.selectedOption - 1);
  }

  selectNextOption(): void {
    this.handleOptionSelected.emit(this.selectedOption + 1);
  }

  onMouseEnter(element: any, id: number): void {
    const title = element.getElementsByClassName('title')[0];
    const tabItem = document.getElementById(`option_${id}`);
    if (title.offsetWidth >= element.scrollWidth - 4 && tabItem) {
      tabItem.classList.add('tabTooltip');
    }
  }

  onMouseLeave(id: number): void {
    const tabItem = document.getElementById(`option_${id}`);
    if (tabItem) {
      tabItem.classList.remove('tabTooltip');
    }
  }
}
