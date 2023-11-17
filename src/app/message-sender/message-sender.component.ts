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

      const nonce = 'df49e08da05b757cdee16999b45fdb7b5bfa47f58463dcb6';
      const box = '2736e51d4bdea1222235eb1e13dde28f72c15fa6c91dc9c07e6c8f65e45fd06f7ab79dcfe7f9de9106ecde441e29f51d11bf40475a3fa49b5bd8f01a5e8bb74bb2e22345d10ebed466bfb2ebe0e693057d04b039a4ac1b927bb64591fffae0fe108b58307f7aec5c878f9faa0d87885549861d25ee06a7d9925591b4fa957303ce1863859bdc57bb59c27fe4135f32cae560c9917fd823368508871a3f37a8bdd139872c155b1ad64f1062232bad609f87be032d4d40fcd2b8a627510773e8de012808187cdd606b9e581d733a11986acfc1e2f9a4177beae50dd28e714e';


      this.threemaService.sendThreemaMessage(from, to, message, nonce, box).subscribe(
        (success) => {
          console.log(success);
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
