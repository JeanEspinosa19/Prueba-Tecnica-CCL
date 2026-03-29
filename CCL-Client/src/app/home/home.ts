import { Component, inject } from '@angular/core';
import { Modals } from '../modals/modals';
import { Producto } from '../models/productos.model';
import { ProductosService } from '../services/productos';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Modals, MatTableModule, MatButtonModule, SwalDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export default class Home {
  loading = true;
  productos = new MatTableDataSource<Producto>([]);

  tablasColumnas = ['nombre', 'cantidad', 'acciones'];

  constructor(private productoService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();

    this.productoService.refrescar$.subscribe(() => {
      this.cargarProductos();
    });
  }

  cargarProductos() {
    this.loading = true;
    this.productoService.obtenerProductos().subscribe({
      next: (productos) => {
        this.productos.data = productos; 
      },
      error: (err) => {
        console.error('Error al actualizar el movimiento del producto', err);
      },
    });
    this.loading = false;
  }

  eliminarProducto(id: number) {
    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Exitoso',
          text: 'Registro eliminado correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#a5dc86',
        });
        this.cargarProductos();
      },
      error: (err) => console.error('Error al eliminar el producto', err),
    });
  }
}
