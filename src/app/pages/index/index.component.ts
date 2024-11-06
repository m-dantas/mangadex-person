import { Component } from '@angular/core';
import { MangaService } from '../../services/manga/manga.service';
import { Manga } from '../../services/manga/types';
import { CardComponent } from '../../components/card/card.component';
import { FiltersComponent } from '../../components/filters/filters.component';
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

  coverUrl (manga: Manga) {
    const filename = manga.relationships.find(item => item.type === 'cover_art')?.attributes?.fileName
    return `${manga.id}/${filename}.256.jpg`
  }

  handleGetMangaFiltered (params: string) {
    this.mangas = []
    this.mangaService.list(1, params).subscribe(res => this.mangas = res.data)
  }
}
