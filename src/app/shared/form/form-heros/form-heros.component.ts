import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HeroSimple} from "../../interfaces/HeroSimple";
import {Hero} from "../../interfaces/Heros";

@Component({
  selector: 'app-form-heros',
  templateUrl: './form-heros.component.html',
  styleUrls: ['./form-heros.component.css']
})
export class FormHerosComponent implements OnInit, OnChanges {

  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: any;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<Hero>;
  // private property to store form value
  private readonly _formh: FormGroup;

  /**
   * Component constructor
   */
  constructor() {
    this._submit$ = new EventEmitter<Hero>();
    this._cancel$ = new EventEmitter<void>();
    this._formh = this._buildForm();
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: Hero) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): Hero {
    return this._model;
  }

  /**
   * Returns private property _form
   */
  get formh(): FormGroup {
    return this._formh;
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
  get submit$(): EventEmitter<Hero> {
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
      this._formh.patchValue(this._model);
    } else {
      this._model = {
        photo: '',
        name: '',
        pouvoir: '',
        ennemi: [] as HeroSimple[],
        allie: [] as HeroSimple[],
        isHumain: false
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
  submit(hero: Hero) {
    console.log(this._model);
    if( !this._isUpdateMode ) {
      this._submit$.emit(hero);
    }else{
      let h= hero as Hero;
      h._id=this._model._id;
      this._submit$.emit(h);
    }
  }


  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      //_id: new FormControl('0'),
      name: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      pouvoir: new FormControl(''),
      photo: new FormControl('../../../assets/photoherosbase.png'),
      isHumain: new FormControl(false)
    });
  }

  isHumanChecked(checked: boolean) {
    this._formh.patchValue({ isHumain: checked });
  }
}
