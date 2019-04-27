import { userMock } from './user-mock';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { of, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated$ = new BehaviorSubject<boolean>(this._isAuthenticated());

  login(): Observable<User> {
    const token = this.generateFakeToken();

    localStorage.currentUser = JSON.stringify(userMock);
    localStorage.accessToken = token;

    this.isAuthenticated$.next(true);

    return of(userMock);
  }

  logout(): Observable<any> {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');

    this.isAuthenticated$.next(false);

    return of();
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  getUserInfo(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  private generateFakeToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private _isAuthenticated(): boolean {
    return !!(localStorage.getItem('currentUser') && localStorage.getItem('accessToken'));
  }
}
