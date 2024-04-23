/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Archivo } from '../models/archivo';
import { ArchivoExportarPDFParameter } from '../models/archivo-exportar-pdfparameter';
@Injectable({
  providedIn: 'root',
})
class SistemaArchivosPDFsService extends __BaseService {
  static readonly ArchivoExportarPDFsExportarPDFPath = '/ExportarPDF';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * ExportarPDF ArchivoExportarPDFs
   * @param param undefined
   * @return OK
   */
  ArchivoExportarPDFsExportarPDFResponse(param: ArchivoExportarPDFParameter): __Observable<__StrictHttpResponse<Archivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ExportarPDF`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Archivo>;
      })
    );
  }
  /**
   * ExportarPDF ArchivoExportarPDFs
   * @param param undefined
   * @return OK
   */
  ArchivoExportarPDFsExportarPDF(param: ArchivoExportarPDFParameter): __Observable<Archivo> {
    return this.ArchivoExportarPDFsExportarPDFResponse(param).pipe(
      __map(_r => _r.body as Archivo)
    );
  }
}

module SistemaArchivosPDFsService {
}

export { SistemaArchivosPDFsService }
