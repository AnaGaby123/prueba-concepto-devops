/* Core Imports */
import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

/* Tools Imports */
import {filter, isEmpty} from 'lodash-es';

/* Utils Imports */
/* Models Imports */
import {IFile} from '@appModels/files/files.models';
import {getBase64FromFile} from '@appUtil/files';

@Component({
  selector: 'app-load-and-carousel-images',
  templateUrl: './load-and-carousel-images.component.html',
  styleUrls: ['./load-and-carousel-images.component.scss'],
})
export class LoadAndCarouselImagesComponent {
  @Output() arrayEmit: EventEmitter<Array<IFile>> = new EventEmitter<Array<IFile>>();
  @Input() images: Array<IFile> = [];
  @Input() currentPosition = 0;
  @Input() imageContainerWidth = '900px';
  @Input() imageContainerHeight = '600px';
  @Input() text = 'Cargar Fotografía de paquete abierto';
  @ViewChild('currentImg') currentImg: ElementRef;

  async addImage(event: Event): Promise<void> {
    if (!isEmpty((event.target as HTMLInputElement).files)) {
      const {files} = event.target as HTMLInputElement;
      for (let i = 0; i < files.length; i++) {
        const ext = files[i].type.split('/')[1];
        const base64 = await getBase64FromFile(files[i], ext);
        this.images = [
          ...this.images,
          {
            file: files[i],
            base64,
          },
        ];
      }

      this.currentPosition = this.images.length - 1;
      this.resetWidth();
      this.emitArray();
    }
  }

  changeImage(direction: 'next' | 'prev'): void {
    if (this.images.length === 1) {
      return;
    }
    this.resetWidth();
    if (direction === 'next') {
      if (this.currentPosition === this.images.length - 1) {
        this.currentPosition = 0;
      } else {
        this.currentPosition++;
      }
    } else {
      if (this.currentPosition === 0) {
        this.currentPosition = this.images.length - 1;
      } else {
        this.currentPosition--;
      }
    }
  }

  deleteImage(): void {
    if (this.currentPosition === 0 || this.currentPosition !== this.images.length - 1) {
      this.images = filter(this.images, (img, index) => index !== this.currentPosition);
    } else if (this.currentPosition === this.images.length - 1) {
      this.images = filter(this.images, (img, index) => index !== this.currentPosition);
      this.currentPosition--;
    }
    this.resetWidth();
    this.emitArray();
  }

  zoom(type: 'out' | 'in'): boolean {
    const currentWidth = this.currentImg.nativeElement.clientWidth;
    if (type === 'out') {
      if (currentWidth < 500) {
        return false;
      }
      this.currentImg.nativeElement.style.width = `${currentWidth - 150}px`;
    } else {
      if (currentWidth > 3000) {
        return false;
      }
      this.currentImg.nativeElement.style.width = `${currentWidth + 150}px`;
    }
  }

  resetWidth(): void {
    if (this.currentImg) {
      this.currentImg.nativeElement.style.width = '100%';
    }
  }

  emitArray() {
    this.arrayEmit.emit(this.images);
  }
}
