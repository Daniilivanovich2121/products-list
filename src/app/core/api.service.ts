import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {API_URL} from './api-url';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClient);
  public get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${API_URL}${url}`, {
      headers: this.headers,
      params
    });
  }

  public post<T, D>(url: string, data?: D): Observable<T> {
    return this.http.post<T>(`${API_URL}${url}`, JSON.stringify(data), { headers: this.headers });
  }

  public put<T, D>(url: string, data: D): Observable<T> {
    return this.http.put<T>(`${API_URL}${url}`, JSON.stringify(data), {
      headers: this.headers
    });
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${API_URL}${url}`, {
      headers: this.headers
    });
  }

  private get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    return new HttpHeaders(headersConfig);
  }

}
