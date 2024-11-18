import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MangaService } from '../../services/manga/manga.service';
import { Manga } from '../../services/manga/types';
import { ImageLoadingComponent } from "../../components/image-loading/image-loading.component";
import { GET_COVER_URL } from '../../utils/get-cover-url'

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ImageLoadingComponent, MatIconModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  constructor(private route: ActivatedRoute, private mangaService: MangaService) {}

  details = inject(ActivatedRoute).snapshot.data['details'].data as Manga
  volumes = inject(ActivatedRoute).snapshot.data['volumes'].data

  getAltTitlesToString () {
    return this.details.attributes.altTitles.map((item: any) => {
      return Object.values(item).toString()
    }).join(', ')
  }

  getCoverUrl () {
    return GET_COVER_URL(this.details, false)
  }
}
