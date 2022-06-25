import {AbstractControl, FormGroup, ValidatorFn} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CustomValidators {

  constructor() {}

  onlyChar(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {

      if (control.value == '') return null;

      let re = new RegExp('^[a-zA-z ]*$');

      if (re.test(control.value)){
        return null;
      } else {
        return {onlyChar: true};
      }

    };
  }
  mustMatch(controlName: string, matchingControlName: string) {
    console.log("inside mustMatch");
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      console.log("control: ", control);
      console.log("matching control: ", matchingControl);

      if(matchingControl.errors && !matchingControl.errors["mustMatch"]) {
        return;
      }

      // set error on matching control if validation fails
      if(control.value !== matchingControl.value) {
        console.log("control.value !== matchingControl.value");
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    };
  }
}
