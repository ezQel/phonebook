import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Contact } from '../../models/contact';
import { ViewMode } from '../../models/view-mode';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';

@Component({
  selector: 'app-contact',
  imports: [MatCheckbox, MatIcon],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  @Input() contact!: Contact;
  @Input() viewMode: ViewMode = 'LIST';
  @Output() selectionChange = new EventEmitter();
  private dialog = inject(MatDialog);

  @HostListener('click')
  viewContact(): void {
    this.dialog.open(ContactDetailsComponent, {
      data: this.contact.id,
      minWidth: '320px',
      width: '80%',
      height: '80%',
    });
  }
}
