import {Pipe, PipeTransform} from '@angular/core';
import {REGEX_8_DECIMALS} from '@appUtil/common.protocols';
import {numberToPercentage} from '@appUtil/util';
import {formatMoney, formatNumber} from 'accounting';

@Pipe({
  name: 'accounting',
})
export class AccountingPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormat implements PipeTransform {
  transform(value: number, spy: string, ...args): any {
    return formatMoney(value);
  }
}

@Pipe({
  name: 'percentageTransform',
})
export class PercentageTransform implements PipeTransform {
  transform(numberToTransform: number | string, ...args): string {
    if (!numberToTransform) {
      return '0%';
    }
    return `${numberToPercentage(Number(numberToTransform))}%`;
  }

  truncateNumber(n: number | string) {
    const t = n.toString();
    return `${Number(t.match(REGEX_8_DECIMALS)[0]).toString()}%`;
  }
}

@Pipe({
  name: 'pqfPercentageTransform',
})
export class PqfPercentageTransform implements PipeTransform {
  transform(numberToTransform: number | string, decimals?: number): string {
    if (!numberToTransform) {
      return '0%';
    }
    let percentageNumber = numberToPercentage(Number(numberToTransform));
    if (decimals) {
      percentageNumber = Number(percentageNumber.toFixed(decimals));
    }
    return `${percentageNumber}%`;
  }
}

@Pipe({
  name: 'acFormatNumber',
})
export class AccountingFormatNumber implements PipeTransform {
  transform(numberToFormat: number): any {
    return formatNumber(numberToFormat);
  }
}
