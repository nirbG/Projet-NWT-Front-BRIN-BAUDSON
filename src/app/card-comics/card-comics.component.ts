import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Comics} from "../shared/interfaces/Comics";
import {CardComicsSnackBarComponent} from "../snackBar/card-comics-snack-bar/card-comics-snack-bar.component";
import {ServiceComicsService} from "../services/service-comics.service";

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
  // private property to store suppInBD value
  private readonly _suppInBD$: EventEmitter<Comics>;
  // private property to store suppInBD value
  private readonly _suppInwish$: EventEmitter<Comics>;
  // private property to store suppInBD value
  private readonly _addInBD$: EventEmitter<Comics>;
  private _suppAuth: boolean;

  /**
   *
   * @param _snackBar      permet d'afficher le resultat des requette
   */
  constructor(private _snackBar: MatSnackBar, private _serviceComics: ServiceComicsService) {
    this._delete$ = new EventEmitter<Comics>();
    this._suppInBD$ = new EventEmitter<Comics>();
    this._suppInwish$ = new EventEmitter<Comics>();
    this._addInBD$ = new EventEmitter<Comics>();
    this._show = false;
    this._card = {} as Comics ;
    this._suppAuth= false;

  }

  get suppAuth(): boolean {
    return this._suppAuth;
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
    this._serviceComics.update({
      _id: this._card._id,
      inBD: true,
      wish: false,
    }as Comics).subscribe( (_) =>{
      this.openSnackBar('Vous avez ajouté  ' + this._card.title+' à votre BDtheque');
      this._card.inBD = true;
      this._card.wish = false;
      this.addInBD();
    });

  }

  /**
   * supprime le comics de la BD
   */
  supp() {
    this._serviceComics.update({
      _id: this._card._id,
      inBD: false,
      wish: false,
    }as Comics).subscribe( (_) => {
      this.openSnackBar('Vous avez supprimé ' + this._card.title + ' à votre BDtheque');
      this._card.inBD = false;
      this._card.wish= false;
      this.suppInBD();
    });
  }

  /**
   * ajoute le comics aux envie
   */
  addWish() {
    this._serviceComics.update({
      _id: this._card._id,
      wish: true,
    }as Comics).subscribe( (_) => {
      this.openSnackBar('Vous avez ajouté ' + this._card.title + ' à vos envie');
      this._card.wish = true;
    });
  }

  /**
   * supprime le comics de envie
   */
  suppWish() {
    this._serviceComics.update({
      _id: this._card._id,
      wish: false,
    }as Comics).subscribe( (_) => {
      this.openSnackBar('Vous avez supprimé ' + this._card.title + ' à vos envie');
      this._card.wish = false;
      this.suppInwish();
    })
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
  /**
   * emet l'event a fin de supprimer le comics
   */
  suppInBD(){
    this._suppInBD$.emit(this.card);
  }

  suppInwish(){
    this._suppInwish$.emit(this.card);
  }
 addInBD(){
    this._addInBD$.emit(this.card);
  }
  /********************************************GET&SET*****************************************/

  @Output('deleteComics') get delete$(): EventEmitter<Comics> {
    return this._delete$;
  }
  @Output('suppInBD') get suppInBD$(): EventEmitter<Comics> {
    return this._suppInBD$;
  }
  @Output('suppInwish') get suppInwish$(): EventEmitter<Comics> {
    return this._suppInwish$;
  }
  @Output('addInBD') get addInBD$(): EventEmitter<Comics> {
    return this._addInBD$;
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
   * Sets Comics
   */
  @Input()
  set suppDisable(c: boolean) {
    this._suppAuth = c;
  }
  /**
   * return l'etat des boutons
   */
  get show(): boolean {
    return this._show;
  }
}
