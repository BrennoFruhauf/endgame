import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-complete-menu',
  templateUrl: './complete-menu.component.html',
  styleUrls: ['./complete-menu.component.scss'],
})
export class CompleteMenuComponent {
  @Input() bgLink: string = '../../../../assets/bg-menu-home.webp';
  url: string = '';

  ngOnInit() {
    this.url = `url('${this.bgLink}')`;
  }
}
