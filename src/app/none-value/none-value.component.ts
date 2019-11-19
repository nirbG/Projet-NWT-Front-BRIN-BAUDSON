import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-none-value',
  templateUrl: './none-value.component.html',
  styleUrls: ['./none-value.component.css']
})
export class NoneValueComponent implements OnInit {
  get message() {
    return this._message;
  }
  private _message;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set message(m: string){
    this._message = m;
  }
}
