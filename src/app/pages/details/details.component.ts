import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Chapters, Manga } from '../../services/manga/types';
import { ImageLoadingComponent } from "../../components/image-loading/image-loading.component";
import { GET_COVER_URL } from '../../utils/get-cover-url'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

type PaginatedType = {
  items: Array<Array<Chapters>>,
  page: number,
  maxPage: number
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ImageLoadingComponent, MatIconModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  constructor() {}

  details = inject(ActivatedRoute).snapshot.data['details'].data as Manga
  volumes = inject(ActivatedRoute).snapshot.data['volumes'] as Chapters[]
  paginated: PaginatedType = {
    items: [],
    page: 0,
    maxPage: 0
  }
  

  ngOnInit () {
    this.paginated = this.createPaginatedVolumes()
  }
  
  getAltTitlesToString () {
    return this.details.attributes.altTitles.map((item: any) => {
      return Object.values(item).toString()
    }).join(', ')
  }

  createPaginatedVolumes (): PaginatedType {
    let index = 0
    let paginated: Array<Array<Chapters>> = [] 
    this.volumes.forEach((volume) => {
      // Se o resultado for "undefined" quer dizer que a posição do index está vazia, ele atribuia um `new Array` para se tornar um item de array na Matriz
      if (paginated[index] === undefined) paginated[index] = [];
      paginated[index].push(volume)

      if (paginated[index].length >= 5) index++
    })
    
    return {
      items: paginated,
      page: 0,
      maxPage: this.volumes.length
    }
  }

  handleChangePageIndex (e: PageEvent) {
    this.paginated.page = e.pageIndex
  }

  getCoverUrl () {
    return GET_COVER_URL(this.details, false)
  }
}
