import { Injectable } from '@angular/core';
import {COMICS, Comics} from "../shared/interfaces/Comics";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {from, Observable, of} from "rxjs";
import {defaultIfEmpty, filter, flatMap, map} from "rxjs/operators";
import {Hero} from "../shared/interfaces/Heros";

@Injectable({
  providedIn: 'root'
})
export class ServiceComicsService {
  // private property to store all backend URLs
  private readonly _backendURL: any;
  private _comicstab: Comics[];
  constructor(private _http: HttpClient) {
    this._comicstab = COMICS as Comics[];
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
   * retourne les heros
   */
  fetch(): Observable<Comics[]> {
    return this._http.get<Comics[]>(this._backendURL.allComics)
        .pipe(
            filter(_ => !!_),
            defaultIfEmpty([])
        );
  }
  /**
   * retourne quelque heros
   */
  some(start: number, nb: number): Observable<Comics[]> {
    return this._http.get<Comics[]>(this._backendURL.someComics.replace(':start', start).replace(':nb', nb))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
  }

  /**
   * retourn un heros
   * @param id
   */
  fetchOne(isbn: string): Observable<Comics> {
    return this._http.get<Comics>(this._backendURL.oneComics.replace(':isbn', isbn));
  }

  /**
   * cree un heros
   * @param data
   */
  create(data: Comics): Observable<any> {
    return this._http.post<Comics>(this._backendURL.addComics, data, this._options());
  }

  /**
   * modifie un heros
   * @param h
   */
  update(newData: Comics): Observable<any> {
    console.log(newData);
    return this._http.put<Comics>(this._backendURL.putComics.replace(':isbn', newData._id), newData, this._options());
  }

  delete(id: string): Observable<string> {
    return this._http.delete(this._backendURL.delComics.replace(':isbn', id))
        .pipe(
            map(_ => id)
        );
  }
  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }

  comicsByHeros(): Observable<Comics[]> {
    return this.fetch()
  }
}
