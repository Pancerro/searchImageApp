import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {Image, Photo} from '../model/photo';
import {Trend} from '../model/trend';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  private urlSearchPhoto = `https://api.unsplash.com/search/photos?client_id=${environment.client_id}&query=`;
  private urlTopic = `https://api.unsplash.com/topics?client_id=${environment.client_id}&page=1&per_page=5`;
  private urlPhoto = `https://api.unsplash.com/photos/`;
  constructor(private httpClient: HttpClient) { }
  public getSearchPhoto(searchKeyword: string, pageNumber: number): Observable<Photo> {
    return this.httpClient.get<Photo>(this.urlSearchPhoto + searchKeyword + '&page=' + pageNumber).pipe(take(1));
  }
  public getTopic(): Observable<Trend[]> {
    return this.httpClient.get<Trend[]>(this.urlTopic).pipe(take(1));
  }
  public getOnePhoto(idPhoto: string): Observable<Image> {
    return this.httpClient.get<Image>(this.urlPhoto + idPhoto + `?client_id=${environment.client_id}`).pipe(take(1));
  }
}
