import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../custom.validator";

@Component({
  selector: 'app-form-forget-pwd',
  templateUrl: './form-forgetpwd.component.html',
  styleUrls: ['./form-forgetpwd.component.css']
})
export class FormForgetpwdComponent implements OnInit {
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<string>;
  // private property to store form value
  private readonly _form: FormGroup;
  /**
   * Component constructor
   */
  constructor(private fb: FormBuilder) {
    this._submit$ = new EventEmitter<string>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }
  /**
   * Returns private property _form
   */
  get form(): FormGroup {
    return this._form;
  }
  /**
   * Returns private property _cancel$
   */
  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<string> {
    return this._submit$;
  }


  /**
   * OnInit implementation
   */
  ngOnInit() {
  }
  /**
   * Function to emit event to cancel process
   */
  cancel() {
    this._cancel$.emit();
  }
  /**
   * Function to emit event to submit form and person
   */
  submit(email: string) {
    this._submit$.emit(email);
  }
  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required, CustomValidators.googleEmail
      ])),
    });
  }

}
