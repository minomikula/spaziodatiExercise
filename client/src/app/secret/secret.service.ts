import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { switchMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SecretService {
  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getSecretData() {
    // todo create interceptor for all api requests
    return this.auth.getToken().pipe(first(), switchMap(token => {
      return this.http.get<Secret>('api/data/secret', { headers: new HttpHeaders({ 'X-jwt': token }) });
    }))
  }
}
export interface Secret {
  serverData: string;
}
