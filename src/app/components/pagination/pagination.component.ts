import { Component, Input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() maxPage: number = 0;

  currentPage: number = 0
  handleCurrentPage = output<number>()


  disabledPreviousPage () {
    return this.currentPage === 0
  }

  disabledNextPage () {
    return this.currentPage === (this.maxPage - 1)
  }

  handlePreviousPage () {
    this.currentPage = --this.currentPage
    this.handleCurrentPage.emit(this.currentPage)
  }

  handleNextPage () {
    this.currentPage = ++this.currentPage
    this.handleCurrentPage.emit(this.currentPage)
  }
}
