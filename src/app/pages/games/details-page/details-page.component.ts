import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dataFake } from 'src/app/data/dataFake';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
  private id: string | null = '';
  gameName: string = '';
  imageUrl: string = '';
  logoUrl: string = '';
  publishedDate: string = '';
  gameplayText: string = '';
  conclusionText: string = '';
  priceRating: number = 0;
  graphicRating: number = 0;
  gameplayRating: number = 0;
  difficultyRating: number = 0;
  totalRating: number = 0;
  authorName: string = '';
  authorPhoto: string = '';
  authorDescription: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((value) => (this.id = value.get('id')));

    this.setContentToComponent(this.id);
  }

  setContentToComponent(id: string | null) {
    const content = dataFake.filter((result) => result.id === id)[0];

    this.gameName = content.name;
    this.imageUrl = content.image;
    this.logoUrl = content.logo;
    this.publishedDate = content.date_post;
    this.gameplayText = content.gameplay_text;
    this.conclusionText = content.conclusion_text;
    this.priceRating = content.price;
    this.graphicRating = content.graphic;
    this.gameplayRating = content.gameplay;
    this.difficultyRating = content.difficulty;
    this.totalRating = content.rating;
    this.authorName = content.written_by;
    this.authorPhoto = content.author_photo;
    this.authorDescription = content.author_info;
  }
}
