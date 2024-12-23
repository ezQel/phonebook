import { Injectable } from '@angular/core';
import { createRxDatabase, RxCollection, RxDatabase, RxDocument } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { from, shareReplay } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Contact, contactSchemaLiteral } from '../models/contact';
import { addRxPlugin } from 'rxdb';
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';

addRxPlugin(RxDBMigrationSchemaPlugin);

export type ContactDocument = RxDocument<Contact>;
export type ContactCollection = RxCollection<Contact>;
export interface DatabaseCollections {
  contacts: ContactCollection;
}
export type ContactsDatabase = RxDatabase<DatabaseCollections>;

@Injectable({
  providedIn: 'root',
})
export class RxdbService {
  public contactsCollection$ = from(this.initDb()).pipe(shareReplay(1));

  async initDb() {
    const db = await createRxDatabase<DatabaseCollections>({
      name: 'contacts',
      storage: getRxStorageDexie(),
    });

    const collections = await db.addCollections({
      contacts: {
        schema: contactSchemaLiteral,
        migrationStrategies: {
          // Move old data from v0 to v1 schema by adding missing category field
          1: function (oldDoc) {
            oldDoc['category'] = null;
            return oldDoc;
          },
        },
      },
    });

    // Generate unique id for an inserted contact document
    collections.contacts.preInsert((doc) => {
      if (!doc.id) {
        doc.id = uuidv4();
      }
    }, false);

    return collections.contacts;
  }
}
