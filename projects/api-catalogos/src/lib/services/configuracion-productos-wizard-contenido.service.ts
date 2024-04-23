/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OpcionesFamiliaContenido } from '../models/opciones-familia-contenido';
import { ParametroOpcionesFamiliaContenido } from '../models/parametro-opciones-familia-contenido';
import { ProductoTarifaAgenteAduanal } from '../models/producto-tarifa-agente-aduanal';
import { VProductoAlternativo } from '../models/vproducto-alternativo';
import { VProductoComplementario } from '../models/vproducto-complementario';
import { VProductoDetalle } from '../models/vproducto-detalle';
import { VProductoSuplementario } from '../models/vproducto-suplementario';
@Injectable({
  providedIn: 'root',
})
class ConfiguracionProductosWizardContenidoService extends __BaseService {
  static readonly OpcionesFamiliaContenidoProcessPath = '/OpcionesFamiliaContenido';
  static readonly ProductoTarifaAgenteAduanalObtenerPath = '/ProductoTarifaAgenteAduanal';
  static readonly ValidadorCASProcessPath = '/ValidadorCAS';
  static readonly vProductoAlternativoConsultaProcessPath = '/vProductoAlternativoConsulta';
  static readonly vProductoComplementarioConsultaProcessPath = '/vProductoComplementarioConsulta';
  static readonly vProductoDetalleProcessPath = '/vProductoDetalle';
  static readonly vProductoSuplementarioConsultaProcessPath = '/vProductoSuplementarioConsulta';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Process OpcionesFamiliaContenido
   * @param source undefined
   * @return OK
   */
  OpcionesFamiliaContenidoProcessResponse(source: ParametroOpcionesFamiliaContenido): __Observable<__StrictHttpResponse<OpcionesFamiliaContenido>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = source;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/OpcionesFamiliaContenido`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OpcionesFamiliaContenido>;
      })
    );
  }
  /**
   * Process OpcionesFamiliaContenido
   * @param source undefined
   * @return OK
   */
  OpcionesFamiliaContenidoProcess(source: ParametroOpcionesFamiliaContenido): __Observable<OpcionesFamiliaContenido> {
    return this.OpcionesFamiliaContenidoProcessResponse(source).pipe(
      __map(_r => _r.body as OpcionesFamiliaContenido)
    );
  }

  /**
   * Obtener ProductoTarifaAgenteAduanal
   * @param params The `ConfiguracionProductosWizardContenidoService.ProductoTarifaAgenteAduanalObtenerParams` containing the following parameters:
   *
   * - `idMarcaFamilia`:
   *
   * - `idProducto`:
   *
   * @return OK
   */
  ProductoTarifaAgenteAduanalObtenerResponse(params: ConfiguracionProductosWizardContenidoService.ProductoTarifaAgenteAduanalObtenerParams): __Observable<__StrictHttpResponse<ProductoTarifaAgenteAduanal>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idMarcaFamilia != null) __params = __params.set('idMarcaFamilia', params.idMarcaFamilia.toString());
    if (params.idProducto != null) __params = __params.set('idProducto', params.idProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ProductoTarifaAgenteAduanal`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<ProductoTarifaAgenteAduanal>;
      })
    );
  }
  /**
   * Obtener ProductoTarifaAgenteAduanal
   * @param params The `ConfiguracionProductosWizardContenidoService.ProductoTarifaAgenteAduanalObtenerParams` containing the following parameters:
   *
   * - `idMarcaFamilia`:
   *
   * - `idProducto`:
   *
   * @return OK
   */
  ProductoTarifaAgenteAduanalObtener(params: ConfiguracionProductosWizardContenidoService.ProductoTarifaAgenteAduanalObtenerParams): __Observable<ProductoTarifaAgenteAduanal> {
    return this.ProductoTarifaAgenteAduanalObtenerResponse(params).pipe(
      __map(_r => _r.body as ProductoTarifaAgenteAduanal)
    );
  }

  /**
   * Process ValidadorCAS
   * @param cas undefined
   * @return OK
   */
  ValidadorCASProcessResponse(cas: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (cas != null) __params = __params.set('cas', cas.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ValidadorCAS`,
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
   * Process ValidadorCAS
   * @param cas undefined
   * @return OK
   */
  ValidadorCASProcess(cas: string): __Observable<boolean> {
    return this.ValidadorCASProcessResponse(cas).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * Process vProductoAlternativoConsulta
   * @param idProducto undefined
   * @return OK
   */
  vProductoAlternativoConsultaProcessResponse(idProducto: string): __Observable<__StrictHttpResponse<Array<VProductoAlternativo>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProducto != null) __params = __params.set('idProducto', idProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vProductoAlternativoConsulta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VProductoAlternativo>>;
      })
    );
  }
  /**
   * Process vProductoAlternativoConsulta
   * @param idProducto undefined
   * @return OK
   */
  vProductoAlternativoConsultaProcess(idProducto: string): __Observable<Array<VProductoAlternativo>> {
    return this.vProductoAlternativoConsultaProcessResponse(idProducto).pipe(
      __map(_r => _r.body as Array<VProductoAlternativo>)
    );
  }

  /**
   * Process vProductoComplementarioConsulta
   * @param idProducto undefined
   * @return OK
   */
  vProductoComplementarioConsultaProcessResponse(idProducto: string): __Observable<__StrictHttpResponse<Array<VProductoComplementario>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProducto != null) __params = __params.set('idProducto', idProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vProductoComplementarioConsulta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VProductoComplementario>>;
      })
    );
  }
  /**
   * Process vProductoComplementarioConsulta
   * @param idProducto undefined
   * @return OK
   */
  vProductoComplementarioConsultaProcess(idProducto: string): __Observable<Array<VProductoComplementario>> {
    return this.vProductoComplementarioConsultaProcessResponse(idProducto).pipe(
      __map(_r => _r.body as Array<VProductoComplementario>)
    );
  }

  /**
   * Process vProductoDetalle
   * @param idProducto undefined
   * @return OK
   */
  vProductoDetalleProcessResponse(idProducto?: string): __Observable<__StrictHttpResponse<VProductoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProducto != null) __params = __params.set('idProducto', idProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vProductoDetalle`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VProductoDetalle>;
      })
    );
  }
  /**
   * Process vProductoDetalle
   * @param idProducto undefined
   * @return OK
   */
  vProductoDetalleProcess(idProducto?: string): __Observable<VProductoDetalle> {
    return this.vProductoDetalleProcessResponse(idProducto).pipe(
      __map(_r => _r.body as VProductoDetalle)
    );
  }

  /**
   * Process vProductoSuplementarioConsulta
   * @param idProducto undefined
   * @return OK
   */
  vProductoSuplementarioConsultaProcessResponse(idProducto: string): __Observable<__StrictHttpResponse<Array<VProductoSuplementario>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idProducto != null) __params = __params.set('idProducto', idProducto.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/vProductoSuplementarioConsulta`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<VProductoSuplementario>>;
      })
    );
  }
  /**
   * Process vProductoSuplementarioConsulta
   * @param idProducto undefined
   * @return OK
   */
  vProductoSuplementarioConsultaProcess(idProducto: string): __Observable<Array<VProductoSuplementario>> {
    return this.vProductoSuplementarioConsultaProcessResponse(idProducto).pipe(
      __map(_r => _r.body as Array<VProductoSuplementario>)
    );
  }
}

module ConfiguracionProductosWizardContenidoService {

  /**
   * Parameters for ProductoTarifaAgenteAduanalObtener
   */
  export interface ProductoTarifaAgenteAduanalObtenerParams {
    idMarcaFamilia: string;
    idProducto?: string;
  }
}

export { ConfiguracionProductosWizardContenidoService }
