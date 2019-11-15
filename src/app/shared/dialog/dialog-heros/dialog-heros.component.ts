import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Comics} from "../../interfaces/Comics";
import {Hero} from "../../interfaces/Heros";

@Component({
  selector: 'app-dialog-heros',
  templateUrl: './dialog-heros.component.html',
  styleUrls: ['./dialog-heros.component.css']
})
export class DialogHerosComponent implements OnInit {

  /**
   * Component constructor
   */
  constructor(private _dialogRef: MatDialogRef<DialogHerosComponent>,
              @Inject(MAT_DIALOG_DATA) private _hero: Hero) {
    console.log(_hero.name);
  }

  /**
   * Returns person passed in dialog open
   */
  get hero(): Hero {
    return this._hero;
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
  onSave(hero: Hero) {
    this._dialogRef.close(hero);
  }
}
