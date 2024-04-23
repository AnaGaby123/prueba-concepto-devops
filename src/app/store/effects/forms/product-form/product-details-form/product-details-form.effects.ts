/* Core Imports*/
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {mergeMap, withLatestFrom} from 'rxjs/operators';

/* Dev Tools*/
import {NGXLogger} from 'ngx-logger';

/* Services */
import {MinioService} from '@appServices/minio/minio.service';
import {productDetailsActions} from '@appActions/forms/product-form';
import {productDetailsSelectors} from '@appSelectors/forms/product-form';
import * as apiCatalogs from 'api-catalogos';
import {Archivo} from 'api-catalogos';
import {DOWLOAD_FILE_LOAD} from '@appActions/utils/utils.action';

const FILE_NAME = 'Product-form-logistic';

@Injectable()
export class ProductDetailsFormEffects {
  constructor(
    private store: Store,
    private action$: Actions,
    private logger: NGXLogger,
    private minioService: MinioService,
    private sistemaArchivosService: apiCatalogs.SistemaArchivosService,
  ) {}

  // DOCS: VER ARCHIVO
  fetchExternalFile$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(productDetailsActions.FETCH_EXTERNAL_FILE_LOAD),
        withLatestFrom(this.store.select(productDetailsSelectors.selectProductDetails)),
        mergeMap(([action, vProduct]) => {
          let typeFile: Archivo;
          switch (action.node) {
            case 'ArchivoHojaSeguridad':
              typeFile =
                vProduct.ArchivoHojaSeguridad !== null ? vProduct.ArchivoHojaSeguridad : null;
              break;
            case 'ArchivoCertificadoLote':
              typeFile =
                vProduct.ArchivoCertificadoLote !== null ? vProduct.ArchivoCertificadoLote : null;
              break;
            case 'ArchivoFichaTecnica':
              typeFile =
                vProduct.ArchivoFichaTecnica !== null ? vProduct.ArchivoFichaTecnica : null;
              break;
            case 'ArchivoTratado':
              typeFile = vProduct.ArchivoTratado !== null ? vProduct.ArchivoTratado : null;
              break;
            case 'OtrosTratados':
              typeFile = action.file;
              break;
            case 'ArchivoCartaDeDisponibilidad':
              typeFile =
                vProduct.ArchivoCartaDeDisponibilidad !== null
                  ? vProduct.ArchivoCartaDeDisponibilidad
                  : null;
              break;
            case 'ArchivoEstructuraMolecular':
              typeFile =
                vProduct.ArchivoEstructuraMolecular !== null
                  ? vProduct.ArchivoEstructuraMolecular
                  : null;
              break;
            case 'ArchivoCartaDeUso':
              typeFile = vProduct.ArchivoCartaDeUso !== null ? vProduct.ArchivoCartaDeUso : null;
              break;
            case 'ArchivoPermisoDeAdquisicionEnPlaza':
              typeFile =
                vProduct.ArchivoPermisoDeAdquisicionEnPlaza !== null
                  ? vProduct.ArchivoPermisoDeAdquisicionEnPlaza
                  : null;
              break;
            case 'ArchivoPermisoDeImprotacion':
              typeFile =
                vProduct.ArchivoPermisoDeImprotacion !== null
                  ? vProduct.ArchivoPermisoDeImprotacion
                  : null;
              break;
            case 'ArchivoAvisoDeQuimicosEsenciales':
              typeFile =
                vProduct.ArchivoAvisoDeQuimicosEsenciales !== null
                  ? vProduct.ArchivoAvisoDeQuimicosEsenciales
                  : null;
              break;
            case 'ArchivoZoosanitarios':
              typeFile =
                vProduct.ArchivoZoosanitarios !== null ? vProduct.ArchivoZoosanitarios : null;
              break;
            case 'ArchivoCicoplafest':
              typeFile = vProduct.ArchivoCicoplafest !== null ? vProduct.ArchivoCicoplafest : null;
              break;
            case 'ArchivoOtroPermiso':
              typeFile = vProduct.ArchivoOtroPermiso !== null ? vProduct.ArchivoOtroPermiso : null;
              break;
          }
          if (typeFile !== null) {
            this.store.dispatch(
              DOWLOAD_FILE_LOAD({
                IdArchivo: typeFile.IdArchivo,
                FileKey: typeFile.FileKey,
                newTab: true,
              }),
            );
          }
          return EMPTY;
        }),
      ),
    {dispatch: false},
  );
}
