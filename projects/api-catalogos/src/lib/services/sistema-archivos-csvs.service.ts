/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ArchivoDetalle } from '../models/archivo-detalle';
import { ArchivoExportarCSVParameter } from '../models/archivo-exportar-csvparameter';
import { ParametroArchivoMinIOImportarCSV } from '../models/parametro-archivo-min-ioimportar-csv';
@Injectable({
  providedIn: 'root',
})
class SistemaArchivosCSVsService extends __BaseService {
  static readonly ArchivoExportarCSVsObtenerDetallePath = '/ExportarCSV';
  static readonly ArchivoMinIOImportarCSVProcessPath = '/ArchivoMinIOImportarCSV';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * ObtenerDetalle ArchivoExportarCSVs
   * @param param undefined
   * @return OK
   */
  ArchivoExportarCSVsObtenerDetalleResponse(param: ArchivoExportarCSVParameter): __Observable<__StrictHttpResponse<ArchivoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ExportarCSV`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ArchivoDetalle>;
      })
    );
  }
  /**
   * ObtenerDetalle ArchivoExportarCSVs
   * @param param undefined
   * @return OK
   */
  ArchivoExportarCSVsObtenerDetalle(param: ArchivoExportarCSVParameter): __Observable<ArchivoDetalle> {
    return this.ArchivoExportarCSVsObtenerDetalleResponse(param).pipe(
      __map(_r => _r.body as ArchivoDetalle)
    );
  }

  /**
   * Process ArchivoMinIOImportarCSV
   * @param param undefined
   * @return OK
   */
  ArchivoMinIOImportarCSVProcessResponse(param: ParametroArchivoMinIOImportarCSV): __Observable<__StrictHttpResponse<number>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ArchivoMinIOImportarCSV`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: parseFloat((_r as HttpResponse<any>).body as string) }) as __StrictHttpResponse<number>
      })
    );
  }
  /**
   * Process ArchivoMinIOImportarCSV
   * @param param undefined
   * @return OK
   */
  ArchivoMinIOImportarCSVProcess(param: ParametroArchivoMinIOImportarCSV): __Observable<number> {
    return this.ArchivoMinIOImportarCSVProcessResponse(param).pipe(
      __map(_r => _r.body as number)
    );
  }
}

module SistemaArchivosCSVsService {
}

export { SistemaArchivosCSVsService }
