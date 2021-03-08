import { Injectable } from '@angular/core';
import {Observable, from} from 'rxjs';
import {Hint} from '../model/hint';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private urlComplete = 'https://api.datamuse.com/words?sp=';
  constructor() { }
  public getHint(word: string, size: number): Observable<Hint[]> {
    return from(fetch(this.urlComplete + word + '*&max=' + size, {cache: 'no-cache'}).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    })
      .then(jsonResponse => {
        return jsonResponse;
      }));
  }
}
