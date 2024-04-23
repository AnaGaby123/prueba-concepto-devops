/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiCatalogosConfiguration as __Configuration } from '../api-catalogos-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class SistemaCorreosEnvioService extends __BaseService {
  static readonly CorreoEnviadoEnviarEnviarCorreoPath = '/EnviarCorreo';
  static readonly CorreoEnviadoEnviarObtenerHtmlCorreoPath = '/ObtenerHtmlCorreo';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * EnviarCorreo CorreoEnviadoEnviar
   * @param idCorreoEnviado undefined
   * @return OK
   */
  CorreoEnviadoEnviarEnviarCorreoResponse(idCorreoEnviado: string): __Observable<__StrictHttpResponse<boolean>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoEnviado != null) __params = __params.set('idCorreoEnviado', idCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/EnviarCorreo`,
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
   * EnviarCorreo CorreoEnviadoEnviar
   * @param idCorreoEnviado undefined
   * @return OK
   */
  CorreoEnviadoEnviarEnviarCorreo(idCorreoEnviado: string): __Observable<boolean> {
    return this.CorreoEnviadoEnviarEnviarCorreoResponse(idCorreoEnviado).pipe(
      __map(_r => _r.body as boolean)
    );
  }

  /**
   * ObtenerHtmlCorreo CorreoEnviadoEnviar
   * @param idCorreoEnviado undefined
   * @return OK
   */
  CorreoEnviadoEnviarObtenerHtmlCorreoResponse(idCorreoEnviado: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (idCorreoEnviado != null) __params = __params.set('idCorreoEnviado', idCorreoEnviado.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/ObtenerHtmlCorreo`,
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
   * ObtenerHtmlCorreo CorreoEnviadoEnviar
   * @param idCorreoEnviado undefined
   * @return OK
   */
  CorreoEnviadoEnviarObtenerHtmlCorreo(idCorreoEnviado: string): __Observable<string> {
    return this.CorreoEnviadoEnviarObtenerHtmlCorreoResponse(idCorreoEnviado).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module SistemaCorreosEnvioService {
}

export { SistemaCorreosEnvioService }
