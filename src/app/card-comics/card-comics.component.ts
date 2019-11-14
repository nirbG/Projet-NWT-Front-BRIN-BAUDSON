import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Comics} from "../shared/interfaces/Comics";
import {CardComicsSnackBarComponent} from "../snackBar/card-comics-snack-bar/card-comics-snack-bar.component";

@Component({
  selector: 'app-card-comics',
  templateUrl: './card-comics.component.html',
  styleUrls: ['./card-comics.component.css']
})
export class CardComicsComponent implements OnInit {

  private _card: Comics;
  private _show: boolean;
  // private property to store delete$ value
  private readonly _delete$: EventEmitter<Comics>;
  constructor(private _snackBar: MatSnackBar) {
    this._delete$ = new EventEmitter<Comics>();
    this._show = false;
    this._card = {} as Comics ;
  }

  ngOnInit() {
  }

  /**
   * Returns private property _person
   */
  get card(): Comics {
    return this._card;
  }

  /**
   * Sets private property _person
   */
  @Input()
  set card(c: Comics) {
    this._card = c;
  }
  toggle() {
    this._show = (this._show === false) ? true : false;
  }
  get show(): boolean {
    return this._show;
  }


  add() {
    this.openSnackBar('add :' + this._card.title);
    this._card.inBD = true;
    this._card.wish = false;
  }

  supp() {
    this.openSnackBar('supp :' + this._card.title);
    this._card.inBD = false;
  }
  addWish() {
    this.openSnackBar('addWish :' + this._card.title);
    this._card.wish = true;
  }

  suppWish() {
    this.openSnackBar('suppWish :' + this._card.title);
    this._card.wish = false;
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(CardComicsSnackBarComponent, {
      duration: 2 * 1000,
      data: message,
      panelClass: ['snackWatchers']
    });
  }
  @Output('deleteComics') get delete$(): EventEmitter<Comics> {
    return this._delete$;
  }
  suppComics(){
    this._delete$.emit(this.card);
  }
}
