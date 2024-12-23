import { Component, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-favourite-toggle',
  imports: [MatIcon],
  templateUrl: './favourite-toggle.component.html',
})
export class FavouriteToggleComponent {
  @Input() contact!: Contact;
  private snackBar = inject(MatSnackBar);
  private contactService = inject(ContactService);

  toggleFavourite(): void {
    this.contact.isFavourited = !this.contact.isFavourited;
    this.contactService.updateContact(this.contact).subscribe({
      next: () => {
        const message = this.contact.isFavourited
          ? 'favourited'
          : 'removed from favourites';

        this.snackBar.open(
          `${this.contact.firstName} ${this.contact.lastName} ${message}`,
          'dismiss',
          { duration: 1500 }
        );
      },
      error: () => {
        this.snackBar.open('Failed to favourite', 'dismiss');
      },
    });
  }
}
