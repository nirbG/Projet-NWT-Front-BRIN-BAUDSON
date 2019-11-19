import { Injectable } from '@angular/core';
import {COMICS, Comics} from "../shared/interfaces/Comics";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {from, Observable, of} from "rxjs";
import {Hero, HEROS} from "../shared/interfaces/Heros";
import {defaultIfEmpty, filter, map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class HerosService {
    // private property to store all backend URLs
    private readonly _backendURL: any;
    // base des heros
    private _herostab: Hero[];

    /**
     *
     * @param _http
     */
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
     * retourne les heros
     */
    fetch(): Observable<Hero[]> {
        return this._http.get<Hero[]>(this._backendURL.allHeros)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }
    /**
     * retourne quelque heros
     */
    some(start: number, end: number): Observable<Hero[]> {
        return this.fetch();//return of(this._herostab.slice(start, end));
        /*this._http.get<Comics[]>(this._backendURL.someComics.replace(':start', start).replace(':end', end))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );

         */
    }

    /**
     * retourn un heros
     * @param id
     */
    fetchOne(id: string): Observable<Hero> {
        return this._http.get<Hero>(this._backendURL.oneHero.replace(':id', id));
    }

    /**
     * cree un heros
     * @param data
     */
    create(data: Hero): Observable<any> {
        return this._http.post<Hero>(this._backendURL.addHero, data, this._options());
    }

    /**
     * modifie un heros
     * @param h
     */
    update(data: Hero): Observable<any> {
        return this._http.put<Hero>(this._backendURL.putHero.replace(':id', data._id), data, this._options());
    }

    delete(id: string): Observable<string> {
        return this._http.delete(this._backendURL.delHero.replace(':id', id))
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



}
