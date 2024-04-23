import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

// Utils
import {isEqual} from 'lodash-es';
import {ColumnNotes} from '@appModels/table/internal-sales-item';

@Component({
  selector: 'app-custom-position-pop-up-notes',
  templateUrl: './custom-position-pop-up-notes.component.html',
  styleUrls: ['./custom-position-pop-up-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPositionPopUpNotesComponent implements DoCheck, AfterContentChecked {
  popUpPosition = 'top-start';
  @Input() target: HTMLElement;
  @Input() columnNotes: ColumnNotes;

  @ViewChild('popUp') popUpElement: ElementRef;

  popUpBounding: DOMRect = null;
  targetBounding: DOMRect = null;
  popUpTopProperty: string;
  popUpLeftProperty: string;
  triangleTopPosition: string;
  triangleLeftPosition: string;
  triangleBottomPosition: string;
  triangleRightPosition: string;

  validPositions = ['top-start'];

  setPopUpTopPosition = {
    'top-start': () => `${this.targetBounding.top - this.popUpBounding.height}px`,
  };

  setPopUpLeftPosition = {
    'top-start': () => `${this.targetBounding.left - 10}px`,
  };

  setTriangleTopPosition = {
    'top-start': () => 'auto',
  };

  setTriangleBottomPosition = {
    'top-start': () => '6px',
  };

  setTriangleLeftPosition = {
    'top-start': () => `${this.targetBounding.width / 2 + 4}px`,
  };

  setTriangleRightPosition = {
    'top-start': () => 'auto',
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngDoCheck(): void {
    if (this.target) {
      if (this.popUpElement) {
        this.checkForPositionChanges();
      }
    } else {
      console.error('No se ha proporcionado un "target".');
    }
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  checkForPositionChanges(): void {
    const index = this.validPositions.findIndex((o: string) => o === this.popUpPosition);
    this.popUpPosition = index !== -1 ? this.popUpPosition : 'top-start';
    if (!this.targetBounding) {
      this.setPositions();
    } else {
      const last = () => {
        const {top, right, bottom, left, width, height, x, y} = this.targetBounding;
        return {top, right, bottom, left, width, height, x, y};
      };
      const news = (): {bottom; height; left; right; top; width; x; y} => {
        const {top, right, bottom, left, width, height, x, y} = this.target.getBoundingClientRect();
        return {top, right, bottom, left, width, height, x, y};
      };

      if (!isEqual(last(), news())) {
        this.setPositions();
      }
    }
  }

  setPositions(): void {
    this.targetBounding = this.target.getBoundingClientRect();
    this.popUpBounding = this.popUpElement.nativeElement.getBoundingClientRect();
    this.popUpTopProperty = this.setPopUpTopPosition[this.popUpPosition]();
    this.popUpLeftProperty = this.setPopUpLeftPosition[this.popUpPosition]();
    this.triangleTopPosition = this.setTriangleTopPosition[this.popUpPosition]();
    this.triangleBottomPosition = this.setTriangleBottomPosition[this.popUpPosition]();
    this.triangleLeftPosition = this.setTriangleLeftPosition[this.popUpPosition]();
    this.triangleRightPosition = this.setTriangleRightPosition[this.popUpPosition]();
  }

  handleStopEvents(event: {preventDefault: () => void; stopPropagation: () => void}) {
    event.preventDefault();
    event.stopPropagation();
  }
}
