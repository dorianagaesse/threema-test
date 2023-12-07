import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ThreemaService } from '../services/threema.service';

@Component({
  selector: 'app-message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.scss']
})
export class MessageSenderComponent {

  // Business variables
  recipientList: string[] = [];   // to
  message: string = '';     // box
  recipientType: string = '';

  // Alert variables
  showAlert: boolean = false;
  alertType: 'success' | 'error' | 'warning' = 'error';
  alertMessage: string = '';

  constructor(private router: Router, private threemaService: ThreemaService) {}

  sendMessage() {

    if (this.recipientList.length > 0 && this.message.trim() !== '') {
      const from = '*IPLIS00';
      const to = this.recipientList.join(',');
      const message = this.message;
      const recipientType = this.recipientType;

      console.log('to: ', to);


      this.threemaService.sendThreemaMessage(from, to, message, recipientType).subscribe(
        (response) => {
          console.log('response: ', response);

          this.showAlert = true;

          if (response.status === 'success') {
            this.alertType = 'success';
          } else if (response.status === 'partial') {
            this.alertType = 'warning';
          } else {
            this.alertType = 'error';
          }

          this.alertMessage = response.message;
        },
        (errorMessage) => {
          this.showAlert = true;
          this.alertType = 'error';
          this.alertMessage = errorMessage;
        }
      );
    } else {
      this.showAlert = true;
      this.alertType = 'error';
      this.alertMessage = 'Recipient list and message cannot be empty.';
    }
  }

  handleInvalidRecipient() {
    this.showAlert = true;
    this.alertType = 'error';
    this.alertMessage = 'Invalid recipient: please enter a phone number, an email address or an account ID (8 digits).';
  }

  closeAlert() {
    this.showAlert = false;
  }
}
