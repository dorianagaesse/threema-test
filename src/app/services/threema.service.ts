import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ThreemaService {
  private url = environment.apiUrl;
  private api_secret = environment.apiSecretKey;

  constructor(private http: HttpClient) { }

  public sendThreemaMessage(from: string, to: string, message: string, recipientType: string): Observable<{status: string, message: string}> {
    console.log('url: ', this.url+"/send_message");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'charset': 'utf-8',
      'accept': '*/*'
    });

    const body = {
      from: from,
      to: to,
      message: message,
      recipientType: recipientType,
      secret: this.api_secret
    };

    return this.http.post(this.url + '/send_e2e_message', body, {headers: headers, observe: 'response'})
      .pipe(
        map((response: HttpResponse<any>) => {
          let status: string;
          let displayMessage: string;

          if (response.status === 200) {
            status = 'success';
            displayMessage = 'Message sent successfully.';
          } else if (response.status === 207) {
            status = 'partial';
            displayMessage = 'Message partially sent. Failed recipients: ' + JSON.stringify(response.body.status);
          } else {
            status = 'error';
            displayMessage = 'Failed to send message. Error details: ' + response.body.status_message;
          }

          return { status, message: displayMessage };
        }),
        catchError((error) => of({
          status: 'error',
          message: 'Error from the server. Error details:\n' + error.error.status
        })
        )
      );
  }

  public testSendRequest() {
    return this.http.get(this.url)
      .pipe(
        map((response) => {
          console.log(response);

        }),
        catchError((error) => of({error}))
      );

  }

  public getPublicKey(from: string, id: string) {

  }
}
