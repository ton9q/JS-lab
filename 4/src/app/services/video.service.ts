import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  pageToken  = '';
  private readonly defaultSearch = 'mario';
  private readonly maxResults = 18;

  private readonly params = {
    qParam: '&q=',
    type: '&type=video',
    part: '&part=snippet',
    order: '&order=viewCount',
    id: '&id=',
    maxResults: `&maxResults=${this.maxResults}`,
  };

  constructor(private http: HttpClient) {}

  getVideos(search?: string): Observable<any> {
    const { type, part, maxResults, qParam } = this.params;

    const pageTokenString = this.pageToken ? `&pageToken=${this.pageToken}` : '';
    const searchString = search || this.defaultSearch;

    return this.http.get<any>(
      type +
      part +
      maxResults +
      qParam +
      searchString +
      pageTokenString
    );
  }

  getVideoInfoWithStatistics(idVideo: string): Observable<any> {
    const { id, part } = this.params;
    const statisticString = ',statistics';

    return this.http.get<any>(
      id +
      idVideo +
      part +
      statisticString
    );
  }
}
