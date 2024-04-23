import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import {IFilterDate} from '@appModels/filters/Filters';
import {Observable} from 'rxjs';
import {CalendarDay} from '@appModels/calendario/calendar';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeComponent implements OnInit, AfterContentChecked {
  @Output() emitValues: EventEmitter<IFilterDate> = new EventEmitter<IFilterDate>();
  @Input() value: IFilterDate = {startDate: null, endDate: null};
  @Input() xPosition = 'left';
  isOpen = false;
  day = null;
  initialDateFormat: string;
  finalDateFormat: string;
  textDate = false;
  absoluteStyle: string;

  selectNonWorkingDays$: Observable<CalendarDay[]> = this.store.select(
    selectUtils.selectNonWorkingDays,
  );

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.setValues();
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  openMenu(): void {
    this.isOpen = !this.isOpen;
    setTimeout(() => {
      let over: string;
      if (this.isOpen) {
        over = 'unset';
      } else {
        over = 'hidden';
      }
      // document.getElementById('submenu').style.overflow = over;
    }, 300);
  }

  closeCombo(event): void {
    if (
      this.isOpen &&
      !(
        event.relatedTarget &&
        event.relatedTarget.className &&
        !event.relatedTarget.className.indexOf('datepicker__input')
      )
    ) {
      this.openMenu();
    }
  }

  handleDateOriginal(value, node) {
    this.value[node] = value;
  }

  cancel($event): void {
    if (this.textDate) {
      this.textDate = !this.textDate;
      this.value.startDate = null;
      this.value.endDate = null;
      this.emitFilter(null);
      $event.stopPropagation();
    }
  }

  emitFilter(value: IFilterDate): void {
    if (value) {
      this.textDate = true;
    }
    this.emitValues.emit(value);
    if (this.isOpen) {
      this.openMenu();
    }
  }

  setValues(): void {
    this.absoluteStyle = `
      ${this.xPosition}: 0;
    `;
  }
}
