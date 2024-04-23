/* Core Imports */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

/* Tools Imports */
import {toRound} from '@appUtil/util';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() max = 0;
  @Input() min = 0;
  @Input() inputMode: 'percentage' | 'amount' = 'percentage';
  @Input() currency = 'USD';
  @Input() value: number;
  @Input() showLines = false;
  @Input() labelLimit: string;
  @ViewChild('span') span: ElementRef;
  @ViewChild('inputRange') inputRange: ElementRef;
  valueInput: number | string;
  leftSpan: string;
  tenPercent: number;
  calcPercentageInput: number;

  ngOnInit(): void {
    this.value = this.value === undefined ? this.min : this.value;
    this.valueInput =
      this.inputMode === 'percentage' ? toRound((this.value * 100) / this.max, 2) : this.value;

    this.tenPercent = this.max * 0.1;
  }

  ngAfterViewInit(): void {
    this.updateDataInputRange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.inputMode && changes.inputMode.currentValue !== changes.inputMode.previousValue) {
      this.updateDataInputRange();
    }
  }

  updateDataInputRange(): void {
    if (this.inputRange !== undefined) {
      setTimeout(() => {
        const widthInput = this.inputRange.nativeElement?.offsetWidth;

        const pxls = widthInput / 100;
        this.calcPercentageInput = (this.inputRange.nativeElement.valueAsNumber * 100) / this.max;

        this.valueInput =
          this.inputMode === 'amount'
            ? this.inputRange.nativeElement.valueAsNumber
            : toRound(this.calcPercentageInput, 2);

        const widthSpan = this.span.nativeElement.offsetWidth;
        const calcPercentageSpan = widthSpan / 100;
        const pxlsAdjustment = calcPercentageSpan * this.calcPercentageInput;

        this.leftSpan = `${this.calcPercentageInput * pxls - pxlsAdjustment}px`;
      }, 50);
    }
  }
}
