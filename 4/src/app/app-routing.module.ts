import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideosListPageComponent } from './pages/videos-list-page/videos-list-page.component';
import { VideoInfoPageComponent } from './pages/video-info-page/video-info-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'videos', pathMatch: 'full' },
  { path: 'videos', component: VideosListPageComponent },
  { path: 'videos/:id', component: VideoInfoPageComponent },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
