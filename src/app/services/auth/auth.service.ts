import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

/* Models Imports */
import {AppState} from '@appCore/core.state';
import {AppToken} from '@appModels/auth/token.model';
import {UserInfo} from '@appModels/auth/user-info.model';

/* Actions Imports */
import {UPDATE_TOKEN} from '@appActions/auth/auth.actions';

/* Dev Tools */
import {environment} from '@env/environment';
import {AuthState, IUser} from '@appModels/store/auth/auth.models';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly urlApi;
  attemptedUrl;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.urlApi = environment.serverUrl;
  }

  connectTokenResponse(user: IUser): Observable<HttpResponse<AppToken>> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const body = new URLSearchParams();
    body.append('grant_type', 'password');
    body.append('client_id', 'ro.client');
    body.append('scope', 'openid profile roles offline_access default');
    body.append('UserName', user.username);
    body.append('Password', user.password);

    let req = new HttpRequest<any>(
      'POST',
      `${environment.serverUrl}:${environment.identityPort}/connect/token`,
      body,
      {
        headers,
        responseType: 'json',
      },
    );

    return this.http.request<any>(req).pipe(
      filter((_r) => _r instanceof HttpResponse),
      map((_r) => {
        return _r as HttpResponse<AppToken>;
      }),
    );
  }

  connectToken(user: IUser): Observable<AppToken> {
    return this.connectTokenResponse(user).pipe(map((_r) => _r.body as AppToken));
  }

  refreshTokenResponse(refreshToken: string): Observable<HttpResponse<AppToken>> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const body = new URLSearchParams();
    body.append('grant_type', 'refresh_token');
    body.append('client_id', 'ro.client');
    body.append('scope', 'openid profile roles offline_access default');
    body.append('refresh_token', refreshToken);

    let req = new HttpRequest<any>(
      'POST',
      `${environment.serverUrl}:${environment.identityPort}/connect/token`,
      body,
      {
        headers,
        responseType: 'json',
      },
    );

    return this.http.request<any>(req).pipe(
      filter((_r) => _r instanceof HttpResponse),
      map((_r) => {
        return _r as HttpResponse<AppToken>;
      }),
    );
  }

  refreshToken(refreshToken: string): Observable<AppToken> {
    return this.refreshTokenResponse(refreshToken).pipe(map((_r) => _r.body as AppToken));
  }

  userInfoResponse(token: string): Observable<HttpResponse<UserInfo>> {
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', `Bearer ${token}`);
    let body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      `${environment.serverUrl}:${environment.identityPort}/connect/userinfo`,
      body,
      {
        headers,
        responseType: 'json',
      },
    );

    return this.http.request<any>(req).pipe(
      filter((_r) => _r instanceof HttpResponse),
      map((_r) => {
        return _r as HttpResponse<UserInfo>;
      }),
    );
  }

  userInfo(token: string): Observable<UserInfo> {
    return this.userInfoResponse(token).pipe(map((_r) => _r.body as UserInfo));
  }

  refreshTokenFromInit(authState: AuthState) {
    this.store.dispatch(UPDATE_TOKEN({auth: authState, delay: false}));
  }
}
