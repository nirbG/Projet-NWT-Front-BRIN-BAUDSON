import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Comics, COMICS} from "../shared/interfaces/Comics";
import {Hero, HEROS} from "../shared/interfaces/Heros";
import {ServiceComicsService} from "../services/service-comics.service";
import {HeroSimple} from "../shared/interfaces/HeroSimple";
import {HerosService} from "../services/heros.service";
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
  // statut de l'affichage de comics
  showComics: boolean;
  // statut
  showOhtersComics: boolean;
  // hero
  private _hero: Hero;
  // dialog d'ajout d'allie et ennemi
  private _herosSimpleDialog: MatDialogRef<DialogaddHeroSimpleComponent>;
  // etat du dialog
  private _dialogStatus: string;
  // les heros secondaires
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

  /**
   * retourne les comics dont il fait une apparition
   * @param array
   */
  herosSecondCharacterComics(array: Comics[]): Comics[]{
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

  /**
   * supprime le hero
   */
  suppHero(){
    this._heroService.delete(this.hero._id).subscribe(
        () => undefined,
        _ => undefined,
        () => this._router.navigate(['heros']),
    )
  }

  /**
   * supprime les les allies et lui meme de la liste des heros
   * @param array
   */
  delDuplicateAllie(array: Hero[]): HeroSimple[]{
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

  /**
   * lance le dialog pour modifier les allies a renvoyer
   */
  updateAllie(){
    this._heroService.fetch().subscribe((_: Hero[]) => {
      this.showDialogAllie(this.delDuplicateAllie(_))
    });
  }

  /**
   * supprime les ennemis et lui meme de la liste des heros a renvoyer
   * @param array
   */
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

  /**
   * lance le dialog pour modifier les ennemis
   */
  updateEnnemi(){
    this._heroService.fetch().subscribe((_: Hero[]) => {
      this.showDialogEnnemi(this.delDuplicateEnnemi(_))
    });
  }
  /**
   * lance le modal pour modifier les allies
   */
  showDialogAllie(heroSimples: HeroSimple[]) {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._herosSimpleDialog = this._dialog.open(DialogaddHeroSimpleComponent, {
      width: '70%',
      height: '70%',
      disableClose: true,
      data: {
        heros: heroSimples,
        main: true,
        message:'Ajouter des alliés'
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
   *  lance le modal pour modifier les ennemi
   */
  showDialogEnnemi(heroSimples: HeroSimple[]) {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._herosSimpleDialog = this._dialog.open(DialogaddHeroSimpleComponent, {
      width: '70%',
      height: '70%',
      disableClose: true,
      data: {
        heros: heroSimples,
        main: true,
        message:'Ajouter des ennemis'
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

  get hero(): Hero {
    return this._hero;
  }
  get comicsOther(): Comics[] {
    return this._comicsOther;
  }

  message() {
   return 'Aucune donnée n\'est disponible';
  }
}
