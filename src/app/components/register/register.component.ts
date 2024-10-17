import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators ,} from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule ,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

 private readonly _AuthService = inject (AuthService);
 private readonly _Router = inject (Router);

 msgError:string = "";

 isloading : boolean = false;

registerForm:FormGroup = new FormGroup ({
  name : new  FormControl(null , [Validators.required , Validators.minLength(3) ,Validators.maxLength(20)] ),
  email :new  FormControl(null ,[Validators.required , Validators.email]),
  phone :new  FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  password :new  FormControl(null ,[Validators.required , Validators.pattern(/^\w{6,}$/)]),
                                  //[Validators.required , Validators.pattern(/^\w{6,}$/)]//
  rePassword :new  FormControl(null ),

}   , this.ConfirmPassword );







// conformpassword        g:registerform   //


  ConfirmPassword( g: AbstractControl)
 {
  if (g.get('password')?.value === g.get('rePassword')?.value )
   {
      return null
   }
   else
   {
     return{mismatch:true}
   }
 };



registerSubmite():void
{
  if(this.registerForm.valid)
    {
      this.isloading = true;

       this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{

          console.log(res);

          if(res.message == 'success' )
            {
              this._Router.navigate( ['/login'])
            }
          this.isloading = false;
        },
     error:(err:HttpErrorResponse)=>{

      this.msgError = err.error.message
      console.log(err);

      this.isloading = false;
     }
       }
       )
    }
    else
    {
        this.registerForm.setErrors( {mismatch:true })
         this.registerForm.markAllAsTouched()
    }
}
}
