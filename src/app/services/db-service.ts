import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators'
import { LocalStorage } from './local-storage';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  
  private db: SQLiteObject | null = null;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  fechaDate: Date = new Date();
  fecha: string = (new Date().getDate()) + `-` + (new Date().getMonth() + 1) + `-` + (new Date().getFullYear());

  movimientos = new BehaviorSubject<any[]>([]);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private local: LocalStorage
  ) {
    this.crearBD();
  }
  
  DBState() {
    return this.dbReady.asObservable();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'juan.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.db = db;
        this.crearTablas();
      }).catch((e) => {
        this.dbReady.next(false);
        alert(JSON.stringify(e));
      })
    })
  }

  async crearTablas() {
    if(this.db != null) {
      try {
        await this.db.executeSql(
          `CREATE TABLE IF NOT EXISTS usuario(
            id_usuario INTEGER PRIMARY KEY,
            nombre_usuario TEXT NOT NULL,
            correo TEXT NOT NULL,
            password TEXT NOT NULL,
            balance INTEGER NOT NULL,
            nombre TEXT,
            apellido TEXT
          );`,
          []
        );
        await this.db.executeSql(
          `CREATE TABLE IF NOT EXISTS movimiento(
            id_mov INTEGER PRIMARY KEY,
            monto INTEGER NOT NULL,
            fecha TEXT NOT NULL,
            id_usuario INTEGER NOT NULL
          );`,
          []
        );
        await this.db.executeSql(
          `CREATE TABLE IF NOT EXISTS detalle_movimiento(
            id_det_mov INTEGER PRIMARY KEY,
            titulo TEXT,
            descripcion TEXT,
            monto INTEGER NOT NULL,
            fecha TEXT NOT NULL,
            id_mov INTEGER NOT NULL
          );`,
          []
        );
        await this.db.executeSql(`INSERT OR IGNORE INTO usuario VALUES(1,'user','user@usermail.com','pass',10000,'test','user')`,[]);
        await this.db.executeSql(`INSERT OR IGNORE INTO movimiento VALUES(1,10000,?,1)`,[this.fecha]);
        await this.db.executeSql(`INSERT OR IGNORE INTO detalle_movimiento VALUES(1,'Ingreso N°1','Primer Ingreso',10000,?,1)`,[this.fechaDate]);
        this.dbReady.next(true);
      }catch (error) {
        alert(JSON.stringify(error));
      }
    }
    else {
      this.dbReady.next(false);
    }
  }

  async userStored(user: string, pass: string) {
    if(this.db != null) {
      let res = await this.db.executeSql(
        `SELECT id_usuario FROM usuario WHERE nombre_usuario = ? AND password = ?;`,
        [user, pass]
      )
      if(res.rows.length > 0) {
        return true; 
      } 
    }
    return false;
  }

  async cargarTablaMov(id: number) {
    if(this.db != null) {
      return await this.db.executeSql(
        `SELECT * FROM movimiento WHERE id_usuario = ?;`,
        [id]
      ).then(res => {
        let mov = [];
        if(res.rows.length > 0) {
          for(let i = 0;i < res.rows.length;i++) {
            mov.push({
              id_mov: res.rows.item(i).id_mov,
              monto: res.rows.item(i).monto,
              fecha: res.rows.item(i).fecha,
              id_usuario: res.rows.item(i).id_usuario
            })
          }
        }
        this.movimientos.next(mov);
      }) 
    }
  }
  
  getTablaMov() {
    return this.dbReady.asObservable().pipe(
      filter((ready) => ready),
      switchMap(() => this.movimientos.asObservable())
    );
  }

  async getUserId(user: string, pass: string) {
    if(this.db != null) {
      let res = await this.db.executeSql(
        `SELECT id_usuario FROM usuario WHERE nombre_usuario = ? AND password = ?;`,
        [user, pass]
      )
      let id = res.rows.item(0).id_usuario;
      return id;
    }
    return false;
  }

  async getMovLength(id: number) {
    if(this.db != null) {
      const res = await this.db.executeSql(
        `SELECT * FROM movimiento WHERE id_usuario = ?;`,
        [id]
      );
      return res.rows.length;
    }
    return 0;
  }

  async localUserData(id: number) {
    if(this.db != null) {
      let res = await this.db.executeSql(
        `SELECT nombre_usuario, balance
        FROM usuario
        WHERE id_usuario = ?`,
        [id]
      )
      let nom = res.rows.item(0).nombre_usuario;
      let bal = res.rows.item(0).balance;
      await this.local.setNombreUsuario(nom);
      await this.local.setBalanceUsuario(bal);
      await this.local.setUsuarioActivo();
      await this.local.setIdUsuario(id);
      alert(await this.local.setUsuarioActivo());
    }
  }

  async ingresarMovimiento(
    idMov: number,
    monto: number,
    idUser: number,
    titulo: string | '',
    desc: string | ''
  ) {
    if(this.db != null) {
      try {
        await this.db.executeSql(
          `INSERT INTO movimiento VALUES(?,?,?,?)`,
          [idMov, monto, this.fecha, idUser]
        );
        await this.db.executeSql(
          'INSERT INTO detalle_movimiento VALUES(?,?,?,?,?,?)',
          [idMov, titulo, desc, monto, this.fechaDate, idMov]
        );
        await this.cargarTablaMov(idUser);
      } catch (error) {
        alert(JSON.stringify(error));
      }
    }
  }

  async ingresarUsuario(
    nom: string,
    pass: string,
    correo: string
  ) {
    if(this.db != null) {
      try {
        await this.db.executeSql(
          `INSERT INTO usuario VALUES(NULL,?,?,?,0,NULL,NULL)`,
          [nom,pass,correo]
        )
        alert('Ingreso Exitoso')
      }catch(e){
        alert(JSON.stringify(e));
      }
    }
  }
  

}
