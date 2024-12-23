import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavouriteToggleComponent } from '../favourite-toggle/favourite-toggle.component';

@Component({
  selector: 'app-contact-details',
  imports: [
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
    MatIcon,
    FavouriteToggleComponent,
  ],
  templateUrl: './contact-details.component.html',
})
export class ContactDetailsComponent implements OnInit {
  private contactId: string = inject(MAT_DIALOG_DATA);
  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef);
  private snackBar = inject(MatSnackBar);
  private contactService = inject(ContactService);
  contact!: Contact;

  ngOnInit(): void {
    this.getContact();
  }

  getContact(): void {
    this.contactService.getContact(this.contactId).subscribe((contact) => {
      this.contact = contact._data;
    });
  }

  editContact(): void {
    this.dialog.open(ContactEditComponent, {
      data: this.contact,
      minWidth: '320px',
      width: '80%',
    });
  }

  deleteContact(): void {
    if (confirm('Delete contact?')) {
      this.contactService.deleteContacts([this.contactId]).subscribe({
        next: () => {
          this.snackBar.open('Contact deleted successfully', 'dismiss', {
            duration: 1500,
          });
          this.dialogRef.close();
        },
        error: () => {
          this.snackBar.open('deletion failed', 'dismiss');
        },
      });
    }
  }
}
