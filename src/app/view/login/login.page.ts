import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  formLogar: FormGroup;

  constructor(
    public alertController: AlertController,
    private _router: Router,
    public formbuilder: FormBuilder,
    private auth: AuthService 
  ) {
    this.formLogar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    });
  }

  ngOnInit() {
    this.formLogar = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get emailControl(): AbstractControl {
    return this.formLogar.get('email')!;
  }

  get senhaControl(): AbstractControl {
    return this.formLogar.get('senha')!;
  }

  submitForm() {
    if (!this.formLogar.valid) {
      this.presentAlert("Agenda", "Logar", "Todos os Campos são Obrigatórios!");
      return false;
    } else {
      this.logar();
      return true;
    }
  }

  private logar(): void {
    this.auth.signIn(
      this.formLogar.value['email'],
      this.formLogar.value['senha']
    )
    .then((res) => {
      this.presentAlert("Agenda", "Logar", "Seja Bem vindo!");
      this._router.navigate(["/home"]);
    })
    .catch((error) => {
      this.presentAlert("Agenda", "Logar", "Erro ao logar, Tente Novamente!");
      console.log(error.message);
    });
  }

  public irParaSignUp(): void {
    this._router.navigate(["/registrar"]);
  }

  async presentAlert(titulo: string, subtitulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
}

