import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material';

@Component({
  selector: 'app-card-comics-snack-bar',
  templateUrl: './card-comics-snack-bar.component.html',
  styleUrls: ['./card-comics-snack-bar.component.css']
})
export class CardComicsSnackBarComponent {

  private readonly _message: string;
  constructor(
    public snackBarRef: MatSnackBarRef<CardComicsSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this._message = data;
  }
  get message(): string {
    return this._message;
  }
}


