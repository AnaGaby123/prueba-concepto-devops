/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ArchivosDescargadosEmbalar } from '../models/archivos-descargados-embalar';
@Injectable({
  providedIn: 'root',
})
class ProcesosL09EmbalarArchivosDescargadosService extends __BaseService {
  static readonly ArchivosDescargadosEmbalarProcessPath = '/ArchivosDescargadosEmbalar';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process ArchivosDescargadosEmbalar
   * @param idEmbPackingList undefined
   * @return OK
   */
  ArchivosDescargadosEmbalarProcessResponse(idEmbPackingList: string): __Observable<__StrictHttpResponse<ArchivosDescargadosEmbalar>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idEmbPackingList != null) __params = __params.set('idEmbPackingList', idEmbPackingList.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ArchivosDescargadosEmbalar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ArchivosDescargadosEmbalar>;
      })
    );
  }
  /**
   * Process ArchivosDescargadosEmbalar
   * @param idEmbPackingList undefined
   * @return OK
   */
  ArchivosDescargadosEmbalarProcess(idEmbPackingList: string): __Observable<ArchivosDescargadosEmbalar> {
    return this.ArchivosDescargadosEmbalarProcessResponse(idEmbPackingList).pipe(
      __map(_r => _r.body as ArchivosDescargadosEmbalar)
    );
  }
}

module ProcesosL09EmbalarArchivosDescargadosService {
}

export { ProcesosL09EmbalarArchivosDescargadosService }
