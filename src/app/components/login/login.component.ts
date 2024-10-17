import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass , RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  private readonly _AuthService = inject(AuthService);

  private readonly _formBuilder = inject(FormBuilder);

  private readonly _Router = inject(Router);


  msgError: string = "";

  isloading: boolean = false;

  loginForm: FormGroup = this._formBuilder.group(
    {
      email: [null, [Validators.required, Validators.email]],

      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    }
  )

  // loginForm:FormGroup = new FormGroup ({

  //   email :new  FormControl(null ,[Validators.required , Validators.email]),

  //   password :new  FormControl(null ,[Validators.required , Validators.pattern(/^\w{6,}$/)]),
  // }  );

  loginSubmite(): void {

    if (this.loginForm.valid) {
      this.isloading = true;

      this._AuthService.setloginForm(this.loginForm.value).subscribe({

        next: (res) => {

          console.log(res);

          if (res.message == 'success') {

            console.log(res);
            /// 1-save token
            localStorage.setItem('userToken', res.token);

            // 2-decoding token
            this._AuthService.saveUserData()
            /// 3-  to home
            this._Router.navigate(['/home'])
          }
          this.isloading = false;
        },
        error: (err: HttpErrorResponse) => {

          this.msgError = err.error.message
          console.log(err);

          this.isloading = false;
        }
      }
      )
    }
    else {
      this.loginForm.setErrors({ mismatch: true })
      this.loginForm.markAllAsTouched()
    }
  }
}
