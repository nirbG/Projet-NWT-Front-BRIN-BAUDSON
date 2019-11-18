import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  // private property to store delete$ value
  private readonly _delete$: EventEmitter<Comics>;

  /**
   *
   * @param _snackBar
   */
  constructor(private _snackBar: MatSnackBar) {
    this._show = false;
    this._list = {} as Comics ;
    this._delete$ = new EventEmitter<Comics>()
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


  /**
   * ajoute le comics a la BD
   */
  add() {
    this.openSnackBar('Vous avez ajouté ' +  this._list.title +' à votre BDtheque');
    this._list.inBD = true;
    this._list.wish = false;
  }

  /**
   * supprime le comics de la BD
   */
  supp() {
    this.openSnackBar('Vous avez supprimé ' +  this._list.title +' à votre BDtheque');
    this._list.inBD = false;
  }

  /**
   * ajoute le comics aux envie
   */
  addWish() {
    this.openSnackBar('Vous avez ajouté ' +  this._list.title +' à vos envie');
    this._list.wish = true;
  }

  /**
   * supprime le comics de envie
   */
  suppWish() {
    this.openSnackBar('Vous avez supprimé ' +  this._list.title +' à vos envie');
    this._list.wish = false;
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(CardComicsSnackBarComponent, {
      duration: 2 * 1000,
      data: message,
      panelClass: ['snackWatchers']
    });
  }
  suppComics() {
    this._delete$.emit(this._list);
  }

  /************************************************************GET & SET **********************************/
  @Output('deleteComics') get delete$(): EventEmitter<Comics> {
    return this._delete$;
  }
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
