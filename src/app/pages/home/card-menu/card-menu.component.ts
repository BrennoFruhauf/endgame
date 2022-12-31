import { Component, Input } from '@angular/core';
import { dataFake } from 'src/app/data/dataFake';

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss'],
})
export class CardMenuComponent {
  @Input() title: string = 'Card Menu';
  @Input() items: Array<string[]> = [];

  filterGames(item: string) {
    console.log(item);
    function teste(objeto: any) {
      for (let i = 0; i < objeto.platform.length; i++) {
        if (objeto.platform[i] === item) {
          console.log(objeto);
          return objeto;
        } else if (objeto.genre[i] === item) {
          console.log(objeto);
          return objeto;
        }
      }
    }

    const filtro = dataFake.filter(teste);
  }
}
