import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountComponent } from './discount/discount.component';
import { UnitpriceComponent } from './unitprice/unitprice.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IngresarComponent } from './ingresar/ingresar.component';
import { MovimientosComponent } from './movimientos/movimientos.component';



@NgModule({
  declarations: [
    DiscountComponent,
    UnitpriceComponent,
    CalculatorComponent,
    IngresarComponent,
    MovimientosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    DiscountComponent,
    UnitpriceComponent,
    CalculatorComponent,
    IngresarComponent,
    MovimientosComponent
  ]
})
export class ComponentsModule { }
