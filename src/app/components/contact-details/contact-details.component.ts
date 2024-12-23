import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contact-details',
  imports: [MatDialogContent, MatDialogClose, MatIcon],
  templateUrl: './contact-details.component.html',
})
export class ContactDetailsComponent {
  contact: Contact = inject(MAT_DIALOG_DATA);
  private dialog = inject(MatDialog);

  editContact(): void {
    // this.dialog.open(ContactEditComponent);
  }

  deleteContact(): void {
    //TODO;
  }
}
