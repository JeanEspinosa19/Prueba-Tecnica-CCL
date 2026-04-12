import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { TokenService } from '../services/tokens';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuarios.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { extraerErroresLogin } from '../general/globalFunctions/extraerErrores';
import { MostrarErrores } from '../general/component/mostrar-errores/mostrar-errores';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MostrarErrores],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export default class Login {
  private readonly formBuilder = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  auth = inject(AuthService);
  token = inject(TokenService);
  router = inject(Router);
  errores: string[] = [];

  loginUsuario!: Usuario;

  Rol: string = '';

  form = this.formBuilder.group({
    Usuario: [, [Validators.required, Validators.maxLength(60)]],
    Pass: [, [Validators.required]],
  });

  ngOnInit(): void {}

  onLogin(): void {
    const { Usuario, Pass } = this.form.value;
    this.loginUsuario = { Usuario: Usuario!, Pass: Pass!, Rol: this.Rol };

    this.auth.login(this.loginUsuario).subscribe({
      next: (data) => {
        this.token.setToken(data.token);
        Swal.fire({
          title: 'Exitoso',
          text: 'Bienvenido al Sistema de Inventarios CCL',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          this.auth.notificarCambio();
          this.router.navigate(['/']);
        });
      },
      error: (err) => {
        const errores = extraerErroresLogin(err);
        this.errores = errores;

        if (err.status === 401) {
          Swal.fire({
            title: 'Error',
            text: err.error,
            icon: 'error',
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#be1414',
          }).then(() => {
            this.auth.notificarCambio();            
          });
        }

        this.cdr.detectChanges();
      },
    });
  }
}
