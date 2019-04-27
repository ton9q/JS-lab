import { AuthService } from 'src/app/auth/services/auth.service';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';

export function authServiceFactory(authService: AuthService) {
  return () => authService.getUserInfo();
}

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: authServiceFactory,
      deps: [AuthService],
      multi: true,
    },
  ]
})
export class AuthModule { }
