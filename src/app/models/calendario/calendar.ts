export class Calendar {
  firstWeekDay: number;

  constructor(firstWeekDay = 0) {
    this.firstWeekDay = firstWeekDay; // 0 = Sunday
  }

  weekStartDate(date: any) {
    const startDate = new Date(date.getTime());
    while (startDate.getDay() !== this.firstWeekDay) {
      startDate.setDate(startDate.getDate() - 1);
    }
    return startDate;
  }

  monthDates(year: any, month: any, dayFormatter: any = null, weekFormatter: any = null) {
    if (typeof year !== 'number' || year < 1970) {
      throw 'year must be a number >= 1970';
    }
    if (typeof month !== 'number' || month < 0 || month > 11) {
      throw 'month must be a number (Jan is 0)';
    }
    const weeks: Array<any> = [];
    let week: Array<any> = [];
    let i = 0;
    let date = this.weekStartDate(new Date(year, month, 1));
    do {
      for (i = 0; i < 7; i++) {
        week.push(dayFormatter ? dayFormatter(date) : date);
        date = new Date(date.getTime());
        date.setDate(date.getDate() + 1);
      }
      weeks.push(weekFormatter ? weekFormatter(week) : week);
      week = [];
    } while (date.getMonth() <= month && date.getFullYear() === year);
    return weeks;
  }

  monthDays(year: number, month: number) {
    const getDayOrZero = function getDayOrZero(date: any) {
      return date.getMonth() === month ? date : 0;
    };
    return this.monthDates(year, month, getDayOrZero);
  }
}

const months = 'JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC'.split('');
for (let i = 0; i < months.length; i++) {
  Calendar[months[i]] = i;
}

export interface CalendarDay {
  day: number | Date;
  enable: boolean;
  color?: string;
}

export interface ValidationResult {
  [key: string]: boolean;
}

export const monthsTranslate = () => ({
  January: {month: 'Enero', number: '01'},
  February: {month: 'Febrero', number: '02'},
  March: {month: 'Marzo', number: '03'},
  April: {month: 'Abril', number: '04'},
  May: {month: 'Mayo', number: '05'},
  June: {month: 'Junio', number: '06'},
  July: {month: 'Julio', number: '07'},
  August: {month: 'Agosto', number: '08'},
  September: {month: 'Septiembre', number: '09'},
  October: {month: 'Octubre', number: '10'},
  November: {month: 'Noviembre', number: '11'},
  December: {month: 'Diciembre', number: '12'},
});
