import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { SwitchViewComponent } from './views/switch-view/switch-view.component';

import { MapViewModule } from './views/map-view/map-view.module';
import { CatViewModule } from './views/cat-view/cat-view.module';

@NgModule({
  declarations: [
    AppComponent
    // SwitchViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MapViewModule,
    CatViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
