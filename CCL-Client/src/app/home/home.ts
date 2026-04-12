import { Component, inject } from '@angular/core';
import { Modals } from '../modals/modals';
import { Producto } from '../models/productos.model';
import { ProductosService } from '../services/productos';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SwalDirective } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { TokenService } from '../services/tokens';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [CommonModule, Modals, MatTableModule, MatButtonModule, SwalDirective, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export default class Home {
  loading = true;
  usuario?: string | null;
  isAdmin?: boolean | null;
  productos = new MatTableDataSource<Producto>([]);
  tablasColumnas = ['nombre', 'cantidad', 'acciones'];
  

  constructor(
    private productoService: ProductosService,
    private token: TokenService,
  ) {}

  ngOnInit(): void {
    this.usuario = this.token.getUsuario();
    this.cargarProductos();
    this.isAdmin = this.token.isAdmin();
    if (this.usuario && !this.isAdmin) {
      this.tablasColumnas = ['nombre', 'cantidad'];
    }

    this.productoService.refrescar$.subscribe(() => {
      this.cargarProductos();
      this.token.isAdmin();
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
