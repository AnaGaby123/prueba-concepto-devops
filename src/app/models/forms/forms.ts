import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface SetByField {
  field: string;
  valueIsString?: string;
  valueIsNumber?: number;
  valueIsDate?: Date;
  valueIsOption?: DropListOption;
}
