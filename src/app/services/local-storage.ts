import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {

  constructor() {
    this.setUsuarioInactivo();
  }

  async setIdUsuario(id: number) {
    await Preferences.set(
      {
        key: 'id',
        value: String(id)
      }
    )

  }

  async setNombreUsuario(nom: string) {
    await Preferences.set(
      {
        key: 'name',
        value: nom
      }
    )
  }

  async setBalanceUsuario(bal: number) {
    await Preferences.set(
      {
        key: 'balance',
        value: String(bal)
      }
    )
  }

  async setUsuarioActivo() {
    await Preferences.set(
      {
        key: 'active',
        value: '1'
      }
    )
  }
  
  async setUsuarioInactivo() {
    await Preferences.set(
      {
        key: 'active',
        value: '0'
      }
    )
  }

  async getNombreUsuario() {
    let nom = await Preferences.get({key: 'name'});
    return nom;
  }

  async getIdUsuario() {
    let id = await Preferences.get({key: 'id'});
    return id;
  }

  async getUsuarioBalance() {
    let bal = await Preferences.get({key: 'balance'});
    return bal;
  }

  async getUsuarioActivo() {
    let act = await Preferences.get({key: 'active'});
    return act;
  }

  async getMovLength() {
    
  }

  async iniciarSesion() {

  }

}
