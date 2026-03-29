import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Producto, productoCreacion } from '../models/productos.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor() {}
  private http = inject(HttpClient);
  private apiURL = environment.apiURL + 'productos/';

  private refrescar = new Subject<void>();
  refrescar$ = this.refrescar.asObservable();

  notificarCambio() {
    this.refrescar.next();
  }

  public obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiURL + `inventario`);
  }
  public obtenerProductosporId(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.apiURL + `inventario/${id}`);
  }

  public crearProducto(producto: productoCreacion) {
    return this.http.post(this.apiURL + `movimiento`, producto);
  }

  public actualizarProducto(id: number, producto: Producto) {
    return this.http.patch(this.apiURL + `movimiento/${id}`, producto);
  }

  public eliminarProducto(id: number) {
    return this.http.delete(this.apiURL + `depuracion/${id}`);
  }
}
