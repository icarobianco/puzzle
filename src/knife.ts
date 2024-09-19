export default class jigsaw {

    constructor(
        private seed:number = 1, 
        
    ){

    }

   save(filename: string, data: any): void {
       // var blob = new Blob([data], {type: "text/csv"});
       // if (window.navigator.msSaveOrOpenBlob)
       // {
       //    window.navigator.msSaveBlob(blob, filename);
       // }
       // else
       // {
       //    var elem = window.document.createElement('a');
       //    elem.href = window.URL.createObjectURL(blob);
       //    elem.download = filename;        
       //    document.body.appendChild(elem);
       //    elem.click();        
       //    document.body.removeChild(elem);
       // }
   }

   private seed: number = 1;

   private it(id:string): any {
       return document.getElementById(id);
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

   private rbool() {
       return this.random() > 0.5;
   }

   private updateseed() {
      //  it("_this.seed").value = it("this.seed").value;
       this.update();
   }

   private updatetabsize() {
      //  it("_tabsize").value = it("tabsize").value + "%";
       this.update();
   }

   private updatejitter() {
       this.it("_jitter").value = this.it("jitter").value + "%";
       this.update();
   }

   private update_seed() {
       var val = parseFloat(this.it("_this.seed").value);
       if (!isNaN(val)) {
           this.it("seed").value = val;
       }
       this.updateseed();
   }

   private update_tabsize() {
       var val = parseFloat(this.it("_tabsize").value);
       if (!isNaN(val)) {
        this.it("tabsize").value = val;
       }
       this.updatetabsize();
   }

   private update_jitter() {
       var val = parseFloat(this.it("_jitter").value);
       if (!isNaN(val)) {
        this.it("jitter").value = val;
       }
       this.updatejitter();
   }

   private a:any 
   private b:any 
   private c:any 
   private d:any 
   private e:any 
   private t:any 
   private j:any 
   private flip:any 
   private xi:any 
   private yi:any 
   private xn:any 
   private yn:any 
   private vertical:any 
   private offset:any 
   private width:any 
   private height:any

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

   private sl() {
       return this.vertical ? this.height / this.yn : this.width / this.xn;
   }

   private sw() {
       return this.vertical ? this.width / this.xn : this.height / this.yn;
   }

   private ol() {
       return this.offset + this.sl() * (this.vertical ? this.yi : this.xi);
   }

   private ow() {
       return this.offset + this.sw() * (this.vertical ? this.xi : this.yi);
   }

   private l(v:any) {
       var ret = this.ol() + this.sl() * v;
       return Math.round(ret * 100) / 100;
   }

   private w(v:any) {
       var ret = this.ow() + this.sw() * v * (this.flip ? -1.0 : 1.0);
       return Math.round(ret * 100) / 100;
   }

   private p0l() {
       return this.l(0.0);
   }

   private p0w() {
       return this.w(0.0);
   }

   private p1l() {
       return this.l(0.2);
   }

   private p1w() {
       return this.w(this.a);
   }

   private p2l() {
       return this.l(0.5 + this.b + this.d);
   }

   private p2w() {
       return this.w(-this.t + this.c);
   }

   private p3l() {
       return this.l(0.5 - this.t + this.b);
   }

   private p3w() {
       return this.w(this.t + this.c);
   }

   private p4l() {
       return this.l(0.5 - 2.0 * this.t + this.b - this.d);
   }

   private p4w() {
       return this.w(3.0 * this.t + this.c);
   }

   private p5l() {
       return this.l(0.5 + 2.0 * this.t + this.b - this.d);
   }

   private p5w() {
       return this.w(3.0 * this.t + this.c);
   }

   private p6l() {
       return this.l(0.5 + this.t + this.b);
   }

   private p6w() {
       return this.w(this.t + this.c);
   }

   private p7l() {
       return this.l(0.5 + this.b + this.d);
   }

   private p7w() {
       return this.w(-this.t + this.c);
   }

   private p8l() {
       return this.l(0.8);
   }

   private p8w() {
       return this.w(this.e);
   }

   private p9l() {
       return this.l(1.0);
   }

   private p9w() {
       return this.w(0.0);
   }

   private gen_d() {
       var str = "";

       this.seed = parseInt(this.it("this.seed").value);
       this.t = parseFloat(this.it("tabsize").value) / 200.0;
       this.j = parseFloat(this.it("jitter").value) / 100.0;
       this.xn = parseInt(this.it("xn").value);
       this.yn = parseInt(this.it("yn").value);

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

   private update() {
      this.width = parseInt(this.it("width").value);
      this.height = parseInt(this.it("height").value);
       var ratio = 1.0 * this.width / this.height;
       if (ratio > 1.5) {
           this.width = 900;
           this.height = this.width / ratio;
       } else {
           this.height = 600;
           this.width = this.height * ratio;
       }
       this.it("puzzlecontainer").setAttribute("width", this.width + 11);
       this.it("puzzlecontainer").setAttribute("height", this.height + 11);
       this.offset = 5.5;
       this.it("puzzlepath").setAttribute("d", this.gen_d());
   }

   private generate() {
       this.width = parseInt(this.it("width").value);
       this.height = parseInt(this.it("height").value);
       this.offset = 0.0;

       var data = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.0\" ";
       data += "width=\"" + this.width + "mm\" height=\"" + this.height + "mm\" viewBox=\"0 0 " + this.width + " " + this.height + "\">";
       data += "<path fill=\"none\" stroke=\"black\" stroke-width=\"0.1\" d=\"";
       data += this.gen_d();
       data += "\"></path></svg>";

       this.save("jigsaw.svg", data);
   }
}