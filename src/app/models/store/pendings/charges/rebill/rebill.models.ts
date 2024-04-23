// import {DropListOption} from '@appModels/drop-list/drop-list-option';
// import {IRadioButton} from '@appModels/radio-button/radio-button.models';

// export interface IRebillDetails {
//   radioButtons: Array<IRadioButton>;
//   reasonOptions: Array<DropListOption>;
//   cancelInvoice: ICancelInvoice;
//   rebill: IRebillRadio;
//   creditNote: ICreditNote;
// }
// export const initialIRebillDetails = (): IRebillDetails => ({
//   radioButtons: [
//     {value: true, label: 'cancelInvoice'},
//     {value: false, label: 'rebill'},
//     {value: false, label: 'creditNote'},
//   ],
//   reasonOptions: [
//     {value: 1, label: 'No se'},
//     {value: 2, label: 'No tengo idea'},
//     {value: 3, label: 'No me interesa'},
//   ],
//   cancelInvoice: {reason: null},
//   rebill: initialIRebillRadio(),
//   creditNote: initialICreditNote(),
// });
// export interface ICancelInvoice {
//   reason: DropListOption;
// }
// export interface IRebillRadio {
//   checkBox: boolean;
//   reason: DropListOption;
// }
// export interface ICreditNote {
//   dropItems: Array<DropListOption>;
//   dropItemSelected: DropListOption;
//   isInItemsView: boolean;
// }
// export const initialIRebillRadio = (): IRebillRadio => ({
//   checkBox: false,
//   reason: null,
// });
// export const initialICreditNote = (): ICreditNote => ({
//   dropItems: [
//     {value: 1, label: 'Prueba1'},
//     {value: 2, label: 'Prueba2'},
//   ],
//   dropItemSelected: null,
//   isInItemsView: false,
// });
