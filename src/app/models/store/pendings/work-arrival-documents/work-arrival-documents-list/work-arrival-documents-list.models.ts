import {API_REQUEST_STATUS_DEFAULT, NEWER_VALUE, OLDER_VALUE} from '@appUtil/common.protocols';
import {DropListOption} from '@appModels/drop-list/drop-list-option';

export interface IWorkArrivalDocumentsList {
  providers: Array<any>;
  providersStatus: number;
  searchTerm: string;
  burgerOptions: Array<DropListOption>;
  selectedBurgerOption: DropListOption;
}

export const initialIWorkArrivalDocumentsList = (): IWorkArrivalDocumentsList => ({
  providers: [],
  providersStatus: API_REQUEST_STATUS_DEFAULT,
  searchTerm: '',
  burgerOptions: [
    {value: '1', label: OLDER_VALUE},
    {value: '2', label: NEWER_VALUE},
  ],
  selectedBurgerOption: {value: '1', label: OLDER_VALUE},
});
