import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db-service';
import { LocalStorage } from 'src/app/services/local-storage';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss'],
  standalone: false
})
export class MovimientosComponent  implements OnInit {

  idUser: string = '';
  movimientos: any[] = [];

  constructor(
    private db: DbService,
    private local: LocalStorage
  ) { }

  async ngOnInit() {
    await this.getIdUser();

    this.db.getTablaMov().subscribe((res: any[]) => {
      this.movimientos = res;
    });

    if (this.idUser) {
      await this.db.cargarTablaMov(parseInt(this.idUser, 10));
    }
  }

  async getIdUser() {
    const local = await this.local.getIdUsuario();
    this.idUser = local?.value ?? '0';
  }

  async loadMov() {
    if(!this.idUser) {
      return;
    }
    await this.db.cargarTablaMov(parseFloat(this.idUser));
  }

}
