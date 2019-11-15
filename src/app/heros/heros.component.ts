import { Component, OnInit } from '@angular/core';
import {Hero, HEROS} from "../shared/interfaces/Heros";
import {HerosService} from "../services/heros.service";

@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HerosComponent implements OnInit {
  private _filtre: string;
  private _heros: Hero[];
  private _nbstart = 0;
  private _nbend = 10;
  private _isLoadMore: boolean;
  private _lettre: string;

  constructor(private  herosService: HerosService) {
    this._isLoadMore = false;
    this.herosService.some(this._nbstart, this._nbend).subscribe( (_: Hero[]) =>
        this._heros = _
    );
    this._filtre = 'none';
    this._lettre = 'A';

  }
  ngOnInit() {
  }

  Load() {
    this.herosService.some(this._nbstart, this._nbend).subscribe( (_: Hero[]) =>
        this._heros = this._heros.concat(_)
    );

  }
  seeMore() {
    if (this._filtre === 'none') {
      console.log('hover');
      this._isLoadMore = true;
      setTimeout(
          () => {
            this._isLoadMore = false;
            this._nbstart = this._nbend;
            this._nbend = this._nbend + 10;
            this.Load();
          }, 2000
      );
    }
  }
  get isLoadMore(): boolean {
    return this._isLoadMore;
  }
  get filtre(): string {
    return this._filtre;
  }

  get heros(): any[] {
    return this._heros;
  }

  switchFilter(f: string) {
    this._nbstart = 0;
    this._nbend = 10;
    switch (f) {
      case 'Alphabet' :
        this.herosService.fetch().subscribe( (_: Hero[]) =>
            this._heros = _.filter( _ => _.name.charAt(0) === this._lettre)
        );
        break;
      case 'Search' :
        this.herosService.fetch().subscribe( (_: Hero[]) =>
          this._heros = _
        );
        break;
      default :
        this.herosService.some(this._nbstart, this._nbend).subscribe( (_: Hero[]) =>
            this._heros = _
        );
        break;
    }
    this._filtre = f;
  }
  switchLettre(l: string) {
    this._lettre = l;
    this.switchFilter('Alphabet');
  }

  refresh(data: Hero[]) {
    this._heros = data;
  }
}
