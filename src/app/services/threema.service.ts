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

  public sendThreemaMessage(from: string, to: string, message: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'charset': 'utf-8',
      'accept': '*/*'
    });

    const body = {
      from: from,
      to: to,
      message: message
    };

    return this.http.post(this.url + '/send_message', body, { headers, observe: 'response'}).pipe(
      map((response: HttpResponse<any>) => response.status === 200),
      catchError(() => of(false))
    );
  }

  public testRequest(): Observable<boolean> {
    // Adjust the URL to match your Flask /test endpoint
    const testUrl = `${this.url}/test`;

    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
      'charset': 'utf-8',
      'accept': '*/*'
    });

    return this.http.get(testUrl, { headers, observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => response.ok),
      catchError(() => of(false))
    );
  }

  public getPublicKey(from: string, id: string) {

  }
}
