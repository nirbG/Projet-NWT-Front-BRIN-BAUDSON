import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {NguCarouselConfig} from "@ngu/carousel";
import {Hero, HEROS} from "../shared/interfaces/Heros";

@Component({
  selector: 'app-carrousel-heros',
  templateUrl: './carrousel-heros.component.html',
  styleUrls: ['./carrousel-heros.component.css', './style.scss']
})
export class CarrouselHerosComponent implements OnInit {
  @Input() name: string;

  public carouselTileItems$: Observable<Hero[]>;
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
  tempData: Hero[];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.tempData = [] as Hero[];
    this.carouselTileItems$ = of('carousel').pipe(
        map(val => {
          const data = (this.tempData = this.tempData.concat(HEROS.slice(0, 5 )));
          return data;
        })
    );
  }

  image(id: number): string {
    return '../../assets/heros/' + this.tempData[id].photo;
  }

}
