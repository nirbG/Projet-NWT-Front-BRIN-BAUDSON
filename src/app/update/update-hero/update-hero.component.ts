import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceComicsService} from "../../services/service-comics.service";
import {filter, flatMap, map} from "rxjs/operators";
import {Comics} from "../../shared/interfaces/Comics";
import {DialogComicsComponent} from "../../shared/dialog/dialog-comics/dialog-comics.component";
import {DialogHerosComponent} from "../../shared/dialog/dialog-heros/dialog-heros.component";
import {HerosService} from "../../services/heros.service";
import {Hero} from "../../shared/interfaces/Heros";
import {Location} from "@angular/common";

@Component({
  selector: 'app-update-hero',
  templateUrl: './update-hero.component.html',
  styleUrls: ['./update-hero.component.css']
})
export class UpdateHeroComponent implements OnInit {
  // private property to store dialog reference
  private _heroDialog: MatDialogRef<DialogHerosComponent>;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router, private _heroservice: HerosService,
              private _dialog: MatDialog,private _location: Location) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._route.params
        .pipe(
            map((params: any) => params.id),
            flatMap((id: string) => this._heroservice.fetchOne(id))
        )
        .subscribe((hero: Hero) => {
          this._heroDialog = this._dialog.open(DialogHerosComponent, {
            width: '500px',
            disableClose: true,
            data: hero,
            //panelClass: 'col-lg-12',
          });

          // subscribe to afterClosed observable to set dialog status and do process
          this._heroDialog.afterClosed()
              .pipe(
                  filter(_ => !!_),
                  flatMap(_ => this._heroservice.update(_))
              )
              .subscribe(() => undefined, () => undefined, () => this._location.back());
        });
  }
  image(): string {
    return '../../assets/baroom-comic-book--wallpaper.jpg';
  }
}
