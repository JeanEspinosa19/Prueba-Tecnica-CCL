import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos';
import { Producto, productoCreacion } from '../../models/productos.model';
import { Router } from '@angular/router';
import { SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-crear-producto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-producto.html',
  styleUrl: './crear-producto.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CrearProducto {
  private readonly formBuilder = inject(FormBuilder);

  productoService = inject(ProductosService);

  router = inject(Router);

  form = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.maxLength(60)]],
    cantidad: [0, [Validators.required, Validators.min(0)]],
  });

  guardarCambios() {
    let producto = this.form.value as productoCreacion;
    this.productoService.crearProducto(producto).subscribe({
      next: () => {
        // Cerrar el modal y limpiar el formulario
        this.cerrarModal();

        Swal.fire({
          title: 'Exitoso',
          text: 'Producto Creado Correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#a5dc86',
        }).then(() => {
          this.productoService.notificarCambio();
        });
      },
      error: (err) => {
        if (err.status === 409) {
          alert('Ya existe un producto con este nombre');
        } else {
          console.error(err);
          alert('Error al crear el producto');
        }
      },
    });
  }

  cerrarModal() {
    const dialog = document.getElementById('addProducto') as HTMLDialogElement;
    if (dialog?.open) dialog.close();

    // Limpiar formulario
    this.form.reset({ nombre: '', cantidad: 0 });
  }
}
