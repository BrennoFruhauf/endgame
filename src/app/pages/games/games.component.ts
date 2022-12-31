import { Component, OnInit } from '@angular/core';
import { dataFake } from 'src/app/data/dataFake';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  alphabet: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  cards = dataFake;
  platforms: Array<string[]> = [];
  genres: Array<string[]> = [];

  constructor() {}

  ngOnInit() {
    // ----------------------------------------------------------
    // Get platforms of games registered
    for (let i = 0; i < this.cards.length; i++) {
      for (let x = 0; x < this.cards[i].platform.length; x++) {
        let count = 0,
          currentPlatform = this.cards[i].platform[x];

        for (let y = 0; y < this.platforms.length; y++)
          if (currentPlatform === this.platforms[y][0]) count++;

        if (count === 0) {
          const item = [
            currentPlatform,
            currentPlatform.replace(/[ /]/g, '-').toLowerCase(),
          ];
          this.platforms.push(item);
        }
      }
    }

    // Get genre of games registered
    for (let i = 0; i < this.cards.length; i++) {
      for (let x = 0; x < this.cards[i].genre.length; x++) {
        let count = 0,
          currentGenre = this.cards[i].genre[x];

        for (let y = 0; y < this.genres.length; y++)
          if (currentGenre === this.genres[y][0]) count++;

        if (count === 0) {
          const item = [
            currentGenre,
            currentGenre.replace(/[ /]/g, '-').toLowerCase(),
          ];
          this.genres.push(item);
        }
      }
    }
  }
}
