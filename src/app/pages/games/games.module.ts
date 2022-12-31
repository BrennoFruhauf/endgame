import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeModule } from '../home/home.module';
import { CompleteMenuComponent } from './complete-menu/complete-menu.component';
import { GameCardComponent } from './game-card/game-card.component';
import { DetailsPageComponent } from './details-page/details-page.component';

@NgModule({
  declarations: [
    CompleteMenuComponent,
    GameCardComponent,
    DetailsPageComponent,
  ],
  exports: [CompleteMenuComponent, GameCardComponent, DetailsPageComponent],
  imports: [CommonModule, HomeModule, RouterModule],
})
export class GamesModule {}
