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

  public sendThreemaMessage(from: string, to: string, message: string, nonce: string = 'd', box: string = 'd'): Observable<boolean> {
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
      nonce: nonce,
      box: box,
      secret: this.api_secret
    };

    // return this.http.post(this.url + '/send_e2e', body, { headers, observe: 'response'}).pipe(
    //   map((response: HttpResponse<any>) => response.status === 200),
    //   catchError(() => of(false))
    // );

    return this.http.post<any>(this.url + '/send_message', body, {headers: headers});
  }

  public getPublicKey(from: string, id: string) {

  }
}
