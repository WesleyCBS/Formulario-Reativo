import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Contato } from 'src/app/model/contato';
import { IonicModule, AlertController } from '@ionic/angular';
import { ContatoService } from 'src/app/service/contato.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class DetalharPage implements OnInit {
  contato!: Contato;
  editar: boolean = true;
  formCadastrar!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    private contatoService: ContatoService
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['objeto']) {
      this.contato = nav.extras.state['objeto'];
    }

    this.formCadastrar = this.fb.group({
      nome: [this.contato?.nome, [Validators.required, Validators.minLength(5)]],
      telefone: [this.contato?.telefone, [Validators.required, Validators.minLength(10)]],
      genero: [this.contato?.genero, [Validators.required]],
      email: [this.contato?.email, [Validators.required, Validators.email]]
    });

    if (this.editar) {
      this.formCadastrar.disable();
    }
  }

  alterarEdicao() {
    this.editar = !this.editar;
    if (this.editar) {
      this.formCadastrar.disable();
    } else {
      this.formCadastrar.enable();
    }
  }

  salvar() {
    if (this.formCadastrar.invalid) {
      this.presentAlert("Erro ao Cadastrar", "Campos obrigatórios ou inválidos");
      return;
    }

    const { nome, telefone, genero, email } = this.formCadastrar.value;

    if (this.contatoService.update(this.contato, nome, telefone, genero, email)) {
      this.presentAlert('Atualizar', 'Contato atualizado com sucesso');
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('Atualizar', 'Erro ao atualizar contato');
    }
  }

  excluir() {
    this.presentConfirmAlert("Excluir Contato", "Você realmente deseja excluir contato?", () => {
      if (this.contatoService.delete(this.contato)) {
        this.presentAlert("Excluir", "Exclusão efetuada com sucesso!");
        this.router.navigate(['/home']);
      } else {
        this.presentAlert("Erro ao Excluir", "Contato não encontrado.");
      }
    });
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentConfirmAlert(subHeader: string, message: string, acao: () => void) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Confirmar',
          handler: acao
        }
      ],
    });
    await alert.present();
  }
}

