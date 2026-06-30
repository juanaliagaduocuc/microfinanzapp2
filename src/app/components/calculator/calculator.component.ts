import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  standalone: false
})
export class CalculatorComponent  implements OnInit {

  primerValor: string = "";
  segundoValor: string = "";
  terciario: string = "";
  operando: string = "";
  

  constructor() {}

  ngOnInit() {}

  num(num: string) {
    this.primerValor += num;
  }

  operador(operador: string) {
    if(this.primerValor == "") {
      return;
    }
    if(this.segundoValor != "") {
      this.calcular();
    }
    this.operando = operador;
    this.segundoValor = this.primerValor;
    this.terciario = this.segundoValor + " " + this.operando;
    this.primerValor = "";
  }

  limpiar() {
    this.primerValor = "";
    this.operando = "";
    this.segundoValor = "";
  }

  calcular() {
    if(this.primerValor == "" || this.segundoValor == ""){
      return;
    }
    let result;
    let primerValor = parseFloat(this.primerValor);
    let segundoValor = parseFloat(this.segundoValor);
    switch(this.operando) {
      case '+':
        result = primerValor + segundoValor;
        break;
      case '-':
        result = segundoValor - primerValor;
        break;
      case '*':
        result = primerValor * segundoValor;
        break;
      case '/':
        if (segundoValor == 0) {
          return;
        }
        result = primerValor / segundoValor;
        break;
      default:
        return;
    }

    this.primerValor = result.toString();
    this.operando = "";
    this.segundoValor = ""; 
  }

}
