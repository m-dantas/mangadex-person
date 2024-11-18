import { Component } from '@angular/core';
import { MangaService } from '../../services/manga/manga.service';
import { Manga } from '../../services/manga/types';
import { CardComponent } from '../../components/card/card.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { GET_COVER_URL } from '../../utils/get-cover-url';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CardComponent, FiltersComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  mangas: Manga[] = [];

  constructor(private mangaService: MangaService){}

  ngOnInit () {
    this.mangaService.list(1).subscribe(res => this.mangas = res.data)
  }

  getCoverUrl (manga: Manga) {
    return GET_COVER_URL(manga, true)
  }

  handleGetMangaFiltered (params: string) {
    this.mangas = []
    this.mangaService.list(1, params).subscribe(res => this.mangas = res.data)
  }
}
