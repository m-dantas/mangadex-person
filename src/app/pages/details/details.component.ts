import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Chapters, Manga } from '../../services/manga/types';
import { ImageLoadingComponent } from "../../components/image-loading/image-loading.component";
import { GET_COVER_URL } from '../../utils/get-cover-url'
import { PaginationComponent } from "../../components/pagination/pagination.component";

type PaginatedType = {
  items: Array<Array<Chapters>>,
  page: number,
  maxPage: number
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ImageLoadingComponent, MatIconModule, PaginationComponent],
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
    this.paginated = this.createPaginatedVolumes(true)
  }
  
  getAltTitlesToString () {
    return this.details.attributes.altTitles.map((item: any) => {
      return Object.values(item).toString()
    }).join(', ')
  }

  createPaginatedVolumes (reverse: boolean = false): PaginatedType {
    let index = 0
    let paginated: Array<Array<Chapters>> = []
    let cloneVolumes = this.volumes;
    
    if (reverse) { cloneVolumes = cloneVolumes.reverse() }

    cloneVolumes.forEach((volume) => {
      // Se o resultado for "undefined" quer dizer que a posição do index está vazia, ele atribuia um `new Array` para se tornar um item de array na Matriz
      if (paginated[index] === undefined) paginated[index] = [];
      paginated[index].push(volume)

      if (paginated[index].length >= 5) index++
    })
    
    return {
      items: paginated,
      page: 0,
      maxPage: paginated.length
    }
  }

  handleChangePageIndex (page: number) {
    this.paginated.page = page
  }

  getCoverUrl () {
    return GET_COVER_URL(this.details, false)
  }
}
