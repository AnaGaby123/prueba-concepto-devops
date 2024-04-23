import {IMailDialogDataChildren} from '@appModels/correo/correo';
import {TranslateService} from '@ngx-translate/core';
import {Language} from '@appModels/store/settings/settings.model';
import {firstValueFrom} from 'rxjs';
import {take} from 'rxjs/operators';
import {BuildDialogConfig} from '@appInterfaces/dialogs/BuildDialogConfig';

// DOCS: DATA PROPERTY CHANGES TO TYPE ANY SO THAT IT RECEIVES ANY INTERFACE FROM ANY DIALOG
export const buildDialogConfig = (data?: any): BuildDialogConfig => {
  return {
    backdropClass: 'mat-dialog-background',
    data,
    panelClass: 'mat-dialog-style',
  };
};

export const buildDialogChildrenContent = async (
  translateService: TranslateService,
  language: Language,
): Promise<IMailDialogDataChildren> => {
  const contentTitle = await getTranslationByKey(
    translateService,
    'attendInvestigation.attendInvestigationDetail.mailHeader',
    language,
  );
  const contentDescription = await getTranslationByKey(
    translateService,
    'attendInvestigation.attendInvestigationDetail.messageToProvider',
    language,
  );

  return {
    contentDescription,
    contentTitle,
  };
};

const getTranslationByKey = async (translateService: TranslateService, key, language) => {
  translateService.getTranslation(language); // DOCS: SE OBTIENE LA TRADUCCIÓN ESPECIFÍCA, ES DECIR, SI language ES "en", OBTENDRÁ LAS TRADUCCIONES EN INGLÉS, CASO CONTRARIO LAS DE ESPAÑOL CON "es"
  return await firstValueFrom(translateService.get(key).pipe(take(1))); // DOCS: SE OBTIENE LA KEY DE LA TRADUCCIÓN ESPECIFÍCA
};
