import { AuthService } from './../../../core/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userName: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login().subscribe((user: User) => {
      console.log(`logged in successfully as ${user.firstName} ${user.lastName}`);
      this.router.navigate(['/']);
    });
  }

}
