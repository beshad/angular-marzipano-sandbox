import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { TilesComponent } from './tiles/tiles.component';
import { EquirectComponent } from './equirect/equirect.component'

@NgModule({
  declarations: [
    AppComponent,
    TilesComponent,
    EquirectComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: EquirectComponent },
      { path: 'equirect', component: EquirectComponent },
      { path: 'tiles', component: TilesComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
