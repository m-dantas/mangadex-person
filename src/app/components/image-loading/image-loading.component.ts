import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-image-loading',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './image-loading.component.html',
  styleUrl: './image-loading.component.scss'
})
export class ImageLoadingComponent {
  @Input() cover_url = ''
  @Input() altCard = ''
  @Input() widthCard = 0
  @Input() heightCard = 0

  imageLoaded: boolean = false

  onImageLoad() {
    this.imageLoaded = true;
  }
}
