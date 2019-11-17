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
  // Comics
  private _card: Comics;
  // boolean qui determine si on affiche les boutons
  private _show: boolean;
  // private property to store delete$ value
  private readonly _delete$: EventEmitter<Comics>;

  /**
   *
   * @param _snackBar      permet d'afficher le resultat des requette
   */
  constructor(private _snackBar: MatSnackBar) {
    this._delete$ = new EventEmitter<Comics>();
    this._show = false;
    this._card = {} as Comics ;
  }

  ngOnInit() {
  }

  /**
   * fonction qui permet de show ou hide les boutons
   */
  toggle() {
    this._show = (this._show === false) ? true : false;
  }


  /**
   * ajoute le comics a la BD
   */
  add() {
    this.openSnackBar('add :' + this._card.title);
    this._card.inBD = true;
    this._card.wish = false;
  }

  /**
   * supprime le comics de la BD
   */
  supp() {
    this.openSnackBar('supp :' + this._card.title);
    this._card.inBD = false;
  }

  /**
   * ajoute le comics aux envie
   */
  addWish() {
    this.openSnackBar('addWish :' + this._card.title);
    this._card.wish = true;
  }

  /**
   * supprime le comics de envie
   */
  suppWish() {
    this.openSnackBar('suppWish :' + this._card.title);
    this._card.wish = false;
  }

  /**
   * affiche la snackBar
   * @param message message a afficher
   */
  openSnackBar(message: string) {
    this._snackBar.openFromComponent(CardComicsSnackBarComponent, {
      duration: 2 * 1000,
      data: message,
      panelClass: ['snackWatchers']
    });
  }


  /**
   * emet l'event a fin de supprimer le comics
   */
  suppComics(){
    this._delete$.emit(this.card);
  }
  /********************************************GET&SET*****************************************/

  @Output('deleteComics') get delete$(): EventEmitter<Comics> {
    return this._delete$;
  }
  /**
   * Returns Comics
   */
  get card(): Comics {
    return this._card;
  }

  /**
   * Sets Comics
   */
  @Input()
  set card(c: Comics) {
    this._card = c;
  }
  /**
   * return l'etat des boutons
   */
  get show(): boolean {
    return this._show;
  }
}
