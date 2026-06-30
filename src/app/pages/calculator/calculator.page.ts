import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  calculatorOutline,
  homeOutline,
  backspaceOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
  standalone: false
})
export class CalculatorPage implements OnInit {

  constructor(
    private router: Router
  ) {

    addIcons({
      calculatorOutline,
      homeOutline,
      backspaceOutline
    })

  }

  ngOnInit() {
  }

  volver(){
    this.router.navigate(['/home'])
  }

}
