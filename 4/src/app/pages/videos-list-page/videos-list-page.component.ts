import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs/operators';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-videos-list-page',
  templateUrl: './videos-list-page.component.html',
  styleUrls: ['./videos-list-page.component.css']
})
export class VideosListPageComponent implements OnInit {
  videos: any[] = [];
  searchVideo: string;

  isLoading = false;
  hasMoreVideos = true;

  private debounceSubject = new Subject<string>();

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.loadMoreVideos();

    this.debounceSubject
      .pipe(
        filter((value) => !value.length || value.length >= 3),
        debounceTime(1000)
      ).subscribe((searchVideo) => {
        this.reloadVideos(searchVideo);
      });
  }

  loadMoreVideos(searchVideo?: string) {
    if (!this.isLoading) {
      this.isLoading = true;

      this.videoService.getVideos(searchVideo).subscribe(data => {
        this.videos = this.videos.concat(data.items);
        this.videoService.pageToken = data.nextPageToken;
        this.isLoading = false;
      });
    }
  }

  reloadVideos(searchVideo?: string) {
    this.videos = [];
    this.loadMoreVideos(searchVideo);
  }

  onSearchVideoChange(searchVideo: string) {
    this.debounceSubject.next(searchVideo);
  }
}
