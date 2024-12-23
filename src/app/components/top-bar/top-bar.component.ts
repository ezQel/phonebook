import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { PreferencesComponent } from '../preferences/preferences.component';

@Component({
  selector: 'app-top-bar',
  imports: [MatIcon],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent implements OnInit {
  private dialog = inject(MatDialog);

  get isDarkMode(): boolean {
    return Boolean(localStorage.getItem('darkMode'));
  }

  ngOnInit(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.add('bg-black');
    }
  }

  toggleDarkMode(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('darkMode');
      return;
    }

    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  }

  openPreferences(): void {
    this.dialog.open(PreferencesComponent);
  }
}
