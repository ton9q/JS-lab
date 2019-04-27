import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  userName: string;
  password: string;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.userName, this.password).subscribe(() => {
      this.router.navigate(['/']);
    }, (error) => {
      this.errorMessage = error.message;
    });
  }

}
