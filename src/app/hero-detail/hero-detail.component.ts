import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Comics, COMICS} from "../shared/interfaces/Comics";
import {Hero, HEROS} from "../shared/interfaces/Heros";
import {ServiceComicsService} from "../services/service-comics.service";
import {HeroSimple} from "../shared/interfaces/HeroSimple";
import {HerosService} from "../services/heros.service";
import {DialogHerosComponent} from "../shared/dialog/dialog-heros/dialog-heros.component";
import {filter, flatMap} from "rxjs/operators";
import {DialogaddHeroSimpleComponent} from "../shared/dialog/dialogadd-hero-simple/dialogadd-hero-simple.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // comics lie au heros
  comics : Comics[];
  // statu de l'affichage de comics
  showComics: boolean;
  showOhtersComics: boolean;
  // hero
  get comicsOther(): Comics[] {
    return this._comicsOther;
  }

  private _hero: Hero;
  // dialog d'ajout d'allie et ennemi
  private _herosSimpleDialog: MatDialogRef<DialogaddHeroSimpleComponent>;
  // etat du dialog
  private _dialogStatus: string;
  private _comicsOther: Comics[];

  /**
   *
   * @param _route
   * @param _service
   * @param _heroService
   * @param _dialog
   * @param _router
   */
  constructor(private _route: ActivatedRoute,private _service: ServiceComicsService,
              private _heroService: HerosService, private _dialog: MatDialog,
              private _router: Router,) {
    this._dialogStatus = 'inactive';
    this.showComics = true;
    this.showOhtersComics = true;
    this._hero = {} as Hero;
  }

  /**
   *
   */
  ngOnInit() {
    this._heroService.fetchOne( this._route.snapshot.params.id).subscribe((_: Hero) => this._hero = _);
    this._service.comicsByHeros().subscribe((_ : Comics[]) => this.comics =
        _.filter((_: Comics) => _.mainHeros._id === this._hero._id ),
    );
    this._service.comicsByHeros().subscribe((_ : Comics[]) => this._comicsOther = this.herosSecondCharacterComics(_)
    );
  }
  herosSecondCharacterComics(array: Comics[]): Comics[]{
    const data2 = this._hero.allie;
    let objMap=[] as Comics[];
    array.forEach((e1)=>e1.otherHeros.forEach((e2)=> {
          if(this._hero._id === e2._id){
            objMap= objMap.concat([e1]);
          }
        }
    ));
    return objMap;
  }


  /**
   * ajoute le comics a la BD
   * @param $event
   */
  add($event: string) {

  }

  /**
   * ajoute le comics au envie
   * @param $event
   */
  addWish($event: string) {

  }

  /**
   * cache les comics ou les affichent
   */
  hideComics() {
    this.showComics = (this.showComics === true) ? false : true;
  }

  /**
   * cache les comics ou les affichent
   */
  hideOhtersComics() {
    this.showOhtersComics = (this.showOhtersComics === true) ? false : true;
  }


  /**
   * supprime un allie donne
   * @param id
   */
  suppAllie(id: any) {
    this._heroService.update({
      _id:this._hero._id,
      allie: this._hero.allie.filter((_: HeroSimple) => _._id !== id),
    } as Hero).subscribe(
        (_: Hero) =>this._hero.allie = _.allie,
    );
  }

  /**
   * supprime un ennemi donne
   * @param id
   */
  suppEnnemi(id: any) {
    this._heroService.update({
      _id:this._hero._id,
      ennemi: this._hero.ennemi.filter((_: HeroSimple) => _._id !== id),
    } as Hero).subscribe(
        (_: Hero) =>this._hero.ennemi = _.ennemi,
    );
  }

  suppHero(){
    this._heroService.delete(this.hero._id).subscribe(
        () => undefined,
        _ => undefined,
        () => this._router.navigate(['heros']),
    )
  }

  delDuplicate(array: Hero[]): HeroSimple[]{
    const data2 = this._hero.allie;
    let objMap=array as HeroSimple[];
        array.forEach((e1)=>data2.forEach((e2)=> {
              if(e1._id === e2._id){
                objMap= objMap.filter((_: HeroSimple) => e1._id !== _._id);
              }
            }
        ));
    return objMap;
  }
  updateAllie(){
    this._heroService.fetch().subscribe((_: Hero[]) => {
      this.showDialogAllie(this.delDuplicate(_))
    });
  }

  delDuplicateEnnemi(array: Hero[]): HeroSimple[]{
    const data2 = this._hero.allie;
    let objMap=array as HeroSimple[];
    array.forEach((e1)=>data2.forEach((e2)=> {
          if(e1._id === e2._id){
            objMap= objMap.filter((_: HeroSimple) => e1._id !== _._id);
          }
        }
    ));
    return objMap;
  }
  updateEnnemi(){
    this._heroService.fetch().subscribe((_: Hero[]) => {
      this.showDialogEnnemi(this.delDuplicateEnnemi(_))
    });
  }
  /**
   * Function to display modal
   */
  showDialogAllie(heroSimples: HeroSimple[]) {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._herosSimpleDialog = this._dialog.open(DialogaddHeroSimpleComponent, {
      width: '70%',
      height: '50%',
      disableClose: true,
      data: {
        heros: heroSimples,
        main: true,
      }
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._herosSimpleDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._heroService.update({_id:this._hero._id,
              allie:this._hero.allie.concat(_)} as Hero))
        )
        .subscribe(
            (_: Hero) => this._hero.allie =_.allie,
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive',
        );
  }

  /**
   * Function to display modal
   */
  showDialogEnnemi(heroSimples: HeroSimple[]) {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._herosSimpleDialog = this._dialog.open(DialogaddHeroSimpleComponent, {
      width: '70%',
      height: '50%',
      disableClose: true,
      data: {
        heros: heroSimples,
        main: true,
      }
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._herosSimpleDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._heroService.update({_id:this._hero._id,
              ennemi:this._hero.ennemi.concat(_)} as Hero))
        )
        .subscribe(
            (_: Hero) => this._hero.ennemi =_.ennemi,
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive',
        );
  }
  /************************************************************GET & SET **********************************/

  get dialogStatus(): string {
    return this._dialogStatus;
  }
  get hero(): Hero {
    return this._hero;
  }

}
