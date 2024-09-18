import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import gm from 'gm';

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
      reader.onload = async () => {
        this.data.img = reader.result

        // gm('./assets/turtle.jpg')
        // .composite('../assets/knife.png')
        // .watermark(50, 50)
        // .write(this.data.img, function (err) {
        //   if (!err) console.log('All done');
        // });

        // gm('./assets/turtle.png')
        // .composite('./assets/knife.png')
        // .watermark(50, 50)
        // .write('./assets/test.jpg', function (err) {
        //   if (!err) console.log('All done');
        // });

      };
      reader.readAsDataURL(file)
      // reader.readAsArrayBuffer(file);
    }
  }
}

bootstrapApplication(App);
