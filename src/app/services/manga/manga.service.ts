import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseArray, ResponseObject } from '../commons'
import { Manga, VolumeObj } from './types';


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
    return this.http.get<ResponseArray<Manga>>(`${baseURL}&includes[]=cover_art&order[title]=asc`)
  }

  details (id: string) {
    return this.http.get<ResponseObject<Manga>>(`https://api.mangadex.org/manga/${id}?includes[]=cover_art`)
  }

  volumes (id: string) {
    return this.http.get<{ result: string, volumes: VolumeObj}>(`https://api.mangadex.org/manga/${id}/aggregate`)
  }
}
