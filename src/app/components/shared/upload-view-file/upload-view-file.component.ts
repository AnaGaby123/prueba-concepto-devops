/* Core Imports */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

/* Models Imports */
import {IUploadFile} from '@appModels/UploadFile/UploadFile';

/* Dev Tools */
import {NGXLogger} from 'ngx-logger';
import * as servicesLogger from '@appUtil/logger';

const FILE_NAME = 'upload-view-file.component.ts';

@Component({
  selector: 'app-upload-view-file',
  templateUrl: './upload-view-file.component.html',
  styleUrls: ['./upload-view-file.component.scss'],
})
export class UploadViewFileComponent implements AfterViewInit, OnChanges {
  @ViewChild('visor', {static: false}) visor: ElementRef;
  @Input() activePadding = true;
  @Input() internalPadding = '20px 30px 20px 30px';
  @Input() datasFile = {titulo: '', path: ''};
  @Input() isDisable = false;
  @Input() text = '';
  @Input() showReplaceFile = false;
  @Output() handleFileUpload: EventEmitter<IUploadFile> = new EventEmitter<IUploadFile>();

  firstUpload = true;
  file: FileList;
  blob: any;

  constructor(private changeDetectorRef: ChangeDetectorRef, private logger: NGXLogger) {}

  ngAfterViewInit(): void {
    if (this.datasFile?.path) {
      this.visor.nativeElement.src = this.datasFile.path;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.datasFile?.previousValue &&
      changes.datasFile?.currentValue &&
      changes.datasFile?.currentValue.path
    ) {
      this.changeDetectorRef.detectChanges();
      if (this.visor && this.datasFile?.path) {
        this.visor.nativeElement.src = this.datasFile.path;
      }
    }
  }

  fileChange($event): void {
    this.logger.debug(servicesLogger.generateMessage(FILE_NAME, '@fileChange: Entre'), $event);
    this.file = $event.target.files;
    this.handleEmbedPDF();
  }

  handleEmbedPDF(): void {
    this.logger.debug(servicesLogger.generateMessage(FILE_NAME, '@handleEmbedPDF: Entre'));
    const file = this.file?.item(0);
    this.blob = window.URL.createObjectURL(file);
    this.handleFileUpload.emit({path: this.blob, file});
  }

  deleteFile(): void {
    this.blob = '';
    this.file = null;
    this.handleFileUpload.emit({path: '', file: null});
  }
}
