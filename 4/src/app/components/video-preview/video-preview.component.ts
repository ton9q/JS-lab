import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.css']
})
export class VideoPreviewComponent implements OnInit {
  @Input() video: any;

  constructor(private router: Router) {}

  ngOnInit() {}

  onClick($event) {
    this.router.navigate([`/videos/${this.video.id.videoId}`]);
  }
}
