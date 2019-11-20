import { Component, OnInit } from '@angular/core';
import {DialogAccueilComponent} from "../shared/dialog/dialog-accueil/dialog-accueil.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  // status du dialog
  private _dialogStatus: string;
  // private property to store dialog reference
  private _peopleDialog: MatDialogRef<DialogAccueilComponent>;
  //status hover bouton
  hoverActive: boolean;
  //status hover Dialog bouton
  hoverDialogActive: boolean;

  /**
   *
   * @param _dialog
   */
  constructor( private _dialog: MatDialog) {
    this._dialogStatus = 'inactive';
  }

  /**
   *
   */
  ngOnInit() {
  }

  /**
   * Function to display modal
   */
  showDialog() {

    this._dialogStatus = 'active';
    // open modal
    this._peopleDialog = this._dialog.open(DialogAccueilComponent, {
      height: '400px',
      width: '600px',
      disableClose: false,
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._peopleDialog.afterClosed()
        .subscribe(
            _ => this._dialogStatus = 'inactive',
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
  }
  /********************************************GET&SET*****************************************/

  image(): string {
    return '../../assets/joker.jpg';
  }
}
