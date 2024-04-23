import {DropListOption} from '@appModels/drop-list/drop-list-option';
import * as moment from 'moment';

export const dateFormatISO = (value) => {
  const year = value.substr(0, 4);
  const month = value.substr(4, 2);
  const day = value.substr(6, 2);
  const date = new Date(year, month - 1, day);
  return date.toISOString();
};

// DOCS: Fecha en formato ISO con horas y minutos en 0
export const currentDateWithoutHours = (date?: Date) => {
  let today = date ? new Date(date).toISOString() : new Date().toISOString();
  const todayDate = today.split('T');
  today = new Date(date[0]).toISOString();
  return today;
};

// DOCS: Fecha y hora actual en tiempo local pero con formato UTC/ISO tipo string
export const currentLocaleDateUTCFormat = (): string => {
  // Creamos una fecha con el tiempo actual
  const now = new Date();
  // Le restamos las horas de diferencia por la zona horaria
  // Se le restan porque al convertirlo en ISOString() este le suma esas mismas horas.
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  // Devolvemos la fecha en formato ISOString()
  return now.toISOString();
};

// DOCS: Fecha y hora actual en tiempo local pero con formato UTC/ISO tipo Date
export const currentLocaleDateUTCFormatDate = (): Date => {
  // Creamos una fecha con el tiempo actual
  const now = new Date();
  // Le restamos las horas de diferencia por la zona horaria
  return new Date(now.setMinutes(now.getMinutes() - now.getTimezoneOffset()));
};

// DOCS: Fecha actual sin horas con formato UTC/ISO tipo string
export const currentDateWithoutHoursUTCFormat = (): string => {
  // Creamos una fecha con el tiempo actual
  const now = new Date();
  // Le restamos las horas de diferencia por la zona horaria
  const newDate = new Date(now.setMinutes(now.getMinutes() - now.getTimezoneOffset()));
  // Convertimos a string
  const newDateString = newDate.toISOString();
  // Quitamos las horas
  const split = newDateString.split('T');
  // Devolvemos la fecha en formato ISOString()
  return new Date(split[0]).toISOString();
};
export const dateWithoutHoursUTCDate = (date?: Date): Date => {
  const dateClean: Date = date ? date : new Date();
  dateClean.setHours(0, 0, 0, 0);
  return dateClean;
};

// DOCS: Fecha recibida sin horas con formato UTC/ISO tipo string
export const getDateWithoutHoursUTCFormat = (date: Date): string => {
  // Le restamos las horas de diferencia por la zona horaria
  const newDate = new Date(date.setMinutes(date.getMinutes() - date.getTimezoneOffset()));
  // Convertimos a string
  const newDateString = newDate.toISOString();
  // Quitamos las horas
  const split = newDateString.split('T');
  // Devolvemos la fecha en formato ISOString()
  return new Date(split[0]).toISOString();
};

// DOCS: Fecha actual sin horas con formato UTC/ISO tipo Date
export const currentDateWithoutHoursUTCFormatDate = (date?: Date): Date => {
  // Creamos una fecha con el tiempo actual

  const now = date ? new Date(date) : new Date();

  // Convertimos a string
  const newDateString = now.toISOString();
  // Quitamos las horas
  const split = newDateString.split('T');
  // Convertimos a fecha sin horas
  const finalDate = new Date(split[0]);
  // Se le agregan las horas de la diferencia horaria
  return new Date(finalDate.setMinutes(finalDate.getMinutes() + finalDate.getTimezoneOffset()));
};

// DOCS: Fecha actual sin horas con formato UTC/ISO tipo string y tipo Date en un objeto
export const currentDateWithoutHoursDateString = () => {
  let todayDate = new Date().toISOString();
  const date = todayDate.split('T');
  todayDate = new Date(date[0]).toISOString();

  return {
    date: new Date(),
    stringDate: todayDate,
  };
};

// DOCS: Convierte una fecha proveniente de un datePicker a un con objeto con fechas sin horas con formato UTC/ISO tipo string y tipo Date
export const currentDateWithHoursInZeroUTCFormatDate = (date: string) => {
  const year = Number(date.substr(0, 4));
  const month = Number(date.substr(4, 2));
  const day = Number(date.substr(6, 2));
  const newDate = new Date(year, month - 1, day);
  const dateType = new Date(year, month - 1, day);
  const finalDate = new Date(
    newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset()),
  ).toISOString();

  return {
    date: dateType,
    stringDate: finalDate,
  };
};
// DOCS: Convierte fecha de tipo string a tipo Date con el ajuste de la zona horaria
export const dateWithHoursFormatDate = (date: string): Date => {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
  return newDate;
}; // DOCS: Genera un lapso de horas por un rango de tiempo en minutos
export const generateSchedule = (
  initHour: string,
  finalHour: string,
  range: number,
): Array<DropListOption> => {
  let count = 0;
  const listSchedule: Array<DropListOption> = [
    {
      label: moment(initHour, 'h:mm').format('H:mm'),
      value: count.toString(),
    },
  ];

  let hour = moment(initHour, 'h:mm').format('H:mm');
  while (moment(hour, 'h:mm') <= moment(finalHour, 'h:mm').subtract(range, 'm')) {
    hour = moment(hour, 'h:mm').add(range, 'm').format('H:mm');
    count++;
    listSchedule.push({
      label: hour,
      value: count.toString(),
    });
  }
  return listSchedule;
};

// Método para calcular la fecha de entrega estimada con días hábiles
export const calculateEstimatedDeliveryDate = (
  date: Date,
  days: number,
  nonWorkingDays: string[],
): Date => {
  if (!date || days <= 0 || isNaN(days) || !nonWorkingDays || nonWorkingDays.length === 0) {
    return null;
  }

  const newDate = new Date(date);
  let count = 0;

  while (count < days) {
    newDate.setDate(newDate.getDate() + 1);
    const dateToCompare = newDate.toISOString().split('T')[0];
    const isNonWorkingDay = nonWorkingDays
      .map((day: string) => day.split('T')[0])
      .includes(dateToCompare);

    if (!isNonWorkingDay) {
      count++;
    }
  }
  return newDate;
};
