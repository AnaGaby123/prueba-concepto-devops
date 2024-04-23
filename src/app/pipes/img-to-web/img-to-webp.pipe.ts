import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'imgToWebp',
})
export class ImgToWebpPipe implements PipeTransform {
  transform(name: string): string {
    if (name && /\.(jpeg|jpg|png)$/i.test(name)) {
      return name.replace(/\.(jpeg|jpg|png)$/i, '.webp');
    }
    return name;
  }
}
