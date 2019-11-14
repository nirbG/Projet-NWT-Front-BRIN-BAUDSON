import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Comics, COMICS} from "../shared/interfaces/Comics";
import {HEROS} from "../shared/interfaces/Heros";
import {ServiceComicsService} from "../services/service-comics.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  comics : Comics[];
  showComics: boolean;
  showSeries: boolean;
  private _hero: any;

  constructor(private _route: ActivatedRoute,private _service: ServiceComicsService) {
    this.showComics = true;
    this.showSeries = true;
    this._hero = {};
    console.log(this._route.snapshot.params.id);
  }

  ngOnInit() {
    this._hero = HEROS.filter( _ => _.id === this._route.snapshot.params.id).shift();
    this._service.comicsByHeros(this._hero.id).subscribe((_ : Comics[]) => this.comics = _);
  }

  add($event: string) {}

  addWish($event: string) {}

  hideComics() {
    console.log('dsfxvhfgq');
    this.showComics = (this.showComics === true) ? false : true;
  }

  get hero(): any {
    return this._hero;
  }


}
