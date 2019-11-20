import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Comics, COMICS} from "../shared/interfaces/Comics";
import {Hero} from "../shared/interfaces/Heros";
import {HeroSimple} from "../shared/interfaces/HeroSimple";
import {DialogaddHeroSimpleComponent} from "../shared/dialog/dialogadd-hero-simple/dialogadd-hero-simple.component";
import {HerosService} from "../services/heros.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ServiceComicsService} from "../services/service-comics.service";
import {filter, flatMap} from "rxjs/operators";
import {CardComicsSnackBarComponent} from "../snackBar/card-comics-snack-bar/card-comics-snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-comics-detail',
  templateUrl: './comics-detail.component.html',
  styleUrls: ['./comics-detail.component.css']
})
export class ComicsDetailComponent implements OnInit {
  // comics a afficher
  private _comics: Comics;
  // etat du dialog
  private _dialogStatus: string;
  // dialog
  private _herosSimpleDialog: MatDialogRef<DialogaddHeroSimpleComponent>;

  /**
   *
   * @param _route
   * @param _heroService
   * @param _comicsService
   * @param _dialog
   * @param _router
   * @param _snackBar
   */
  constructor(private _route: ActivatedRoute, private _heroService: HerosService,
              private _comicsService: ServiceComicsService,private _dialog: MatDialog,
              private _router: Router,private _snackBar: MatSnackBar) {
    this._comics = {} as Comics;
    this._dialogStatus = 'active';
    this._route.params.pipe(
        filter(params => !!params.isbn),
        flatMap(params => this._comicsService.fetchOne(params.isbn))
    ).subscribe((_: Comics) => this._comics = _);
  }

  /**
   *
   */
  ngOnInit() {
  }

  /**
   * prepare les donnees et lance le dialog pour modifier les heros secondaires
   */
  updateOthersHeros(){
    this._heroService.fetch().subscribe((_: Hero[]) => {
          this.showDialogOtherHero(this.delDuplicate(_))
    });
  }

  /**
   * prepare les donnees et lance le dialog pour modifier les hero
   */
  updateMainHeros(){
    this._heroService.fetch().subscribe((_: Hero[]) => {
      this.showDialogMainHero(this.delDuplicate(_))
    });
  }

  /**
   * lance le dialog
   * @param objMap
   */
  showDialogOtherHero(objMap: HeroSimple[]) {
    // set dialog stats
    this._dialogStatus = 'active';
    // open modal
    this._herosSimpleDialog = this._dialog.open(DialogaddHeroSimpleComponent, {
      width: '70%',
      height: '70%',
      disableClose: true,
      data: {
        heros: objMap,
        main: false,
        message:'Ajouter des heros secondaires'
      }
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._herosSimpleDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._comicsService.update({_id:this._comics._id,
              otherHeros:this._comics.otherHeros.concat(_)} as Comics))
        )
        .subscribe(
            (_:Comics) => this._comics.otherHeros = _.otherHeros,
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive',
        );
  }

  /**
   * lance le dialog pour modifier le hero
   * @param objMap
   */
  showDialogMainHero(objMap: HeroSimple[]){
    // set dialog stats
    this._dialogStatus = 'active';
    this._herosSimpleDialog = this._dialog.open(DialogaddHeroSimpleComponent, {
      width: '70%',
      height: '70%',
      disableClose: true,
      data: {
        heros: objMap,
        main: true,
        message:'Modifier le héro principale'
      }
    });

    this._herosSimpleDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._comicsService.update({_id:this._comics._id,
              mainHeros:_.shift()} as Comics))
        )
        .subscribe(
            (_: Comics) => this._comics.mainHeros = _.mainHeros,
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive',
        );
  }

  /**
   * supprime les heros secondaire et le hero de la liste de tous les heros
   * @param array
   */
  delDuplicate(array: HeroSimple[]): HeroSimple[]{
    const data2 = this._comics.otherHeros;
    let objMap=array as HeroSimple[];
    objMap = objMap.filter((_: HeroSimple) => this._comics.mainHeros._id !== _._id),
        array.forEach((e1)=>data2.forEach((e2)=> {
              if(e1._id === e2._id){
                objMap= objMap.filter((_: HeroSimple) => e1._id !== _._id);
              }
            }
        ));
    return objMap;
  }

  /**
   * supprime le hero secondaire donnees
   * @param hero
   */
  suppOtherHeros(hero: HeroSimple) {
    this._comicsService.update({
      _id:this._comics._id,
    otherHeros: this._comics.otherHeros.filter( (_: HeroSimple) => _._id !== hero._id),
  } as Comics).subscribe(
        (_: Comics) =>this._comics.otherHeros = _.otherHeros,
    );
  }

  /**
   * supprime le comics
   */
  suppComics() {
    this._comicsService.delete(this._comics._id).subscribe(
        () => undefined,
        _ => undefined,
        () => this._router.navigate(['comics'])
    );
  }

  /**
   * ajoute le comics a la BDtheque
   */
  add() {
    this._comicsService.update({
      _id: this._comics._id,
      inBD: true,
      wish: false,
    }as Comics).subscribe( (_) =>{
      this.openSnackBar('Vous avez ajouté  ' + this._comics.title+' à votre BDtheque');
      this._comics.inBD = true;
      this._comics.wish = false;
    });

  }

  /**
   * supprime le comics de la BDtheque
   */
  supp() {
    this._comicsService.update({
      _id: this._comics._id,
      inBD: false,
    }as Comics).subscribe( (_) => {
      this.openSnackBar('Vous avez supprimé ' + this._comics.title + ' à votre BDtheque');
      this._comics.inBD = false;
    });
  }

  /**
   * ajoute le comics aux envie
   */
  addWish() {
    this._comicsService.update({
      _id: this._comics._id,
      wish: true,
    }as Comics).subscribe( (_) => {
      this.openSnackBar('Vous avez ajouté ' + this._comics.title + ' à vos envie');
      this._comics.wish = true;
    });
  }

  /**
   * supprime le comics de envie
   */
  suppWish() {
    this._comicsService.update({
      _id: this._comics._id,
      wish: false,
    }as Comics).subscribe( (_) => {
      this.openSnackBar('Vous avez supprimé ' + this._comics.title + ' à vos envie');
      this._comics.wish = false;
    })
  }

  /**
   * affiche la snackBar
   * @param message message a afficher
   */
  openSnackBar(message: string) {
    this._snackBar.openFromComponent(CardComicsSnackBarComponent, {
      duration: 2 * 1000,
      data: message,
      panelClass: ['snackWatchers']
    });
  }

  /************************************************************GET & SET **********************************/
  image() {
    if(this._comics.mainHeros === {} as HeroSimple){
      return '../../assets/heros/none.jpg'
    }else {
      return '../../assets/heros/' + this._comics.mainHeros.photo;
    }
  }

  get comics(): any {
    return this._comics;
  }

  message() {
    return 'Aucune donnée n\'est disponible';
  }
}
