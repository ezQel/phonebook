import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { BottomMenuComponent } from "./components/bottom-menu/bottom-menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenuComponent, BottomMenuComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
