import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-edit',
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIcon,
  ],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss',
})
export class ContactEditComponent implements OnInit {
  contact = inject(MAT_DIALOG_DATA);
  private contactService = inject(ContactService);
  private snackBar = inject(MatSnackBar);
  private dialogRef = inject(MatDialogRef);

  saving = false;

  contactForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl('', Validators.email),
    phoneNumber: new FormControl(),
    physicalAddress: new FormControl(),
  });

  ngOnInit(): void {
    this.contactForm.patchValue(this.contact);
  }

  update(): void {
    this.saving = true;
    const editedContact = {
      id: this.contact.id,
      ...this.contactForm.value,
    } as Contact;

    this.contactService.updateContact(editedContact).subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open('Contact updated successfully', 'dismiss', {
          duration: 1500,
        });
        this.dialogRef.close();
      },
      error: () => {
        this.saving = false;

        this.snackBar.open('Contact updating failed', 'dismiss');
      },
    });
  }
}