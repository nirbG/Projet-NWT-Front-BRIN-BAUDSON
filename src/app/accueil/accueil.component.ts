import { Component, OnInit } from '@angular/core';
import {DialogAccueilComponent} from "../shared/dialog/dialog-accueil/dialog-accueil.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  private _dialogStatus: string;

  get accueil(): boolean {
    return this._accueil;
  }
  // private property to store dialog reference
  private _peopleDialog: MatDialogRef<DialogAccueilComponent>;
  private _accueil: boolean;
  hoverActive: boolean;
  hoverDialogActive: boolean;

  constructor( private _dialog: MatDialog) {;
    this._accueil = true;
    this._dialogStatus = 'inactive';

  }

  ngOnInit() {
  }

  image(): string {
    return '../../assets/joker.jpg';
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
}
