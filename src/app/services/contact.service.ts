import { inject, Injectable } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { Contact } from '../models/contact';
import { RxdbService } from './rxdb.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private db = inject(RxdbService);

  getContacts() {
    return this.db.contactsCollection$.pipe(
      switchMap((col) => col.find({ sort: [{ firstName: 'asc' }] }).$)
    );
  }

  getContact(contactId: string) {
    return this.db.contactsCollection$.pipe(
      switchMap((col) => col.findOne({ selector: { id: contactId } }).$)
    );
  }

  addContacts(contacts: Contact[]) {
    return this.db.contactsCollection$.pipe(
      switchMap((collection) => from(collection.bulkInsert(contacts)))
    );
  }

  updateContact(contact: Contact) {
    return this.db.contactsCollection$.pipe(
      switchMap((collection) => from(collection.upsert(contact)))
    );
  }

  deleteContacts(contactIds: string[]) {
    return this.db.contactsCollection$.pipe(
      switchMap((collection) => from(collection.bulkRemove(contactIds)))
    );
  }
}
