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
import {isEmpty} from 'lodash-es';

import {NGXLogger} from 'ngx-logger';
import {generateMessage} from '@appUtil/logger';
import {showDocument} from '@appUtil/files';
import {generateUuid} from '@appUtil/strings';

@Component({
  selector: 'app-generic-input-file',
  templateUrl: './generic-input-file.component.html',
  styleUrls: ['./generic-input-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenericInputFileComponent implements OnInit, AfterViewInit {
  @Input() acceptedExtensions = '*';
  @Input() buttonsColor: 'ocean' | 'dark-orange' | 'purple' = 'ocean';
  @Input() disabled = false;
  @Input() file: File = null;
  @Input() fileName: string = null;
  @Input() label = '';
  @Input() labelFont = 'Roboto-Regular';
  @Input() labelFontColor = '#424242';
  @Input() labelDisabledFontColor = '#C2C3C9';
  @Input() placeholder = 'Seleccionar...';
  @Input() showAddSelectedFile = false;
  @Input() showInputFileBox = true;
  @Input() showSeeSelectedFile = true;
  @Input() enableEdit = true;
  @Input() idFile = null;
  @Input() classInput: 'special' | 'classic' = 'classic';
  @Output() autoEmitFile: EventEmitter<File> = new EventEmitter<File>();
  @Output() manualEmitFile: EventEmitter<File> = new EventEmitter<File>();
  @Output() emitExternalFile: EventEmitter<string> = new EventEmitter<string>();
  @Output() emitFileToDelete: EventEmitter<string> = new EventEmitter<string>();

  id: string;
  inputFile: HTMLInputElement;

  constructor(private cdr: ChangeDetectorRef, private logger: NGXLogger) {
    this.id = generateUuid();
  }

  ngOnInit(): void {
    if (!this.showSeeSelectedFile) {
      this.logger.warn(
        generateMessage('GenericInputFileComponent', '@Input showSeeSelectedFile OBSOLETO'),
      );
    }
    if (!this.showInputFileBox) {
      this.logger.warn(
        generateMessage('GenericInputFileComponent', '@Input showInputFileBox OBSOLETO'),
      );
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.inputFile = document.getElementById(this.id) as HTMLInputElement;
  }

  selectFile(event: Event): void {
    if (!isEmpty((event.target as HTMLInputElement).files)) {
      this.file = (event.target as HTMLInputElement).files[0];
      this.autoEmit();
    }
  }

  handleAddButton(): void {
    if (this.file) {
      this.manualEmit();
      this.cleanInputFile();
    }
  }

  handleCleanInput(): void {
    if (this.file) {
      this.cleanInputFile();
      this.autoEmit();
    }
  }

  handleSeeFile(): void {
    if (this.file) {
      showDocument(this.file);
      /* const blob = window.URL.createObjectURL(this.file);
      const anchor = document.createElement('a');
      anchor.setAttribute('href', blob);
      anchor.setAttribute('target', '_blank');
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);*/
    } else {
      this.emitExternalFile.emit(this.idFile);
    }
  }

  cleanInputFile(): void {
    if (this.inputFile) {
      this.inputFile.value = null;
    }
    this.file = null;
    this.fileName = null;
    this.emitFileToDelete.emit(this.idFile);
  }

  autoEmit(): void {
    this.autoEmitFile.emit(this.file);
  }

  manualEmit(): void {
    this.manualEmitFile.emit(this.file);
  }

  getSelectOrReloadImage(): string {
    return this.disabled
      ? 'assets/Images/select-file-disabled.svg'
      : this.file
      ? `assets/Images/reload-file-${this.buttonsColor}.svg`
      : `assets/Images/select-file-${this.buttonsColor}.svg`;
  }

  getSelectImage(): string {
    return this.disabled
      ? 'assets/Images/select-file-disabled.svg'
      : `assets/Images/select-file-${this.buttonsColor}.svg`;
  }

  getSeeFileImage(): string {
    return this.file && !this.disabled
      ? `assets/Images/eye-see-file-${this.buttonsColor}.svg`
      : 'assets/Images/eye-see-file-disabled.svg';
  }
}
