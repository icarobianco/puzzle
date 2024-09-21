import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  @Output() img = new EventEmitter<string>();

  onFileSelected(event: Event): void {
    console.error('UploadComponent','onFileSelected');

    const input = event.target as HTMLInputElement
    if (input && input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader()
      reader.onload = async (e: any) => {

        this.img.emit(reader.result as string)

        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            console.log('Largura: ', img.width);
            console.log('Altura: ', img.height);
            console.log('Tipo do arquivo: ', file.type);
            console.log('Tamanho do arquivo: ', (file.size / 1024).toFixed(2) + ' KB');
        };
      };

      reader.readAsDataURL(file)
    };
  }
}
