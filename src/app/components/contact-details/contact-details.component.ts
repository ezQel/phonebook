import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';

@Component({
  selector: 'app-contact-details',
  imports: [MatDialogContent, MatDialogClose, MatIcon],
  templateUrl: './contact-details.component.html',
})
export class ContactDetailsComponent implements OnInit {
  private contactId: string = inject(MAT_DIALOG_DATA);
  private dialog = inject(MatDialog);
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
      height: '80%',
    });
  }

  deleteContact(): void {
    //TODO;
  }
}
