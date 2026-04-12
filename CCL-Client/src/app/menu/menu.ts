import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TokenService } from '../services/tokens';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  isLogged?: boolean;

  token = inject(TokenService);
  router = inject(Router);

  ngOnInit(): void {
    this.token.isLogged$.subscribe((value) => {
      this.isLogged = value;
    });
  }

  logOut(): void {
    Swal.fire({
      title: '¿Deseas Cerrar Tu Sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: 'rgb(101, 101, 101)',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.token.logOut();
        Swal.fire({
          title: 'Sesión Cerrada Correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000,
        });
        this.router.navigate(['login']);
      }
    });
  }
}
