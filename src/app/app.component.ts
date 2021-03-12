import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <a routerLink="/tiles">tiled</a>
  <a routerLink="/equirect">equirect</a>
  <a routerLink="/transition">before/after</a>
  <router-outlet></router-outlet>
  `
})
export class AppComponent { }
