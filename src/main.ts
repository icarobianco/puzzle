import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import gm from 'gm';
import { JigsawComponent } from './components/jigsaw/jigsaw.component';
// import sharp from 'sharp'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    JigsawComponent
  ],
  template: '<app-jigsaw>Jigsaw...</app-jigsaw>'
})
export class App {

  name = 'Puzzle';
}

bootstrapApplication(App);
