import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {NguCarouselConfig} from "@ngu/carousel";
import {Hero, HEROS} from "../shared/interfaces/Heros";
import {COMICS, Comics} from "../shared/interfaces/Comics";
import {HeroSimple} from "../shared/interfaces/HeroSimple";

@Component({
  selector: 'app-carrousel-heros',
  templateUrl: './carrousel-heros.component.html',
  styleUrls: ['./carrousel-heros.component.css', './style.scss']
})
export class CarrouselHerosComponent implements OnInit, OnChanges {
  @Input() name: string;
  // la liste des hero simplifié
  private _heros: HeroSimple[];
  // variable tmp
  private _tempData: HeroSimple[];
  // Carousel item
  public carouselTileItems$: Observable<HeroSimple[]>;

  // carousel conf
  public carouselTileConfig: NguCarouselConfig = {
    grid: {xs: 1, sm: 1, md: 3, lg: 3, all: 0},
    speed: 250,
    point: {
      visible: true
    },
    touch: true,
    loop: true,
    interval: {timing: 1500},
    animation: 'lazy'
  };
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<HeroSimple>;
  // private property to store _showDialohg
  private readonly _showDialog$: EventEmitter<void>;
  // Image du bouton add
  private readonly _addotherHerosImg: string;


  /**
   *
   * @param cdr
   */
  constructor(private cdr: ChangeDetectorRef) {
    this._heros = [] as HeroSimple[] ;
    this._submit$= new EventEmitter<HeroSimple>();
    this._showDialog$= new EventEmitter<void>();
    this._addotherHerosImg = '../../assets/heros/otherHeros.jpg';
  }

  /**
   *
   */
  ngOnInit() {
    this.load();
  }

  /**
   * fonction appele quand les donnees sont modifie
   * @param record
   */
  ngOnChanges(record) {
    console.log(record);
      if (record.heros && record.heros.currentValue!==record.heros.previousValue) {
        this._heros = record.heros.currentValue;
        this.load();
      }
  }

  /**
   * load les donnees
   */
  load(){
    this._tempData = [] as HeroSimple[];
    this.carouselTileItems$ = of('carousel').pipe(
        map(val => {
          const data = (this._tempData = this._tempData.concat(this._heros));
          return data;
        })
    );
  }

  /********************************************GET&SET*****************************************/

  /**
   * retourn l'image
   * @param id
   */
  image(id: number): string {
    return '../../assets/heros/' + this._tempData[id].photo;
  }

  /**
   * set les Heros
   * @param h
   */
  @Input()
  set heros(h: HeroSimple[]) {
    this._heros = h;
  }
  /**
   * Returns les heros
   */
  get heros(): HeroSimple[] {
    return this._heros;
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<HeroSimple> {
    return this._submit$;
  }
  /**
   * Function to emit event to submit form and person
   */
  submit(hero: HeroSimple) {
    this._submit$.emit(hero);
    this.load();
  }

  /**
   * Returns private property _submit$
   */
  @Output('showDialog')
  get showDialog$(): EventEmitter<void> {
    return this._showDialog$;
  }
  /**
   * Function to emit event to submit form and person
   */
  showDialog() {
    this._showDialog$.emit();
  }

}
