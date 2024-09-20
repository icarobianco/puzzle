import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-jigsaw',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './jigsaw.component.html',
  styleUrl: './jigsaw.component.css'
})
export class JigsawComponent implements OnInit {

  @ViewChild('puzzlecontainer', { static: true }) 
  puzzlecontainer!: ElementRef<SVGSVGElement>;
  
  @ViewChild('puzzlepath', { static: true }) 
  puzzlepath!: ElementRef<SVGPathElement>

  public img:string | ArrayBuffer | null  = '';
  public seed:number = 1;
  public tabSize:number = 20;
  public jitter:number = 5;
  public data:string = '';
  public knife:string = '';

  private a:number = 0;
  private b:number = 0;
  private c:number = 0;
  private d:number = 0;
  private e:number = 0;
  private t:number = 0;
  private j:number = 0;
  private flip:boolean = false; 
  private xi:number = 0;
  private yi:number = 0;
  public xn:number = 15; 
  public yn:number = 10;
  private vertical:number = 0; 
  private offset:number = 0;
  public width:number = 500
  public height:number = 350

  constructor(){}

  ngOnInit(): void {
    this.seed = Math.floor(Math.random() * 10000); 
    this.update();
  }

  public update():void {
    console.log('update');
    
    this.offset = 5.5;
    this.puzzlecontainer.nativeElement.setAttribute('width', (this.width + 11).toFixed(0));
    this.puzzlecontainer.nativeElement.setAttribute('height', (this.height + 11).toFixed(0));
    this.puzzlepath.nativeElement.setAttribute('d', this.gen_d());
  }

  private random() {
    var x = Math.sin(this.seed) * 10000;
    this.seed += 1;
    return x - Math.floor(x);
  }

  private uniform(min: number, max: number) {
    var r = this.random();
    return min + r * (max - min);
  }

  private rbool(): boolean {
    return this.random() > 0.5;
  }

  private first() {
    const e = this.uniform(-this.j, this.j);
    this.next();
  }

  private next() {
    var flipold = this.flip;
    this.flip = this.rbool();
    this.a = (this.flip == flipold ? -this.e : this.e);
    this.b = this.uniform(-this.j, this.j);
    this.c = this.uniform(-this.j, this.j);
    this.d = this.uniform(-this.j, this.j);
    this.e = this.uniform(-this.j, this.j);
  }

  private sl() { return this.vertical ? this.height / this.yn : this.width / this.xn; }
  private sw() { return this.vertical ? this.width / this.xn : this.height / this.yn; }
  private ol() { return this.offset + this.sl() * (this.vertical ? this.yi : this.xi); }
  private ow() { return this.offset + this.sw() * (this.vertical ? this.xi : this.yi); }
  private l(v:any) { var ret = this.ol() + this.sl() * v; return Math.round(ret * 100) / 100; }
  private w(v:any) { var ret = this.ow() + this.sw() * v * (this.flip ? -1.0 : 1.0); return Math.round(ret * 100) / 100; }
  private p0l() { return this.l(0.0); }
  private p0w() { return this.w(0.0); }
  private p1l() { return this.l(0.2); }
  private p1w() { return this.w(this.a); }
  private p2l() { return this.l(0.5 + this.b + this.d); }
  private p2w() { return this.w(-this.t + this.c); }
  private p3l() { return this.l(0.5 - this.t + this.b); }
  private p3w() { return this.w(this.t + this.c); }
  private p4l() { return this.l(0.5 - 2.0 * this.t + this.b - this.d); }
  private p4w() { return this.w(3.0 * this.t + this.c); }
  private p5l() { return this.l(0.5 + 2.0 * this.t + this.b - this.d); }
  private p5w() { return this.w(3.0 * this.t + this.c); }
  private p6l() { return this.l(0.5 + this.t + this.b); }
  private p6w() { return this.w(this.t + this.c); }
  private p7l() { return this.l(0.5 + this.b + this.d); }
  private p7w() { return this.w(-this.t + this.c); }
  private p8l() { return this.l(0.8); }
  private p8w() { return this.w(this.e); }
  private p9l() { return this.l(1.0); }
  private p9w() { return this.w(0.0); }

  private gen_d() {

    var str = "";
    this.t = this.tabSize / 200.0;
    this.j = this.jitter / 100.0;

    this.vertical = 0;
    for (this.yi = 1; this.yi < this.yn; ++this.yi) {
        this.xi = 0;
        this.first();
        str += "M" + this.p0l() + "," + this.p0w() + " ";
        for (; this.xi < this.xn; ++this.xi) {
            str += "C" + this.p1l() + "," + this.p1w() + " " + this.p2l() + "," + this.p2w() + " " + this.p3l() + "," + this.p3w() + " ";
            str += "C" + this.p4l() + "," + this.p4w() + " " + this.p5l() + "," + this.p5w() + " " + this.p6l() + "," + this.p6w() + " ";
            str += "C" + this.p7l() + "," + this.p7w() + " " + this.p8l() + "," + this.p8w() + " " + this.p9l() + "," + this.p9w() + " ";
            this.next();
        }
    }

    this.vertical = 1;
    for (this.xi = 1; this.xi < this.xn; ++this.xi) {
        this.yi = 0;
        this.first();
        str += "M" + this.p0w() + "," + this.p0l() + " ";
        for (; this.yi < this.yn; ++this.yi) {
            str += "C" + this.p1w() + "," + this.p1l() + " " + this.p2w() + "," + this.p2l() + " " + this.p3w() + "," + this.p3l() + " ";
            str += "C" + this.p4w() + "," + this.p4l() + " " + this.p5w() + "," + this.p5l() + " " + this.p6w() + "," + this.p6l() + " ";
            str += "C" + this.p7w() + "," + this.p7l() + " " + this.p8w() + "," + this.p8l() + " " + this.p9w() + "," + this.p9l() + " ";
            this.next();
        }
    }

    str += "M" + this.offset + "," + this.offset + " "
    str += "L" + (this.offset + this.width) + "," + this.offset + " "
    str += "L" + (this.offset + this.width) + "," + (this.offset + this.height) + " "
    str += "L" + this.offset + "," + (this.offset + this.height) + " "
    str += "L" + this.offset + "," + this.offset + " ";

    return str;
  }

  public generate() {
    this.offset = 0.0;

    this.data = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.0\" ";
    this.data += "width=\"" + this.width + "mm\" height=\"" + this.height + "mm\" viewBox=\"0 0 " + this.width + " " + this.height + "\" ";
    this.data += "style=\"background-image: url('"+this.img+"'); background-size: " + this.width + "mm " + this.height + "mm; background-repeat: no-repeat;\"";
    this.data += ">";
    this.data += "<path fill=\"none\" stroke=\"black\" stroke-width=\"0.1\" d=\"";
    this.data += this.gen_d();
    this.data += "\"></path></svg>";

    this.knife = this.data.replace(/style="[^"]*"/, '');

    this.save();
  }

  private save(): void {
    
    const zip = new JSZip();
    zip.file('image.jpg', (this.img as string).split(',')[1], { base64: true });
    zip.file('modelo.svg', this.data);
    zip.file('faca.svg', this.knife);
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      saveAs(blob, 'image.zip');
    });
  
  }

  onFileSelected(event: Event): void {
    console.error('CreateComponent -> onFileSelected');

    const input = event.target as HTMLInputElement
    if (input && input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader()
      reader.onload = async () => {
        this.img = reader.result
        this.puzzlecontainer.nativeElement.style.backgroundImage = `url(${reader.result})`;
      };
      reader.readAsDataURL(file)
      // reader.readAsArrayBuffer(file);
    };
  }
}
