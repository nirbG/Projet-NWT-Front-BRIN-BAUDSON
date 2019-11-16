import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-connexion',
  templateUrl: './dialog-connexion.component.html',
  styleUrls: ['./dialog-connexion.component.css']
})
export class DialogConnexionComponent implements OnInit {
  private _subscribe: boolean;

  constructor(    private _dialogRef: MatDialogRef<DialogConnexionComponent>,
                  @Inject(MAT_DIALOG_DATA) private data: any) {
    this._subscribe = data.subscribeD;
    console.log({data});
  }

  get subscribe(): boolean {
    return this._subscribe;
  }

  ngOnInit() {
  }

  onCancel() {
    this._dialogRef.close();
  }
}
