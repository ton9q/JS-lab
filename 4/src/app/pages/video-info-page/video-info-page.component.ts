import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-info-page',
  templateUrl: './video-info-page.component.html',
  styleUrls: ['./video-info-page.component.css']
})
export class VideoInfoPageComponent implements OnInit {
  data: any;

  constructor(
    private videoService: VideoService,
    public route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.videoService.getVideoInfoWithStatistics(params.id).subscribe(data => {
          this.data = { ...data.items[0] };
        },
          error => {
            this.router.navigate(['/404']);
          }
        );
      },
      error => {
        this.router.navigate(['/404']);
      }
    );
  }

  navigateToVideos() {
    this.router.navigate(['/videos']);
  }
}
