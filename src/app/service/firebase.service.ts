import { Injectable, Inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contato } from '../model/contato';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private _PATH = 'contatos';

  constructor(@Inject(Firestore) private firestore: Firestore) {}

  getAllContacts(): Observable<Contato[]> {
    const contatosCollection = collection(this.firestore, this._PATH);
    return collectionData(contatosCollection, { idField: 'id' }) as Observable<Contato[]>;
  }

  create(contato: Contato): Promise<any> {
    const contatosCollection = collection(this.firestore, this._PATH);
    return addDoc(contatosCollection, {
      nome: contato.nome,
      telefone: contato.telefone,
      genero: contato.genero,
      email: contato.email,
      whatsapp: contato.temWhatsapp ?? false
    });
  }

  update(contatoExistente: Contato, nome: string, telefone: string, genero: string, email: string, whatsapp: boolean): Promise<void> {
    const contatoRef = doc(this.firestore, `${this._PATH}/${contatoExistente.id}`);
    return updateDoc(contatoRef, { nome, telefone, genero, email, whatsapp });
  }

  delete(id: string): Promise<void> {
    const contatoRef = doc(this.firestore, `${this._PATH}/${id}`);
    return deleteDoc(contatoRef);
  }
}