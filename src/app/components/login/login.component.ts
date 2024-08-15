import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginForm } from '../../types/Login';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  constructor (private service: LoginService) {  }

  forms = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    client_secret: new FormControl(''),
    client_id: new FormControl('')
  })

  handleSubmit () {
    this.service.login(this.forms.value as LoginForm).subscribe({
      next (response) {
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('refresh_token', response.refresh_token)
      },
      error (err) {
        console.error(err)
      }
    })
  }
}
