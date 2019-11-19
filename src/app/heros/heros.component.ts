import { Component, OnInit } from '@angular/core';
import {Hero, HEROS} from "../shared/interfaces/Heros";
import {HerosService} from "../services/heros.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogHerosComponent} from "../shared/dialog/dialog-heros/dialog-heros.component";
import {Router} from "@angular/router";
import {filter, flatMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  // type de filtre
  private _filtre: string;
  // liste hero
  private _heros: Hero[];
  // indice de depart
  private _nbstart = 0;
  // nombre a afficher
  private _nbend = 10;
  // status de la barre de chargement
  private _isLoadMore: boolean;
  // lettre selectione
  private _lettre: string;
  // etat du dialog
  private _dialogStatus: string;
  // dalog de creation
  private _herosDialog: MatDialogRef<DialogHerosComponent>

  /**
   *
   * @param _herosService
   * @param _dialog
   * @param _router
   */
  constructor(private  _herosService: HerosService, private _dialog: MatDialog, private _router: Router) {
  this._dialogStatus = 'inactive';
    this._isLoadMore = false;
    this._herosService.fetch().subscribe( (_: Hero[]) =>
        this._heros = _
    );
    this._filtre = 'none';
    this._lettre = 'A';

  }

  /**
   *
   */
  ngOnInit() {
  }

  /**
   * charge des heros
   * @constructor
   */
  Load() {
    this._herosService.fetch().subscribe( (_: Hero[]) =>
        this._heros = this._heros.concat(_)
    );

  }

  /**
   * charge plus de heros
   */
  seeMore() {
    if (this._filtre === 'none') {
      console.log('hover');
      this._isLoadMore = true;
      setTimeout(
          () => {
            this._isLoadMore = false;
            this._nbstart = this._nbend;
            this._nbend = this._nbend + 10;
            this.Load();
          }, 2000
      );
    }
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._herosDialog = this._dialog.open(DialogHerosComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._herosDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (_: Hero) =>this._router.navigate(
                [ '/Hero/'+ _._id]),
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive',
        );
  }

  /**
   * Add new person and fetch all people to refresh the list
   */
  private _add(heros: Hero): Observable<Hero> {
    return this._herosService
        .create(heros)
        .pipe(
            flatMap((_: Hero) => this._herosService.fetchOne(_._id))
        );
  }
  /************************************************************GET & SET **********************************/

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  get isLoadMore(): boolean {
    return this._isLoadMore;
  }
  get filtre(): string {
    return this._filtre;
  }

  get heros(): any[] {
    return this._heros;
  }
  /************************************************************Filtre **********************************/

  switchFilter(f: string) {
    this._nbstart = 0;
    this._nbend = 10;
    switch (f) {
      case 'Alphabet' :
        this._herosService.fetch().subscribe( (_: Hero[]) =>
            this._heros = _.filter( _ => _.name.charAt(0) === this._lettre)
        );
        break;
      case 'Search' :
        this._herosService.fetch().subscribe( (_: Hero[]) =>
          this._heros = _
        );
        break;
      default :
        this._herosService.some(this._nbstart, this._nbend).subscribe( (_: Hero[]) =>
            this._heros = _
        );
        break;
    }
    this._filtre = f;
  }
  switchLettre(l: string) {
    this._lettre = l;
    this.switchFilter('Alphabet');
  }

  refresh(data: Hero[]) {
    this._heros = data;
  }

}
