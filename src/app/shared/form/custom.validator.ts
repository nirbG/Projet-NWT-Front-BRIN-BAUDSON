import { FormControl } from '@angular/forms';

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
}
