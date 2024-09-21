import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [
    MatGridListModule, 
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.css'
})
export class TemplatesComponent {

  @Input() img: string = 'https://raw.githubusercontent.com/icarobianco/puzzle/c422575feb6e873b7d6e9e3e51c3e467f87fbe18/src/assets/turtle.jpg'

}