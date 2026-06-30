import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, Router } from '@angular/router';
import { LocalStorage } from './local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate{
    
  constructor(
    private local: LocalStorage,
    private router: Router
  ) { }

  async canActivate(): Promise<GuardResult> {
    if(await this.local.getUsuarioActivo())
      return true;
      return this.router.parseUrl('/');
  }

}
