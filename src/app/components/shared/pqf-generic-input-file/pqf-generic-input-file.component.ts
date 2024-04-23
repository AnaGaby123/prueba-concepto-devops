import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {filter, isEmpty} from 'lodash-es';

import {Archivo} from 'api-catalogos';
import {generateUuid} from '@appUtil/strings';
import {getOnlyFileName} from '@appUtil/files';

@Component({
  selector: 'pqf-generic-input-file',
  templateUrl: './pqf-generic-input-file.component.html',
  styleUrls: ['./pqf-generic-input-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PqfGenericInputFileComponent implements OnInit, AfterViewInit {
  @Input() acceptedExtensions: string = '*'; //DOCS: QUE TIPO DE ARCHIVO ACEPTAR
  @Input() buttonsColor: 'green' = 'green'; //DOCS: IMAGEN DEL INPUT FILE
  @Input() serviceFiles: Array<Archivo> = []; // DOCS: ARCHIVOS QUE VIENEN DE SERVICIO
  @Input() fileName: string = null; //DOCS: NOMBRE DEL ARCHIVO
  @Input() idFile = null;
  @Input() isActive: boolean = true; //DOCS: (ENABLED / DISABLED) DEL INPUT
  @Input() isReadonly: boolean = false; //DOCS: true - MOSTRAR EL INPUT COMO MODO LECTURA
  @Input() isRequired: boolean = false; //DOCS: ES REQUERIDO (CAMPO OBLIGATORIO)
  @Input() label: string = '';
  @Input() labelDisabledFontColor: string = '#A0A0A0';
  @Input() labelFontColor: string = '#424242';
  @Input() onlyOneFile: boolean = false;
  @Input() placeholder: string = 'Seleccionar...';
  @Output() autoEmitFile: EventEmitter<Array<File>> = new EventEmitter<Array<File>>();
  @Output() emitExternalFile: EventEmitter<string> = new EventEmitter<string>();
  @Output() emitFileToDelete: EventEmitter<string> = new EventEmitter<string>();
  fileIsNotSelected: boolean = true;
  files: Array<any> = [];
  id: string;
  inputFile: HTMLInputElement;
  lodashIsEmpty = isEmpty;
  showPop = false;

  constructor(private cdr: ChangeDetectorRef) {
    this.id = generateUuid();
  }

  ngOnInit(): void {
    this.files = this.serviceFiles;
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.inputFile = document.getElementById(this.id) as HTMLInputElement;
  }

  selectFile(event: Event): void {
    if (!isEmpty((event.target as HTMLInputElement).files)) {
      this.files.push((event.target as HTMLInputElement).files[0]);
      this.fileIsNotSelected = true;
      this.autoEmit();
    }
  }

  closeFileBrowser(event: Event): void {
    if (isEmpty((event.target as HTMLInputElement).files) && this.isRequired) {
      this.fileIsNotSelected = false;
      this.autoEmit();
    }
  }

  autoEmit(): void {
    this.autoEmitFile.emit(this.files);
  }

  getSelectOrReloadImage() {
    return !this.isActive
      ? 'assets/Images/components-src/generic-input-file/plus-gray.svg'
      : `assets/Images/components-src/generic-input-file/plus-white.svg`;
  }

  handlePopOpen(event) {
    this.showPop = event;
  }

  getExternalFile(idFile: string) {
    if (idFile) {
      this.emitExternalFile.emit(idFile);
    }
  }

  getNameFile(event): string {
    return event[0]?.name || getOnlyFileName(event[0].FileKey);
  }

  removeFile(event, file?) {
    if (file) {
      if (file.FileKey) {
        this.emitFileToDelete.emit(file.IdArchivo);
      }
      this.files = filter(this.files, (f) => f !== file);
    } else {
      this.files.pop();
      if (this.inputFile) {
        this.inputFile.value = null;
      }
    }
    this.fileName = null;
    if (event) {
      event.stopPropagation();
    }
  }
}
