import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { ViewMode } from '../../models/view-mode';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-preferences',
  imports: [MatDialogContent, MatIcon, ReactiveFormsModule, MatDialogClose],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss',
})
export class PreferencesComponent {
  private snackBar = inject(MatSnackBar);
  viewMode = new FormControl(localStorage.getItem('view-mode') || 'LIST');

  setViewMode(viewMode: ViewMode): void {
    localStorage.setItem('view-mode', viewMode);
    this.snackBar.open('Default view mode changed successfully', 'dismiss', {
      duration: 1500,
    });
  }
}
