import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { GamesComponent } from './pages/games/games.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ContactComponent } from './pages/contact/contact.component';

import { HomeModule } from './pages/home/home.module';
import { GamesModule } from './pages/games/games.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamesComponent,
    BlogComponent,
    ContactComponent,
  ],
  imports: [BrowserModule, HomeModule, GamesModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
