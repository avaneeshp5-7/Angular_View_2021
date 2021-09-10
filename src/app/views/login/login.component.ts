import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  notifier: NotifierService;
  constructor(
    private _fb: FormBuilder,
    private rt: Router,
    private authService: AuthService,
    notifier: NotifierService,
  ) { this.notifier = notifier }

  ngOnInit(): void {
    this.userForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  gotiRegister() {
    this.rt.navigate(['/register'])
  }

  login() {
    if (this.userForm.valid) {
      this.authService.login(this.userForm.value).subscribe((data: any) => {
          if (this.authService.isLogged()) {
            const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
            this.notifier.notify('success', 'Logged In !');
            setTimeout(() => {
              this.rt.navigate([redirect])
            }, 2000);
        } else {
          this.notifier.notify('error', 'Invalid credencials !');
        }
      })
    } else {
      this.notifier.notify('error', 'Fields are required!');
    }
  }

}
