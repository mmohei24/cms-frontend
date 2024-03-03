import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPassword]',
  standalone: true,
})
export class PasswordDirective {
  lastInputTime:number = 2000;
  constructor(private ele: ElementRef) {}

  @HostListener('input') onInput(){
    const input = this.ele.nativeElement as HTMLInputElement;
    // const value = input.value;
    // const lastChar = value.charAt(value.length - 1);
    input.type = 'text';
    // input.value = lastChar;
    setTimeout(() => {
      input.type = 'password';
      // input.value = value;
    }, 1000);
    
  }
  // private showLastCharachter(input = this.ele.nativeElement as HTMLInputElement, value:string){
  //   const lastChar = value.charAt(value.length - 1);
  //   input.type = 'text';
  //   input.value = lastChar;
  //   setTimeout(() => {
  //     input.type = 'password';
  //     input.value = value;
  //   }, 1000);
  // }

  // private hideCharachters(input = this.ele.nativeElement as HTMLInputElement, value:string){
  //   input.type = 'password'
  //   input.value = value;
  // }
}
