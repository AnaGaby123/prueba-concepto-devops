import {Component, Input, OnInit} from '@angular/core';
import {DOWLOAD_FILE_LOAD} from '@appActions/utils/utils.action';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';

@Component({
  selector: 'app-image-file',
  templateUrl: './image-file.component.html',
  styleUrls: ['./image-file.component.scss'],
})
export class ImageFileComponent implements OnInit {
  @Input() base64File: string;
  @Input() fileId: string;
  @Input() fileKey: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  isBase64Image(base64String: string): boolean {
    return /^(data:image\/(jpeg|jpg|png|svg\+xml);base64,)/.test(base64String);
  }

  download(): void {
    this.store.dispatch(DOWLOAD_FILE_LOAD({IdArchivo: this.fileId, FileKey: this.fileKey}));
  }
}
