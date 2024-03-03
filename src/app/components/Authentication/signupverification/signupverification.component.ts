import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Route, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signupverification',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signupverification.component.html',
  styleUrl: './signupverification.component.css',
})
export class SignupverificationComponent implements OnInit {
  str1!: string;
  str2!: string;
  str3!: string;
  str4!: string;
  str5!: string;
  str6!: string;

  str: string = '';
  formVerification = new FormGroup({
    verificationCode1: new FormControl(''),
    verificationCode2: new FormControl(''),
    verificationCode3: new FormControl(''),
    verificationCode4: new FormControl(''),
    verificationCode5: new FormControl(''),
    verificationCode6: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this.formVerification = this.formBuilder.group({
      verificationCode1: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode2: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode3: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode4: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode5: ['', [Validators.required, Validators.maxLength(1)]],
      verificationCode6: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }

  verificationSubmit() {
    // send mail
    if (this.formVerification.invalid) {
      console.log(this.formVerification);
      return;
    }
    // this.showSetNewPass();
    this.str = `${this.str1}${this.str2}${this.str3}${this.str4}${this.str5}${this.str6}`
    console.log(this.str);
    this._authService.verificationCode(this.str).subscribe({
      next: (res) => {
        //Clear the session
        sessionStorage.clear();
        this._Router.navigateByUrl('/signin');
        // this._authService.setToken(res.token);
        // this.showSetNewPass();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  resendOTP(){
    this._authService.resendOTP().subscribe({
      next: (res) => {
        console.log(res);
        // this._authService.setToken(res.token);
        // this.showSetNewPass();
      },
      error: (err) => {
        console.log(err);
      },
    })

  }
  
}
