import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilm, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AuthService } from '../../../services/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ISignupRequest } from '../../../interfaces/signupinterface';
import { PasswordDirective } from '../password.directive';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    MatProgressBar,
    PasswordDirective
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  animations: [
    trigger('flipInOut', [
      transition(':enter', [
        animate('1s', style({ transform: 'rotateY(90deg)' })),
      ]),
      transition(':leave', [
        animate('1s', style({ transform: 'rotateY(180deg)' })),
      ]),
    ]),
  ],
})
export class SignupComponent implements OnInit, DoCheck, AfterViewInit {
  [x: string]: any;
  filmIcon = faFilm;
  faFacebook = faFacebook;
  faGoogle = faGoogle;
  faEye = faEye;
  faEyaSlash = faEyeSlash;
  submitted = false;
  passwordHint: boolean = false;
  eyeshow: boolean = false;
  uppercase: boolean = false;
  specialChar: boolean = false;
  Number: boolean = false;
  numberLength: boolean = false;
  signUpRequest:ISignupRequest= {} as ISignupRequest;


  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _Router: Router,
    private element:ElementRef
  ) { }

  ngAfterViewInit(): void { }

  ngDoCheck(): void {
    this.numberLength = /.{8,}/.test(this.formInfo.controls.password.value!);
    this.uppercase = /[A-Z]/.test(this.formInfo.controls.password.value!);
    this.specialChar = /[#?!@$%^&*-]/.test(
      this.formInfo.controls.password.value!
    );
    this.Number = /[0-9]/.test(this.formInfo.controls.password.value!);
  }

  formInfo = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  validateAreEqual(pass: string, confimPass: string) {
    return (group: FormGroup) => {
      const password = group.controls[pass];
      const confimPassword = group.controls[confimPass];
      if (password.value !== confimPassword.value) {
        confimPassword.setErrors({ passwordMismatch: true });
      }
    };
  }

  ngOnInit(): void {
    this.formInfo = this.formBuilder.group(
      {
        fullName: [ 
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(60),
            Validators.pattern('^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$')
            
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(40),
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.validateAreEqual('password', 'confirmPassword') }
    );
  }

  slidIndex: number = 0;

  public slides: string[] = [
    '../../../assets/images/illustration.png',
    '../../../assets/images/Frame 1000016152.svg',
  ];
  
  Submit() {
    //this.submitted = true;
    if (this.formInfo.invalid) {
      console.log(this.formInfo);
      return;
    }
    const fv = this.formInfo.value!;
    this.signUpRequest = {
      fullName :fv.fullName?.toString()??'',
      email :fv.email?.toString()??'',
      password :fv.password?.toString()??'',
      confirmPassword :fv.confirmPassword?.toString()??''
    }
    console.log(fv);
    this._authService.signUp(this.signUpRequest).subscribe({
      next:(res)=>{
        console.log(res);
        sessionStorage.setItem('token' , res.token);
        sessionStorage.setItem('email' , res.email);
        this._Router.navigateByUrl('/signupverification');
        // this._authService.setTokenInSessionStorage(res['token']);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
  showConfirmPass:boolean = false
  showConfirmPassword(){
    this.showConfirmPass = !this.showConfirmPass
  }
  showPass:boolean =false;
  showPassword(){
    this.showPass = !this.showPass;
  }
  
  unshowPassAfter2S(){
    const ele = this.element.nativeElement as HTMLInputElement;
    setTimeout(()=>{
      ele.type = 'text'
    },2000)
    console.log('aaaaaaa');
  }

  showSlides(i = this.slidIndex) {

    let silde = this.slides[i];
    return silde;
  }
  
  currentSlide(i: number) {
    console.log(i);
    this.slidIndex = i;
    return this.showSlides();
  }

  test() {
    this.passwordHint = !this.passwordHint;
    console.log(this.passwordHint);
  }

  eyeShow() {
    this.eyeshow = !this.eyeshow;
  }

  testStr:string='';
  pwd!:string;
  signUpTest(str:any){
    console.log(str);
    const input = this.element.nativeElement as HTMLInputElement;
    input.type = 'text';
    setTimeout(()=>{
        this.testStr+=`-`
        input.type = 'password'
        this.pwd+=str.key;
        console.log(this.pwd);
    },2000);
  }
}
