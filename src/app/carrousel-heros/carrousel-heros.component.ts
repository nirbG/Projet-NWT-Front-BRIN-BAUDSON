import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
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
export class CarrouselHerosComponent implements OnInit {
  @Input() name: string;
  // la liste des hero simplifié
  private _heros: HeroSimple[];
  // variable tmp
  tempData: HeroSimple[];
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

  /**
   *
   * @param cdr
   */
  constructor(private cdr: ChangeDetectorRef) {
    this._heros = [] as HeroSimple[] ;
  }

  /**
   *
   */
  ngOnInit() {
    this.tempData = [] as HeroSimple[];
    this.carouselTileItems$ = of('carousel').pipe(
        map(val => {
          const data = (this.tempData = this.tempData.concat(this._heros));
          return data;
        })
    );
  }

  /**
   * retourn l'image
   * @param id
   */
  image(id: number): string {
    return '../../assets/heros/' + this.tempData[id].photo;
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
}
