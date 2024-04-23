/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiLogisticaConfiguration as __Configuration } from '../api-logistica-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ImpListaArribo } from '../models/imp-lista-arribo';
import { QueryResultImpListaArribo } from '../models/query-result-imp-lista-arribo';
import { QueryInfo } from '../models/query-info';
import { ImpOrdenDespacho } from '../models/imp-orden-despacho';
import { QueryResultImpOrdenDespacho } from '../models/query-result-imp-orden-despacho';
import { ImpSeguimientoControlNacional } from '../models/imp-seguimiento-control-nacional';
import { QueryResultImpSeguimientoControlNacional } from '../models/query-result-imp-seguimiento-control-nacional';
import { ImpSeguimientoControlOrigen } from '../models/imp-seguimiento-control-origen';
import { QueryResultImpSeguimientoControlOrigen } from '../models/query-result-imp-seguimiento-control-origen';
@Injectable({
  providedIn: 'root',
})
class ProcesosL07ImportacionesService extends __BaseService {
  static readonly impListaArriboObtenerPath = '/impListaArribo';
  static readonly impListaArriboGuardarOActualizarPath = '/impListaArribo';
  static readonly impListaArriboQueryResultPath = '/impListaArribo';
  static readonly impListaArriboDesactivarPath = '/impListaArribo';
  static readonly impOrdenDespachoObtenerPath = '/impOrdenDespacho';
  static readonly impOrdenDespachoGuardarOActualizarPath = '/impOrdenDespacho';
  static readonly impOrdenDespachoQueryResultPath = '/impOrdenDespacho';
  static readonly impOrdenDespachoDesactivarPath = '/impOrdenDespacho';
  static readonly impSeguimientoControlNacionalObtenerPath = '/impSeguimientoControlNacional';
  static readonly impSeguimientoControlNacionalGuardarOActualizarPath = '/impSeguimientoControlNacional';
  static readonly impSeguimientoControlNacionalQueryResultPath = '/impSeguimientoControlNacional';
  static readonly impSeguimientoControlNacionalDesactivarPath = '/impSeguimientoControlNacional';
  static readonly impSeguimientoControlOrigenObtenerPath = '/impSeguimientoControlOrigen';
  static readonly impSeguimientoControlOrigenGuardarOActualizarPath = '/impSeguimientoControlOrigen';
  static readonly impSeguimientoControlOrigenQueryResultPath = '/impSeguimientoControlOrigen';
  static readonly impSeguimientoControlOrigenDesactivarPath = '/impSeguimientoControlOrigen';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Consultar registro de impListaArribo
   * @param idimpListaArribo Identificador de impListaArribo
   * @return OK
   */
  impListaArriboObtenerResponse(idimpListaArribo: string): __Observable<__StrictHttpResponse<ImpListaArribo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idimpListaArribo != null) __params = __params.set('idimpListaArribo', idimpListaArribo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/impListaArribo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ImpListaArribo>;
      })
    );
  }
  /**
   * Consultar registro de impListaArribo
   * @param idimpListaArribo Identificador de impListaArribo
   * @return OK
   */
  impListaArriboObtener(idimpListaArribo: string): __Observable<ImpListaArribo> {
    return this.impListaArriboObtenerResponse(idimpListaArribo).pipe(
      __map(_r => _r.body as ImpListaArribo)
    );
  }

  /**
   * Guardar o actualizar impListaArribo
   * @param impListaArribo impListaArribo
   * @return OK
   */
  impListaArriboGuardarOActualizarResponse(impListaArribo: ImpListaArribo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = impListaArribo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/impListaArribo`,
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
   * Guardar o actualizar impListaArribo
   * @param impListaArribo impListaArribo
   * @return OK
   */
  impListaArriboGuardarOActualizar(impListaArribo: ImpListaArribo): __Observable<string> {
    return this.impListaArriboGuardarOActualizarResponse(impListaArribo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de impListaArribo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  impListaArriboQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultImpListaArribo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/impListaArribo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultImpListaArribo>;
      })
    );
  }
  /**
   * Consultar lista paginada de impListaArribo
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  impListaArriboQueryResult(info: QueryInfo): __Observable<QueryResultImpListaArribo> {
    return this.impListaArriboQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultImpListaArribo)
    );
  }

  /**
   * Desactivar registro de impListaArribo
   * @param idimpListaArribo Identificador de registro de impListaArribo
   * @return OK
   */
  impListaArriboDesactivarResponse(idimpListaArribo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idimpListaArribo != null) __params = __params.set('idimpListaArribo', idimpListaArribo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/impListaArribo`,
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
   * Desactivar registro de impListaArribo
   * @param idimpListaArribo Identificador de registro de impListaArribo
   * @return OK
   */
  impListaArriboDesactivar(idimpListaArribo: string): __Observable<string> {
    return this.impListaArriboDesactivarResponse(idimpListaArribo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de impOrdenDespacho
   * @param idimpOrdenDespacho Identificador de impOrdenDespacho
   * @return OK
   */
  impOrdenDespachoObtenerResponse(idimpOrdenDespacho: string): __Observable<__StrictHttpResponse<ImpOrdenDespacho>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idimpOrdenDespacho != null) __params = __params.set('idimpOrdenDespacho', idimpOrdenDespacho.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/impOrdenDespacho`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ImpOrdenDespacho>;
      })
    );
  }
  /**
   * Consultar registro de impOrdenDespacho
   * @param idimpOrdenDespacho Identificador de impOrdenDespacho
   * @return OK
   */
  impOrdenDespachoObtener(idimpOrdenDespacho: string): __Observable<ImpOrdenDespacho> {
    return this.impOrdenDespachoObtenerResponse(idimpOrdenDespacho).pipe(
      __map(_r => _r.body as ImpOrdenDespacho)
    );
  }

  /**
   * Guardar o actualizar impOrdenDespacho
   * @param impOrdenDespacho impOrdenDespacho
   * @return OK
   */
  impOrdenDespachoGuardarOActualizarResponse(impOrdenDespacho: ImpOrdenDespacho): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = impOrdenDespacho;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/impOrdenDespacho`,
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
   * Guardar o actualizar impOrdenDespacho
   * @param impOrdenDespacho impOrdenDespacho
   * @return OK
   */
  impOrdenDespachoGuardarOActualizar(impOrdenDespacho: ImpOrdenDespacho): __Observable<string> {
    return this.impOrdenDespachoGuardarOActualizarResponse(impOrdenDespacho).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de impOrdenDespacho
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  impOrdenDespachoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultImpOrdenDespacho>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/impOrdenDespacho`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultImpOrdenDespacho>;
      })
    );
  }
  /**
   * Consultar lista paginada de impOrdenDespacho
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  impOrdenDespachoQueryResult(info: QueryInfo): __Observable<QueryResultImpOrdenDespacho> {
    return this.impOrdenDespachoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultImpOrdenDespacho)
    );
  }

  /**
   * Desactivar registro de impOrdenDespacho
   * @param idimpOrdenDespacho Identificador de registro de impOrdenDespacho
   * @return OK
   */
  impOrdenDespachoDesactivarResponse(idimpOrdenDespacho: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idimpOrdenDespacho != null) __params = __params.set('idimpOrdenDespacho', idimpOrdenDespacho.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/impOrdenDespacho`,
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
   * Desactivar registro de impOrdenDespacho
   * @param idimpOrdenDespacho Identificador de registro de impOrdenDespacho
   * @return OK
   */
  impOrdenDespachoDesactivar(idimpOrdenDespacho: string): __Observable<string> {
    return this.impOrdenDespachoDesactivarResponse(idimpOrdenDespacho).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de impSeguimientoControlNacional
   * @param idimpSeguimientoControlNacional Identificador de impSeguimientoControlNacional
   * @return OK
   */
  impSeguimientoControlNacionalObtenerResponse(idimpSeguimientoControlNacional: string): __Observable<__StrictHttpResponse<ImpSeguimientoControlNacional>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idimpSeguimientoControlNacional != null) __params = __params.set('idimpSeguimientoControlNacional', idimpSeguimientoControlNacional.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/impSeguimientoControlNacional`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ImpSeguimientoControlNacional>;
      })
    );
  }
  /**
   * Consultar registro de impSeguimientoControlNacional
   * @param idimpSeguimientoControlNacional Identificador de impSeguimientoControlNacional
   * @return OK
   */
  impSeguimientoControlNacionalObtener(idimpSeguimientoControlNacional: string): __Observable<ImpSeguimientoControlNacional> {
    return this.impSeguimientoControlNacionalObtenerResponse(idimpSeguimientoControlNacional).pipe(
      __map(_r => _r.body as ImpSeguimientoControlNacional)
    );
  }

  /**
   * Guardar o actualizar impSeguimientoControlNacional
   * @param impSeguimientoControlNacional impSeguimientoControlNacional
   * @return OK
   */
  impSeguimientoControlNacionalGuardarOActualizarResponse(impSeguimientoControlNacional: ImpSeguimientoControlNacional): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = impSeguimientoControlNacional;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/impSeguimientoControlNacional`,
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
   * Guardar o actualizar impSeguimientoControlNacional
   * @param impSeguimientoControlNacional impSeguimientoControlNacional
   * @return OK
   */
  impSeguimientoControlNacionalGuardarOActualizar(impSeguimientoControlNacional: ImpSeguimientoControlNacional): __Observable<string> {
    return this.impSeguimientoControlNacionalGuardarOActualizarResponse(impSeguimientoControlNacional).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de impSeguimientoControlNacional
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  impSeguimientoControlNacionalQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultImpSeguimientoControlNacional>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/impSeguimientoControlNacional`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultImpSeguimientoControlNacional>;
      })
    );
  }
  /**
   * Consultar lista paginada de impSeguimientoControlNacional
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  impSeguimientoControlNacionalQueryResult(info: QueryInfo): __Observable<QueryResultImpSeguimientoControlNacional> {
    return this.impSeguimientoControlNacionalQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultImpSeguimientoControlNacional)
    );
  }

  /**
   * Desactivar registro de impSeguimientoControlNacional
   * @param idimpSeguimientoControlNacional Identificador de registro de impSeguimientoControlNacional
   * @return OK
   */
  impSeguimientoControlNacionalDesactivarResponse(idimpSeguimientoControlNacional: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idimpSeguimientoControlNacional != null) __params = __params.set('idimpSeguimientoControlNacional', idimpSeguimientoControlNacional.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/impSeguimientoControlNacional`,
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
   * Desactivar registro de impSeguimientoControlNacional
   * @param idimpSeguimientoControlNacional Identificador de registro de impSeguimientoControlNacional
   * @return OK
   */
  impSeguimientoControlNacionalDesactivar(idimpSeguimientoControlNacional: string): __Observable<string> {
    return this.impSeguimientoControlNacionalDesactivarResponse(idimpSeguimientoControlNacional).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar registro de impSeguimientoControlOrigen
   * @param idimpSeguimientoControlOrigen Identificador de impSeguimientoControlOrigen
   * @return OK
   */
  impSeguimientoControlOrigenObtenerResponse(idimpSeguimientoControlOrigen: string): __Observable<__StrictHttpResponse<ImpSeguimientoControlOrigen>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idimpSeguimientoControlOrigen != null) __params = __params.set('idimpSeguimientoControlOrigen', idimpSeguimientoControlOrigen.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/impSeguimientoControlOrigen`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ImpSeguimientoControlOrigen>;
      })
    );
  }
  /**
   * Consultar registro de impSeguimientoControlOrigen
   * @param idimpSeguimientoControlOrigen Identificador de impSeguimientoControlOrigen
   * @return OK
   */
  impSeguimientoControlOrigenObtener(idimpSeguimientoControlOrigen: string): __Observable<ImpSeguimientoControlOrigen> {
    return this.impSeguimientoControlOrigenObtenerResponse(idimpSeguimientoControlOrigen).pipe(
      __map(_r => _r.body as ImpSeguimientoControlOrigen)
    );
  }

  /**
   * Guardar o actualizar impSeguimientoControlOrigen
   * @param impSeguimientoControlOrigen impSeguimientoControlOrigen
   * @return OK
   */
  impSeguimientoControlOrigenGuardarOActualizarResponse(impSeguimientoControlOrigen: ImpSeguimientoControlOrigen): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = impSeguimientoControlOrigen;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/impSeguimientoControlOrigen`,
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
   * Guardar o actualizar impSeguimientoControlOrigen
   * @param impSeguimientoControlOrigen impSeguimientoControlOrigen
   * @return OK
   */
  impSeguimientoControlOrigenGuardarOActualizar(impSeguimientoControlOrigen: ImpSeguimientoControlOrigen): __Observable<string> {
    return this.impSeguimientoControlOrigenGuardarOActualizarResponse(impSeguimientoControlOrigen).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Consultar lista paginada de impSeguimientoControlOrigen
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  impSeguimientoControlOrigenQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultImpSeguimientoControlOrigen>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/impSeguimientoControlOrigen`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultImpSeguimientoControlOrigen>;
      })
    );
  }
  /**
   * Consultar lista paginada de impSeguimientoControlOrigen
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  impSeguimientoControlOrigenQueryResult(info: QueryInfo): __Observable<QueryResultImpSeguimientoControlOrigen> {
    return this.impSeguimientoControlOrigenQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultImpSeguimientoControlOrigen)
    );
  }

  /**
   * Desactivar registro de impSeguimientoControlOrigen
   * @param idimpSeguimientoControlOrigen Identificador de registro de impSeguimientoControlOrigen
   * @return OK
   */
  impSeguimientoControlOrigenDesactivarResponse(idimpSeguimientoControlOrigen: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idimpSeguimientoControlOrigen != null) __params = __params.set('idimpSeguimientoControlOrigen', idimpSeguimientoControlOrigen.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/impSeguimientoControlOrigen`,
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
   * Desactivar registro de impSeguimientoControlOrigen
   * @param idimpSeguimientoControlOrigen Identificador de registro de impSeguimientoControlOrigen
   * @return OK
   */
  impSeguimientoControlOrigenDesactivar(idimpSeguimientoControlOrigen: string): __Observable<string> {
    return this.impSeguimientoControlOrigenDesactivarResponse(idimpSeguimientoControlOrigen).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module ProcesosL07ImportacionesService {
}

export { ProcesosL07ImportacionesService }
