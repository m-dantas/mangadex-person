import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title = ''
  @Input() manga_id = ''
  @Input() cover_url = ''

  imageLoaded: boolean = false

  onImageLoad() {
    this.imageLoaded = true;
  }
}
