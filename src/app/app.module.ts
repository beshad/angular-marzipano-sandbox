import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { TilesComponent } from './tiles/tiles.component';
import { EquirectComponent } from './equirect/equirect.component';
import { TransitionComponent } from './transition/transition.component'

@NgModule({
  declarations: [
    AppComponent,
    TilesComponent,
    EquirectComponent,
    TransitionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: EquirectComponent },
      { path: 'transition', component: TransitionComponent },
      { path: 'equirect', component: EquirectComponent },
      { path: 'tiles', component: TilesComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
