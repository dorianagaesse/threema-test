import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParamsOptions } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ThreemaService {
  private url = environment.apiUrl;
  private api_secret = environment.apiSecretKey;

  constructor(private http: HttpClient) { }

  public sendThreemaMessage(from: string, to: string, message: string, recipientType: string, nonce: string = 'd', box: string = 'd'): Observable<string> {
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
      nonce: nonce,
      box: box,
      secret: this.api_secret
    };

    // return this.http.post(this.url + '/send_e2e', body, { headers, observe: 'response'}).pipe(
    //   map((response: HttpResponse<any>) => response.status === 200),
    //   catchError(() => of(false))
    // );

    return this.http.post(this.url + '/send_message', body, {headers: headers, observe: 'response'})
      .pipe(
        map((response: HttpResponse<any>) => {
          console.log('response: ', response);

          if (response.status === 200) {
            return 'Message sent successfully.';
          } else if (response.status === 207) {
            return 'Message partially sent. Failed recipients: ' + JSON.stringify(response.body.failed_recipients);
          } else {
            return 'Failed to send message. Error details: ' + response.body.error_details;
          }
        }),
        catchError(() => of('Failed to send message. Please try again later.'))
      );
  }

  public getPublicKey(from: string, id: string) {

  }
}
