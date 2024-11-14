import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ImageLoadingComponent } from "../image-loading/image-loading.component";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ImageLoadingComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() title = ''
  @Input() manga_id = ''
  @Input() cover_url = ''
}
