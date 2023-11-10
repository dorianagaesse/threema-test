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
      const to = 'MB4UKY9B';
      const nonce = 'dbac573d37eb313dbafe55a5ba3f343087e16a8db5550ebb';
      // box = message. TODO: encrypt the message
      const box = '9bbe48e7ccfade4020f98ea8365e44380373e09097c1a9326527962fd14c9e3d2dd59b716643c162f59d03cdbe2727a0';

      this.threemaService.sendThreemaMessage(from, to, nonce, box).subscribe(
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
