import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  image(): string {
    return '../../assets/baroom-comic-book--wallpaper.jpg';
  }

  logIn($event: any) {
    console.log( {$event} );
    this._router.navigate(['BDtheque']);
  }
}
