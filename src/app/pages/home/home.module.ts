import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ItemsMenuComponent } from './items-menu/items-menu.component';
import { MenuComponent } from './menu/menu.component';
import { CardMenuComponent } from './card-menu/card-menu.component';
import { SimpleCardComponent } from './simple-card/simple-card.component';
import { SmallCardComponent } from './small-card/small-card.component';
import { BigCardComponent } from './big-card/big-card.component';
import { ButtonComponent } from './button/button.component';
import { FooterComponent } from './footer/footer.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { StylizedButtonComponent } from './stylized-button/stylized-button.component';
import { TitleComponent } from './title/title.component';
import { LittleCardComponent } from './little-card/little-card.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

@NgModule({
  declarations: [
    ItemsMenuComponent,
    MenuComponent,
    CardMenuComponent,
    SimpleCardComponent,
    SmallCardComponent,
    BigCardComponent,
    ButtonComponent,
    FooterComponent,
    SocialMediaComponent,
    StylizedButtonComponent,
    TitleComponent,
    LittleCardComponent,
    NewsletterComponent,
  ],
  exports: [
    ItemsMenuComponent,
    MenuComponent,
    CardMenuComponent,
    SimpleCardComponent,
    SmallCardComponent,
    BigCardComponent,
    ButtonComponent,
    FooterComponent,
    SocialMediaComponent,
    StylizedButtonComponent,
    TitleComponent,
    LittleCardComponent,
    NewsletterComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class HomeModule {}
