import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db-service';
import { LocalStorage } from 'src/app/services/local-storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  userLogin: string = '';
  passLogin: string = '';

  userReg: string = '';
  passReg: string = '';
  emailReg: string = '';

  constructor(
    private router: Router,
    private db: DbService,
    private local: LocalStorage
  ) { }

  ngOnInit() {
    
  }

  async ingresar() {
    if(await this.db.userStored(this.userLogin,this.passLogin)){
      let id = await this.db.getUserId(this.userLogin,this.passLogin);
      await this.db.localUserData(id);
      this.router.navigate(['/home']);
    }else {
      alert("Usuario no Existe")
    }
  }

  async registrar() {
    await this.db.ingresarUsuario(this.userReg,this.passReg,this.emailReg);
    if(await this.db.userStored(this.userReg,this.passReg)) {
      let id = await this.db.getUserId(this.userReg,this.passReg);
      await this.db.localUserData(id);
      this.router.navigate(['/home'])
    }
  }

  volver() {
    this.router.navigate(['/home']);
  }

}
