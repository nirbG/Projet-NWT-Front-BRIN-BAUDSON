import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Comics} from "../shared/interfaces/Comics";
import {CardComicsSnackBarComponent} from "../snackBar/card-comics-snack-bar/card-comics-snack-bar.component";

@Component({
  selector: 'app-list-comics',
  templateUrl: './list-comics.component.html',
  styleUrls: ['./list-comics.component.css']
})
export class ListComicsComponent implements OnInit {
  // card en mode list d'un comics
  private _list: Comics;
  // etat des element a affiché
  private _show: boolean;

  /**
   *
   * @param _snackBar
   */
  constructor(private _snackBar: MatSnackBar) {
    this._show = false;
    this._list = {} as Comics ;
  }

  /**
   *
   */
  ngOnInit() {
  }

  /**
   * modifie l'etat
   */
  toggle() {
    this._show = (this._show === false) ? true : false;
  }

  /************************************************************SNACKBAR **********************************/


  add() {
    this.openSnackBar('add :' + this._list.title);
  }

  supp() {
    this.openSnackBar('supp :' + this._list.title);
  }
  addWish() {
    this.openSnackBar('addWish :' + this._list.title);
  }

  suppWish() {
    this.openSnackBar('suppWish :' + this._list.title);
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(CardComicsSnackBarComponent, {
      duration: 2 * 1000,
      data: message,
      panelClass: ['snackWatchers']
    });
  }
  /************************************************************GET & SET **********************************/
  get list(): Comics {
    return this._list;
  }
  @Input()
  set list(l: Comics) {
    this._list = l;
  }
  get show(): boolean {
    return this._show;
  }
}
