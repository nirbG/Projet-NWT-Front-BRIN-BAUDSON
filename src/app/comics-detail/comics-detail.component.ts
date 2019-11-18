import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Comics, COMICS} from "../shared/interfaces/Comics";
import {Hero} from "../shared/interfaces/Heros";
import {HeroSimple} from "../shared/interfaces/HeroSimple";
import {DialogaddHeroSimpleComponent} from "../shared/dialog/dialogadd-hero-simple/dialogadd-hero-simple.component";
import {HerosService} from "../services/heros.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-comics-detail',
  templateUrl: './comics-detail.component.html',
  styleUrls: ['./comics-detail.component.css']
})
export class ComicsDetailComponent implements OnInit {
  // comics a afficher
  private _comics: Comics;
  private _dialogStatus: string;
  private _herosSimpleDialog: MatDialogRef<DialogaddHeroSimpleComponent>;

  constructor(private _route: ActivatedRoute, private _heroService: HerosService,private _dialog: MatDialog,) {
    this._comics = {} as Comics;
    this._dialogStatus = 'active';
  }

  ngOnInit() {
    this._comics = COMICS.filter(_ => _.isbn === this._route.snapshot.params.isbn).shift();
  }

  showDialogOtherHero() {
    // set dialog stats
    this._dialogStatus = 'active';
    let data: Hero[];
    this._heroService.fetch().subscribe((_: Hero[]) => data = _);
    const data2 = this._comics.otherHeros;
    let objMap=data as HeroSimple[];
    objMap = objMap.filter((_: HeroSimple) => this._comics.mainHeros.id !== _.id);
    data.forEach((e1)=>data2.forEach((e2)=> {
          if(e1.id === e2.id){
            objMap= objMap.filter((_: HeroSimple) => e1.id !== _.id);
          }
        }
    ));
    // open modal
    this._herosSimpleDialog = this._dialog.open(DialogaddHeroSimpleComponent, {
      width: '70%',
      height: '70%',
      disableClose: true,
      data: {
        heros: objMap,
        main: false,
      }
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._herosSimpleDialog.afterClosed()
        .pipe()
        .subscribe(
            (_: HeroSimple) => {this._comics.otherHeros = this._comics.otherHeros.concat(_);},
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive',
        );

  }
  /************************************************************GET & SET **********************************/
  image(photo: string) {
    return '../../assets/heros/' + photo;
  }

  get comics(): any {
    return this._comics;
  }

  suppOtherHeros(hero: HeroSimple) {
    this._comics.otherHeros = this._comics.otherHeros.filter( (_: HeroSimple) => _.id !== hero.id);
  }

  showDialogMainHero(){
    // set dialog stats
    this._dialogStatus = 'active';
    let data: Hero[];
    this._heroService.fetch().subscribe((_: Hero[]) => data = _);
    const data2 = this._comics.otherHeros;
    let objMap=data as HeroSimple[];
    objMap = objMap.filter((_: HeroSimple) => this._comics.mainHeros.id !== _.id);
    data.forEach((e1)=>data2.forEach((e2)=> {
          if(e1.id === e2.id){
            objMap= objMap.filter((_: HeroSimple) => e1.id !== _.id);
          }
        }
    ));
    this._herosSimpleDialog = this._dialog.open(DialogaddHeroSimpleComponent, {
      width: '70%',
      height: '70%',
      disableClose: true,
      data: {
        heros: data2,
        main: true,
      }
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._herosSimpleDialog.afterClosed()
        .pipe()
        .subscribe(
            (_: HeroSimple[]) => this._comics.mainHeros = _.shift(),
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive',
        );
  }
}
