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
import { utils, writeFile } from 'xlsx';
import { ContactComponent } from '../../components/contact/contact.component';
import { Contact } from '../../models/contact';
import { ViewMode } from '../../models/view-mode';
import { ContactService } from '../../services/contact.service';
import { CategoryFilterComponent } from '../../components/category-filter/category-filter.component';

@Component({
  selector: 'app-contact-list',
  imports: [
    NgClass,
    ContactComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon,
    ReactiveFormsModule,
    CategoryFilterComponent,
  ],
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {
  private contactService = inject(ContactService);
  private snackbar = inject(MatSnackBar);

  search = new FormControl();
  category = new FormControl('All');
  viewMode: ViewMode = this.contactService.getViewMode();

  contactsDataSource?: MatTableDataSource<Contact>;
  contactSelection = new SelectionModel<string>(true);

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.contactService.getContacts().subscribe((contacts) => {
      if (contacts.length < 1) {
        this.initDummyData();
      }

      this.contactsDataSource = new MatTableDataSource<Contact>(
        contacts.map((c) => c._data)
      );

      this.filterByCategory();
    });
  }

  filterContacts(filterStr: string): void {
    // Reset category filter
    this.category.setValue('All');

    if (!this.contactsDataSource) {
      return;
    }

    this.contactsDataSource.filter = filterStr.trim().toLowerCase();
  }

  filterByCategory(): void {
    this.category.valueChanges.subscribe((category) => {
      if (!this.contactsDataSource) {
        return;
      }

      if (category === 'All') {
        this.contactsDataSource.filter = '';
        return;
      }

      this.contactsDataSource.filteredData =
        this.contactsDataSource.data.filter((c) => c.category === category);
    });
  }

  deleteContacts(): void {
    const contactIds = this.contactSelection.selected;

    if (!contactIds.length) {
      return;
    }

    if (confirm('Delete selected contacts?')) {
      this.contactService.deleteContacts(contactIds).subscribe({
        next: () => {
          this.snackbar.open('Contacts deleted successfully', 'dismiss', {
            duration: 1500,
          });
        },
        error: () => {
          this.snackbar.open('deletion failed', 'dismiss');
        },
      });
    }
  }

  toggleViewMode(mode: ViewMode): void {
    this.viewMode = mode;
  }

  downloadCSV(): void {
    const contacts = this.contactsDataSource?.data;

    if (!contacts) {
      return;
    }

    const sheetData = contacts.map((contact) => {
      return {
        'FIRST NAME': contact.firstName,
        'LAST NAME': contact.lastName,
        'PHONE NUMBER': contact.phoneNumber,
        EMAIL: contact.email,
        'PHYSICAL ADDRESS': contact.physicalAddress,
      };
    });

    const ws = utils.json_to_sheet(sheetData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws);
    writeFile(wb, 'contacts.csv');
  }

  initDummyData(): void {
    const contacts = [
      {
        phoneNumber: '0712345678',
        email: 'johnDoe@gmail.com',
        firstName: 'John',
        lastName: 'Doe',
        physicalAddress: '123, Good Place',
        isFavourited: true,
      },
      {
        phoneNumber: '0712345678',
        email: 'abraham@gmail.com',
        firstName: 'Abraham',
        lastName: 'Lincoln',
        physicalAddress: '123, Good Place',
        isFavourited: false,
      },
      {
        phoneNumber: '0712345678',
        email: 'jane@gmail.com',
        firstName: 'Jane',
        lastName: 'Doe',
        physicalAddress: '123, Good Place',
        isFavourited: false,
      },
      {
        phoneNumber: '0712345678',
        email: 'jomo@gmail.com',
        firstName: 'Jomo',
        lastName: 'Kenyatta',
        physicalAddress: '123, Good Place',
        isFavourited: false,
      },

      {
        phoneNumber: '0712345678',
        email: 'zainab@gmail.com',
        firstName: 'Zainab',
        physicalAddress: '123, Good Place',
        isFavourited: false,
      },
    ] as Contact[];

    this.contactService.addContacts(contacts).subscribe();
  }
}
