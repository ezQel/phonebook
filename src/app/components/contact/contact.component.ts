import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { Contact } from '../../models/contact';
import { ViewMode } from '../../models/view-mode';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  imports: [MatCheckbox, MatIcon],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  @Input() contact!: Contact;
  @Input() viewMode: ViewMode = 'LIST';
  @Output() selectionChange = new EventEmitter();
}
