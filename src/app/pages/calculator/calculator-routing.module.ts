import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatorPage } from './calculator.page';
import { UnitpriceComponent } from '../../components/unitprice/unitprice.component';
import { DiscountComponent } from '../../components/discount/discount.component';
import { CalculatorComponent } from '../../components/calculator/calculator.component';

const routes: Routes = [
  {
    path: '',
    component: CalculatorPage,
    children: [
      {
        path: 'unitPrice',
        component: UnitpriceComponent,
      },
      {
        path: 'discount',
        component: DiscountComponent,
      },
      {
        path: 'calculator',
        component: CalculatorComponent,
      },
      {
        path: '',
        redirectTo: 'unitPrice',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculatorPageRoutingModule {}
