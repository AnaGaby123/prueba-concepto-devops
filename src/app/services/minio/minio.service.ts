/* Core Imports */
import {Injectable} from '@angular/core';
// import * as minio from 'minio';
/* Tools Imports */
/* Dev Tools */
import {NGXLogger} from 'ngx-logger';

/* Models Imports */
import {ArchivoDetalle, SistemaArchivosService, UrlSubirArchivo} from 'api-catalogos';
import {IUploadFileCustom} from '@appModels/files/files.models';
import {Store} from '@ngrx/store';
import {AppState} from '@appCore/core.state';
import {SET_LOADING_ERROR} from '@appActions/utils/utils.action';
import {lastValueFrom} from 'rxjs';

const FILE_NAME = 'minio.service.ts';

@Injectable({
  providedIn: 'root',
})
export class MinioService {
  constructor(
    private logger: NGXLogger,
    private filesSystemService: SistemaArchivosService,
    private store: Store<AppState>,
  ) {}

  /*createClient() {
    return new minio.Client({
      endPoint: MINIO_HOST,
      port: MINIO_PORT,
      useSSL: MINIO_USE_SSL,
      accessKey: MINIO_ACCESS_KEY,
      secretKey: MINIO_SECRET_KEY,
    });
  }*/

  /*putObject(file: File, bucket: string, name: string) {
    this.logger.debug(
      servicesLogger.generateMessage(FILE_NAME, '@putObject: Entre'),
    );
    return new Promise((resolve) => {
      const minioClient = this.createClient();
      const reader = new FileReader();
      reader.onload = (value: any) => {
        const base64 = value.target.result;
        const buffer = Buffer.from(
          base64.replace(/^data:application\/pdf;base64,/, ''),
          'base64',
        );
        minioClient.putObject(bucket, name, buffer, (e) => {
          if (e) {
            this.logger.debug(
              servicesLogger.generateMessage(
                FILE_NAME,
                servicesLogger.LOG_FAILED,
                '@putObject: Error, no se subió el  archivo',
              ),
            );
            return resolve(false);
          }
          this.logger.debug(
            servicesLogger.generateMessage(
              FILE_NAME,
              servicesLogger.LOG_SUCCEEDED,
              '@putObject: Exito, al subir el archivo',
            ),
          );
          return resolve(true);
        });
      };
      reader.readAsDataURL(file);
    });
  }*/
  async uploadFile(file: File, name: string, destinyBucketName: string): Promise<ArchivoDetalle> {
    const url: UrlSubirArchivo = await lastValueFrom(
      this.filesSystemService.ArchivoExtensionsObtenerUrlSubirArchivo(),
    ).catch((err) => {
      throw this.setErrorMessage(err);
    });
    await fetch(url.UploadUrl, {
      method: 'PUT',
      body: file,
    })
      .then((res) => {
        if (!res.ok) {
          throw this.store.dispatch(
            SET_LOADING_ERROR({
              active: true,
              message: res.status + ' ' + res.statusText + ' ' + res.url,
            }),
          );
        }
        return res;
      })
      .catch((err) => {
        throw this.setErrorMessage(err);
      });
    const moveBody = {
      DestinyBucketName: destinyBucketName,
      DestinyFileName: name,
      OriginBucketName: url.BucketName,
      OriginFileName: url.FileKey,
    };
    return await lastValueFrom(
      this.filesSystemService.ArchivoExtensionsMoverArchivoMinIO(moveBody),
    ).catch((err) => {
      throw this.setErrorMessage(err);
    });
  }

  setErrorMessage(err) {
    this.store.dispatch(
      SET_LOADING_ERROR({
        active: true,
        message: err.message + ' document',
      }),
    );
  }

  async uploadFiles(uploadFiles: Array<IUploadFileCustom>): Promise<Array<ArchivoDetalle>> {
    let arrDetailFiles: Array<ArchivoDetalle> = [];

    for (const item of uploadFiles) {
      const url: UrlSubirArchivo = await lastValueFrom(
        this.filesSystemService.ArchivoExtensionsObtenerUrlSubirArchivo(),
      );
      await fetch(url.UploadUrl, {
        method: 'PUT',
        body: item.file,
      });
      const moveBody = {
        DestinyBucketName: item.destinyBucketName,
        DestinyFileName: item.name,
        OriginBucketName: url.BucketName,
        OriginFileName: url.FileKey,
      };

      const resFileDetails = await lastValueFrom(
        this.filesSystemService.ArchivoExtensionsMoverArchivoMinIO(moveBody),
      );

      arrDetailFiles = [...arrDetailFiles, resFileDetails];
    }

    return arrDetailFiles;
  }
}
