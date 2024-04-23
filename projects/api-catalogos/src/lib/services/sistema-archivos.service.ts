/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Archivo } from '../models/archivo';
import { QueryResultArchivo } from '../models/query-result-archivo';
import { QueryInfo } from '../models/query-info';
import { ArchivoDetalle } from '../models/archivo-detalle';
import { RequestMoverArchivo } from '../models/request-mover-archivo';
import { Metadata } from '../models/metadata';
import { VariableValor } from '../models/variable-valor';
import { UrlSubirArchivo } from '../models/url-subir-archivo';
import { ParametroSubirArchivoTemporal } from '../models/parametro-subir-archivo-temporal';
@Injectable({
  providedIn: 'root',
})
class SistemaArchivosService extends __BaseService {
  static readonly ArchivoObtenerPath = '/Archivo';
  static readonly ArchivoGuardarOActualizarPath = '/Archivo';
  static readonly ArchivoQueryResultPath = '/Archivo';
  static readonly ArchivoDesactivarPath = '/Archivo';
  static readonly ArchivoExtensionsBuscarArchivoClientePath = '/BuscarArchivoCliente';
  static readonly ArchivoExtensionsBuscarArchivoProveedorPath = '/BuscarArchivoProveedor';
  static readonly ArchivoExtensionsMoverArchivoMinIOPath = '/MoverArchivoMinIO';
  static readonly ArchivoExtensionsObtenerDetallePath = '/ArchivoDetalle';
  static readonly ArchivoExtensionsObtenerMetadatosArchivoPath = '/ObtenerMetadatosArchivo';
  static readonly ArchivoExtensionsObtenerUrlDeArchivoDesdeUuidPath = '/UrlDeArchivoDesdeUuid';
  static readonly ArchivoExtensionsObtenerUrlSubirArchivoPath = '/UrlSubirArchivo';
  static readonly SubirArchivoTemporalProcessPath = '/SubirArchivoTemporal';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Obtener un archivo por su idArchivo
   * @param idArchivo Identificador de archivo.
   * @return OK
   */
  ArchivoObtenerResponse(idArchivo: string): __Observable<__StrictHttpResponse<Archivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idArchivo != null) __params = __params.set('idArchivo', idArchivo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/Archivo`,
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
   * Obtener un archivo por su idArchivo
   * @param idArchivo Identificador de archivo.
   * @return OK
   */
  ArchivoObtener(idArchivo: string): __Observable<Archivo> {
    return this.ArchivoObtenerResponse(idArchivo).pipe(
      __map(_r => _r.body as Archivo)
    );
  }

  /**
   * Guarda o actualiza un archivo.
   * @param archivo Objeto de tipo "Archivo" a ser guardado.
   * @return OK
   */
  ArchivoGuardarOActualizarResponse(archivo: Archivo): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = archivo;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/Archivo`,
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
   * Guarda o actualiza un archivo.
   * @param archivo Objeto de tipo "Archivo" a ser guardado.
   * @return OK
   */
  ArchivoGuardarOActualizar(archivo: Archivo): __Observable<string> {
    return this.ArchivoGuardarOActualizarResponse(archivo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * QueryResult Archivo
   * @param info undefined
   * @return OK
   */
  ArchivoQueryResultResponse(info: QueryInfo): __Observable<__StrictHttpResponse<QueryResultArchivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = info;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/Archivo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<QueryResultArchivo>;
      })
    );
  }
  /**
   * QueryResult Archivo
   * @param info undefined
   * @return OK
   */
  ArchivoQueryResult(info: QueryInfo): __Observable<QueryResultArchivo> {
    return this.ArchivoQueryResultResponse(info).pipe(
      __map(_r => _r.body as QueryResultArchivo)
    );
  }

  /**
   * Desactivar un archivo. Esto no elimina el registro, ni el archivo.
   * Previamente debió moverse en el repositorio a otra ubicación.
   * @param idArchivo Identificador del archivo a desactivar en el sistema
   * @return OK
   */
  ArchivoDesactivarResponse(idArchivo: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idArchivo != null) __params = __params.set('idArchivo', idArchivo.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/Archivo`,
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
   * Desactivar un archivo. Esto no elimina el registro, ni el archivo.
   * Previamente debió moverse en el repositorio a otra ubicación.
   * @param idArchivo Identificador del archivo a desactivar en el sistema
   * @return OK
   */
  ArchivoDesactivar(idArchivo: string): __Observable<string> {
    return this.ArchivoDesactivarResponse(idArchivo).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * BuscarArchivoCliente ArchivoExtensions
   * @param params The `SistemaArchivosService.ArchivoExtensionsBuscarArchivoClienteParams` containing the following parameters:
   *
   * - `idCliente`:
   *
   * - `hash`:
   *
   * @return OK
   */
  ArchivoExtensionsBuscarArchivoClienteResponse(params: SistemaArchivosService.ArchivoExtensionsBuscarArchivoClienteParams): __Observable<__StrictHttpResponse<Archivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idCliente != null) __params = __params.set('idCliente', params.idCliente.toString());
    if (params.hash != null) __params = __params.set('hash', params.hash.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/BuscarArchivoCliente`,
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
   * BuscarArchivoCliente ArchivoExtensions
   * @param params The `SistemaArchivosService.ArchivoExtensionsBuscarArchivoClienteParams` containing the following parameters:
   *
   * - `idCliente`:
   *
   * - `hash`:
   *
   * @return OK
   */
  ArchivoExtensionsBuscarArchivoCliente(params: SistemaArchivosService.ArchivoExtensionsBuscarArchivoClienteParams): __Observable<Archivo> {
    return this.ArchivoExtensionsBuscarArchivoClienteResponse(params).pipe(
      __map(_r => _r.body as Archivo)
    );
  }

  /**
   * BuscarArchivoProveedor ArchivoExtensions
   * @param params The `SistemaArchivosService.ArchivoExtensionsBuscarArchivoProveedorParams` containing the following parameters:
   *
   * - `idProveedor`:
   *
   * - `hash`:
   *
   * @return OK
   */
  ArchivoExtensionsBuscarArchivoProveedorResponse(params: SistemaArchivosService.ArchivoExtensionsBuscarArchivoProveedorParams): __Observable<__StrictHttpResponse<Archivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.idProveedor != null) __params = __params.set('idProveedor', params.idProveedor.toString());
    if (params.hash != null) __params = __params.set('hash', params.hash.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/BuscarArchivoProveedor`,
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
   * BuscarArchivoProveedor ArchivoExtensions
   * @param params The `SistemaArchivosService.ArchivoExtensionsBuscarArchivoProveedorParams` containing the following parameters:
   *
   * - `idProveedor`:
   *
   * - `hash`:
   *
   * @return OK
   */
  ArchivoExtensionsBuscarArchivoProveedor(params: SistemaArchivosService.ArchivoExtensionsBuscarArchivoProveedorParams): __Observable<Archivo> {
    return this.ArchivoExtensionsBuscarArchivoProveedorResponse(params).pipe(
      __map(_r => _r.body as Archivo)
    );
  }

  /**
   * Mover un archivo en el repositorio MinIO de ubicación.
   * @param requestMoverArchivo Parametro para mover el archivo.
   * @return OK
   */
  ArchivoExtensionsMoverArchivoMinIOResponse(requestMoverArchivo: RequestMoverArchivo): __Observable<__StrictHttpResponse<ArchivoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = requestMoverArchivo;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/MoverArchivoMinIO`,
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
   * Mover un archivo en el repositorio MinIO de ubicación.
   * @param requestMoverArchivo Parametro para mover el archivo.
   * @return OK
   */
  ArchivoExtensionsMoverArchivoMinIO(requestMoverArchivo: RequestMoverArchivo): __Observable<ArchivoDetalle> {
    return this.ArchivoExtensionsMoverArchivoMinIOResponse(requestMoverArchivo).pipe(
      __map(_r => _r.body as ArchivoDetalle)
    );
  }

  /**
   * ObtenerDetalle ArchivoExtensions
   * @param idArchivo undefined
   * @return OK
   */
  ArchivoExtensionsObtenerDetalleResponse(idArchivo: string): __Observable<__StrictHttpResponse<ArchivoDetalle>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idArchivo != null) __params = __params.set('idArchivo', idArchivo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ArchivoDetalle`,
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
   * ObtenerDetalle ArchivoExtensions
   * @param idArchivo undefined
   * @return OK
   */
  ArchivoExtensionsObtenerDetalle(idArchivo: string): __Observable<ArchivoDetalle> {
    return this.ArchivoExtensionsObtenerDetalleResponse(idArchivo).pipe(
      __map(_r => _r.body as ArchivoDetalle)
    );
  }

  /**
   * ObtenerMetadatosArchivo ArchivoExtensions
   * @param idArchivo undefined
   * @return OK
   */
  ArchivoExtensionsObtenerMetadatosArchivoResponse(idArchivo: string): __Observable<__StrictHttpResponse<Metadata>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idArchivo != null) __params = __params.set('idArchivo', idArchivo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ObtenerMetadatosArchivo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Metadata>;
      })
    );
  }
  /**
   * ObtenerMetadatosArchivo ArchivoExtensions
   * @param idArchivo undefined
   * @return OK
   */
  ArchivoExtensionsObtenerMetadatosArchivo(idArchivo: string): __Observable<Metadata> {
    return this.ArchivoExtensionsObtenerMetadatosArchivoResponse(idArchivo).pipe(
      __map(_r => _r.body as Metadata)
    );
  }

  /**
   * Obtener la URL de descarga desde repositorio, para un archivo guardado en el sistema.
   * @param idArchivo Identificador del archivo a descargarse.
   * @return OK
   */
  ArchivoExtensionsObtenerUrlDeArchivoDesdeUuidResponse(idArchivo: string): __Observable<__StrictHttpResponse<VariableValor>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idArchivo != null) __params = __params.set('idArchivo', idArchivo.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/UrlDeArchivoDesdeUuid`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<VariableValor>;
      })
    );
  }
  /**
   * Obtener la URL de descarga desde repositorio, para un archivo guardado en el sistema.
   * @param idArchivo Identificador del archivo a descargarse.
   * @return OK
   */
  ArchivoExtensionsObtenerUrlDeArchivoDesdeUuid(idArchivo: string): __Observable<VariableValor> {
    return this.ArchivoExtensionsObtenerUrlDeArchivoDesdeUuidResponse(idArchivo).pipe(
      __map(_r => _r.body as VariableValor)
    );
  }

  /**
   * ObtenerUrlSubirArchivo ArchivoExtensions
   * @return OK
   */
  ArchivoExtensionsObtenerUrlSubirArchivoResponse(): __Observable<__StrictHttpResponse<UrlSubirArchivo>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/UrlSubirArchivo`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UrlSubirArchivo>;
      })
    );
  }
  /**
   * ObtenerUrlSubirArchivo ArchivoExtensions
   * @return OK
   */
  ArchivoExtensionsObtenerUrlSubirArchivo(): __Observable<UrlSubirArchivo> {
    return this.ArchivoExtensionsObtenerUrlSubirArchivoResponse().pipe(
      __map(_r => _r.body as UrlSubirArchivo)
    );
  }

  /**
   * Process SubirArchivoTemporal
   * @param source undefined
   * @return OK
   */
  SubirArchivoTemporalProcessResponse(source: ParametroSubirArchivoTemporal): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = source;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/SubirArchivoTemporal`,
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
   * Process SubirArchivoTemporal
   * @param source undefined
   * @return OK
   */
  SubirArchivoTemporalProcess(source: ParametroSubirArchivoTemporal): __Observable<boolean> {
    return this.SubirArchivoTemporalProcessResponse(source).pipe(
      __map(_r => _r.body as boolean)
    );
  }
}

module SistemaArchivosService {

  /**
   * Parameters for ArchivoExtensionsBuscarArchivoCliente
   */
  export interface ArchivoExtensionsBuscarArchivoClienteParams {
    idCliente: string;
    hash: string;
  }

  /**
   * Parameters for ArchivoExtensionsBuscarArchivoProveedor
   */
  export interface ArchivoExtensionsBuscarArchivoProveedorParams {
    idProveedor: string;
    hash: string;
  }
}

export { SistemaArchivosService }
