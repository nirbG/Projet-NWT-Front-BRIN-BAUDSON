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

  private _heros: HeroSimple[];
  tempData: HeroSimple[];
  public carouselTileItems$: Observable<HeroSimple[]>;
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

  constructor(private cdr: ChangeDetectorRef) {
    this._heros = [] as HeroSimple[] ;
  }

  ngOnInit() {
    this.tempData = [] as HeroSimple[];
    this.carouselTileItems$ = of('carousel').pipe(
        map(val => {
          const data = (this.tempData = this.tempData.concat(this._heros));
          return data;
        })
    );
  }

  image(id: number): string {
    return '../../assets/heros/' + this.tempData[id].photo;
  }

  @Input()
  set heros(h: HeroSimple[]) {
    this._heros = h;
  }
  /**
   * Returns private property _person
   */
  get heros(): HeroSimple[] {
    return this._heros;
  }
}
