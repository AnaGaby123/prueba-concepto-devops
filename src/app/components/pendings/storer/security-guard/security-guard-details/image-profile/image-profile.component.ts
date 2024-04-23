import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IFile} from '@appModels/files/files.models';
import {isEmpty} from 'lodash-es';

import {Observable} from 'rxjs';
import * as selectUtils from '@appSelectors/utils/utils.selectors';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {getBase64FromFile} from '@appUtil/files';

@Component({
  selector: 'app-image-profile',
  templateUrl: './image-profile.component.html',
  styleUrls: ['./image-profile.component.scss'],
})
export class ImageProfileComponent {
  constructor(private store: Store<AppState>) {}

  @Input() image: IFile = {};
  @Input() showAddImage = false;
  @Input() showDeleteImage = false;
  @Input() isLoading: boolean;
  viewType$: Observable<string> = this.store.select(selectUtils.selectViewType);
  @Output() emitResponse: EventEmitter<IFile> = new EventEmitter<IFile>();

  async addImage(image: Event): Promise<void> {
    if (!isEmpty((image.target as HTMLInputElement).files)) {
      const files = (image.target as HTMLInputElement).files[0];
      const ext = files.type.split('/')[1];
      const base64 = (await getBase64FromFile(files, ext)) + '';

      this.emitResponse.emit({
        file: files,
        base64,
      });
    }
  }

  deleteImage(): void {
    this.image = {};
    this.emitResponse.emit(null);
  }
}
