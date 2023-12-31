import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recipient-input',
  templateUrl: './recipient-input.component.html',
  styleUrls: ['./recipient-input.component.scss']
})
export class RecipientInputComponent {
  @Input() recipients: string[] = [];
  @Output() recipientsChange = new EventEmitter<string[]>();
  @Output() invalidRecipient = new EventEmitter<void>();

  currentRecipient: string = '';

  addRecipient(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (this.currentRecipient.trim() !== '') {
        if (this.isValidRecipient(this.currentRecipient)) {
          const normalizedRecipient = this.currentRecipient.startsWith('+') ? this.currentRecipient.substring(1) : this.currentRecipient;
          this.recipients.push(normalizedRecipient);
          this.recipientsChange.emit([...this.recipients]);
          this.currentRecipient = '';
        } else {
          this.invalidRecipient.emit();
        }
      }
    }
  }

  removeRecipient(recipient: string) {
    this.recipients = this.recipients.filter(r => r !== recipient);
    this.recipientsChange.emit([...this.recipients]);
    this.currentRecipient = '';
  }

  private isValidRecipient(recipient: string): boolean {
    const phoneNumberPattern = /^(\+\d{11}|\d{11})$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const accountIdPattern = /^[a-zA-Z0-9]{8}$/;

    return phoneNumberPattern.test(recipient) || emailPattern.test(recipient) || accountIdPattern.test(recipient);
  }
}
