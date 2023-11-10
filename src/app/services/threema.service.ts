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

  public sendThreemaMessage(from: string, to: string, nonce: string, box: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'charset': 'utf-8',
      'accept': '*/*',
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Origin': 'http://localhost:4200'
    });

    const body = {
      from: from,
      to: to,
      nonce: nonce,
      box: box,
      secret: this.api_secret
    };

    return this.http.post(this.url, body, { headers, observe: 'response'}).pipe(
      map((response: HttpResponse<any>) => response.status === 200),
      catchError(() => of(false))
    );
  }

  public getPublicKey(from: string, id: string) {

  }
}
