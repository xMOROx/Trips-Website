import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';


const NAME_REGEX = /^[A-Z]{1}[\d\w\s-]{1,}$/;

@Directive({
  selector: '[appNameValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: NameValidatorDirective,
    multi: true,
  }]
})


export class NameValidatorDirective implements Validator {



  constructor() { }
  public validate(control: AbstractControl): { [key: string]: boolean } | null {
    const isValid = NAME_REGEX.test(control.value)
    if (isValid) {
      return null;
    }
    return { 'nameInvalid': true };
  }
}
