import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { read, utils, writeFile } from 'xlsx';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-import',
  imports: [MatIcon],
  templateUrl: './import.component.html',
})
export class ImportComponent {
  private contactService = inject(ContactService);
  private snackBar = inject(MatSnackBar);
  fileName?: string;
  contacts?: Contact[];

  readFile(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files) {
      return;
    }

    const file = input.files[0];
    this.fileName = file?.name;
    input.value = '';

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = reader.result;
        const workBook = read(data, { type: 'binary' });

        try {
          const sheetName = workBook.SheetNames[0];
          //
          const contacts: Record<string, string>[] = utils.sheet_to_json(
            workBook.Sheets[sheetName]
          );
          this.contacts = contacts.map((contact) => {
            if (!contact['PHONE NUMBER']) {
              throw new Error('Missing phone Number');
            }

            return {
              firstName: contact['FIRST NAME'],
              lastName: contact['LAST NAME'],
              phoneNumber: contact['PHONE NUMBER'],
              email: contact['EMAIL'],
              physicalAddress: contact['PHYSICAL ADDRESS'],
            } as Contact;
          });
          console.log(this.contacts);
        } catch (e) {
          console.error('Importing Error:', e);
        }
      };
      reader.readAsText(file);
    }
  }

  saveContacts(): void {
    if (this.contacts) {
      this.contactService.addContacts(this.contacts).subscribe({
        next: () => {
          this.snackBar.open('Contacts imported', 'dismiss', {
            duration: 1500,
          });
        },
        error: () => {
          this.snackBar.open('Failed to import contacts', 'dismiss');
        },
      });
    }
  }

  downloadTemplate(): void {
    const template = [
      {
        'FIRST NAME': 'John',
        'LAST NAME': 'Doe',
        'PHONE NUMBER': '0712345678',
        EMAIL: 'john@mail.com',
        'PHYSICAL ADDRESS': '123, Somewhere',
      },
    ];

    const ws = utils.json_to_sheet(template);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws);
    writeFile(wb, 'contact_import.csv');
  }
}
