import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tag } from './types';
import { Response } from '../commons';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  list () {
    return this.http.get<Response<Tag>>('https://api.mangadex.org/manga/tag')
  }
}
