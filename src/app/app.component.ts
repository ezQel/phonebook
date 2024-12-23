import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SideMenuComponent,
    BottomMenuComponent,
    TopBarComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
