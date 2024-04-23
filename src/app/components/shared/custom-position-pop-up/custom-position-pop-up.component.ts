import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

// Utils
import {isEqual} from 'lodash-es';

@Component({
  selector: 'app-custom-position-pop-up',
  templateUrl: './custom-position-pop-up.component.html',
  styleUrls: ['./custom-position-pop-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomPositionPopUpComponent implements DoCheck, AfterContentChecked {
  @Input() adjustForSmallTarget = 0;
  @Input() backgroundColor = '#ffffff';
  @Input() borderColor = '#008894';
  @Input() borderRadius = '18px';
  @Input() closeButton = true;
  @Input() closeButtonImage = 'assets/Images/cerrar.svg';
  @Input() closeButtonSeparation = '20px';
  @Input() closeButtonSize = '20px';
  @Input() floatingSize = 3;
  @Input() maxHeight = '300px';
  @Input() maxWidth = '500px';
  @Input() minHeight = '100px';
  @Input() minWidth = '200px';
  @Input() padding = '10px';
  @Input() popUpPosition = 'top-center';
  @Input() target: HTMLElement;
  @Input() triangleBackgroundColor = '#ffffff';
  @Input() zIndexInvert = false;
  @Output() closeEmitter: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('popUp') popUpElement: ElementRef;

  popUpBounding: DOMRect = null;
  targetBounding: DOMRect = null;
  popUpTopProperty: string;
  popUpLeftProperty: string;
  triangleTopPosition: string;
  triangleLeftPosition: string;
  triangleBottomPosition: string;
  triangleRightPosition: string;

  validPositions = [
    'top-start',
    'top-center',
    'top-end',
    'bottom-start',
    'bottom-center',
    'bottom-end',
    'left-start',
    'left-center',
    'left-end',
    'right-start',
    'right-center',
    'right-end',
  ];

  setPopUpTopPosition = {
    'top-start': () =>
      `${this.targetBounding.top - this.popUpBounding.height - this.floatingSize}px`,
    'top-center': () =>
      `${this.targetBounding.top - this.popUpBounding.height - this.floatingSize}px`,
    'top-end': () => `${this.targetBounding.top - this.popUpBounding.height - this.floatingSize}px`,
    'right-start': () => `${this.targetBounding.top - 11 - this.adjustForSmallTarget}px`,
    'right-center': () =>
      `${
        this.targetBounding.top + this.targetBounding.height / 2 - this.popUpBounding.height / 2
      }px`,
    'right-end': () =>
      `${
        this.targetBounding.bottom - this.popUpBounding.height + 10 + this.adjustForSmallTarget
      }px`,
    'bottom-start': () => `${this.targetBounding.bottom + this.floatingSize}px`,
    'bottom-center': () => `${this.targetBounding.bottom + this.floatingSize}px`,
    'bottom-end': () => `${this.targetBounding.bottom + this.floatingSize}px`,
    'left-start': () => `${this.targetBounding.top - 11 - this.adjustForSmallTarget}px`,
    'left-center': () =>
      `${
        this.targetBounding.top + this.targetBounding.height / 2 - this.popUpBounding.height / 2
      }px`,
    'left-end': () =>
      `${
        this.targetBounding.bottom - this.popUpBounding.height + 10 + this.adjustForSmallTarget
      }px`,
  };

  setPopUpLeftPosition = {
    'top-start': () => `${this.targetBounding.left - 10 - this.adjustForSmallTarget}px`,
    'top-center': () =>
      `${
        this.targetBounding.left + this.targetBounding.width / 2 - this.popUpBounding.width / 2
      }px`,
    'top-end': () =>
      `${this.targetBounding.right - this.popUpBounding.width + 10 + this.adjustForSmallTarget}px`,
    'right-start': () => `${this.targetBounding.right + this.floatingSize}px`,
    'right-center': () => `${this.targetBounding.right + this.floatingSize}px`,
    'right-end': () => `${this.targetBounding.right + this.floatingSize}px`,
    'bottom-start': () => `${this.targetBounding.left - 10 - this.adjustForSmallTarget}px`,
    'bottom-center': () =>
      `${
        this.targetBounding.left + this.targetBounding.width / 2 - this.popUpBounding.width / 2
      }px`,
    'bottom-end': () =>
      `${this.targetBounding.right - this.popUpBounding.width + 11 + this.adjustForSmallTarget}px`,
    'left-start': () =>
      `${this.targetBounding.left - this.popUpBounding.width - this.floatingSize}px`,
    'left-center': () =>
      `${this.targetBounding.left - this.popUpBounding.width - this.floatingSize}px`,
    'left-end': () =>
      `${this.targetBounding.left - this.popUpBounding.width - this.floatingSize}px`,
  };

  setTriangleTopPosition = {
    'top-start': () => 'auto',
    'top-center': () => 'auto',
    'top-end': () => 'auto',
    'bottom-start': () => '3px',
    'bottom-center': () => '3px',
    'bottom-end': () => '3px',
    'left-start': () => `${this.targetBounding.height / 2 + 3 + this.adjustForSmallTarget}px`,
    'left-center': () => `${this.popUpBounding.height / 2 - 8}px`,
    'left-end': () => 'auto',
    'right-start': () => `${this.targetBounding.height / 2 + 3 + this.adjustForSmallTarget}px`,
    'right-center': () => `${this.popUpBounding.height / 2 - 5}px`,
    'right-end': () => 'auto',
  };

  setTriangleBottomPosition = {
    'top-start': () => '3px',
    'top-center': () => '3px',
    'top-end': () => '3px',
    'bottom-start': () => 'auto',
    'bottom-center': () => 'auto',
    'bottom-end': () => 'auto',
    'left-start': () => 'auto',
    'left-center': () => 'auto',
    'left-end': () => `${this.targetBounding.height / 2 + 5 + this.adjustForSmallTarget}px`,
    'right-start': () => 'auto',
    'right-center': () => 'auto',
    'right-end': () => `${this.targetBounding.height / 2 + 5 + this.adjustForSmallTarget}px`,
  };

  setTriangleLeftPosition = {
    'top-start': () => `${this.targetBounding.width / 2 + 4 + this.adjustForSmallTarget}px`,
    'top-center': () => `${this.popUpBounding.width / 2 - 7}px`,
    'top-end': () => 'auto',
    'bottom-start': () => `${this.targetBounding.width / 2 + 4 + this.adjustForSmallTarget}px`,
    'bottom-center': () => `${this.popUpBounding.width / 2 - 6}px`,
    'bottom-end': () => 'auto',
    'left-start': () => 'auto',
    'left-center': () => 'auto',
    'left-end': () => 'auto',
    'right-start': () => '3px',
    'right-center': () => '3px',
    'right-end': () => '3px',
  };

  setTriangleRightPosition = {
    'top-start': () => 'auto',
    'top-center': () => 'auto',
    'top-end': () => `${this.targetBounding.width / 2 + 3 + this.adjustForSmallTarget}px`,
    'bottom-start': () => 'auto',
    'bottom-center': () => 'auto',
    'bottom-end': () => `${this.targetBounding.width / 2 + 3 + this.adjustForSmallTarget}px`,
    'left-start': () => '3px',
    'left-center': () => '3px',
    'left-end': () => '3px',
    'right-start': () => 'auto',
    'right-center': () => 'auto',
    'right-end': () => 'auto',
  };

  constructor(private cdr: ChangeDetectorRef) {}

  @HostListener('document:click', ['$event'])
  clickOut(e?): void {
    if (
      !this.closeButton &&
      this.popUpElement &&
      e.target !== this.popUpElement.nativeElement &&
      e.target !== this.target
    ) {
      this.closePopUp();
    }
  }

  ngDoCheck(): void {
    if (this.target) {
      if (this.popUpElement) {
        this.checkForPositionChanges();
      }
    } else {
      console.error('No se ha proporcionado un "target".');
      this.closeEmitter.emit(false);
    }
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  closePopUp() {
    this.closeEmitter.emit(false);
  }

  checkForPositionChanges(): void {
    const index = this.validPositions.findIndex((o: string) => o === this.popUpPosition);
    this.popUpPosition = index !== -1 ? this.popUpPosition : 'top-center';
    this.adjustForSmallTarget = !isNaN(+this.adjustForSmallTarget)
      ? Number(this.adjustForSmallTarget)
      : 0;
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
