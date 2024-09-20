import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from './main.config';

import { TemplatesComponent } from './components/templates/templates.component';
import { JigsawComponent } from './components/jigsaw/jigsaw.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TemplatesComponent,
    JigsawComponent,
  ],
  providers: [],
  template: `
    <app-templates>Templates...</app-templates>
    <app-jigsaw>Jigsaw...</app-jigsaw>
  `
})
export class App {
  
  name = 'Puzzle';

  constructor(){}
}

// 

bootstrapApplication(App, appConfig);
