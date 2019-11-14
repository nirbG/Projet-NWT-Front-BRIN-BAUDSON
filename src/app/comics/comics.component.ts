import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Comics} from "../shared/interfaces/Comics";
import {ServiceComicsService} from "../services/service-comics.service";

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

  get isLoadMore(): boolean {
    return this._isLoadMore;
  }
  private _comics: Comics[];
  private _nbstart = 0;
  private _nbend = 10;
  private _isLoadMore: boolean;
  constructor(private _snackBar: MatSnackBar, private _service: ServiceComicsService) {
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
}
