import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';

// 🛑 NOVAS IMPORTAÇÕES MODULARES:
import {
  Auth,
  authState,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // 1. INJEÇÃO MODULAR: Usamos 'inject()' para obter a instância do Auth
  private auth: Auth = inject(Auth);
  public router: Router = inject(Router);
  public ngZone: NgZone = inject(NgZone);

  // Observable que mapeia o estado de autenticação para dados do usuário
  public usuarioDados$: Observable<User | null>;

  constructor() {
    // Inicializa o Observable de estado de autenticação (semelhante ao authState)
    this.usuarioDados$ = authState(this.auth).pipe(
      map((user) => {
        if (user) {
          // Salva os dados do usuário no localStorage
          const userJson = JSON.stringify(user);
          localStorage.setItem('user', userJson);
          return user;
        } else {
          localStorage.setItem('user', 'null');
          return null;
        }
      })
    );
  }

  // Login com email/senha (usa a função modular)
  public signIn(email: string, password: string) {
    // Usamos a função e passamos a instância do Auth como primeiro argumento
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // Registro com email/senha (usa a função modular)
  public signUpWithEmailPassword(email: string, password: string) {
    // Usamos a função e passamos a instância do Auth como primeiro argumento
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Logout (usa a função modular)
  public signOut() {
    // Usamos a função e passamos a instância do Auth como primeiro argumento
    return signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      // Usar NgZone para navegação fora do contexto do Angular
      this.ngZone.run(() => {
        this.router.navigate(['signIn']);
      });
    });
  }

  // Retorna se o usuário está logado
  public estaLogado(): boolean {
    const user: string | null = localStorage.getItem('user');
    return user !== 'null' && user !== null;
  }

  // Retorna dados do usuário logado
  public getUsuarioLogado(): any | null {
    const user = localStorage.getItem('user');
    if (user && user !== 'null') {
      return JSON.parse(user);
    }
    return null;
  }
}

