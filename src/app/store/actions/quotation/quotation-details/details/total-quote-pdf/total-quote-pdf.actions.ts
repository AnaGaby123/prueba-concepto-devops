import {createAction, props} from '@ngrx/store';
import {buildingStringActionType} from '@appUtil/strings';
import {ArchivoDetalle, VCotCotizacion} from 'api-logistica';
import {CorreoEnviado} from 'api-catalogos';

const typeReducer = 'Total-Quote-Pdf';
const typeApi = 'Total-Quote-Pdf-Api';

export const NAVIGATE_TO_PDF_OF_SELECTED_QUOTATION_INIT_EFFECT = createAction(
  buildingStringActionType(typeReducer, 'Navigate to PDF Of Selected Quotation Init Effect'),
  props<{isLinkedQuote: boolean; quotation: VCotCotizacion; navigate: boolean}>(),
);
export const GENERATE_QUOTATION_PDF = createAction(
  buildingStringActionType(typeReducer, 'Generate Quotation PDF'),
);
export const DOWNLOAD_QUOTATION_PDF = createAction(
  buildingStringActionType(typeReducer, 'Download Quotation PDF'),
  props<{IdFilePdf: string}>(),
);
export const DOWNLOAD_QUOTATION_FAILED_PDF = createAction(
  buildingStringActionType(typeReducer, 'Download Quotation PDF Failed'),
);
export const RESEND_QUOTATION_LOAD = createAction(
  buildingStringActionType(typeReducer, 'Resend Quotation Load'),
  props<{
    sendEmailData: CorreoEnviado;
    comments: string;
  }>(),
);
export const RESEND_QUOTATION_FAILED = createAction(
  buildingStringActionType(typeReducer, 'Resend Quotation Failed'),
);
export const GET_PROCESS_SYSTEM = createAction(
  buildingStringActionType(typeApi, 'Get Process System'),
  props<{id: string}>(),
);
export const RETURN_VIEW = createAction(buildingStringActionType(typeReducer, 'Return View'));
export const FETCH_FILE_PDF_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch File PDF Success'),
  props<{base64: string}>(),
);
export const GENERATE_PDF_FAILED = createAction(
  buildingStringActionType(typeApi, 'Generate Pdf Failed'),
);
export const GENERATE_PDF_LOAD = createAction(
  buildingStringActionType(typeApi, 'Generate Pdf load'),
);

export const FETCH_FILE_PDF_INVESTIGATION_SUCCESS = createAction(
  buildingStringActionType(typeApi, 'Fetch File PDF investigation Success'),
  props<{base64: string}>(),
);
export const FETCH_FILE_PDF_INVESTIGATION_FAILED = createAction(
  buildingStringActionType(typeApi, 'Fetch File PDF investigation Failed'),
);
export const FETCH_FILE_PDF_INVESTIGATION_LOAD = createAction(
  buildingStringActionType(typeApi, 'Fetch File PDF investigation Load'),
);
export const CLEAN_DATA_QUOTE_PDF = createAction(
  buildingStringActionType(typeReducer, 'Clean Data Total Quote Pdf'),
);
export const SHOW_EMAIL_DIALOG = createAction(
  buildingStringActionType(typeReducer, 'Show Email Dialog'),
);
