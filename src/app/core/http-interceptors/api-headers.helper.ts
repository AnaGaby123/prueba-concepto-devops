import {HttpHeaders} from '@angular/common/http';

export const getHeadersPost = (token: string) => {
  return new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
};

export const getHeadersGet = (token: string) => {
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
};
