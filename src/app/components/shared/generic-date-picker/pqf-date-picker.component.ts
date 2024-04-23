import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import {Calendar, CalendarDay, monthsTranslate} from '@appModels/calendario/calendar';
import {selectViewType} from '@appSelectors/utils/utils.selectors';
import {AppViewTypes} from '@appModels/store/utils/utils.model';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import * as moment from 'moment/moment';
import {concat, findIndex, forEach, isEqual, map as _map} from 'lodash-es';

@Component({
  selector: 'pqf-date-picker',
  templateUrl: './pqf-date-picker.component.html',
  styleUrls: ['./pqf-date-picker.component.scss'],
})
export class PqfDatePickerComponent implements OnInit, OnChanges {
  @Input() backGroundColor = '#FFFFFF';
  @Input() borderInputColor = '#D8D9DD';
  @Input() calendarDays: Array<CalendarDay>;
  @Input() checkColor:
    | 'ocean'
    | 'green'
    | 'red'
    | 'yellow'
    | 'dark-red'
    | 'dark-orange'
    | 'dark-green'
    | 'purple' = 'ocean';
  @Input() color = true;
  @Input() currentMonth: string;
  @Input() date: Date;
  @Input() dateFormat: string;
  @Input() isReadonly: boolean = false; // DOCS: FALSE = MODO SOLO LECTURA
  @Input() dayNames: Array<string> = ['D', 'L', 'M', 'M', 'J', 'V', 'S']; // Default order: firstDayOfTheWeek = 0
  @Input() disableBorderColor = '#C2C3C9';
  @Input() disableFontColor = '#C2C3C9';
  @Input() disabled: boolean;
  @Input() disabledCalendarDays: Array<CalendarDay>;
  @Input() enableEdit = true;
  @Input() fontColor = '#424242';
  @Input() fontFamily = 'Roboto-Regular';
  @Input() heightInput = '30px';
  @Input() imageAdd = true;
  @Input() inputText: string;
  @Input() isMulticolor = false;
  @Input() label = '';
  @Input() labelDisableFontColor = '#c2c3c9';
  @Input() labelFont = 'Roboto-Regular';
  @Input() labelFontColor = '#424242';
  @Input() labelInside = false;
  @Input() labelInsidePlaceHolder = '';
  @Input() paddingInput: any;
  @Input() placeholder = 'dd/mm/aa';
  @Input() position: 'down' | 'top' = 'down';
  @Input() rangeEnd: Date;
  @Input() rangeStart: Date;
  @Input() showCalendar: boolean;
  @Input() sizeInput = '14px';
  @Input() textAlign = 'center';
  @Input() textDecoration = 'none';
  @Input() weekStart = 0;
  @Input() weightInput: any;
  @Output() dateOriginal: EventEmitter<any> = new EventEmitter<any>();
  @Output() fecha: EventEmitter<any> = new EventEmitter<any>();
  @Output() fechaFormat: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelect: EventEmitter<Date> = new EventEmitter<Date>();
  viewType$ = this.store.select(selectViewType);
  private readonly DEFAULT_FORMAT = 'YYYY-MM-DD';
  readonly viewtypes = AppViewTypes;
  calendar: Calendar;
  colors = {
    black: '#424242',
    blue: '#008894',
    lightGrey: '#C2C3C9',
    lightGrey2: '#eceef0',
    white: '#FFFFFF',
  };
  currentMonthNumber: number;
  currentYear: number;
  dayHover;
  dayNamesOrdered: Array<string>;
  fontFamilies = {
    robotoRegular: 'Roboto-Regular',
    robotoLight: 'Roboto-Light',
  };
  months: Array<string> = [
    'ENERO',
    'FEBRERO',
    'MARZO',
    'ABRIL',
    'MAYO',
    'JUNIO',
    'JULIO',
    'AGOSTO',
    'SEPTIEMBRE',
    'OCTUBRE',
    'NOVIEMBRE',
    'DICIEMBRE',
  ];
  selectedYearNumber: number;
  validInput = false;
  valueIsSendFromCalendarClick = false;

  // DOCS Listen global click only if the calendar is open
  @HostListener('document:click', ['$event'])
  clickOut(e?): void {
    // TODO: Agregar validación correcta cuando se implementen los servicios
    if (this.showCalendar) {
      this.handleGlobalClick(e);
    }
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private store: Store<AppState>,
  ) {
    this.dateFormat = this.DEFAULT_FORMAT;
    this.showCalendar = false;
    this.updateDayNames();
  }

  ngOnInit() {
    this.updateDayNames();
    this.cleanDisabledDays();
    this.constructCalendarArray();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.date &&
        (changes.date.currentValue || changes.date.previousValue) &&
        !isEqual(changes.date.currentValue, changes.date.previousValue)) ||
      (changes.dateFormat &&
        (changes.dateFormat.currentValue || changes.dateFormat.previousValue) &&
        !isEqual(changes.dateFormat.currentValue, changes.dateFormat.previousValue)) ||
      (changes.rangeEnd &&
        (changes.rangeEnd.currentValue || changes.rangeEnd.previousValue) &&
        !isEqual(changes.rangeEnd.currentValue, changes.rangeEnd.previousValue)) ||
      (changes.rangeStart &&
        (changes.rangeStart.currentValue || changes.rangeStart.previousValue) &&
        !isEqual(changes.rangeStart.currentValue, changes.rangeStart.previousValue))
    ) {
      this.syncVisualsWithDate();
    }
    if (
      changes.disabledCalendarDays &&
      JSON.stringify(changes.disabledCalendarDays.currentValue) !==
        JSON.stringify(changes.disabledCalendarDays.previousValue)
    ) {
      this.syncVisualsWithDate();
    }
  }

  closeCalendar(): void {
    this.showCalendar = false;
    this.valueIsSendFromCalendarClick = false;
    this.syncVisualsWithDate();
  }

  constructCalendarArray(): Array<CalendarDay> {
    let calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
    calendarArray = concat(...calendarArray);
    calendarArray = _map(calendarArray, (o: number | Date) => ({
      day: o,
      enable: true,
    }));
    calendarArray = this.filterInvalidDaysByRange(calendarArray);
    calendarArray = this.filterInvalidDaysByDays(calendarArray);
    return calendarArray;
  }

  /**
   * Sets the date values associated with the ui
   */
  private setCurrentValues(date: Date): void {
    date = new Date(date);
    this.currentMonthNumber = date.getMonth();
    this.currentMonth = this.months[this.currentMonthNumber];
    this.currentYear = date.getFullYear();
    this.selectedYearNumber = this.currentYear;
    this.calendarDays = this.constructCalendarArray();
  }

  cleanDisabledDays(): void {
    if (this.disabledCalendarDays) {
      forEach(this.disabledCalendarDays, (o: CalendarDay) => {
        const newDay = o.day as Date;
        o.day = new Date(newDay.setHours(0, 0, 0, 0));
      });
    }
  }

  /**
   * Update the day names order. The order can be modified with the firstDayOfTheWeek input, while 0 means that the
   * first day will be sunday.
   */
  private updateDayNames() {
    this.dayNamesOrdered = this.dayNames.slice(); // Copy DayNames with default value (weekStart = 0)
    if (this.weekStart < 0 || this.weekStart >= this.dayNamesOrdered.length) {
      // Out of range
      throw Error(
        `The weekStart is not in range between ${0} and ${this.dayNamesOrdered.length - 1}`,
      );
    } else {
      this.calendar = new Calendar(this.weekStart);
      this.dayNamesOrdered = this.dayNamesOrdered
        .slice(this.weekStart, this.dayNamesOrdered.length)
        .concat(this.dayNamesOrdered.slice(0, this.weekStart)); // Append beginning to end
    }
  }

  /**
   * Visually syncs calendar and input to selected date or current day
   */
  syncVisualsWithDate(): void {
    if (this.date) {
      this.setInputText(this.date);
      this.setCurrentValues(this.date);
    } else {
      this.inputText = '';
      this.setCurrentValues(new Date());
    }
  }

  /**
   * Sets the currentMonth and creates new calendar days for the given month
   */
  setCurrentMonth(monthNumber: number): void {
    this.currentMonth = this.months[monthNumber];
    this.calendarDays = this.constructCalendarArray();
  }

  /**
   * Sets the currentYear and FormControl value associated with the year
   */
  setCurrentYear(year: number): void {
    this.currentYear = year;
    this.selectedYearNumber = year;
  }

  /**
   * Sets the visible input text
   */
  setInputText(date: Date): void {
    let inputText = '';
    const dateFormat: string = this.dateFormat;
    if (dateFormat === undefined || dateFormat === null) {
      inputText = moment(date).format(this.DEFAULT_FORMAT);
    } else if (typeof dateFormat === 'string') {
      inputText = moment(date).format(dateFormat);
    }
    this.dateOriginal.emit(date);
    if (dateFormat !== null) {
      if (dateFormat === 'YYYYMMDD') {
        if (this.valueIsSendFromCalendarClick) {
          // Text to emit
          this.fecha.emit(inputText);
        }
        const day = inputText.slice(6, 8);
        const month = inputText.slice(4, 6);
        const year = inputText.slice(0, 4);
        // Text to emit and show in template
        this.inputText = day + '/' + month + '/' + year;
        this.fechaFormat.emit(this.inputText);
        this.validInput = true;
      } else if (dateFormat === 'DD/MMMM/YYYY') {
        const months = monthsTranslate();
        const splits = inputText.split('/');
        // Text to emit
        let normalInputText;
        if (this.valueIsSendFromCalendarClick) {
          normalInputText = `${splits[2]}${months[splits[1]].number}${splits[0]}`;
          this.fecha.emit(normalInputText);
        }
        // Text to show in template
        this.inputText = `${splits[0]}/${months[splits[1]].month}/${splits[2]}`;

        // Text to emit
        normalInputText = `${splits[2]}/${months[splits[1]].number}/${splits[0]}`;
        this.fechaFormat.emit(normalInputText);
        this.validInput = true;
      }
    } else {
      this.validInput = false;
    }
  }

  // -------------------------------------------------------------------------------- //
  // --------------------------------- Click Handlers ------------------------------- //
  // -------------------------------------------------------------------------------- //
  /**
   * Sets the date values associated with the calendar.
   * Triggers animation if the month changes
   */
  onArrowClick(direction: string): void {
    const currentMonth = this.currentMonthNumber;
    let newYear = this.currentYear;
    let newMonth: number;
    // sets the newMonth
    // changes newYear is necessary
    if (direction === 'left') {
      if (currentMonth === 0) {
        newYear = this.currentYear - 1;
        newMonth = 11;
      } else {
        newMonth = currentMonth - 1;
      }
    } else if (direction === 'right') {
      if (currentMonth === 11) {
        newYear = this.currentYear + 1;
        newMonth = 0;
      } else {
        newMonth = currentMonth + 1;
      }
    }
    // check if new date would be within range
    const newDate = new Date(newYear, newMonth);
    let newDateValid: boolean;
    if (direction === 'left') {
      newDateValid =
        !this.rangeStart ||
        newDate.getTime() >= this.rangeStart.getTime() ||
        newDate.getMonth() >= this.rangeStart.getMonth();
    } else if (direction === 'right') {
      newDateValid = !this.rangeEnd || newDate.getTime() <= this.rangeEnd.getTime();
    }
    if (newDateValid) {
      this.setCurrentYear(newYear);
      this.currentMonthNumber = newMonth;
      this.setCurrentMonth(newMonth);
    }
  }

  isDateInRange = (day: Date): boolean =>
    (!this.rangeStart || day.getTime() >= this.rangeStart.getTime()) &&
    (!this.rangeEnd || day.getTime() <= this.rangeEnd.getTime());

  filterInvalidDaysByRange = (calendarDays: Array<CalendarDay>): Array<CalendarDay> =>
    _map(calendarDays, (o: CalendarDay) => ({
      day: o.day,
      enable: !(o.day === 0 || !this.isDateInRange(o.day as Date)),
    }));
  filterInvalidDaysByDays = (calendarDays: Array<CalendarDay>): Array<CalendarDay> => {
    forEach(calendarDays, (o: CalendarDay) => {
      if (o.day !== 0) {
        const newDay = o.day as Date;
        o.day = new Date(newDay.setHours(0, 0, 0, 0));
        const index = findIndex(
          this.disabledCalendarDays,
          (i: CalendarDay) => new Date(i.day).getTime() === new Date(o.day).getTime(),
        );
        o.enable = index !== -1 ? false : o.enable;
      }
    });
    return calendarDays;
  };

  // Open the calendar
  onInputClick(): void {
    this.showCalendar = !this.showCalendar;
  }

  // Select a day from the calendar
  onSelectDay(day: Date): void {
    if (this.isDateInRange(day)) {
      this.date = day;
      this.onSelect.emit(day);
      this.valueIsSendFromCalendarClick = true;
      this.syncVisualsWithDate();
    }
  }

  /*onYearSubmit(): void {
    if (this.selectedYearNumber > 2050 || this.selectedYearNumber < 1900) {
      const dates = new Date();
      this.selectedYearNumber = dates.getFullYear();
    }
    if (+this.selectedYearNumber !== this.currentYear) {
      this.setCurrentYear(+this.selectedYearNumber);
      this.setCurrentMonth(this.currentMonthNumber);
    } else {
      this.selectedYearNumber = this.currentYear;
    }
  }*/

  // Handle click outside the calendar
  handleGlobalClick(event: MouseEvent): void {
    const withinElement = this.elementRef.nativeElement.contains(event.target);
    if (this.showCalendar && !withinElement) {
      this.closeCalendar();
    }
  }

  // Return the backgroundColor of a day
  getDayBackgroundColor(day: Date): string {
    let color = this.colors.white;
    if (this.isChosenDay(day)) {
      color = this.colors.blue;
      if (this.isMulticolor) {
        color = this.labelFontColor;
      }
    }
    return color;
  }

  // Return the fontColor of a day
  getDayFontColor = (day: CalendarDay): string =>
    this.isChosenDay(day.day as Date)
      ? this.colors.white
      : !day.enable
      ? this.colors.lightGrey
      : this.colors.black;

  getDayBorderColor(day: Date): string {
    if (this.isCurrentDay(day) && !this.isChosenDay(day)) {
      return `${this.colors.lightGrey2} 1px solid`;
    }
  }

  // DOCS: Return the font-family of a day
  getDayFontFamily = (day: CalendarDay): string =>
    this.isChosenDay(day.day as Date)
      ? this.fontFamilies.robotoRegular
      : this.fontFamilies.robotoLight;

  // Validate if the day received is equal that the selected day in calendar
  isChosenDay(day: Date): boolean {
    if (day && this.date) {
      day.setHours(0, 0, 0, 0);
      this.date.setHours(0, 0, 0, 0);

      return this.date.getTime() === day.getTime();
    }
    return false;
  }

  // Validate if the day received is equal that today
  isCurrentDay(day: Date): boolean {
    if (day) {
      return day.toDateString() === new Date().toDateString();
    } else {
      return false;
    }
  }
}
