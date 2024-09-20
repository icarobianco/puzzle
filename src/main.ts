import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './main.config';

import { JigsawComponent } from './components/jigsaw/jigsaw.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    JigsawComponent
  ],
  providers: [],
  template: '<app-jigsaw>Jigsaw...</app-jigsaw>'
})
export class App {
  
  name = 'Puzzle';

  constructor(){}
}

// 

bootstrapApplication(App, appConfig);
