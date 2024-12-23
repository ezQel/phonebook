import { SelectionModel } from '@angular/cdk/collections';
import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ContactComponent } from '../../components/contact/contact.component';
import { Contact } from '../../models/contact';
import { ViewMode } from '../../models/view-mode';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  imports: [
    NgClass,
    ContactComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {
  private contactService = inject(ContactService);
  private snackbar = inject(MatSnackBar);

  search = new FormControl();
  viewMode: ViewMode = 'LIST';

  contactsDataSource?: MatTableDataSource<Contact>;
  contactSelection = new SelectionModel<string>(true);

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe((contacts) => {
      this.contactsDataSource = new MatTableDataSource<Contact>(
        contacts.map((c) => c._data)
      );
    });
  }

  filterContacts(filterStr: string): void {
    if (!this.contactsDataSource) {
      return;
    }

    this.contactsDataSource.filter = filterStr.trim().toLowerCase();
  }

  deleteContacts(): void {
    //TODO: Confirmation modal
    const contactIds = this.contactSelection.selected;

    this.contactService.deleteContacts(contactIds).subscribe({
      next: () =>
        this.snackbar.open('Contacts deleted successfully', 'dismiss', {
          duration: 1500,
        }),
      error: () => this.snackbar.open('deletion failed', 'dismiss'),
    });
  }

  toggleViewMode(mode: ViewMode): void {
    this.viewMode = mode;
  }

  downloadCSV(): void {
    // 
  }
}
