import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  MatCardModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
 } from '@angular/material';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { VideoPreviewComponent } from './components/video-preview/video-preview.component';

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { VideosListPageComponent } from './pages/videos-list-page/videos-list-page.component';
import { VideoInfoPageComponent } from './pages/video-info-page/video-info-page.component';

import { HighlightVideoDirective } from './directives/highlight-video.directive';
import { CutTextPipe } from './pipes/cut-text.pipe';
import { HttpApiInterceptor } from './interceptors/http-api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    VideosListPageComponent,
    VideoInfoPageComponent,
    HighlightVideoDirective,
    VideoPreviewComponent,
    CutTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
