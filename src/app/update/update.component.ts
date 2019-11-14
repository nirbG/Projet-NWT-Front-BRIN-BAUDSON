import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {DialogComponent} from "../shared/dialog/dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, flatMap, map} from "rxjs/operators";
import {Comics} from "../shared/interfaces/Comics";
import {ServiceComicsService} from "../services/service-comics.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  // private property to store dialog reference
  private _peopleDialog: MatDialogRef<DialogComponent>;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router, private _comicsService: ServiceComicsService, private _dialog: MatDialog) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._route.params
        .pipe(
            map((params: any) => params.id),
            flatMap((id: string) => this._comicsService.fetchOne(id))
        )
        .subscribe((comics: Comics) => {
          this._peopleDialog = this._dialog.open(DialogComponent, {
            width: '500px',
            disableClose: true,
            data: comics
          });

          // subscribe to afterClosed observable to set dialog status and do process
          this._peopleDialog.afterClosed()
              .pipe(
                  filter(_ => !!_),
                  flatMap(_ => this._comicsService.update(_))
              )
              .subscribe(() => undefined, () => undefined, () => this._router.navigate([ '/comics' ]));
        });
  }
}
