import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import mergeImages from 'merge-images';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './app.component.html'
})
export class App {

  name = 'Puzzle';
  data:any = {
    img: ''
  }

  onFileSelected(event: Event): void {
    console.error('CreateComponent -> onFileSelected');

    const input = event.target as HTMLInputElement
    if (input && input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader()
      reader.onload = () => {
        this.data.img = reader.result

        // mergeImages(['/assets/knife.png', '/eyes.png']).then((b64: any) => this.data.src = b64);
      };
      reader.readAsDataURL(file)
      // reader.readAsArrayBuffer(file);
    }
  }
}

bootstrapApplication(App);
