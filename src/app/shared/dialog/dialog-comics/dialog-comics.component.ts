import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {Comics} from "../../interfaces/Comics";

@Component({
  selector: 'nwt-add-dialog',
  templateUrl: './dialog-comics.component.html',
  styleUrls: [ './dialog-comics.component.css' ]
})
export class DialogComicsComponent implements OnInit {

  /**
   * Component constructor
   */
  constructor(private _dialogRef: MatDialogRef<DialogComicsComponent>,
              @Inject(MAT_DIALOG_DATA) private _comics: Comics) {
  }

  /**
   * Returns person passed in dialog open
   */
  get comics(): Comics {
    return this._comics;
  }

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
  onSave(comics: Comics) {
    this._dialogRef.close(comics);
  }
}
