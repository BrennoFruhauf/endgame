import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stylized-button',
  templateUrl: './stylized-button.component.html',
  styleUrls: ['./stylized-button.component.scss'],
})
export class StylizedButtonComponent {
  @Input() label: string = '';
}
