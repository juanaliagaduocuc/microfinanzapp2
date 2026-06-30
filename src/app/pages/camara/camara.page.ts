import { Component, OnInit } from '@angular/core';
import { Camera } from '@capacitor/camera';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
  standalone: false
})
export class CamaraPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async tomarFoto() {
    try {
      const result = await Camera.takePhoto({
        quality: 50,
        includeMetadata: true,
      });

      let elem : HTMLImageElement = document.getElementById("foto")! as HTMLImageElement;      
      elem.src = result.webPath!;
    } catch (e) {
      const error = e as any;
      const message = error.code ? `[${error.code}] ${error.message}` : error.message;
      console.error('takePhoto failed:', message);
    }
  }
}
