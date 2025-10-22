import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class RegistrarPage implements OnInit {
  formCadastrar!: FormGroup;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.formCadastrar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get emailControl() {
    return this.formCadastrar.get('email')!;
  }

  get senhaControl() {
    return this.formCadastrar.get('senha')!;
  }

  get confSenhaControl() {
    return this.formCadastrar.get('confSenha')!;
  }

  submitForm(): boolean {
    if (!this.formCadastrar.valid) {
      this.presentAlert('Agenda', 'Cadastrar', 'Todos os campos são obrigatórios!');
      return false;
    }

    if (this.formCadastrar.value['senha'] !== this.formCadastrar.value['confSenha']) {
      this.presentAlert('Agenda', 'Cadastrar', 'As senhas não coincidem!');
      return false;
    }

    this.cadastrar();
    return true;
  }

  private cadastrar(): void {
    const email = this.formCadastrar.value['email'];
    const senha = this.formCadastrar.value['senha'];

    this.auth
      .signUpWithEmailPassword(email, senha)
      .then((res: any) => {
        this.presentAlert('Agenda', 'Cadastrar', 'Seja bem-vindo!');
        this.router.navigate(['/login']);
      })
      .catch((error: any) => {
        console.error(error);
        this.presentAlert('Agenda', 'Cadastrar', 'Erro ao cadastrar!');
      });
  }

  async presentAlert(titulo: string, subtitulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensagem,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

