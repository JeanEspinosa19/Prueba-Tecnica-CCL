import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../models/usuarios.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  private http = inject(HttpClient);
  private authURL = environment.authURL;

  private refrescar = new Subject<void>();
    refrescar$ = this.refrescar.asObservable();
  
    notificarCambio() {
      this.refrescar.next();
    }

  public login(dto: Usuario): Observable<any> {
    return this.http.post<any>(this.authURL,dto);
  }

}
