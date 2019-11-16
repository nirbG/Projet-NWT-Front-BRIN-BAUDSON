import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Comics, COMICS} from "../shared/interfaces/Comics";

@Component({
  selector: 'app-comics-detail',
  templateUrl: './comics-detail.component.html',
  styleUrls: ['./comics-detail.component.css']
})
export class ComicsDetailComponent implements OnInit {
  // comics a afficher
  private _comics: Comics;

  constructor(private _route: ActivatedRoute) {
    this._comics = {} as Comics;
  }

  ngOnInit() {
    this._comics = COMICS.filter(_ => _.isbn === this._route.snapshot.params.isbn).shift();
  }


  /************************************************************GET & SET **********************************/
  image(photo: string) {
    return '../../assets/heros/'+photo;
  }
  get comics(): any {
    return this._comics;
  }
}
