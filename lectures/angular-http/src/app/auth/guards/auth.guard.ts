import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.isAuthenticated();
  }

  canActivate(): Observable<boolean> {
    return this.isAuthenticated();
  }

  private isAuthenticated(): Observable<boolean> {
    return this.authService.user$
      .pipe(
        take(1),
        map((user) => {
          if (!user) {
            this.router.navigate(['./login']);
          }

          return !!user;
        })
      );
  }

}
