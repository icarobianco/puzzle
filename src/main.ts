import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { initializeApp } from "firebase/app";
import { AngularFireModule } from '@angular/fire/compat'
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from './environment/environment';

import gm from 'gm';
import { JigsawComponent } from './components/jigsaw/jigsaw.component';
// import sharp from 'sharp'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AngularFireModule,
    // AngularFireDatabaseModule,

    CommonModule,
    JigsawComponent,
  ],
  providers: [],
  template: '<app-jigsaw>Jigsaw...</app-jigsaw>'
})
export class App {
  
  name = 'Puzzle';

  constructor(){
    initializeApp(environment.firebaseConfig);
  }
}

// 

bootstrapApplication(App);
