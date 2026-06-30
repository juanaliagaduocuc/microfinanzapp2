import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  calculatorOutline,
  swapVerticalOutline,
  personOutline,
} from 'ionicons/icons';
import { LocalStorage } from '../services/local-storage';
import { Api } from '../services/api';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  nombreUsuario: string = "";
  balance: string = "";
  isActive: number = 0;
  
  ufname: string = '';
  euroname: string = '';
  utmname: string = '';
  dolarname: string = '';
  uf: string = '';
  dolar: string = '';
  euro: string = '';
  utm: string = '';

  constructor(
    private router: Router,
    private local: LocalStorage,
    private api: Api
  ) {

    addIcons({
      calculatorOutline,
      swapVerticalOutline,
      personOutline
    })

  }

  async ngOnInit() {
    await this.getActive();
    await this.getNombre();
    await this.getBalance();

    await this.api.getDatos().subscribe(res => {
      this.ufname = res.uf.nombre;
      this.uf = res.uf.valor;
      this.dolarname = res.dolar.nombre;
      this.dolar = res.dolar.valor;
      this.utmname = res.utm.nombre;
      this.utm = res.utm.valor;
      this.euroname = res.euro.nombre;
      this.euro = res.euro.valor;

    })
  }

  async ionViewWillEnter() {
    await this.getActive();
    await this.getBalance();
    await this.getNombre();
  }

  async getNombre() {
    const local = await this.local.getNombreUsuario();
    const nom = local.value ?? '';
    this.nombreUsuario = nom;
  }

  async getBalance() {
    const local = await this.local.getUsuarioBalance();
    const bal = local.value ?? '0';
    this.balance = bal;
  }

  async getActive() {
    const local = await this.local.getUsuarioActivo();
    const act = local.value ?? '0';
    this.isActive = parseFloat(act);
  }

  calculadora() {
    this.router.navigate(['/calculator'])
  }

  goToLogin() {
    this.router.navigateByUrl('/login').catch(() => {
      this.router.navigate(['/login']);
    });
  }

  async cerrarSesion() {
    this.isActive = 0;
    await this.local.setUsuarioInactivo();
    this.router.navigate(['/home'])
  }

}
