import {HeroSimple} from "./HeroSimple";

export interface Comics {
    isbn: string;
    photo?: string;
    title: string;
    mainHeros: HeroSimple;
    otherHeros: HeroSimple[];
    price: number;
    wish: boolean;
    inBD: boolean;
}
export const COMICS = [
    {
        isbn: '2809481067',
        photo: '2809481067.jpg',
        title: 'Wolverine - Tome 7 : Fresh start',
        mainHeros: {
            id: '13',
            photo: 'wolverine.jpg',
            name: 'Wolverine',
        },
        otherHeros: [] as HeroSimple[],
        price: 7.5,
        wish: false,
        inBD: false
    },
    {
        isbn: '2809479011',
        photo: '2809479011.jpg',
        title: 'Avengers - Tome 9 : Fresh Start',
        mainHeros: {
            id: '21',
            photo: 'avengers.jpg',
            name: 'Avengers',
        },
        otherHeros: [] as HeroSimple[],
        price: 7.5,
        wish: false,
        inBD: false
    },
    {
        isbn: '1026816750',
        photo: '1026816750.jpg',
        title: 'Batman - Tome 0 : Damned ',
        mainHeros: {
            id: '3',
            photo: 'batman.jpg',
            name: 'Batman',
        },
        otherHeros: [] as HeroSimple[],
        price: 15.5,
        wish: true,
        inBD: true
    },
    {
        isbn: '1026814243',
        photo: '1026814243.jpg',
        title: 'KILLING JOKE édition limitée',
        mainHeros: {
            id: '3',
            photo: 'batman.jpg',
            name: 'Batman',
        },
        otherHeros:  [] as HeroSimple[],
        price: 28,
        wish: false,
        inBD: false
    },
    {
        isbn: '280947902X',
        photo: '280947902X.jpg',
        title: 'Deadpool - Tome 9 : Fresh Start',
        mainHeros: {
            id: '1',
            photo: 'deadpool.jpg',
            name: 'Deadpool',
        },
        otherHeros:  [] as HeroSimple[],
        price: 7.5,
        wish: true,
        inBD: true
    },
    {
        isbn: '1026819644',
        photo: '1026819644.jpg',
        title: 'Joker - nouvelle édition ',
        mainHeros: {
            id: '5',
            photo: 'joker.jpg',
            name: 'Joker',
        },
        otherHeros:  [] as HeroSimple[],
        price: 15.5,
        wish: false,
        inBD: true
    },
    {
        isbn: '1026817315',
        photo: '1026817315.jpg',
        title: 'Batman - Tome 7 : Detective comics',
        mainHeros: {
            id: '3',
            photo: 'batman.jpg',
            name: 'Batman',
        },
        otherHeros:  [] as HeroSimple[],
        price: 17.5,
        wish: false,
        inBD: false
    },
    {
        isbn: '1026819695',
        photo: '1026819695.jpg',
        title: 'Joker L\'homme qui rit',
        mainHeros: {
            id: '5',
            photo: 'joker.jpg',
            name: 'Joker',
        },
        otherHeros:  [] as HeroSimple[],
        price: 15.5,
        wish: false,
        inBD: false
    },
    {
        isbn: '2809478708',
        photo: '2809478708.jpg',
        title: 'Avengers - Tome 8 : Fresh start',
        mainHeros: {
            id: '21',
            photo: 'avengers.jpg',
            name: 'Avengers',
        },
        otherHeros:  [] as HeroSimple[],
        price: 7.50,
        wish: false,
        inBD: false
    },
    {
        isbn: '102681622X',
        photo: '102681622X.jpg',
        title: 'Superman - Tome 2 : New Metropolis',
        mainHeros: {
            id: '18',
            photo: 'superman.jpg',
            name: 'Superman',
        },
        otherHeros:  [] as HeroSimple[],
        price: 35,
        wish: false,
        inBD: false
    },
    {
        isbn: '2809478716',
        photo: '2809478716.jpg',
        title: 'Deadpool - Tome 8 : Fresh start',
        mainHeros: {
            id: '1',
            photo: 'deadpool.jpg',
            name: 'Deadpool',
        },
        otherHeros:  [] as HeroSimple[],
        price: 7.5,
        wish: false,
        inBD: false
    },
    {
        isbn: '2365773540',
        photo: '2365773540.jpg',
        title: 'Aquaman - Tome 3 : Aquaman',
        mainHeros: {
            id: '11',
            photo: 'aquaman.jpg',
            name: 'Aquaman',
        },
        otherHeros: [] as HeroSimple[],
        price: 19,
        wish: false,
        inBD: false
    },
    {
        isbn: '1026824109',
        photo: '1026824109.jpg',
        title: ' Batman - Tome 3 : Batman metal',
        mainHeros: {
            id: '3',
            photo: 'batman.jpg',
            name: 'Batman',
        },
        otherHeros: [] as HeroSimple[],
        price: 22.50,
        wish: false,
        inBD: false
    },
    {
        isbn: '1026814367',
        photo: '1026814367.jpg',
        title: 'Batman - : White Knight',
        mainHeros: {
            id: '3',
            photo: 'batman.jpg',
            name: 'Batman',
        },
        otherHeros: [] as HeroSimple[],
        price: 22.50,
        wish: false,
        inBD: false
    },
    {
        isbn: '2365773567',
        photo: '2365773567.jpg',
        title: '    Batman - Tome 3 : Le deuil de la famille',
        mainHeros: {
            id: '3',
            photo: 'batman.jpg',
            name: 'Batman',
        },
        otherHeros: [] as HeroSimple[],
        price: 22.50,
        wish: false,
        inBD: false
    },

];
