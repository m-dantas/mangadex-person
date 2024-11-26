import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.scss'
})
export class TesteComponent {
  base64Image: string | null = null;

  constructor(private http: HttpClient) {}

  fetchImageAsBase64(imageUrl: string): void {
    this.http
      .get(imageUrl, { responseType: 'blob' }) // Obtém a imagem como Blob
      .subscribe({
        next: (blob) => this.convertBlobToBase64(blob),
        error: (err) => console.error('Erro ao buscar a imagem:', err),
      });
  }

  private convertBlobToBase64(blob: Blob): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.base64Image = reader.result as string;
    };
    reader.onerror = (error) => {
      console.error('Erro ao converter Blob para Base64:', error);
    };
    reader.readAsDataURL(blob); // Converte o Blob em Base64
  }
}
