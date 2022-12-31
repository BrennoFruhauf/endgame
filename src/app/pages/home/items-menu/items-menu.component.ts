import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-menu',
  templateUrl: './items-menu.component.html',
  styleUrls: ['./items-menu.component.scss'],
})
export class ItemsMenuComponent implements OnInit {
  toggleButton() {
    const menuItems = document.getElementById('items-menu');
    const btnMenu = document.getElementById('btn-menu');

    menuItems?.classList.toggle('active');
    btnMenu?.classList.toggle('active');
  }

  clickedOutside() {
    document.getElementById('items-menu')?.classList.remove('active');
    document.getElementById('btn-menu')?.classList.remove('active');
    // console.log('oi');
  }

  ngOnInit(): void {
    const menuItems = document.getElementById('items-menu');

    menuItems?.addEventListener('click', (event) => {
      const element = event.target as HTMLElement;

      if (element.className !== 'disabled') {
        document.getElementById('items-menu')?.classList.remove('active');
        document.getElementById('btn-menu')?.classList.remove('active');
      }
    });
  }
}
