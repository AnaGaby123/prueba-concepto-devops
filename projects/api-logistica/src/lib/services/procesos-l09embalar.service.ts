/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ConsultarEtiquetasParaEscanearObj } from '../models/consultar-etiquetas-para-escanear-obj';
import { FilterTuple } from '../models/filter-tuple';
import { EmbPackingList } from '../models/emb-packing-list';
import { QueryResultEmbPackingList } from '../models/query-result-emb-packing-list';
import { QueryInfo } from '../models/query-info';
import { EmbPaquete } from '../models/emb-paquete';
import { QueryResultEmbPaquete } from '../models/query-result-emb-paquete';
import { VEmbalajeDireccionClientePartidasDetalle } from '../models/vembalaje-direccion-cliente-partidas-detalle';
import { ParametroPartidasEmbalajeUsuario } from '../models/parametro-partidas-embalaje-usuario';
import { PrioridadTotalPiezasEmbalajeObj } from '../models/prioridad-total-piezas-embalaje-obj';
import { QueryResultVEmbalajeDireccionClientePartidas } from '../models/query-result-vembalaje-direccion-cliente-partidas';
import { QueryResultVEmbalajeInspPartidas } from '../models/query-result-vembalaje-insp-partidas';
@Injectable({
  providedIn: 'root',
})
class ProcesosL09EmbalarService extends __BaseService {
  static readonly ConsultarEtiquetasParaEscanearConsultarEtiquetasParaEscanearPath = '/ConsultarEtiquetasParaEscanear';
  static readonly ConsultarListoParaEmbalarConsultarListoParaEmbalarPath = '/ConsultarListoParaEmbalar';
  static readonly embPackingListObtenerPath = '/embPackingList';
  static readonly embPackingListGuardarOActualizarPath = '/embPackingList';
  static readonly embPackingListQueryResultPath = '/embPackingList';
  static readonly embPackingListDesactivarPath = '/embPackingList';
  static readonly embPaqueteObtenerPath = '/embPaquete';
  static readonly embPaqueteGuardarOActualizarPath = '/embPaquete';
  static readonly embPaqueteQueryResultPath = '/embPaquete';
  static readonly embPaqueteDesactivarPath = '/embPaquete';
  static readonly PartidasEmbalajeUsuarioProcessPath = '/PartidasEmbalajeUsuario';
  static readonly PrioridadTotalPiezasEmbalajeProcessPath = '/PrioridadTotalPiezasEmbalajeObj';
  static readonly vEmbalajeDireccionClientePartidasQueryResultPath = '/vEmbalajeDireccionClientePartidas';
  static readonly vEmbalajeInspPartidasQueryResultPath = '/vEmbalajeInspPartidas';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * ConsultarEtiquetasParaEscanear ConsultarEtiquetasParaEscanear
   * @param filters undefined
   * @return OK
   */
  ConsultarEtiquetasParaEscanearConsultarEtiquetasParaEscanearResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<Array<ConsultarEtiquetasParaEscanearObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ConsultarEtiquetasParaEscanear`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ConsultarEtiquetasParaEscanearObj>>;
      })
    );
  }
  /**
   * ConsultarEtiquetasParaEscanear ConsultarEtiquetasParaEscanear
   * @param filters undefined
   * @return OK
   */
  ConsultarEtiquetasParaEscanearConsultarEtiquetasParaEscanear(filters: Array<FilterTuple>): __Observable<Array<ConsultarEtiquetasParaEscanearObj>> {
    return this.ConsultarEtiquetasParaEscanearConsultarEtiquetasParaEscanearResponse(filters).pipe(
      __map(_r => _r.body as Array<ConsultarEtiquetasParaEscanearObj>)
    );
  }

  /**
   * ConsultarListoParaEmbalar ConsultarListoParaEmbalar
   * @param IdsEmbPackingList undefined
   * @return OK
   */
  ConsultarListoParaEmbalarConsultarListoParaEmbalarResponse(IdsEmbPackingList: Array<string>): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = IdsEmbPackingList;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/ConsultarListoParaEmbalar`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return (_r as HttpResponse<any>).clone({ body: (_r as HttpResponse<any>).body === 'true' }) as __StrictHttpResponse<boolean>
      })
    );
  }
  /**
   * ConsultarListoParaEmbalar ConsultarListoParaEmbalar
   * @param IdsEmbPackingList undefined
   * @return OK
   */
  ConsultarListoParaEmbalarConsultarListoParaEmbalar(IdsEmbPackingList: Array<string>): __Observable<boolean> {
    return this.ConsultarListoParaEmbalarConsultarListoParaEmbalarResponse(IdsEmbPackingList).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * Consultar registro de embPackingList
   * @param idembPackingList Identificador de embPackingList
   * @return OK
   */
  embPackingListObtenerResponse(idembPackingList: string): __Observable<__StrictHttpResponse<EmbPackingList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idembPackingList != null) __params = __params.set('idembPackingList', idembPackingList.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/embPackingList`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<EmbPackingList>;
      })
    );
  }
  /**
   * Consultar registro de embPackingList
   * @param idembPackingList Identificador de embPackingList
   * @return OK
   */
  embPackingListObtener(idembPackingList: string): __Observable<EmbPackingList> {
    return this.embPackingListObtenerResponse(idembPackingList).pipe(
      __map(_r => _r.body as EmbPackingList)
    );
  }

  /**
   * Guardar o actualizar embPackingList
   * @param embPackingList embPackingList
   * @return OK
   */
  embPackingListGuardarOActualizarResponse(embPackingList: EmbPackingList): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = embPackingList;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/embPackingList`,
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
   * Guardar o actualizar embPackingList
   * @param embPackingList embPackingList
   * @return OK
   */
  embPackingListGuardarOActualizar(embPackingList: EmbPackingList): __Observable<string> {
    return this.embPackingListGuardarOActualizarResponse(embPackingList).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de embPackingList
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  embPackingListQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultEmbPackingList>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/embPackingList`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultEmbPackingList>;
      })
    );
  }
  /**
   * Consultar lista paginada de embPackingList
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  embPackingListQueryResult(info: QueryInfo): __Observable<QueryResultEmbPackingList> {
    return this.embPackingListQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultEmbPackingList)
    );
  }

  /**
   * Desactivar registro de embPackingList
   * @param idembPackingList Identificador de registro de embPackingList
   * @return OK
   */
  embPackingListDesactivarResponse(idembPackingList: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idembPackingList != null) __params = __params.set('idembPackingList', idembPackingList.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/embPackingList`,
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
   * Desactivar registro de embPackingList
   * @param idembPackingList Identificador de registro de embPackingList
   * @return OK
   */
  embPackingListDesactivar(idembPackingList: string): __Observable<string> {
    return this.embPackingListDesactivarResponse(idembPackingList).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de embPaquete
   * @param idembPaquete Identificador de embPaquete
   * @return OK
   */
  embPaqueteObtenerResponse(idembPaquete: string): __Observable<__StrictHttpResponse<EmbPaquete>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idembPaquete != null) __params = __params.set('idembPaquete', idembPaquete.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/embPaquete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<EmbPaquete>;
      })
    );
  }
  /**
   * Consultar registro de embPaquete
   * @param idembPaquete Identificador de embPaquete
   * @return OK
   */
  embPaqueteObtener(idembPaquete: string): __Observable<EmbPaquete> {
    return this.embPaqueteObtenerResponse(idembPaquete).pipe(
      __map(_r => _r.body as EmbPaquete)
    );
  }

  /**
   * Guardar o actualizar embPaquete
   * @param embPaquete embPaquete
   * @return OK
   */
  embPaqueteGuardarOActualizarResponse(embPaquete: EmbPaquete): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = embPaquete;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/embPaquete`,
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
   * Guardar o actualizar embPaquete
   * @param embPaquete embPaquete
   * @return OK
   */
  embPaqueteGuardarOActualizar(embPaquete: EmbPaquete): __Observable<string> {
    return this.embPaqueteGuardarOActualizarResponse(embPaquete).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de embPaquete
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  embPaqueteQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultEmbPaquete>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/embPaquete`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultEmbPaquete>;
      })
    );
  }
  /**
   * Consultar lista paginada de embPaquete
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  embPaqueteQueryResult(info: QueryInfo): __Observable<QueryResultEmbPaquete> {
    return this.embPaqueteQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultEmbPaquete)
    );
  }

  /**
   * Desactivar registro de embPaquete
   * @param idembPaquete Identificador de registro de embPaquete
   * @return OK
   */
  embPaqueteDesactivarResponse(idembPaquete: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idembPaquete != null) __params = __params.set('idembPaquete', idembPaquete.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/embPaquete`,
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
   * Desactivar registro de embPaquete
   * @param idembPaquete Identificador de registro de embPaquete
   * @return OK
   */
  embPaqueteDesactivar(idembPaquete: string): __Observable<string> {
    return this.embPaqueteDesactivarResponse(idembPaquete).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Process PartidasEmbalajeUsuario
   * @param param undefined
   * @return OK
   */
  PartidasEmbalajeUsuarioProcessResponse(param: ParametroPartidasEmbalajeUsuario): __Observable<__StrictHttpResponse<VEmbalajeDireccionClientePartidasDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/PartidasEmbalajeUsuario`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VEmbalajeDireccionClientePartidasDetalle>;
      })
    );
  }
  /**
   * Process PartidasEmbalajeUsuario
   * @param param undefined
   * @return OK
   */
  PartidasEmbalajeUsuarioProcess(param: ParametroPartidasEmbalajeUsuario): __Observable<VEmbalajeDireccionClientePartidasDetalle> {
    return this.PartidasEmbalajeUsuarioProcessResponse(param).pipe(
      __map(_r => _r.body as VEmbalajeDireccionClientePartidasDetalle)
    );
  }

  /**
   * Process PrioridadTotalPiezasEmbalaje
   * @param filters undefined
   * @return OK
   */
  PrioridadTotalPiezasEmbalajeProcessResponse(filters: Array<FilterTuple>): __Observable<__StrictHttpResponse<Array<PrioridadTotalPiezasEmbalajeObj>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = filters;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/PrioridadTotalPiezasEmbalajeObj`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PrioridadTotalPiezasEmbalajeObj>>;
      })
    );
  }
  /**
   * Process PrioridadTotalPiezasEmbalaje
   * @param filters undefined
   * @return OK
   */
  PrioridadTotalPiezasEmbalajeProcess(filters: Array<FilterTuple>): __Observable<Array<PrioridadTotalPiezasEmbalajeObj>> {
    return this.PrioridadTotalPiezasEmbalajeProcessResponse(filters).pipe(
      __map(_r => _r.body as Array<PrioridadTotalPiezasEmbalajeObj>)
    );
  }

  /**
   * Consultar lista paginada de vEmbalajeDireccionClientePartidas
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vEmbalajeDireccionClientePartidasQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVEmbalajeDireccionClientePartidas>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vEmbalajeDireccionClientePartidas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVEmbalajeDireccionClientePartidas>;
      })
    );
  }
  /**
   * Consultar lista paginada de vEmbalajeDireccionClientePartidas
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vEmbalajeDireccionClientePartidasQueryResult(info: QueryInfo): __Observable<QueryResultVEmbalajeDireccionClientePartidas> {
    return this.vEmbalajeDireccionClientePartidasQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVEmbalajeDireccionClientePartidas)
    );
  }

  /**
   * Consultar lista paginada de vEmbalajeInspPartidas
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vEmbalajeInspPartidasQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVEmbalajeInspPartidas>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vEmbalajeInspPartidas`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVEmbalajeInspPartidas>;
      })
    );
  }
  /**
   * Consultar lista paginada de vEmbalajeInspPartidas
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vEmbalajeInspPartidasQueryResult(info: QueryInfo): __Observable<QueryResultVEmbalajeInspPartidas> {
    return this.vEmbalajeInspPartidasQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVEmbalajeInspPartidas)
    );
  }
}

module ProcesosL09EmbalarService {
}

export { ProcesosL09EmbalarService }
