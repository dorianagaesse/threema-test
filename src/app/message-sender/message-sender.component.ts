import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ThreemaService } from '../services/threema.service';

@Component({
  selector: 'app-message-sender',
  templateUrl: './message-sender.component.html',
  styleUrls: ['./message-sender.component.scss']
})
export class MessageSenderComponent {

  recipientList: string[] = [];   // to
  message: string = '';     // box
  recipientType: string = '';

  constructor(private router: Router, private threemaService: ThreemaService) {}

  sendMessage() {
    // Logic to send the message here
    // --> create ThreemaService and call its helper functions

    const from = '*IPLIS00';
    // to = recipient. TODO: determine the recipient time to set the header (phone, id, email)
    const to = this.recipientList.join(',');
    const message = this.message;
    const recipientType = this.recipientType;

    console.log('to: ', to);


    this.threemaService.sendThreemaMessage(from, to, message, recipientType).subscribe(
      (message) => {
        alert(message);
      },
      (error) => {
        alert(error)
      }
    );
  }
}
