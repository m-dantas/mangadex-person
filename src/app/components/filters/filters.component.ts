import { Component } from '@angular/core';
import { TagService } from '../../services/tag/tag.service';
import { Tag } from '../../services/tag/types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

type Filters = { content: Array<Tag>, format: Array<Tag>, genre: Array<Tag>, theme: Array<Tag> }

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatChipsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  constructor (private tagServices: TagService) {}
  
  show: boolean = false
  filters: Filters = {
    content: [],
    format: [],
    genre: [],
    theme: []
  }

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

  handleShow () {
    const newShow = !this.show

    if (newShow) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    this.show = !this.show
  }
}
