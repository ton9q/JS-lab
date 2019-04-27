import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { AuthService } from './auth/services/auth.service';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isLoading = false;

  private subscription: Subscription;

  constructor(private authService: AuthService, private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.subscription = this.authService.user$
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });

    this.subscription.add(
      this.loaderService.loaderState
        .pipe(debounceTime(0)) // Prevent ExpressionChangedAfterItHasBeenCheckedError for now :D TODO: Fix it
        .subscribe((isLoading) => {
          this.isLoading = isLoading;
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
