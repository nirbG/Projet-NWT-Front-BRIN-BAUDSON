import { Injectable } from '@angular/core';
import {COMICS, Comics} from "../shared/interfaces/Comics";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {defaultIfEmpty, filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServiceComicsService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  private _comicstab: Comics[];
  constructor(private _http: HttpClient) {
    this._comicstab = COMICS;
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }
  /**
   * Function to return list of person
   */
  fetch(): Observable<Comics[]> {
    return of(this._comicstab);
    /*this._http.get<Comics[]>(this._backendURL.allComics)
        .pipe(
            filter(_ => !!_),
            defaultIfEmpty([])
        );*/
  }
  /**
   * Function to return list of person
   */
  some(start: string, end: string): Observable<Comics[]> {
    return of(this._comicstab.slice(+start, +end));
    /*this._http.get<Comics[]>(this._backendURL.someComics.replace(':start', start).replace(':end', end))
        .pipe(
            filter(_ => !!_),
            defaultIfEmpty([])
        );

     */
  }
}
