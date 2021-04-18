import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type : 'login' | 'signup' | 'reset' = 'signup';
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.required]],
      passwordConfirm: ['', []]
    });
    this.type = 'login';
  }

  getErrorMessage(name: string): string {
    if (name === 'email') {
      if (this.form.get('email').hasError('required')) {
        return 'Polje je obavezno';
      }
      return this.form.get('email').hasError('email') ? 'Nije važeća e-mail adresa' : '';
    } else {
      if (this.form.get('password').hasError('required')) {
        return 'Polje je obavezno';
      }
      return this.form.get('password').hasError('minlength') ? 'Lozinka mora sadrzavati minimalno 8 znakova' : '';
    }
  }

   get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const email = this.email.value;
    const password = this.password.value;

    this.auth.login(email, password);
  }

}
