import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
  standalone: false
})
export class DiscountComponent  implements OnInit {

  precio: string = "";
  porcentaje: string = "";
  precioFinal: string = "";
  ahorro: string = "";

  constructor() { }

  ngOnInit() {}

  descuento() {
    let precio = parseFloat(this.precio);
    let porcentaje = parseFloat(this.porcentaje);
    let result = (precio * (100 - porcentaje)) / 100;
    let dif = result - precio;
    result = parseFloat(result.toFixed(3));
    dif = parseFloat(dif.toFixed(3));
    this.precioFinal = result.toString();
    this.ahorro = dif.toString();
  }

}
