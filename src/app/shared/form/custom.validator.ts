import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators {

    /**
     * Function to control email with custom validator
     */
    static price(control: FormControl) {
        // returns control
        return /^([0-9]{0,3}((.)[0-9]{0,2}))$/.test(control.value) ? null : {
            price: true
        };
    }

    /**
     * Function to control email with custom validator
     */
    static googleEmail(control: FormControl) {
        // returns control
        // tslint:disable-next-line:max-line-length
        return  /^(?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]|[^\u0000-\u007F])+@(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?(?:\.(?:[a-zA-Z0-9]|[^\u0000-\u007F])(?:(?:[a-zA-Z0-9-]|[^\u0000-\u007F]){0,61}(?:[a-zA-Z0-9]|[^\u0000-\u007F]))?)*$/.
        test(control.value) ? null : {
            googleEmail: true
        };
    }
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                // if control is empty return no error
                return null;
            }
            // test the value of the control against the regexp supplied
            const valid = regex.test(control.value);

            // if true, return no error (no error), else return error passed in the second parameter
            return valid ? null : error;
        };
    }

    static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password').value; // get password from our password form control
        const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
        }
    }
}
