import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import gm from 'gm';
import sharp from 'sharp'

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

        sharp('./assets/turtle.jpg')
        .composite([{ input: './assets/knife.png', gravity: 'center' }])
        .toBuffer()
        .then((outputBuffer) => {
          this.data.img = outputBuffer;
        });

        // gm('https://raw.githubusercontent.com/icarobianco/puzzle/188afc89a4bfc2b32d3dec6130d89fa12f3660f5/src/assets/turtle.jpg')
        // .composite('https://raw.githubusercontent.com/icarobianco/puzzle/188afc89a4bfc2b32d3dec6130d89fa12f3660f5/src/assets/knife.png')
        // .watermark(50, 50)
        // .write(this.data.img, function (err) {
        //   if (!err) console.log('All done');
        // });

        // gm('./assets/turtle.jpg')
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
