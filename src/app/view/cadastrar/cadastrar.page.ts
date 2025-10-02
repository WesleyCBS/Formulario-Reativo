import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContatoService } from 'src/app/service/contato.service';
import { Contato } from 'src/app/model/contato';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CadastrarPage implements OnInit {
  formCadastrar!: FormGroup;
  isSubmitted = false;
  maxDate: string;


  constructor(private alertController: AlertController,
    private router: Router,
    private contatoService: ContatoService,
    private formBuilder: FormBuilder) {
      this.formCadastrar = this.formBuilder.group({
        nome: ['', [Validators.required, Validators.minLength(8)]],
        telefone: ['', [Validators.required, Validators.minLength(10)]],
        genero: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
      });
      let hoje = new Date();
      this.maxDate = hoje.toISOString().split('T')[0];
    }

  ngOnInit() {
  }

  get errorControl(){
    return this.formCadastrar.controls;
  }

  submitForm() : boolean{
    this.isSubmitted = true;
    if(!this.formCadastrar.valid){
      this.presentAlert("Erro ao Cadastrar", "Campos Obrigatórios")
      return false;
    }else{
      this._cadastrar();
      return true;
    }
  }

  _cadastrar(){
    let contato: Contato = new Contato(this.formCadastrar.value['nome'],
      this.formCadastrar.value['telefone']);
      contato.email = this.formCadastrar.value['email'];
      contato.genero = this.formCadastrar.value['genero'];
     this.contatoService.create(contato)
     this.presentAlert("Sucesso", "Contato Cadastrado")
     this.router.navigate(["/home"])
  }

   async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['ok'],
    });
    await alert.present();
  }

}
