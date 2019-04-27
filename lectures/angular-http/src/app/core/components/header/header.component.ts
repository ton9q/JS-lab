import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user$ = this.authService.user$;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.navigateToLoginPage();
  }

  logout() {
    this.authService.logout();
    this.navigateToLoginPage();
  }

  private navigateToLoginPage() {
    this.router.navigate(['/login']);
  }
}
