/* Core  Imports */
import {Pipe, PipeTransform} from '@angular/core';

/* Lib Imports */
import {DAYS_OF_WEEK, MONTHS_OF_YEAR, MONTHS_OF_YEAR_SHORTS} from '@appUtil/common.protocols';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return null;
  }
}

// DOCS 15/Marzo/2023
@Pipe({
  name: 'dateFormatSlash',
})
export class DateFormatSlash implements PipeTransform {
  transform(dateToFormat: any, ...args): any {
    const months = MONTHS_OF_YEAR;
    const now: Date = new Date(dateToFormat);
    now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
    let day: string = now.getDate().toString();
    day = `0${day}`.slice(-2);
    const month: number = now.getMonth();
    const year: string = now.getFullYear().toString();
    return `${day}/${months[month]}/${year}`;
  }
}

// DOCS 08/Abr/2022
@Pipe({
  name: 'dateFormatSlashShort',
})
export class DateFormatSlashShort implements PipeTransform {
  transform(dateToFormat: any, ...args): any {
    const months = MONTHS_OF_YEAR_SHORTS;
    const now: Date = new Date(dateToFormat);
    now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
    let day: string = now.getDate().toString();
    day = `0${day}`.slice(-2);
    const month: number = now.getMonth();
    const year: string = now.getFullYear().toString();
    return `${day}/${months[month]}/${year}`;
  }
}

// DOCS 8 · Abril · 2022
@Pipe({
  name: 'dateFormatDot',
})
export class DateFormatDot implements PipeTransform {
  transform(dateToFormat: any, ...args): any {
    const months = MONTHS_OF_YEAR;
    const now: Date = new Date(dateToFormat);
    now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
    const day: string = now.getDate().toString();
    const month: number = now.getMonth();
    const year: string = now.getFullYear().toString();
    return `${day} · ${months[month]} · ${year}`;
  }
}

//DOCS 15-03-2023
@Pipe({
  name: 'dateFormatNumber',
})
export class DateFormatNumber implements PipeTransform {
  transform(
    dateToFormat: string | Date,
    separator = '-',
    initial = 'days',
    yearDigits = 4,
    ...args
  ): any {
    const now: Date = typeof dateToFormat === 'string' ? new Date(dateToFormat) : dateToFormat;

    const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
    const day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    const year = now.getFullYear().toString().slice(-yearDigits);

    const options = {
      year: () => `${year}${separator}${month}${separator}${day}`,
      month: () => `${month}${separator}${day}${separator}${year}`,
      days: () => `${day}${separator}${month}${separator}${year}`,
    };

    return options[initial]();
  }
}

@Pipe({
  name: 'dateAgoFormat',
  pure: true,
})
export class DateFormatAgo implements PipeTransform {
  transform(dateToFormat: string | Date, ...args): any {
    if (dateToFormat) {
      const now: Date = new Date();
      let date: Date;
      if (typeof dateToFormat === 'string') {
        date = new Date(dateToFormat);
      } else {
        date = dateToFormat;
      }
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

      if (
        now.getFullYear() === date.getFullYear() &&
        now.getMonth() === date.getMonth() &&
        now.getDate() === date.getDate()
      ) {
        if (date.getHours() < 12) {
          return (
            date.getHours() +
            ':' +
            (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
            ' Am'
          );
        } else if (date.getHours() === 12) {
          return (
            date.getHours() +
            ':' +
            (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
            ' Pm'
          );
        } else if (date.getHours() === 24) {
          return (
            date.getHours() -
            12 +
            ':' +
            (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
            ' Am'
          );
        } else {
          return (
            date.getHours() -
            12 +
            ':' +
            (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
            ' Pm'
          );
        }
      } else if (
        now.getFullYear() === date.getFullYear() &&
        now.getMonth() === date.getMonth() &&
        now.getDate() - date.getDate() === 1
      ) {
        return 'Ayer';
      } else {
        const year = date.getFullYear().toString();
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + year.substr(2, 2);
      }
    }
  }
}

@Pipe({
  name: 'longDateWithHourFormat',
  pure: true,
})
export class LongDateWithHourFormat implements PipeTransform {
  transform(dateToFormat: string | Date, ...args): any {
    if (dateToFormat) {
      let date: Date;
      if (typeof dateToFormat === 'string') {
        date = new Date(dateToFormat);
      } else {
        date = dateToFormat;
      }
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      let formatHour: string;
      let formatDate: string;

      if (hours < 12) {
        formatHour = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' Am';
      } else if (hours === 12) {
        formatHour = hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' Pm';
      } else if (hours === 24) {
        formatHour = hours - 12 + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' Am';
      } else {
        formatHour = hours - 12 + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' Pm';
      }

      switch (month) {
        case 0:
          formatDate = day + ' de Enero del ' + year + ', ' + formatHour;
          break;
        case 1:
          formatDate = day + ' de Febrero del ' + year + ', ' + formatHour;
          break;
        case 2:
          formatDate = day + ' de Marzo del ' + year + ', ' + formatHour;
          break;
        case 3:
          formatDate = day + ' de Abril del ' + year + ', ' + formatHour;
          break;
        case 4:
          formatDate = day + ' de Mayo del ' + year + ', ' + formatHour;
          break;
        case 5:
          formatDate = day + ' de Junio del ' + year + ', ' + formatHour;
          break;
        case 6:
          formatDate = day + ' de Julio del ' + year + ', ' + formatHour;
          break;
        case 7:
          formatDate = day + ' de Agosto del ' + year + ', ' + formatHour;
          break;
        case 8:
          formatDate = day + ' de Septiembre del ' + year + ', ' + formatHour;
          break;
        case 9:
          formatDate = day + ' de Octubre del ' + year + ', ' + formatHour;
          break;
        case 10:
          formatDate = day + ' de Noviembre del ' + year + ', ' + formatHour;
          break;
        case 11:
          formatDate = day + ' de Diciembre del ' + year + ', ' + formatHour;
          break;
        default:
          break;
      }
      return formatDate;
    }
  }
}

@Pipe({
  name: 'numbersPreviousDays',
  pure: true,
})
export class NumbersPreviousDays implements PipeTransform {
  transform(dateToFormat: string | Date, ...args): any {
    if (dateToFormat) {
      let date;
      const today = moment(new Date());
      if (typeof dateToFormat === 'string') {
        date = moment(new Date(dateToFormat));
      } else {
        date = moment(dateToFormat);
      }
      const days = today.diff(date, 'days');

      return days <= 0 ? '' : `Hace ${days} ${days === 1 ? 'Día' : 'Días'}`;
    }
  }
}

@Pipe({
  name: 'onlyDayNumber',
  pure: true,
})
export class OnlyDayNumber implements PipeTransform {
  transform(dateToFormat: string | Date, ...args): any {
    if (dateToFormat) {
      let date: Date;
      if (typeof dateToFormat === 'string') {
        date = new Date(dateToFormat);
      } else {
        date = dateToFormat;
      }
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
      return date.getDate();
    }
  }
}

@Pipe({
  name: 'daysRange',
  pure: true,
})
export class DaysRange implements PipeTransform {
  transform(datesToFormat: Array<string | Date>, ...args): any {
    if (datesToFormat.length >= 2) {
      const months = MONTHS_OF_YEAR;
      let initialDate: Date = null;
      let finalDate: Date = null;

      if (typeof datesToFormat[0] === 'string') {
        initialDate = new Date(datesToFormat[0]);
        initialDate.setMinutes(initialDate.getMinutes() + initialDate.getTimezoneOffset());
      } else {
        initialDate = datesToFormat[0];
      }

      if (typeof datesToFormat[datesToFormat.length - 1] === 'string') {
        finalDate = new Date(datesToFormat[datesToFormat.length - 1]);
        finalDate.setMinutes(finalDate.getMinutes() + finalDate.getTimezoneOffset());
      } else {
        finalDate = new Date(datesToFormat[datesToFormat.length - 1]);
      }

      const initialMonth = initialDate.getMonth();
      const initialYear = initialDate.getFullYear();
      const finalMonth = finalDate.getMonth();
      const finalYear = finalDate.getFullYear();

      if (initialYear !== finalYear) {
        return `Del ${initialDate.getDate()} De ${
          months[initialMonth]
        } Del ${initialYear} Al ${finalDate.getDate()} De ${months[finalMonth]} Del ${finalYear}`;
      } else if (initialMonth !== finalMonth) {
        return `Del ${initialDate.getDate()} De ${
          months[initialMonth]
        } Al ${finalDate.getDate()} De ${months[finalMonth]} Del ${finalYear}`;
      } else {
        return `Del ${initialDate.getDate()} Al ${finalDate.getDate()} De ${
          months[finalMonth]
        } Del ${finalYear}`;
      }
    }
  }
}

// DOCS Jueves 4 de Febrero del 2021
@Pipe({
  name: 'dateWithDayOfWeek',
  pure: true,
})
export class DateWithDayOfWeek implements PipeTransform {
  transform(dateToFormat: string | Date, ...args): any {
    if (dateToFormat) {
      let date: Date;
      const days = DAYS_OF_WEEK;
      const months = MONTHS_OF_YEAR;

      if (typeof dateToFormat === 'string') {
        const tempDate = dateToFormat.split('T');
        date = new Date(tempDate[0]);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

        const today = new Date();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();

        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds);
      } else {
        date = dateToFormat;
      }

      const dayOfWeek = date.getDay();
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      return `${days[dayOfWeek]} ${day} de ${months[month]} del ${year}`;
    }
  }
}

// DOCS 04/Febrero/2021 · 22:03 Hrs
@Pipe({
  name: 'dateFormatSlashWithHour',
})
export class DateFormatSlashWithHour implements PipeTransform {
  transform(dateToFormat: string | Date, shortMonth = false, ...args): any {
    const months = shortMonth ? MONTHS_OF_YEAR_SHORTS : MONTHS_OF_YEAR;
    let date: Date;
    if (typeof dateToFormat === 'string') {
      date = new Date(dateToFormat);
    } else {
      date = dateToFormat;
    }
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const day = `0${date.getDate().toString()}`.slice(-2);
    const month: number = date.getMonth();
    const year = date.getFullYear();
    const hours = `0${date.getHours().toString()}`.slice(-2);
    const minutes = `0${date.getMinutes().toString()}`.slice(-2);
    return `${day}/${months[month]}/${year} · ${hours}:${minutes} Hrs.`;
  }
}

// DOCS 04/Feb/2021 · 22:03 hrs.
@Pipe({
  name: 'dateFormatSlashShortWithHour',
})
export class DateFormatSlashShortWithHour implements PipeTransform {
  transform(dateToFormat: any, ...args): any {
    const months = MONTHS_OF_YEAR_SHORTS;
    const now: Date = new Date(dateToFormat);
    now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
    let day: string = now.getDate().toString();
    day = `0${day}`.slice(-2);
    const month: number = now.getMonth();
    const year: string = now.getFullYear().toString();
    const hours = `0${now.getHours().toString()}`.slice(-2);
    const minutes = `0${now.getMinutes().toString()}`.slice(-2);
    return `${day}/${months[month]}/${year} · ${hours}:${minutes} hrs.`;
  }
}

// DOCS 04/02/2021 · 22:03 hrs.
@Pipe({
  name: 'dateFormatSlashShortNumbersWithHour',
})
export class DateFormatSlashShortNumbersWithHour implements PipeTransform {
  transform(dateToFormat: any, ...args): any {
    const now: Date = new Date(dateToFormat);
    now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
    let day: string = now.getDate().toString();
    day = `0${day}`.slice(-2);
    const month: number = now.getMonth() + 1; // DOCS: EL NÚMERO DE MES COMIENZA EN 0 (SIENDO ESTE PARA ENERO)
    const year: string = now.getFullYear().toString();
    const hours = `0${now.getHours().toString()}`.slice(-2);
    const minutes = `0${now.getMinutes().toString()}`.slice(-2);
    return `${day}/${month}/${year} · ${hours}:${minutes} hrs.`;
  }
}

// DOCS 04/02/2021
@Pipe({
  name: 'dateFormatSlashShortNumbers',
})
export class DateFormatSlashShortNumbers implements PipeTransform {
  transform(dateToFormat: any, ...args): any {
    const now: Date = new Date(dateToFormat);
    now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
    let day: string = now.getDate().toString();
    day = `0${day}`.slice(-2);
    const month: number = now.getMonth() + 1;
    const year: string = now.getFullYear().toString();
    return `${day.padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.slice(2)}`;
  }
}
