import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../../../services/auth.service';
import { ILogin } from '../../../interfaces/logininterface';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  animations: [
    trigger('flipInOut', [
      transition(':enter', [
        animate('1s', style({ transform: 'rotateY(0deg)' })),
      ]),
      transition(':leave', [
        animate('1s', style({ transform: 'rotateY(180deg)' })),
      ]),
    ]),
  ],
})
export class SigninComponent implements OnInit, DoCheck {

  Index: number = 1;
  submitted: boolean = false;
  passwordHint: boolean = false;
  eyeshow: boolean = false;
  uppercase: boolean = false;
  specialChar: boolean = false;
  Number: boolean = false;
  numberLength: boolean = false;
  signInRequest : ILogin = {} as ILogin;
  faEye = faEye;
  faEyaSlash = faEyeSlash;


  constructor(private formBuilder: FormBuilder, private _authService: AuthService, private _Router: Router) { }

  formInfo = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });


  // validateAreEqual(pass:string , confimPass:string) {
  //   return (group:FormGroup) => {
  //     const password = group.controls[pass];
  //     const confimPassword = group.controls[confimPass];
  //     if(password.value !== confimPassword.value){
  //       confimPassword.setErrors({passwordMismatch: true});
  //     }
  //   }
  // }
  // match(){
  //   if(this.formInfo.controls.password.value == this.formSetNewPassword.controls.confirmPassword.value){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }
  ngDoCheck(): void { }


  ngOnInit(): void {
    this.formInfo = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
        ],
      ],

    });
  }


  Submit() { //login
    this.submitted = true;
    if (this.formInfo.invalid) {
      console.log(this.formInfo);
      return;
    }
    const fv = this.formInfo.value!;
    this.signInRequest = {
      email :fv.email?.toString()??'',
      password :fv.password?.toString()??'',
    }

    this._authService.Login(this.signInRequest).subscribe({
      next: (res) => {
        this._Router.navigateByUrl('/home');
      },
      error: (err) => {
        console.log(err);
      }

    });
  }
  checkbox(){
    localStorage.setItem('email',this.formInfo.controls.email?.toString()??'');
    localStorage.setItem('password',this.formInfo.controls.password?.toString()??'');
  }
  showConfirmPass:boolean = false
  showConfirmPassword(){
    this.showConfirmPass = !this.showConfirmPass
  }
  showPass:boolean =false;
  showPassword(){
    this.showPass = !this.showPass;
  }

  // resetSubmit() { // send mail
  //   if (this.formSendMail.invalid) {
  //     console.log(this.formInfo);
  //     return;
  //   }
  //   this.showVerification();
  //   this._authService.signIn(this.formSendMail.value).subscribe((response) => {
  //     if (response.message == 'success') {
  //       localStorage.setItem('token',response.token);
  //       this.showVerification();
  //     }else{
  //       alert(response.message);
  //     }
  //   });
  // }

  // verificationSubmit() { // send mail
  //   if (this.formVerification.invalid) {
  //     console.log(this.formVerification);
  //     return;
  //   }
  //   this.showSetNewPass();
  //   this._authService.signIn(this.formVerification.value).subscribe((response) => {
  //     if (response.message == 'success') {
  //       localStorage.setItem('token',response.token);
  //       this.showSetNewPass();
  //     }else{
  //       alert(response.message);
  //     }
  //   });
  // }

  // setNewPassword(){
  //   if (this.formSetNewPassword.invalid) {
  //     console.log(this.formSetNewPassword);
  //     return;
  //   }
  //   this.showChangePass()
  //   this._authService.signIn(this.formSetNewPassword.value).subscribe((response) => {
  //     if (response.message == 'success') {
  //       localStorage.setItem('token',response.token);
  //       this.showChangePass();
  //     }else{
  //       alert(response.message);
  //     }
  //   });
  // }

  // flipCotainer = document.getElementById('loginContainerId');
  // loginCotainerId = document.getElementById('loginContainerId');
  // resetCotainerId = document.getElementById('resetContainerId');
  // showForgetPassForm() {
  //   document.getElementById('resetContainerId')?.classList.add('flip-out');
  // flipCotainer?.s
  // this.flipCotainer?.classList.add('flip');
  // this.loginCotainerId?.style.display != 'none';
  // this.resetCotainerId?.style.display != 'block';
  // console.log('flip');
  // this.Index = 2 ;
  // }

  // showLoginin(){

  //   this.Index = 1 ;
  // }
  // showVerification(){
  //   this.Index = 3;
  // }
  // showSetNewPass(){
  //   this.Index = 4;
  // }
  // showChangePass(){
  //   this.Index = 5;
  // }
  // showLogout(){
  //   this.Index = 6;
  // }


  // test() {
  //   this.passwordHint = !this.passwordHint;
  //   console.log(this.passwordHint);
  // }

  // eyeShow() {
  //   this.eyeshow = !this.eyeshow;
  // }
}
