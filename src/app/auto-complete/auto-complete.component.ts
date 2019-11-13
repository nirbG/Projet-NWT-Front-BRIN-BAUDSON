import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Hero} from "../shared/interfaces/Heros";

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit {

  form: FormGroup;
  value = '' ;
  private _models: Hero[];
  private readonly _submit$: EventEmitter<Hero[]>;
  constructor() {
    this.form = new FormGroup({
      search: new FormControl()
    });
    this.form = new FormGroup({
      search: new FormControl()
    });
    this._submit$ = new EventEmitter<Hero[]>();
  }

  onKey(event: any) { // without type info
    this.value = event.target.value;
    const filterValue = this.value.toLowerCase();
    this._models = this._models.filter((model : Hero) => model.name.toLowerCase().indexOf(filterValue) === 0);
    this.submit(this._models);
  }
  ngOnInit() {
  }

  /**
   * Returns private property _person
   */
  get heros(): Hero[] {
    return this._models;
  }

  /**
   * Sets private property _person
   */
  @Input()
  set models(model: Hero[]) {
    this._models = model;
  }
  @Output('submit')
  get submit$(): EventEmitter<Hero[]> {
    return this._submit$;
  }
  submit(value: Hero[]) {
    this._submit$.emit(value);
  }

}
