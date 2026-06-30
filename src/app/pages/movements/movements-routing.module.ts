import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovementsPage } from './movements.page';
import { IngresarComponent } from 'src/app/components/ingresar/ingresar.component';
import { MovimientosComponent } from 'src/app/components/movimientos/movimientos.component';

const routes: Routes = [
  {
    path: '',
    component: MovementsPage,
    children: [
      {
        path: 'ingresar',
        component: IngresarComponent,
      },
      {
        path: 'movimientos',
        component: MovimientosComponent,
      },
      {
        path: '',
        redirectTo: 'ingresar',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovementsPageRoutingModule {}
