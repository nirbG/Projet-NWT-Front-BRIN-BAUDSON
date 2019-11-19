import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComicsComponent} from "../shared/dialog/dialog-comics/dialog-comics.component";
import {Comics} from "../shared/interfaces/Comics";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ServiceComicsService} from "../services/service-comics.service";
import {Router} from "@angular/router";
import {filter, flatMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-mes-envie',
  templateUrl: './mes-envie.component.html',
  styleUrls: ['./mes-envie.component.css']
})
export class MesEnvieComponent implements OnInit {
  // private property to store dialog reference
  private _comicsDialog: MatDialogRef<DialogComicsComponent>;
  // liste de comics
  private _comics: Comics[];
  // etat de l'affichage
  private _isList: boolean;


  /**
   *
   * @param _snackBar
   * @param _service
   * @param _dialog
   * @param _router
   */
  constructor(private _snackBar: MatSnackBar, private _service: ServiceComicsService,
              private _dialog: MatDialog, private _router: Router) {
    this._isList = false;
    this._service.fetch().subscribe((_: Comics[]) => {this._comics = _.filter((__: Comics) => __.wish === true)});
  }
  /**
   *
   */
  ngOnInit() {
  }



  /**
   * supprime le comics passer en parametre
   * @param data
   */
  delete(data: Comics) {
    this._comics = this._comics.filter(__ => __._id !== data._id);
    this._service.delete(data._id).subscribe(
        (_: string) => this._comics = this._comics.filter((__: Comics) => __._id !== _ )
    );
  }

  /************************************************************GET & SET **********************************/

  get comics(): any[] {
    return this._comics;
  }
  get isList(): boolean {
    return this._isList;
  }
  changeAffichage(value: boolean) {
    this._isList = value;
  }


  addInBd(data: Comics) {
    this._comics = this._comics.filter(__ => __._id !== data._id);

  }
  suppwish(data: Comics) {
    this._comics = this._comics.filter(__ => __._id !== data._id);

  }

    message() {
        return 'Vous n\'avez pas encore ajouté de comics à votre liste d\'envie.';
    }
}
