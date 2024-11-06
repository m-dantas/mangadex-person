import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../commons'
import { Manga } from './types';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  
  constructor(private http: HttpClient) { }

  list (offset: number = 1, params: string = '') {
    const calcOffset = 32 * (offset - 1)
    let baseURL = `https://api.mangadex.org/manga?limit=32&offset=${calcOffset}`

    if (params) {
      baseURL = baseURL + `&${params}`
    }
    return this.http.get<Response<Manga>>(`${baseURL}&includes[]=cover_art&order[title]=asc`)
  }
}
