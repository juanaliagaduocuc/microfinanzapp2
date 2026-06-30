import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unitprice',
  templateUrl: './unitprice.component.html',
  styleUrls: ['./unitprice.component.scss'],
  standalone: false
})
export class UnitpriceComponent  implements OnInit {

  unidadA: string = "";
  precioA: string = "";
  valorA: string = "";
  unidadB: string = "";
  precioB: string = "";
  valorB: string = "";

  medida: string = "Unidad";
  explicacion: string = "";
  diferencia: string = "";

  constructor() { }

  ngOnInit() {}

  resultadoA() {
    let unidadA = parseFloat(this.unidadA) || 0;
    let precioA = parseFloat(this.precioA) || 0;
    let result = precioA / unidadA;
    result = parseFloat(result.toFixed(3));
    this.valorA = result.toString();
  }

  resultadoB() {
    let unidadB = parseFloat(this.unidadB) || 0;
    let precioB = parseFloat(this.precioB) || 0;
    let result = precioB / unidadB;
    result = parseFloat(result.toFixed(3));
    this.valorB = result.toString();
  }

  comparar() {
    let resultadoA = parseFloat(this.valorA) || 0;
    let resultadoB = parseFloat(this.valorB) || 0;
    let diferencia = resultadoA - resultadoB;
    diferencia = Math.abs(diferencia);
    if(diferencia == 0) {
      this.explicacion = "Opcion A y B tiene el mismo valor";
      this.diferencia = "";
    }else if(diferencia > 0) {
      this.explicacion = "Opcion A es mas conveniente";
      this.diferencia = diferencia.toString();
    }else {
      this.explicacion = "Opcion B es mas conveniente";
      this.diferencia = diferencia.toString();
    }
  }

}
