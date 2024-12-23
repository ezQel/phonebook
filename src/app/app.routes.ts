import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'contacts',
    loadComponent: () =>
      import('./pages/contact-list/contact-list.component').then(
        (m) => m.ContactListComponent
      ),
  },
  {
    path: 'recents',
    loadComponent: () =>
      import('./pages/recents/recents.component').then(
        (m) => m.RecentsComponent
      ),
  },
  {
    path: 'import',
    loadComponent: () =>
      import('./pages/import/import.component').then((m) => m.ImportComponent),
  },
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full',
  },
];
