/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiFinanzasConfiguration as __Configuration } from '../api-finanzas-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { TpProformaPedido } from '../models/tp-proforma-pedido';
import { ParametroAgregarComentarioFacturaCliente } from '../models/parametro-agregar-comentario-factura-cliente';
import { FccMonitoreoCobro } from '../models/fcc-monitoreo-cobro';
import { QueryResultFccMonitoreoCobro } from '../models/query-result-fcc-monitoreo-cobro';
import { QueryInfo } from '../models/query-info';
import { FccMonitoreoCobroFacturaPedido } from '../models/fcc-monitoreo-cobro-factura-pedido';
import { QueryResultFccMonitoreoCobroFacturaPedido } from '../models/query-result-fcc-monitoreo-cobro-factura-pedido';
import { FccProgramacionCobro } from '../models/fcc-programacion-cobro';
import { QueryResultFccProgramacionCobro } from '../models/query-result-fcc-programacion-cobro';
import { GroupQueryResultFccRevisionProgramadaDetalle } from '../models/group-query-result-fcc-revision-programada-detalle';
import { GroupQueryInfo } from '../models/group-query-info';
import { QueryResultFccRevisionProgramadaDetalle } from '../models/query-result-fcc-revision-programada-detalle';
import { QueryResultVfccMonitoreoCobroFacturaPedido } from '../models/query-result-vfcc-monitoreo-cobro-factura-pedido';
@Injectable({
  providedIn: 'root',
})
class CobranzaClientesMonitoreoCobrosService extends __BaseService {
  static readonly AgregarComentarioFacturaClienteProcessPath = '/AgregarComentarioFacturaCliente';
  static readonly fccMonitoreoCobroObtenerPath = '/fccMonitoreoCobro';
  static readonly fccMonitoreoCobroGuardarOActualizarPath = '/fccMonitoreoCobro';
  static readonly fccMonitoreoCobroQueryResultPath = '/fccMonitoreoCobro';
  static readonly fccMonitoreoCobroDesactivarPath = '/fccMonitoreoCobro';
  static readonly fccMonitoreoCobroFacturaPedidoObtenerPath = '/fccMonitoreoCobroFacturaPedido';
  static readonly fccMonitoreoCobroFacturaPedidoGuardarOActualizarPath = '/fccMonitoreoCobroFacturaPedido';
  static readonly fccMonitoreoCobroFacturaPedidoQueryResultPath = '/fccMonitoreoCobroFacturaPedido';
  static readonly fccMonitoreoCobroFacturaPedidoDesactivarPath = '/fccMonitoreoCobroFacturaPedido';
  static readonly fccProgramacionCobroObtenerPath = '/fccProgramacionCobro';
  static readonly fccProgramacionCobroGuardarOActualizarPath = '/fccProgramacionCobro';
  static readonly fccProgramacionCobroQueryResultPath = '/fccProgramacionCobro';
  static readonly fccProgramacionCobroDesactivarPath = '/fccProgramacionCobro';
  static readonly fccRevisionProgramadaDetalleGroupQueryResultPath = '/GrupoListafccRevisionProgramadaDetalle';
  static readonly fccRevisionProgramadaDetalleQueryResultPath = '/fccRevisionProgramadaDetalle';
  static readonly vfccMonitoreoCobroFacturaPedidoQueryResultPath = '/vfccMonitoreoCobroFacturaPedido';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process AgregarComentarioFacturaCliente
   * @param param undefined
   * @return OK
   */
  AgregarComentarioFacturaClienteProcessResponse(param: ParametroAgregarComentarioFacturaCliente): __Observable<__StrictHttpResponse<Array<TpProformaPedido>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = param;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/AgregarComentarioFacturaCliente`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<TpProformaPedido>>;
      })
    );
  }
  /**
   * Process AgregarComentarioFacturaCliente
   * @param param undefined
   * @return OK
   */
  AgregarComentarioFacturaClienteProcess(param: ParametroAgregarComentarioFacturaCliente): __Observable<Array<TpProformaPedido>> {
    return this.AgregarComentarioFacturaClienteProcessResponse(param).pipe(
      __map(_r => _r.body as Array<TpProformaPedido>)
    );
  }

  /**
   * Obtener fccMonitoreoCobro por su idfccMonitoreoCobro
   * @param idfccMonitoreoCobro Identificador de fccMonitoreoCobro
   * @return OK
   */
  fccMonitoreoCobroObtenerResponse(idfccMonitoreoCobro: string): __Observable<__StrictHttpResponse<FccMonitoreoCobro>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccMonitoreoCobro != null) __params = __params.set('idfccMonitoreoCobro', idfccMonitoreoCobro.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccMonitoreoCobro`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccMonitoreoCobro>;
      })
    );
  }
  /**
   * Obtener fccMonitoreoCobro por su idfccMonitoreoCobro
   * @param idfccMonitoreoCobro Identificador de fccMonitoreoCobro
   * @return OK
   */
  fccMonitoreoCobroObtener(idfccMonitoreoCobro: string): __Observable<FccMonitoreoCobro> {
    return this.fccMonitoreoCobroObtenerResponse(idfccMonitoreoCobro).pipe(
      __map(_r => _r.body as FccMonitoreoCobro)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccMonitoreoCobro Dirección de empresa.
   * @return OK
   */
  fccMonitoreoCobroGuardarOActualizarResponse(fccMonitoreoCobro: FccMonitoreoCobro): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccMonitoreoCobro;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccMonitoreoCobro`,
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
   * Guardar o actualizar una dirección de empresa.
   * @param fccMonitoreoCobro Dirección de empresa.
   * @return OK
   */
  fccMonitoreoCobroGuardarOActualizar(fccMonitoreoCobro: FccMonitoreoCobro): __Observable<string> {
    return this.fccMonitoreoCobroGuardarOActualizarResponse(fccMonitoreoCobro).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de fccMonitoreoCobro
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccMonitoreoCobroQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccMonitoreoCobro>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccMonitoreoCobro`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccMonitoreoCobro>;
      })
    );
  }
  /**
   * Obtener lista de fccMonitoreoCobro
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccMonitoreoCobroQueryResult(info: QueryInfo): __Observable<QueryResultFccMonitoreoCobro> {
    return this.fccMonitoreoCobroQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccMonitoreoCobro)
    );
  }

  /**
   * Desactivar un fccMonitoreoCobro.
   * @param idfccMonitoreoCobro Identificador de elemento a desactivar.
   * @return OK
   */
  fccMonitoreoCobroDesactivarResponse(idfccMonitoreoCobro: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccMonitoreoCobro != null) __params = __params.set('idfccMonitoreoCobro', idfccMonitoreoCobro.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccMonitoreoCobro`,
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
   * Desactivar un fccMonitoreoCobro.
   * @param idfccMonitoreoCobro Identificador de elemento a desactivar.
   * @return OK
   */
  fccMonitoreoCobroDesactivar(idfccMonitoreoCobro: string): __Observable<string> {
    return this.fccMonitoreoCobroDesactivarResponse(idfccMonitoreoCobro).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener fccMonitoreoCobroFacturaPedido por su idfccMonitoreoCobroFacturaPedido
   * @param idfccMonitoreoCobroFacturaPedido Identificador de fccMonitoreoCobroFacturaPedido
   * @return OK
   */
  fccMonitoreoCobroFacturaPedidoObtenerResponse(idfccMonitoreoCobroFacturaPedido: string): __Observable<__StrictHttpResponse<FccMonitoreoCobroFacturaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccMonitoreoCobroFacturaPedido != null) __params = __params.set('idfccMonitoreoCobroFacturaPedido', idfccMonitoreoCobroFacturaPedido.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccMonitoreoCobroFacturaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccMonitoreoCobroFacturaPedido>;
      })
    );
  }
  /**
   * Obtener fccMonitoreoCobroFacturaPedido por su idfccMonitoreoCobroFacturaPedido
   * @param idfccMonitoreoCobroFacturaPedido Identificador de fccMonitoreoCobroFacturaPedido
   * @return OK
   */
  fccMonitoreoCobroFacturaPedidoObtener(idfccMonitoreoCobroFacturaPedido: string): __Observable<FccMonitoreoCobroFacturaPedido> {
    return this.fccMonitoreoCobroFacturaPedidoObtenerResponse(idfccMonitoreoCobroFacturaPedido).pipe(
      __map(_r => _r.body as FccMonitoreoCobroFacturaPedido)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccMonitoreoCobroFacturaPedido Dirección de empresa.
   * @return OK
   */
  fccMonitoreoCobroFacturaPedidoGuardarOActualizarResponse(fccMonitoreoCobroFacturaPedido: FccMonitoreoCobroFacturaPedido): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccMonitoreoCobroFacturaPedido;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccMonitoreoCobroFacturaPedido`,
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
   * Guardar o actualizar una dirección de empresa.
   * @param fccMonitoreoCobroFacturaPedido Dirección de empresa.
   * @return OK
   */
  fccMonitoreoCobroFacturaPedidoGuardarOActualizar(fccMonitoreoCobroFacturaPedido: FccMonitoreoCobroFacturaPedido): __Observable<string> {
    return this.fccMonitoreoCobroFacturaPedidoGuardarOActualizarResponse(fccMonitoreoCobroFacturaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de fccMonitoreoCobroFacturaPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccMonitoreoCobroFacturaPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccMonitoreoCobroFacturaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccMonitoreoCobroFacturaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccMonitoreoCobroFacturaPedido>;
      })
    );
  }
  /**
   * Obtener lista de fccMonitoreoCobroFacturaPedido
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccMonitoreoCobroFacturaPedidoQueryResult(info: QueryInfo): __Observable<QueryResultFccMonitoreoCobroFacturaPedido> {
    return this.fccMonitoreoCobroFacturaPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccMonitoreoCobroFacturaPedido)
    );
  }

  /**
   * Desactivar un fccMonitoreoCobroFacturaPedido.
   * @param idfccMonitoreoCobroFacturaPedido Identificador de elemento a desactivar.
   * @return OK
   */
  fccMonitoreoCobroFacturaPedidoDesactivarResponse(idfccMonitoreoCobroFacturaPedido: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccMonitoreoCobroFacturaPedido != null) __params = __params.set('idfccMonitoreoCobroFacturaPedido', idfccMonitoreoCobroFacturaPedido.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccMonitoreoCobroFacturaPedido`,
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
   * Desactivar un fccMonitoreoCobroFacturaPedido.
   * @param idfccMonitoreoCobroFacturaPedido Identificador de elemento a desactivar.
   * @return OK
   */
  fccMonitoreoCobroFacturaPedidoDesactivar(idfccMonitoreoCobroFacturaPedido: string): __Observable<string> {
    return this.fccMonitoreoCobroFacturaPedidoDesactivarResponse(idfccMonitoreoCobroFacturaPedido).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener fccProgramacionCobro por su idfccProgramacionCobro
   * @param idfccProgramacionCobro Identificador de fccProgramacionCobro
   * @return OK
   */
  fccProgramacionCobroObtenerResponse(idfccProgramacionCobro: string): __Observable<__StrictHttpResponse<FccProgramacionCobro>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccProgramacionCobro != null) __params = __params.set('idfccProgramacionCobro', idfccProgramacionCobro.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/fccProgramacionCobro`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<FccProgramacionCobro>;
      })
    );
  }
  /**
   * Obtener fccProgramacionCobro por su idfccProgramacionCobro
   * @param idfccProgramacionCobro Identificador de fccProgramacionCobro
   * @return OK
   */
  fccProgramacionCobroObtener(idfccProgramacionCobro: string): __Observable<FccProgramacionCobro> {
    return this.fccProgramacionCobroObtenerResponse(idfccProgramacionCobro).pipe(
      __map(_r => _r.body as FccProgramacionCobro)
    );
  }

  /**
   * Guardar o actualizar una dirección de empresa.
   * @param fccProgramacionCobro Dirección de empresa.
   * @return OK
   */
  fccProgramacionCobroGuardarOActualizarResponse(fccProgramacionCobro: FccProgramacionCobro): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = fccProgramacionCobro;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/fccProgramacionCobro`,
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
   * Guardar o actualizar una dirección de empresa.
   * @param fccProgramacionCobro Dirección de empresa.
   * @return OK
   */
  fccProgramacionCobroGuardarOActualizar(fccProgramacionCobro: FccProgramacionCobro): __Observable<string> {
    return this.fccProgramacionCobroGuardarOActualizarResponse(fccProgramacionCobro).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * Obtener lista de fccProgramacionCobro
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccProgramacionCobroQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccProgramacionCobro>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccProgramacionCobro`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccProgramacionCobro>;
      })
    );
  }
  /**
   * Obtener lista de fccProgramacionCobro
   * @param info Objeto con filtros y ordenamiento
   * @return OK
   */
  fccProgramacionCobroQueryResult(info: QueryInfo): __Observable<QueryResultFccProgramacionCobro> {
    return this.fccProgramacionCobroQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccProgramacionCobro)
    );
  }

  /**
   * Desactivar un fccProgramacionCobro.
   * @param idfccProgramacionCobro Identificador de elemento a desactivar.
   * @return OK
   */
  fccProgramacionCobroDesactivarResponse(idfccProgramacionCobro: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idfccProgramacionCobro != null) __params = __params.set('idfccProgramacionCobro', idfccProgramacionCobro.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/fccProgramacionCobro`,
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
   * Desactivar un fccProgramacionCobro.
   * @param idfccProgramacionCobro Identificador de elemento a desactivar.
   * @return OK
   */
  fccProgramacionCobroDesactivar(idfccProgramacionCobro: string): __Observable<string> {
    return this.fccProgramacionCobroDesactivarResponse(idfccProgramacionCobro).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * GroupQueryResult fccRevisionProgramadaDetalle
   * @param info undefined
   * @return OK
   */
  fccRevisionProgramadaDetalleGroupQueryResultResponse(info: GroupQueryInfo): __Observable<__StrictHttpResponse<GroupQueryResultFccRevisionProgramadaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/GrupoListafccRevisionProgramadaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<GroupQueryResultFccRevisionProgramadaDetalle>;
      })
    );
  }
  /**
   * GroupQueryResult fccRevisionProgramadaDetalle
   * @param info undefined
   * @return OK
   */
  fccRevisionProgramadaDetalleGroupQueryResult(info: GroupQueryInfo): __Observable<GroupQueryResultFccRevisionProgramadaDetalle> {
    return this.fccRevisionProgramadaDetalleGroupQueryResultResponse(info).pipe(
      __map(_r => _r.body as GroupQueryResultFccRevisionProgramadaDetalle)
    );
  }

  /**
   * Consultar lista paginada de fccRevisionProgramadaDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  fccRevisionProgramadaDetalleQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultFccRevisionProgramadaDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/fccRevisionProgramadaDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultFccRevisionProgramadaDetalle>;
      })
    );
  }
  /**
   * Consultar lista paginada de fccRevisionProgramadaDetalle
   * @param info Filtros y ordenamientos
   * @return OK
   */
  fccRevisionProgramadaDetalleQueryResult(info: QueryInfo): __Observable<QueryResultFccRevisionProgramadaDetalle> {
    return this.fccRevisionProgramadaDetalleQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultFccRevisionProgramadaDetalle)
    );
  }

  /**
   * Consultar lista paginada de vfccMonitoreoCobroFacturaPedido
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vfccMonitoreoCobroFacturaPedidoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultVfccMonitoreoCobroFacturaPedido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/vfccMonitoreoCobroFacturaPedido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultVfccMonitoreoCobroFacturaPedido>;
      })
    );
  }
  /**
   * Consultar lista paginada de vfccMonitoreoCobroFacturaPedido
   * @param info Filtros y ordenamientos
   * @return OK
   */
  vfccMonitoreoCobroFacturaPedidoQueryResult(info: QueryInfo): __Observable<QueryResultVfccMonitoreoCobroFacturaPedido> {
    return this.vfccMonitoreoCobroFacturaPedidoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultVfccMonitoreoCobroFacturaPedido)
    );
  }
}

module CobranzaClientesMonitoreoCobrosService {
}

export { CobranzaClientesMonitoreoCobrosService }
