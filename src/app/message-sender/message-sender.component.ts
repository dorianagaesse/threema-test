import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ThreemaService } from '../services/threema.service';

@Component({
  selector: 'app-message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.scss']
})
export class MessageSenderComponent {
  recipient: string = '';   // to
  message: string = '';     // box

  constructor(private router: Router, private threemaService: ThreemaService) {}

  sendMessage() {
    if (this.isValideRecipient()) {
      // Logic to send the message here
      // --> create ThreemaService and call its helper functions

      const from = '*IPLIS00';
      // to = recipient. TODO: determine the recipient time to set the header (phone, id, email)
      const to = this.recipient;
      const message = this.message;

      this.threemaService.sendThreemaMessage(from, to, message).subscribe(
        (success) => {
          if (success) {
            alert('Message sent successfully.');
          } else {
            alert('Problem while sending the message.');
          }
        }
      );

    } else {
      // Incorrect recipient
      alert('Incorrect recipient. Enter valid phone number, email or account ID (8 characters).')
    }
  }

  private isValideRecipient(): boolean {
    const phoneNumberPattern = /^\d{10}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const accountIdPattern = /^[a-zA-Z0-9]{8}$/;

    if (phoneNumberPattern.test(this.recipient)) {
      return true;
    } else if (emailPattern.test(this.recipient)) {
      return true;
    } else if (accountIdPattern.test(this.recipient)) {
      return true;
    }

    return false;
  }
}
