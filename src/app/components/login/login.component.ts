import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { LoginForm } from '../../types/Login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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
