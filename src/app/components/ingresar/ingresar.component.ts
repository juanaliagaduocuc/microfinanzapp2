import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db-service';
import { LocalStorage } from 'src/app/services/local-storage';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.scss'],
  standalone: false,
})
export class IngresarComponent  implements OnInit {

  idMov: string = "";
  idUser: string = "";
  tableLength: number = 0;
  titulo: string = "";
  monto: string = "";
  montoNum: number = 0;
  descripcion: string = "";
  fechaDisplay: string = "";
  fecha: Date = new Date();

  constructor(
    private db: DbService,
    private local: LocalStorage
  ) { }

  async ngOnInit() {
    this.fechaD();
    await this.getIdUser();
    await this.refreshNextId();
    this.autoTitulo();
  }

  async getIdUser() {
    const local = await this.local.getIdUsuario();
    this.idUser = local?.value ?? '1';
  }

  async refreshNextId() {
    if (!this.idUser) {
      return;
    }

    this.tableLength = await this.db.getMovLength(parseInt(this.idUser, 10));
    this.idMov = String(this.tableLength + 1);
  }

  async fechaD() {
    let dia = this.fecha.getDate();
    let mes = this.fecha.getMonth() + 1;
    let anno = this.fecha.getFullYear();
    this.fechaDisplay = 
      dia.toString() + `-`
      + mes.toString() + `-`
      + anno.toString()
  }
 
  async autoTitulo() {
    this.titulo = "Ingreso N°" + this.idMov;
  }

  async ingresar() {
    await this.db.ingresarMovimiento(
      parseFloat(this.idMov),
      this.montoNum,
      parseInt(this.idUser, 10),
      this.titulo,
      this.descripcion
    );

    await this.refreshNextId();
    this.autoTitulo();
    this.limpiar();
  }

  montoNumber() {
    this.montoNum = parseFloat(this.monto);
  }

  limpiar() {
    this.monto = "";
    this.descripcion = "";
  }


}
