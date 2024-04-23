/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ValorConfiguracionTiempoEntrega } from '../models/valor-configuracion-tiempo-entrega';
import { QueryResultValorConfiguracionTiempoEntrega } from '../models/query-result-valor-configuracion-tiempo-entrega';
import { QueryInfo } from '../models/query-info';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosConfiguracionPrecioTiempoEntregaService extends __BaseService {
  static readonly ValorConfiguracionTiempoEntregaObtenerPath = '/ValorConfiguracionTiempoEntrega';
  static readonly ValorConfiguracionTiempoEntregaGuardarOActualizarPath = '/ValorConfiguracionTiempoEntrega';
  static readonly ValorConfiguracionTiempoEntregaQueryResultPath = '/ValorConfiguracionTiempoEntrega';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ValorConfiguracionTiempoEntrega
   * @param idValorConfiguracionTiempoEntrega Identificador de ValorConfiguracionTiempoEntrega
   * @return OK
   */
  ValorConfiguracionTiempoEntregaObtenerResponse(idValorConfiguracionTiempoEntrega: string): __Observable<__StrictHttpResponse<ValorConfiguracionTiempoEntrega>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idValorConfiguracionTiempoEntrega != null) __params = __params.set('idValorConfiguracionTiempoEntrega', idValorConfiguracionTiempoEntrega.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ValorConfiguracionTiempoEntrega`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ValorConfiguracionTiempoEntrega>;
      })
    );
  }
  /**
   * Consultar registro de ValorConfiguracionTiempoEntrega
   * @param idValorConfiguracionTiempoEntrega Identificador de ValorConfiguracionTiempoEntrega
   * @return OK
   */
  ValorConfiguracionTiempoEntregaObtener(idValorConfiguracionTiempoEntrega: string): __Observable<ValorConfiguracionTiempoEntrega> {
    return this.ValorConfiguracionTiempoEntregaObtenerResponse(idValorConfiguracionTiempoEntrega).pipe(
      __map(_r => _r.body as ValorConfiguracionTiempoEntrega)
    );
  }

  /**
   * Guardar o actualizar ValorConfiguracionTiempoEntrega
   * @param ValorConfiguracionTiempoEntrega ValorConfiguracionTiempoEntrega
   * @return OK
   */
  ValorConfiguracionTiempoEntregaGuardarOActualizarResponse(ValorConfiguracionTiempoEntrega: ValorConfiguracionTiempoEntrega): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ValorConfiguracionTiempoEntrega;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ValorConfiguracionTiempoEntrega`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * Guardar o actualizar ValorConfiguracionTiempoEntrega
   * @param ValorConfiguracionTiempoEntrega ValorConfiguracionTiempoEntrega
   * @return OK
   */
  ValorConfiguracionTiempoEntregaGuardarOActualizar(ValorConfiguracionTiempoEntrega: ValorConfiguracionTiempoEntrega): __Observable<string> {
    return this.ValorConfiguracionTiempoEntregaGuardarOActualizarResponse(ValorConfiguracionTiempoEntrega).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ValorConfiguracionTiempoEntrega
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ValorConfiguracionTiempoEntregaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultValorConfiguracionTiempoEntrega>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ValorConfiguracionTiempoEntrega`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultValorConfiguracionTiempoEntrega>;
      })
    );
  }
  /**
   * Consultar lista paginada de ValorConfiguracionTiempoEntrega
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ValorConfiguracionTiempoEntregaQueryResult(info: QueryInfo): __Observable<QueryResultValorConfiguracionTiempoEntrega> {
    return this.ValorConfiguracionTiempoEntregaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultValorConfiguracionTiempoEntrega)
    );
  }
}

module ConfiguracionProductosConfiguracionPrecioTiempoEntregaService {
}

export { ConfiguracionProductosConfiguracionPrecioTiempoEntregaService }
