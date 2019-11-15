import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Comics} from "../../interfaces/Comics";
import {HeroSimple} from "../../interfaces/HeroSimple";
import {CustomValidators} from "../custom.validator";

@Component({
  selector: 'app-form',
  templateUrl: './form-comics.component.html',
  styleUrls: ['./form-comics.component.css']
})
export class FormComicsComponent implements OnInit, OnChanges {
  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: Comics;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<Comics>;
  // private property to store form value
  private readonly _form: FormGroup;

  /**
   * Component constructor
   */
  constructor() {
    this._submit$ = new EventEmitter<Comics>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: Comics) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): Comics {
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
  get submit$(): EventEmitter<Comics> {
    return this._submit$;
  }


  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to handle component update
   */
  ngOnChanges(record) {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
      this._form.patchValue(this._model);
    } else {
      this._model = {
        isbn: '',
        photo: '',
        title: '',
        mainHeros: {} as HeroSimple,
        otherHeros: [] as HeroSimple[],
        price: 0.0,
        wish: false,
        inBD: false,
      };
      this._isUpdateMode = false;
    }
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
  submit(comics: Comics) {
    this._submit$.emit(comics);
  }


  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      isbn: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(10), Validators.maxLength(10)
      ])),
      title: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(10)
      ])),
      photo: new FormControl('https://randomuser.me/api/portraits/lego/6.jpg'),
      price: new FormControl('', Validators.compose([
        Validators.required, CustomValidators.price
      ])),
    });
  }
}
