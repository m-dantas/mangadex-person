import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MangaList } from './types'
@Injectable({
  providedIn: 'root'
})
export class MangaService {

  
  constructor(private http: HttpClient) { }

  list (offset: number = 1) {
    return this.http.get<MangaList>(`https://api.mangadex.org/manga?limit=32&offset=${32 * (offset - 1)}&includes[]=cover_art&order[title]=asc`)
  }
}
