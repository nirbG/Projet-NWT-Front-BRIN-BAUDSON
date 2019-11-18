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
  // hero
  private _hero: Hero;
  // dialog d'ajout d'allie et ennemi
  private _herosSimpleDialog: MatDialogRef<DialogaddHeroSimpleComponent>;
  // etat du dialog
  private _dialogStatus: string;

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
              private _router: Router) {
    this._dialogStatus = 'inactive';
    this.showComics = true;
    this._hero = {} as Hero;
    console.log(this._route.snapshot.params.id);
  }

  /**
   *
   */
  ngOnInit() {
    this._hero = HEROS.filter( _ => _.id === this._route.snapshot.params.id).shift();
    this._service.comicsByHeros(this._hero.id).subscribe((_ : Comics[]) => this.comics = _);
  }

  /**
   * ajoute le comics a la BD
   * @param $event
   */
  add($event: string) {}

  /**
   * ajoute le comics au envie
   * @param $event
   */
  addWish($event: string) {}

  /**
   * cache les comics ou les affichent
   */
  hideComics() {
    this.showComics = (this.showComics === true) ? false : true;
  }

  /**
   * supprime un allie donne
   * @param id
   */
  suppAllie(id: any) {
     const allie = this._hero.allie;
     this._hero.allie=allie.filter((_: HeroSimple) => _.id !== id);
     this._heroService.update(null);
  }

  /**
   * supprime un ennemi donne
   * @param id
   */
  suppEnnemi(id: any) {
    const ennemi = this._hero.ennemi;
    this._hero.ennemi=ennemi.filter((_: HeroSimple) => _.id !== id);
    this._heroService.update(null);
  }

  /**
   * Function to display modal
   */
  showDialogAllie() {
    // set dialog status
    this._dialogStatus = 'active';
    let data: Hero[];
    this._heroService.fetch().subscribe( (_: Hero[]) => data = _ );
    const data2 = data as HeroSimple[];

    // open modal
    this._herosSimpleDialog = this._dialog.open(DialogaddHeroSimpleComponent, {
      width: '70%',
      height: '50%',
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
            (_: HeroSimple) => this._hero.allie =this._hero.allie.concat(_),
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive',
        );
  }

  /**
   * Function to display modal
   */
  showDialogEnnemi() {
    // set dialog status
    this._dialogStatus = 'active';
    let data: Hero[];
    this._heroService.fetch().subscribe( (_: Hero[]) => data = _ );
    const data2 = data as HeroSimple[];

    // open modal
    this._herosSimpleDialog = this._dialog.open(DialogaddHeroSimpleComponent, {
      width: '70%',
      height: '50%',
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
            (_: HeroSimple) => this._hero.ennemi =this._hero.ennemi.concat(_),
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
