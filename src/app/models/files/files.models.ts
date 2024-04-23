import {IChipFile} from '@appModels/chip-file/chip-file';

export interface IFile {
  file?: File;
  base64?: string;
}

export interface IUploadFileCustom extends IFile, IChipFile {
  name?: string;
  destinyBucketName?: string;
}
