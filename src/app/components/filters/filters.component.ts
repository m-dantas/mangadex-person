import { Component, output, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TagService } from '../../services/tag/tag.service';
import { Tag } from '../../services/tag/types';

type Filters = { content: Array<Tag>, format: Array<Tag>, genre: Array<Tag>, theme: Array<Tag> }
type FiltersName = 'content' | 'format' | 'genre' | 'theme'

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatChipsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  constructor (private tagServices: TagService) {}
  
  showScrollBar: boolean = false
  filters: Filters = {
    content: [],
    format: [],
    genre: [],
    theme: []
  }
  filtered = output<string>()
  search = new FormControl('')
  optionsSelected = new FormControl('')

  ngOnInit () {
    this.tagServices.list().subscribe(res => {
      const insertSelected = res.data.map(item => {
        return {
          ...item,
          selected: false
        }
      })
      this.filters = Object.groupBy(insertSelected, ({ attributes: { group } }) => group) as Filters
    })
  }

  handleScrollBar () {
    const newShow = !this.showScrollBar

    if (newShow) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    this.showScrollBar = newShow;
  }

  handleOptionFilter (filterName: FiltersName, item: number) {
    this.filters[filterName][item].selected = !this.filters[filterName][item].selected
  }

  getIdsFilters (filterName: FiltersName): Array<string> {
    return this.filters[filterName].filter(item => item.selected).map(item => item.id)
  }

  handleGetByFilter () {
    let params = []
    const includedTags = [
      ...this.getIdsFilters('content'),
      ...this.getIdsFilters('format'), 
      ...this.getIdsFilters('genre'), 
      ...this.getIdsFilters('theme')
    ]

    if (this.search.value) {
      params.push(`title=${this.search.value}`)
    } 

    if (includedTags.length > 0) {
      // Colocado no `"&includedTags[]= +"` para concatenar com o primeiro elemento, pq o join na inclui na posição 0 
      params.push('includedTags[]=' + includedTags.join('&includedTags[]='))
    }    
    
    const paramsString = params.join('&')
    this.filtered.emit(paramsString)
    this.handleScrollBar()
  }
}
