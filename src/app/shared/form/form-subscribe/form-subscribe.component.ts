import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../custom.validator";

@Component({
  selector: 'app-form-subscribe',
  templateUrl: './form-subscribe.component.html',
  styleUrls: ['./form-subscribe.component.css']
})
export class FormSubscribeComponent implements OnInit {

  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: any;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<any>;
  // private property to store form value
  private readonly _form: FormGroup;
  /**
   * Component constructor
   */
  constructor(private fb: FormBuilder) {
    this._submit$ = new EventEmitter<any>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: any) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): any {
    return this._model;
  }

  /**
   * Returns private property _form
   */
  get form(): FormGroup {
    return this._form;
  }

  /**
   * Returns private property _isUpdateMode
   */
  get isUpdateMode(): boolean {
    return this._isUpdateMode;
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
  get submit$(): EventEmitter<any> {
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
  submit(person: any) {
    this._submit$.emit(person);
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return this.fb.group({
          id: new FormControl('0'),
          firstname: new FormControl('', Validators.compose([
            Validators.required, Validators.minLength(2)
          ])),
          lastname: new FormControl('', Validators.compose([
            Validators.required, Validators.minLength(2)
          ])),
          email: new FormControl('', Validators.compose([
            Validators.required, CustomValidators.googleEmail
          ])),
          password: new FormControl('', Validators.compose([
            Validators.required,
            CustomValidators.patternValidator(/\d/, {hasNumber: true}),
            CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
            CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
            Validators.minLength(8)
          ])),
          confirmPassword: new FormControl('', Validators.compose([
            Validators.required
          ])),
        },
        {
          validator: CustomValidators.passwordMatchValidator
        });
  }

}
