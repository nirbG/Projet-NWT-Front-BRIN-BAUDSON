import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-accueil',
  templateUrl: './dialog-accueil.component.html',
  styleUrls: ['./dialog-accueil.component.css']
})
export class DialogAccueilComponent implements OnInit {
  constructor(
      private _dialogRef: MatDialogRef<DialogAccueilComponent>,
      @Inject(MAT_DIALOG_DATA) private _wall: any) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to cancel the process and close the modal
   */
  onCancel() {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send person to parent
   */
  onSave() {
    this._dialogRef.close();
  }
  get wall(): any {
    return this._wall;
  }
}
