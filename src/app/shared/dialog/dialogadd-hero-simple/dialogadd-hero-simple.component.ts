import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Hero} from "../../interfaces/Heros";
import {DialogHerosComponent} from "../dialog-heros/dialog-heros.component";
import {HeroSimple} from "../../interfaces/HeroSimple";

@Component({
  selector: 'app-dialogadd-hero-simple',
  templateUrl: './dialogadd-hero-simple.component.html',
  styleUrls: ['./dialogadd-hero-simple.component.css']
})
export class DialogaddHeroSimpleComponent implements OnInit {
  private _data: HeroSimple[];
  private _heros: Hero[];
  private _mainHero: boolean;
  constructor(private _dialogRef: MatDialogRef<DialogaddHeroSimpleComponent>,
              @Inject(MAT_DIALOG_DATA) private _dataInject: any) {
    this._data = [] as HeroSimple[];
    this._heros = this._dataInject.heros;
    this._mainHero = this._dataInject.main;
  };

  ngOnInit() {}

  get heros(): Hero[]{
    return this._heros;
  }

  image(data: string): string {
    return  '../../assets/heros/'+data;
  }

  onCancel() {
    this._dialogRef.close(this._data);
  }

  add(hero: Hero) {
    const new_hero = {
      _id: hero._id,
      name: hero.name,
      photo: hero.photo
    }as HeroSimple;
    if(!this._mainHero) {
      this._data = this._data.concat([new_hero]);
      this._heros = this._heros.filter((_: Hero) => _._id !== hero._id)
    }else{
      this._data = [new_hero];
      this.onCancel();
    }
  }
}
