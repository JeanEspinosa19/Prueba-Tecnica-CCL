import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos';
import { Router } from '@angular/router';
import { Producto } from '../../models/productos.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimiento-producto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movimiento-producto.html',
  styleUrl: './movimiento-producto.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovimientoProducto {
  listaProductos: Producto[] = [];
  private readonly formBuilder = inject(FormBuilder);

  constructor(
    private productoService: ProductosService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.obtenerProductos().subscribe({
      next: (productos) => {
        this.listaProductos = productos;
        this.cd.detectChanges();
        
      },
      error: (err) => console.error('Error al cargar productos', err),
    });
  }

  router = inject(Router);

  form = this.formBuilder.group({
    id: this.formBuilder.control<number | null>(null, [Validators.required]),
    nombre: this.formBuilder.control<string | null>(null, [Validators.required]),
    cantidad: [0, [Validators.required, Validators.min(0)]],
  });

  actualizaProducto() {
    let producto = this.form.value as Producto;

    this.productoService.actualizarProducto(producto.id, producto).subscribe({
      next: () => {
        // Cerrar el modal y limpiar el formulario
        this.cerrarModal();

        Swal.fire({
          title: 'Exitoso',
          text: 'Actualización Realizada Correctamente',
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
          alert('Error al actualizar el producto');
        }
      },
    });
  }

  cerrarModal() {
    const dialog = document.getElementById('movProducto') as HTMLDialogElement;
    if (dialog?.open) dialog.close();

    //Limpiar formulario
    this.form.reset({ cantidad: 0 });
  }
}
