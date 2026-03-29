import { Component } from '@angular/core';
import { CrearProducto } from "./crear-producto/crear-producto";
import { MovimientoProducto } from './movimiento-producto/movimiento-producto';

@Component({
  selector: 'app-modals',
  imports: [CrearProducto,MovimientoProducto],
  templateUrl: './modals.html',
  styleUrl: './modals.css'
})
export class Modals {}
