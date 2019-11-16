import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../custom.validator";
import {DialogConnexionComponent} from "../../dialog/dialog-connexion/dialog-connexion.component";

@Component({
  selector: 'app-form-co',
  templateUrl: './form-co.component.html',
  styleUrls: ['./form-co.component.css']
})
export class FormCoComponent implements OnInit {

  private _f: FormGroup;
  private _hide: string;
  private readonly _submit$: EventEmitter<any>;
  // private property to store dialog reference
  private _dialog: MatDialogRef<DialogConnexionComponent>;

  constructor(private _matDialog: MatDialog) {
    this._f = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required, CustomValidators.googleEmail
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
    this._hide = 'password';
    this._submit$ = new EventEmitter<any>();
  }

  ngOnInit() {
  }
  image(): string {
    return '../../assets/baroom-comic-book--wallpaper.jpg';
  }
  change(): string {
    return  this._hide = (this._hide === 'password') ? 'text' : 'password';
  }
  get f(): FormGroup {
    return this._f;
  }
  get hide(): string {
    return this._hide;
  }
  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<any> {
    return this._submit$;
  }
  submit(value: any) {
    this._submit$.emit(value);
  }

  /*
   * sd = true lance le dailog pour s'inscrire
   * Sd = false lance le mot de passe oubliée
   */
  showDialog(subscribeDialog: boolean) {


    this._dialog = this._matDialog.open(DialogConnexionComponent, {
      height: '400',
      width: '600px',
      disableClose: false,
      data: {
        subscribeD: subscribeDialog,
      }
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._dialog.afterClosed()
        .subscribe(
            _ => undefined,
            _ => undefined,
            () => undefined
        );
  }

}
