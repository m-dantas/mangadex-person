import { Component } from '@angular/core';
import { MangaService } from '../../services/manga/manga.service';
import { Manga } from '../../services/manga/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  mangas: Manga[] = [];
  
  constructor(private mangaService: MangaService){}

  ngOnInit () {
    this.mangaService.list(1).subscribe(res => this.mangas = res.data)
  }
}
