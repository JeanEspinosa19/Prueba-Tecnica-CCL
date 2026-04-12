import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLogged$ = this.loggedIn.asObservable();

  private hasToken(): boolean {
    return !!sessionStorage.getItem('token');
  }

  isLogged(): boolean {
    return this.hasToken();
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  getUsuario(): string | null {
    if (!this.isLogged()) {
      return null;
    }

    const token = this.getToken();
    if (!token) return null;
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJSON = JSON.parse(values);
    
    return valuesJSON.Usuario || null;
  }

  isAdmin(): boolean|null{
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    if (!token) return null;
    const payload = token.split('.')[1];
    const values = atob(payload);
    const valuesJSON = JSON.parse(values);

    const roles = valuesJSON.Rol;
    
    if (roles.indexOf('Admin')<0) {
      return false;
    }

    return true;
    
  }

  logOut(): void {
    sessionStorage.clear();
    this.loggedIn.next(false);
  }
}
