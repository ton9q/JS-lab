import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { of, Observable, throwError, ReplaySubject } from 'rxjs';
import { tap, catchError, switchMap, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthService {
  private readonly AUTH_URL = 'auth';

  user$ = new ReplaySubject<User>(1);

  constructor(private http: HttpClient) {}

  init() {
    this.getUserInfo();
  }

  login(login: string, password: string): Observable<User | HttpErrorResponse> {
    return this.http.post(`${this.AUTH_URL}/login`, {
      login,
      password
    }).pipe(
      retry(4),
      tap((response: any) => {
        localStorage.accessToken = JSON.stringify(response.token);
      }),
      switchMap(() => this.getUserInfo()),
      catchError((error) => throwError({
        ...error,
        message: error.status === 401 ? 'Incorrect username or password' : error.message
      }))
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('accessToken');
    this.user$.next(null);

    return of();
  }

  getUserInfo(): Promise<User> {
    const promise = !!this.getToken()
      ? this.http.get<User>(`${this.AUTH_URL}/userInfo`)
          .pipe(catchError(() => of(null))).toPromise()
      : Promise.resolve(null);

    return promise.then((user) => {
      this.user$.next(user);
      return user;
    });

  }

  getToken(): string {
    return this.getLocalStorageItem('accessToken');
  }

  private getLocalStorageItem(prop: string) {
    const item = localStorage.getItem(prop);

    return item && JSON.parse(item);
  }
}
