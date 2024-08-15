import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../../types/Login';

type Auth = {
  access_token: string
  client_type: string
  expires_in: number
  'not-before-policy': number
  refresh_expires_in: number
  refresh_token: string
  scope: string
  session_state: string,
  token_type: string
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login (form: LoginForm) {
    let body = new URLSearchParams()
    body.set('grant_type', 'password')
    body.set('username', form.username)
    body.set('password', form.password)
    body.set('client_id', form.client_id)
    body.set('client_secret', form.client_secret)

    return this.http.post<Auth>('https://auth.mangadex.org/realms/mangadex/protocol/openid-connect/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}
