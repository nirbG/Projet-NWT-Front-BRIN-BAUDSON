import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-accueil',
  templateUrl: './dialog-accueil.component.html',
  styleUrls: ['./dialog-accueil.component.css']
})
export class DialogAccueilComponent implements OnInit {
  /**
   *
   * @param _dialogRef
   * @param _wall
   */
  constructor(
      private _dialogRef: MatDialogRef<DialogAccueilComponent>,
      @Inject(MAT_DIALOG_DATA) private _wall: any) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * ferme le modal
   */
  onCancel() {
    this._dialogRef.close();
  }

}
