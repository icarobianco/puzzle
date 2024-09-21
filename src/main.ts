import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './main.config';

import { TemplatesComponent } from './components/templates/templates.component';
import { JigsawComponent } from './components/jigsaw/jigsaw.component';
import { UploadComponent } from './components/upload/upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TemplatesComponent,
    JigsawComponent,
    UploadComponent
  ],
  providers: [],
  template: `
    <div>
      <app-upload (img)="changeImage($event)">Upload...</app-upload>
      <app-templates [img]="img">Templates...</app-templates>
      <app-jigsaw [img]="img">Jigsaw...</app-jigsaw>
    </div>
  `
})
export class App {
  
  name = 'Puzzle';

  public img: string = '';

  constructor(){}

  changeImage(s: string) {
    console.error('App', 'changeImage');

    this.img = s;
  }
}

// 

bootstrapApplication(App, appConfig);
