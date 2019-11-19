import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Comics} from "../shared/interfaces/Comics";
import {CardComicsSnackBarComponent} from "../snackBar/card-comics-snack-bar/card-comics-snack-bar.component";
import {ServiceComicsService} from "../services/service-comics.service";

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

  // private property to store suppInBD value
  private readonly _suppInBD$: EventEmitter<Comics>;
  // private property to store suppInBD value
  private readonly _suppInwish$: EventEmitter<Comics>;
  // private property to store suppInBD value
  private readonly _addInBD$: EventEmitter<Comics>;

  /**
   *
   * @param _snackBar
   */
  constructor(private _snackBar: MatSnackBar, private _serviceComics: ServiceComicsService) {
    this._show = false;
    this._list = {} as Comics ;
    this._delete$ = new EventEmitter<Comics>();
    this._suppInBD$ = new EventEmitter<Comics>();
    this._suppInwish$ = new EventEmitter<Comics>();
    this._addInBD$ = new EventEmitter<Comics>();
  }

  /**
   *
   */
  ngOnInit() {
  }

  /**
   * ajoute le comics a la BD
   */
  add() {
    this._serviceComics.update({
      _id: this._list._id,
      inBD: true,
      wish: false,
    }as Comics).subscribe( (_) =>{
      this.openSnackBar('Vous avez ajouté  ' + this._list.title+' à votre BDtheque');
      this._list.inBD = true;
      this._list.wish = false;
      this.addInBD()
    });

  }

  /**
   * supprime le comics de la BD
   */
  supp() {
    this._serviceComics.update({
      _id: this._list._id,
      inBD: false,
      wish: false,
    }as Comics).subscribe( (_) => {
      this.openSnackBar('Vous avez supprimé ' + this._list.title + ' à votre BDtheque');
      this._list.inBD = false;
      this._list.wish= false;
      this.suppInBD();
    });
  }

  /**
   * ajoute le comics aux envie
   */
  addWish() {
    this._serviceComics.update({
      _id: this._list._id,
      wish: true,
    }as Comics).subscribe( (_) => {
      this.openSnackBar('Vous avez ajouté ' + this._list.title + ' à vos envie');
      this._list.wish = true;
    });
  }

  /**
   * supprime le comics de envie
   */
  suppWish() {
    this._serviceComics.update({
      _id: this._list._id,
      wish: false,
    }as Comics).subscribe( (_) => {
      this.openSnackBar('Vous avez supprimé ' + this._list.title + ' à vos envie');
      this._list.wish = false;
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
  suppComics() {
    this._delete$.emit(this._list);
  }
  suppInBD(){
    this._suppInBD$.emit(this._list);
  }

  suppInwish(){
    this._suppInwish$.emit(this._list);
  }
  addInBD(){
    this.addInBD$.emit(this._list);
  }
  /************************************************************GET & SET **********************************/
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
