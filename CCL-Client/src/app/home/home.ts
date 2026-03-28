import { Component, inject } from '@angular/core';
import { WeatherforecastService } from '../weatherforecast';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export default class Home {
  wheaterForeCastService = inject(WeatherforecastService);
  climas: any[] = [];

  constructor() {
    this.wheaterForeCastService.getClima().subscribe((datos) => {
      this.climas = datos;
    });
  }
}
