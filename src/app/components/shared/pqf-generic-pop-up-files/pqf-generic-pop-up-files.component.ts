import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {PqfGenericPopUpComponent} from '@appComponents/shared/pqf-generic-pop-up/pqf-generic-pop-up.component';
import {Archivo} from 'api-catalogos';
import {filter} from 'lodash-es';

@Component({
  selector: 'pqf-generic-pop-up-files',
  templateUrl: './pqf-generic-pop-up-files.component.html',
  styleUrls: [
    './pqf-generic-pop-up-files.component.scss',
    '../pqf-generic-pop-up/pqf-generic-pop-up.component.scss',
  ],
})
export class PqfGenericPopUpFilesComponent extends PqfGenericPopUpComponent
  implements AfterViewInit {
  @ViewChild('downArrow') downArrow: ElementRef<HTMLInputElement>;
  @ViewChild('filesContent') filesContent: ElementRef<HTMLInputElement>;
  @ViewChild('upArrow') upArrow: ElementRef<HTMLInputElement>;
  @Input() files: Array<any> = [];
  @Output() emitExternalFile: EventEmitter<File | Archivo> = new EventEmitter<File | Archivo>();
  @Output() fileToDelete: EventEmitter<File | Archivo> = new EventEmitter<File | Archivo>();
  arrowDownNativeElement;
  arrowUpNativeElement;
  downDisable = 'assets/Images/components-src/generic-input-file/arrow-file-down-disable.svg';
  downEnable = 'assets/Images/components-src/generic-input-file/arrow-file-down.svg';
  upDisable = 'assets/Images/components-src/generic-input-file/arrow-file-up-disable.svg';
  upEnable = 'assets/Images/components-src/generic-input-file/arrow-file-up.svg';

  constructor(private renderer: Renderer2) {
    super();
  }

  ngAfterViewInit() {
    if (this.files.length > 7) {
      this.arrowUpNativeElement = this.renderer.selectRootElement(this.upArrow).nativeElement;
      this.arrowDownNativeElement = this.renderer.selectRootElement(this.downArrow).nativeElement;
      this.getUpArrow();
      this.getDownArrow();
    }
  }

  // DOCS: EMITE EL ID DEL ARCHIVO PARA SU DESCARGA
  emitFile(file) {
    if (file.FileKey) {
      this.emitExternalFile.emit(file.IdArchivo);
    }
  }

  // DOCS: EMITE EL ARCHIVO A ELIMINAR
  emitFileToDelete(file: File | Archivo) {
    this.fileToDelete.emit(file);
    this.files = filter(this.files, (f: File | Archivo) => f !== file);
  }

  getDownloadImage(file) {
    if (file.FileKey) {
      return 'assets/Images/components-src/generic-input-file/download.svg';
    } else {
      return 'assets/Images/components-src/generic-input-file/download-disable.svg';
    }
  }

  getUpArrow() {
    if (this.files.length > 7) {
      if (this.filesContent.nativeElement.scrollTop > 0) {
        this.renderer.setAttribute(this.arrowUpNativeElement, 'src', this.upEnable);
        this.arrowUpNativeElement.style.cursor = 'pointer';
      } else {
        this.renderer.setAttribute(this.arrowUpNativeElement, 'src', this.upDisable);
        this.arrowUpNativeElement.style.cursor = 'default';
      }
    }
  }

  getDownArrow() {
    if (this.files.length > 7) {
      if (
        Math.round(
          this.filesContent.nativeElement.scrollHeight - this.filesContent.nativeElement.scrollTop,
        ) === this.filesContent.nativeElement.clientHeight
      ) {
        this.renderer.setAttribute(this.arrowDownNativeElement, 'src', this.downDisable);
        this.arrowDownNativeElement.style.cursor = 'default';
      } else {
        this.renderer.setAttribute(this.arrowDownNativeElement, 'src', this.downEnable);
        this.arrowDownNativeElement.style.cursor = 'pointer';
      }
    }
  }

  // DOCS: HACE SCROLL HACIA ABAJO
  scrollDown() {
    this.filesContent.nativeElement.scrollBy(0, 30);
    this.getUpArrow();
    this.getDownArrow();
  }

  // DOCS: CIERRA EL POP
  showEvent(event) {
    this.event.emit(event);
  }

  // DOCS: HACE STROLL HACIA ARRIBA
  scrollUp() {
    this.filesContent.nativeElement.scrollBy(0, -20);
    this.getUpArrow();
    this.getDownArrow();
  }
}
