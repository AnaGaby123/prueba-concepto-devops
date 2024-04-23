import {Pipe, PipeTransform} from '@angular/core';
import {getOnlyFileName} from '@appUtil/files';

@Pipe({
  name: 'textFormat',
})
export class TextFormatPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}

@Pipe({
  name: 'onlyFileNamePdf',
})
export class OnlyFileNamePdf implements PipeTransform {
  transform(fileKey: string): any {
    return getOnlyFileName(fileKey);
  }
}
