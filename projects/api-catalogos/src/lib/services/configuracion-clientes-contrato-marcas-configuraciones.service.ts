/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ContratoClienteMarcaConfiguracionCatClasificacionProducto } from '../models/contrato-cliente-marca-configuracion-cat-clasificacion-producto';
import { QueryResultContratoClienteMarcaConfiguracionCatClasificacionProducto } from '../models/query-result-contrato-cliente-marca-configuracion-cat-clasificacion-producto';
import { QueryInfo } from '../models/query-info';
import { ContratoClienteMarcaConfiguracionGeneral } from '../models/contrato-cliente-marca-configuracion-general';
import { QueryResultContratoClienteMarcaConfiguracionGeneral } from '../models/query-result-contrato-cliente-marca-configuracion-general';
import { ContratoClienteMarcaConfiguracionPrecioLista } from '../models/contrato-cliente-marca-configuracion-precio-lista';
import { QueryResultContratoClienteMarcaConfiguracionPrecioLista } from '../models/query-result-contrato-cliente-marca-configuracion-precio-lista';
import { ContratoClienteMarcaConfiguracionProducto } from '../models/contrato-cliente-marca-configuracion-producto';
import { QueryResultContratoClienteMarcaConfiguracionProducto } from '../models/query-result-contrato-cliente-marca-configuracion-producto';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionClientesContratoMarcasConfiguracionesService extends __BaseService {
  static readonly ContratoClienteMarcaConfiguracionCatClasificacionProductoObtenerPath = '/ContratoClienteMarcaConfiguracionCatClasificacionProducto';
  static readonly ContratoClienteMarcaConfiguracionCatClasificacionProductoGuardarOActualizarPath = '/ContratoClienteMarcaConfiguracionCatClasificacionProducto';
  static readonly ContratoClienteMarcaConfiguracionCatClasificacionProductoQueryResultPath = '/ContratoClienteMarcaConfiguracionCatClasificacionProducto';
  static readonly ContratoClienteMarcaConfiguracionGeneralObtenerPath = '/ContratoClienteMarcaConfiguracionGeneral';
  static readonly ContratoClienteMarcaConfiguracionGeneralGuardarOActualizarPath = '/ContratoClienteMarcaConfiguracionGeneral';
  static readonly ContratoClienteMarcaConfiguracionGeneralQueryResultPath = '/ContratoClienteMarcaConfiguracionGeneral';
  static readonly ContratoClienteMarcaConfiguracionPrecioListaObtenerPath = '/ContratoClienteMarcaConfiguracionPrecioLista';
  static readonly ContratoClienteMarcaConfiguracionPrecioListaGuardarOActualizarPath = '/ContratoClienteMarcaConfiguracionPrecioLista';
  static readonly ContratoClienteMarcaConfiguracionPrecioListaQueryResultPath = '/ContratoClienteMarcaConfiguracionPrecioLista';
  static readonly ContratoClienteMarcaConfiguracionProductoObtenerPath = '/ContratoClienteMarcaConfiguracionProducto';
  static readonly ContratoClienteMarcaConfiguracionProductoGuardarOActualizarPath = '/ContratoClienteMarcaConfiguracionProducto';
  static readonly ContratoClienteMarcaConfiguracionProductoQueryResultPath = '/ContratoClienteMarcaConfiguracionProducto';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de ContratoClienteMarcaConfiguracionCatClasificacionProducto
   * @param idContratoClienteMarcaConfiguracionCatClasificacionProducto Identificador de
   * ContratoClienteMarcaConfiguracionCatClasificacionProducto
   * @return OK
   */
  ContratoClienteMarcaConfiguracionCatClasificacionProductoObtenerResponse(idContratoClienteMarcaConfiguracionCatClasificacionProducto: string): __Observable<__StrictHttpResponse<ContratoClienteMarcaConfiguracionCatClasificacionProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContratoClienteMarcaConfiguracionCatClasificacionProducto != null) __params = __params.set('idContratoClienteMarcaConfiguracionCatClasificacionProducto', idContratoClienteMarcaConfiguracionCatClasificacionProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ContratoClienteMarcaConfiguracionCatClasificacionProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContratoClienteMarcaConfiguracionCatClasificacionProducto>;
      })
    );
  }
  /**
   * Consultar registro de ContratoClienteMarcaConfiguracionCatClasificacionProducto
   * @param idContratoClienteMarcaConfiguracionCatClasificacionProducto Identificador de
   * ContratoClienteMarcaConfiguracionCatClasificacionProducto
   * @return OK
   */
  ContratoClienteMarcaConfiguracionCatClasificacionProductoObtener(idContratoClienteMarcaConfiguracionCatClasificacionProducto: string): __Observable<ContratoClienteMarcaConfiguracionCatClasificacionProducto> {
    return this.ContratoClienteMarcaConfiguracionCatClasificacionProductoObtenerResponse(idContratoClienteMarcaConfiguracionCatClasificacionProducto).pipe(
      __map(_r => _r.body as ContratoClienteMarcaConfiguracionCatClasificacionProducto)
    );
  }

  /**
   * Guardar o actualizar ContratoClienteMarcaConfiguracionCatClasificacionProducto
   * @param ContratoClienteMarcaConfiguracionCatClasificacionProducto ContratoClienteMarcaConfiguracionCatClasificacionProducto
   * @return OK
   */
  ContratoClienteMarcaConfiguracionCatClasificacionProductoGuardarOActualizarResponse(ContratoClienteMarcaConfiguracionCatClasificacionProducto: ContratoClienteMarcaConfiguracionCatClasificacionProducto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContratoClienteMarcaConfiguracionCatClasificacionProducto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ContratoClienteMarcaConfiguracionCatClasificacionProducto`,
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
   * Guardar o actualizar ContratoClienteMarcaConfiguracionCatClasificacionProducto
   * @param ContratoClienteMarcaConfiguracionCatClasificacionProducto ContratoClienteMarcaConfiguracionCatClasificacionProducto
   * @return OK
   */
  ContratoClienteMarcaConfiguracionCatClasificacionProductoGuardarOActualizar(ContratoClienteMarcaConfiguracionCatClasificacionProducto: ContratoClienteMarcaConfiguracionCatClasificacionProducto): __Observable<string> {
    return this.ContratoClienteMarcaConfiguracionCatClasificacionProductoGuardarOActualizarResponse(ContratoClienteMarcaConfiguracionCatClasificacionProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ContratoClienteMarcaConfiguracionCatClasificacionProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteMarcaConfiguracionCatClasificacionProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContratoClienteMarcaConfiguracionCatClasificacionProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContratoClienteMarcaConfiguracionCatClasificacionProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContratoClienteMarcaConfiguracionCatClasificacionProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de ContratoClienteMarcaConfiguracionCatClasificacionProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteMarcaConfiguracionCatClasificacionProductoQueryResult(info: QueryInfo): __Observable<QueryResultContratoClienteMarcaConfiguracionCatClasificacionProducto> {
    return this.ContratoClienteMarcaConfiguracionCatClasificacionProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContratoClienteMarcaConfiguracionCatClasificacionProducto)
    );
  }

  /**
   * Consultar registro de ContratoClienteMarcaConfiguracionGeneral
   * @param idContratoClienteMarcaConfiguracionGeneral Identificador de ContratoClienteMarcaConfiguracionGeneral
   * @return OK
   */
  ContratoClienteMarcaConfiguracionGeneralObtenerResponse(idContratoClienteMarcaConfiguracionGeneral: string): __Observable<__StrictHttpResponse<ContratoClienteMarcaConfiguracionGeneral>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContratoClienteMarcaConfiguracionGeneral != null) __params = __params.set('idContratoClienteMarcaConfiguracionGeneral', idContratoClienteMarcaConfiguracionGeneral.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ContratoClienteMarcaConfiguracionGeneral`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContratoClienteMarcaConfiguracionGeneral>;
      })
    );
  }
  /**
   * Consultar registro de ContratoClienteMarcaConfiguracionGeneral
   * @param idContratoClienteMarcaConfiguracionGeneral Identificador de ContratoClienteMarcaConfiguracionGeneral
   * @return OK
   */
  ContratoClienteMarcaConfiguracionGeneralObtener(idContratoClienteMarcaConfiguracionGeneral: string): __Observable<ContratoClienteMarcaConfiguracionGeneral> {
    return this.ContratoClienteMarcaConfiguracionGeneralObtenerResponse(idContratoClienteMarcaConfiguracionGeneral).pipe(
      __map(_r => _r.body as ContratoClienteMarcaConfiguracionGeneral)
    );
  }

  /**
   * Guardar o actualizar ContratoClienteMarcaConfiguracionGeneral
   * @param ContratoClienteMarcaConfiguracionGeneral ContratoClienteMarcaConfiguracionGeneral
   * @return OK
   */
  ContratoClienteMarcaConfiguracionGeneralGuardarOActualizarResponse(ContratoClienteMarcaConfiguracionGeneral: ContratoClienteMarcaConfiguracionGeneral): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContratoClienteMarcaConfiguracionGeneral;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ContratoClienteMarcaConfiguracionGeneral`,
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
   * Guardar o actualizar ContratoClienteMarcaConfiguracionGeneral
   * @param ContratoClienteMarcaConfiguracionGeneral ContratoClienteMarcaConfiguracionGeneral
   * @return OK
   */
  ContratoClienteMarcaConfiguracionGeneralGuardarOActualizar(ContratoClienteMarcaConfiguracionGeneral: ContratoClienteMarcaConfiguracionGeneral): __Observable<string> {
    return this.ContratoClienteMarcaConfiguracionGeneralGuardarOActualizarResponse(ContratoClienteMarcaConfiguracionGeneral).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ContratoClienteMarcaConfiguracionGeneral
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteMarcaConfiguracionGeneralQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContratoClienteMarcaConfiguracionGeneral>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContratoClienteMarcaConfiguracionGeneral`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContratoClienteMarcaConfiguracionGeneral>;
      })
    );
  }
  /**
   * Consultar lista paginada de ContratoClienteMarcaConfiguracionGeneral
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteMarcaConfiguracionGeneralQueryResult(info: QueryInfo): __Observable<QueryResultContratoClienteMarcaConfiguracionGeneral> {
    return this.ContratoClienteMarcaConfiguracionGeneralQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContratoClienteMarcaConfiguracionGeneral)
    );
  }

  /**
   * Consultar registro de ContratoClienteMarcaConfiguracionPrecioLista
   * @param idContratoClienteMarcaConfiguracionPrecioLista Identificador de
   * ContratoClienteMarcaConfiguracionPrecioLista
   * @return OK
   */
  ContratoClienteMarcaConfiguracionPrecioListaObtenerResponse(idContratoClienteMarcaConfiguracionPrecioLista: string): __Observable<__StrictHttpResponse<ContratoClienteMarcaConfiguracionPrecioLista>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContratoClienteMarcaConfiguracionPrecioLista != null) __params = __params.set('idContratoClienteMarcaConfiguracionPrecioLista', idContratoClienteMarcaConfiguracionPrecioLista.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ContratoClienteMarcaConfiguracionPrecioLista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContratoClienteMarcaConfiguracionPrecioLista>;
      })
    );
  }
  /**
   * Consultar registro de ContratoClienteMarcaConfiguracionPrecioLista
   * @param idContratoClienteMarcaConfiguracionPrecioLista Identificador de
   * ContratoClienteMarcaConfiguracionPrecioLista
   * @return OK
   */
  ContratoClienteMarcaConfiguracionPrecioListaObtener(idContratoClienteMarcaConfiguracionPrecioLista: string): __Observable<ContratoClienteMarcaConfiguracionPrecioLista> {
    return this.ContratoClienteMarcaConfiguracionPrecioListaObtenerResponse(idContratoClienteMarcaConfiguracionPrecioLista).pipe(
      __map(_r => _r.body as ContratoClienteMarcaConfiguracionPrecioLista)
    );
  }

  /**
   * Guardar o actualizar ContratoClienteMarcaConfiguracionPrecioLista
   * @param ContratoClienteMarcaConfiguracionPrecioLista ContratoClienteMarcaConfiguracionPrecioLista
   * @return OK
   */
  ContratoClienteMarcaConfiguracionPrecioListaGuardarOActualizarResponse(ContratoClienteMarcaConfiguracionPrecioLista: ContratoClienteMarcaConfiguracionPrecioLista): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContratoClienteMarcaConfiguracionPrecioLista;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ContratoClienteMarcaConfiguracionPrecioLista`,
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
   * Guardar o actualizar ContratoClienteMarcaConfiguracionPrecioLista
   * @param ContratoClienteMarcaConfiguracionPrecioLista ContratoClienteMarcaConfiguracionPrecioLista
   * @return OK
   */
  ContratoClienteMarcaConfiguracionPrecioListaGuardarOActualizar(ContratoClienteMarcaConfiguracionPrecioLista: ContratoClienteMarcaConfiguracionPrecioLista): __Observable<string> {
    return this.ContratoClienteMarcaConfiguracionPrecioListaGuardarOActualizarResponse(ContratoClienteMarcaConfiguracionPrecioLista).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ContratoClienteMarcaConfiguracionPrecioLista
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteMarcaConfiguracionPrecioListaQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContratoClienteMarcaConfiguracionPrecioLista>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContratoClienteMarcaConfiguracionPrecioLista`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContratoClienteMarcaConfiguracionPrecioLista>;
      })
    );
  }
  /**
   * Consultar lista paginada de ContratoClienteMarcaConfiguracionPrecioLista
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteMarcaConfiguracionPrecioListaQueryResult(info: QueryInfo): __Observable<QueryResultContratoClienteMarcaConfiguracionPrecioLista> {
    return this.ContratoClienteMarcaConfiguracionPrecioListaQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContratoClienteMarcaConfiguracionPrecioLista)
    );
  }

  /**
   * Consultar registro de ContratoClienteMarcaConfiguracionProducto
   * @param idContratoClienteMarcaConfiguracionProducto Identificador de ContratoClienteMarcaConfiguracionProducto
   * @return OK
   */
  ContratoClienteMarcaConfiguracionProductoObtenerResponse(idContratoClienteMarcaConfiguracionProducto: string): __Observable<__StrictHttpResponse<ContratoClienteMarcaConfiguracionProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idContratoClienteMarcaConfiguracionProducto != null) __params = __params.set('idContratoClienteMarcaConfiguracionProducto', idContratoClienteMarcaConfiguracionProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ContratoClienteMarcaConfiguracionProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ContratoClienteMarcaConfiguracionProducto>;
      })
    );
  }
  /**
   * Consultar registro de ContratoClienteMarcaConfiguracionProducto
   * @param idContratoClienteMarcaConfiguracionProducto Identificador de ContratoClienteMarcaConfiguracionProducto
   * @return OK
   */
  ContratoClienteMarcaConfiguracionProductoObtener(idContratoClienteMarcaConfiguracionProducto: string): __Observable<ContratoClienteMarcaConfiguracionProducto> {
    return this.ContratoClienteMarcaConfiguracionProductoObtenerResponse(idContratoClienteMarcaConfiguracionProducto).pipe(
      __map(_r => _r.body as ContratoClienteMarcaConfiguracionProducto)
    );
  }

  /**
   * Guardar o actualizar ContratoClienteMarcaConfiguracionProducto
   * @param ContratoClienteMarcaConfiguracionProducto ContratoClienteMarcaConfiguracionProducto
   * @return OK
   */
  ContratoClienteMarcaConfiguracionProductoGuardarOActualizarResponse(ContratoClienteMarcaConfiguracionProducto: ContratoClienteMarcaConfiguracionProducto): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = ContratoClienteMarcaConfiguracionProducto;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/ContratoClienteMarcaConfiguracionProducto`,
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
   * Guardar o actualizar ContratoClienteMarcaConfiguracionProducto
   * @param ContratoClienteMarcaConfiguracionProducto ContratoClienteMarcaConfiguracionProducto
   * @return OK
   */
  ContratoClienteMarcaConfiguracionProductoGuardarOActualizar(ContratoClienteMarcaConfiguracionProducto: ContratoClienteMarcaConfiguracionProducto): __Observable<string> {
    return this.ContratoClienteMarcaConfiguracionProductoGuardarOActualizarResponse(ContratoClienteMarcaConfiguracionProducto).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de ContratoClienteMarcaConfiguracionProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteMarcaConfiguracionProductoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultContratoClienteMarcaConfiguracionProducto>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/ContratoClienteMarcaConfiguracionProducto`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultContratoClienteMarcaConfiguracionProducto>;
      })
    );
  }
  /**
   * Consultar lista paginada de ContratoClienteMarcaConfiguracionProducto
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  ContratoClienteMarcaConfiguracionProductoQueryResult(info: QueryInfo): __Observable<QueryResultContratoClienteMarcaConfiguracionProducto> {
    return this.ContratoClienteMarcaConfiguracionProductoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultContratoClienteMarcaConfiguracionProducto)
    );
  }
}

module ConfiguracionClientesContratoMarcasConfiguracionesService {
}

export { ConfiguracionClientesContratoMarcasConfiguracionesService }
