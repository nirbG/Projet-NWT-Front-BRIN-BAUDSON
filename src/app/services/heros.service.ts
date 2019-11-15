import { Injectable } from '@angular/core';
import {COMICS, Comics} from "../shared/interfaces/Comics";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {from, Observable, of} from "rxjs";
import {Hero, HEROS} from "../shared/interfaces/Heros";

@Injectable({
    providedIn: 'root'
})
export class HerosService {
    // private property to store all backend URLs
    private readonly _backendURL: any;
    private _herostab: Hero[];
    constructor(private _http: HttpClient) {
        this._herostab = HEROS as Hero[];
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
    fetch(): Observable<Hero[]> {
        return of(this._herostab);
        /*this._http.get<Comics[]>(this._backendURL.allComics)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );*/
    }
    /**
     * Function to return list of person
     */
    some(start: number, end: number): Observable<Hero[]> {
        return of(this._herostab.slice(start, end));
        /*this._http.get<Comics[]>(this._backendURL.someComics.replace(':start', start).replace(':end', end))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );

         */
    }


    fetchOne(id: string): Observable<Hero> {
        return of(this._herostab.find( (_: Hero) => _.id === id));
    }

    update(h: Hero): Observable<Hero> {
        return null;
    }

}
