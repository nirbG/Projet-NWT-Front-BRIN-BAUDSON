import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {COMICS} from "../shared/interfaces/Comics";

@Component({
  selector: 'app-comics-detail',
  templateUrl: './comics-detail.component.html',
  styleUrls: ['./comics-detail.component.css']
})
export class ComicsDetailComponent implements OnInit {

  ratingClicked: number;
  itemIdRatingClicked: string;
  private _comics: any;
  f: FormGroup;
  get comics(): any {
    return this._comics;
  }

  constructor(private _route: ActivatedRoute) {
    this._comics = {};
    this.f = new FormGroup({
      pasmesage: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
    this._comics = COMICS.filter(_ => _.isbn === this._route.snapshot.params.isbn).shift();
  }
  ratingComponentClick(clickObj: any): void {
    const item = this._comics;
    if (!!item) {
      item.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = item.company;
    }
  }
}
