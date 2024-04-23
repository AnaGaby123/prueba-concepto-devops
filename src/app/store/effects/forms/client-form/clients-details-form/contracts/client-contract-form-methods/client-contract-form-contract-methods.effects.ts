// CORE
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {mergeMap} from 'rxjs/operators';
// MODELS
import {ProvidersTabOptions} from '@appModels/store/forms/providers/providers-details/provider-form-step-8-offer.model';
// ACTIONS
import * as contractActions from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
import {SET_SIGNED_CONTRACT} from '@appActions/forms/client-form/clients-details-form/client-contracts-form/client-contract.actions';
import blobToSHA256 from 'blob-to-sha256';

// UTILS

@Injectable()
export class ClientContractFormContractMethodsEffects {
  constructor(private action$: Actions, private store: Store) {}

  readonly tabOptions = ProvidersTabOptions;

  fetchMoreProviders$ = createEffect(() =>
    this.action$.pipe(
      ofType(contractActions.HANDLE_SIGNED_CONTRACT_UPLOAD_COMPONENT_EFFECT),
      mergeMap(async ({uploadFile}) => {
        if (uploadFile.path !== '') {
          const {file, path} = uploadFile;
          const hash = await blobToSHA256(file);
          return SET_SIGNED_CONTRACT({
            signedContract: {
              titulo: 'Cargar contrato Firmado',
              file,
              path,
              hash,
            },
          });
        }
        return SET_SIGNED_CONTRACT({
          signedContract: {
            titulo: 'Cargar contrato Firmado',
            file: null,
            path: '',
            hash: '',
          },
        });
      }),
    ),
  );
}
