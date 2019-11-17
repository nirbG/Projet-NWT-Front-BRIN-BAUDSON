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
   *
   * @param _dialogRef
   * @param _hero
   */
  constructor(private _dialogRef: MatDialogRef<DialogHerosComponent>,
              @Inject(MAT_DIALOG_DATA) private _hero: Hero) {
  }

  /**
   * Returns le hero
   */
  get hero(): Hero {
    return this._hero;
  }

  /**
   *
   */
  ngOnInit() {
  }

  /**
   * ferme le modal
   */
  onCancel() {
    this._dialogRef.close();
  }

  /**
   * retourn le hero au parent
   */
  onSave(hero: Hero) {
    this._dialogRef.close(hero);
  }
}
