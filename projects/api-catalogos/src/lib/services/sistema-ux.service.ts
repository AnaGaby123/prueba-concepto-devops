/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { SugerenciaBusqueda } from '../models/sugerencia-busqueda';
import { ParametroBuscadorSugerencias } from '../models/parametro-buscador-sugerencias';
@Injectable({
  providedIn: 'root',
})
class SistemaUXService extends __BaseService {
  static readonly SugerenciasBusquedaProcessPath = '/SugerenciaBusqueda';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process SugerenciasBusqueda
   * @param source undefined
   * @return OK
   */
  SugerenciasBusquedaProcessResponse(source: ParametroBuscadorSugerencias): __Observable<__StrictHttpResponse<Array<SugerenciaBusqueda>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = source;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/SugerenciaBusqueda`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<SugerenciaBusqueda>>;
      })
    );
  }
  /**
   * Process SugerenciasBusqueda
   * @param source undefined
   * @return OK
   */
  SugerenciasBusquedaProcess(source: ParametroBuscadorSugerencias): __Observable<Array<SugerenciaBusqueda>> {
    return this.SugerenciasBusquedaProcessResponse(source).pipe(
      __map(_r => _r.body as Array<SugerenciaBusqueda>)
    );
  }
}

module SistemaUXService {
}

export { SistemaUXService }
