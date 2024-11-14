import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from '../../services/manga/manga.service';
import { Manga } from '../../services/manga/types';
import { ResponseObject } from '../../services/commons';
import { ImageLoadingComponent } from "../../components/image-loading/image-loading.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ImageLoadingComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  constructor(private route: ActivatedRoute, private mangaService: MangaService) {}

  details = inject(ActivatedRoute).snapshot.data['details'] as ResponseObject<Manga>

  getAltTitlesToString () {
    return this.details.data.attributes.altTitles.map((item: any) => {
      return Object.values(item).toString()
    }).join(', ')
  }

  getCoverUrl () {
    const filename = this.details.data.relationships.find(item => item.type === 'cover_art')?.attributes?.fileName
    return `${this.details.data.id}/${filename}`
  }
}
