import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Comics} from "../shared/interfaces/Comics";
import {ServiceComicsService} from "../services/service-comics.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComicsComponent} from "../shared/dialog/dialog-comics/dialog-comics.component";
import {filter, flatMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  get dialogStatus(): string {
    return this._dialogStatus;
  }
  private _dialogStatus: string;
  // private property to store dialog reference
  private _comicsDialog: MatDialogRef<DialogComicsComponent>;
  private _comics: Comics[];
  private _nbstart = 0;
  private _nbend = 10;
  private _isLoadMore: boolean;

  constructor(private _snackBar: MatSnackBar, private _service: ServiceComicsService,
              private _dialog: MatDialog, private _router: Router) {
    this._dialogStatus = 'inactive';
  }
  ngOnInit() {
    this._service.some(this._nbstart + '', this._nbend + '').subscribe((comics: Comics[]) => this._comics = comics);
  }

  get comics(): any[] {
    return this._comics;
  }
  Load() {
    this._service.some(this._nbstart + '', this._nbend + '')
        .subscribe((comics: Comics[]) => this._comics = this._comics.concat(comics));
  }

  seeMore() {
    console.log('hover');
    this._isLoadMore = true;
    setTimeout(
        () => {
          this._isLoadMore = false;
          this._nbstart = this._nbend;
          this._nbend = this._nbend + 10;
          this.Load();
        }, 2000
    );
  }

  delete(data: Comics) {
    this._comics = this._comics.filter(__ => __.isbn !== data.isbn);

  }
  get isLoadMore(): boolean {
    return this._isLoadMore;
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._comicsDialog = this._dialog.open(DialogComicsComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._comicsDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (_: Comics) =>this._router.navigate(
                [ '/comics/'+ _.isbn]),
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive',
        );
  }

  /**
   * Add new person and fetch all people to refresh the list
   */
  private _add(comics: Comics): Observable<Comics> {
    return this._service
        .create(comics);
  }
}
