import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Hero} from "../shared/interfaces/Heros";

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {
  // fomulaire
  form: FormGroup;
  //valeur de linput
  value = '' ;
  // tableau de heros
  private _models: Hero[];
  // eventEmitter qui retourne les heros
  private readonly _submit$: EventEmitter<Hero[]>;

  /**
   * Constructor
   */
  constructor() {
    this.form = new FormGroup({
      search: new FormControl()
    });
    this._submit$ = new EventEmitter<Hero[]>();
  }

  /**
   *
   */
  ngOnInit() {
  }

  /**
   * fonction qui se declenche a chaque fois qu'une lettre est ajouté,
   * elle filtre les heros
   * @param event lettre
   */
  onKey(event: any) { // without type info
    this.value = event.target.value;
    const filterValue = this.value.toLowerCase();
    this._models = this._models.filter((model : Hero) => model.name.toLowerCase().indexOf(filterValue) === 0);
    this.submit(this._models);
  }


  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<Hero[]> {
    return this._submit$;
  }

  /**
   * fonction qui emet l'event submit
   * @param value les heros filtrer
   */
  submit(value: Hero[]) {
    this._submit$.emit(value);
  }
  /********************************************GET&SET*****************************************/
  get heros(): Hero[] {
    return this._models;
  }
  @Input()
  set models(model: Hero[]) {
    this._models = model;
  }

}
