import {HeroSimple} from "./HeroSimple";

export interface Hero {
  id: string;
  photo?: string;
  name: string;
  ennemi: HeroSimple[];
  allie: HeroSimple[];
  isHumain: boolean;
}


export const HEROS = [
  {
    id: '1',
    photo: 'deadpool.jpg',
    name: 'Deadpool',
    ennemi: [
      {
        id: '7',
        photo: 'cable.jpg',
        name: 'cable',
      },
    ],
    allie: [
      {
        id: '7',
        photo: 'cable.jpg',
        name: 'cable',
      },
    ],
    isHumain: true,
  },
  {
    id: '2',
    photo: 'antman.jpg',
    name: 'Ant-Man',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '3',
    photo: 'batman.jpg',
    name: 'Batman',
    ennemi: [
      {
        id: '5',
        photo: 'joker.jpg',
        name: 'Joker',
      },
      {
        id: '19',
        photo: 'deadsthroke.jpg',
        name: 'Deadsthroke',
      },
      {
        id: '19',
        photo: 'doubleface.jpg',
        name: 'Double-Faces',
      },
    ],
    allie: [
      {
        id: '12',
        photo: 'robin.jpg',
        name: 'Robin',
      },
      {
        id: '11',
        photo: 'aquaman.jpg',
        name: 'Aquaman',
      },
      {
        id: '18',
        photo: 'superman.jpg',
        name: 'Superman',
      },
    ],
    isHumain: true
  },
  {
    id: '4',
    photo: 'dardevile.jpg',
    name: 'Dardevile',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '5',
    photo: 'joker.jpg',
    name: 'Joker',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '6',
    photo: 'ironman.jpg',
    name: 'Iron Man',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '7',
    photo: 'cable.jpg',
    name: 'Cable',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '8',
    photo: 'spawn.jpg',
    name: 'Spawn',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '9',
    photo: 'catwoman.jpg',
    name: 'Catwoman',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '10',
    photo: 'hellboy.png',
    name: 'Hellboy',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '11',
    photo: 'aquaman.jpg',
    name: 'Aquaman',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '12',
    photo: 'robin.jpg',
    name: 'Robin',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '13',
    photo: 'wolverine.jpg',
    name: 'Wolverine',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '14',
    photo: 'hulk.jpg',
    name: 'Hulk',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '15',
    photo: 'thor.jpg',
    name: 'Thor',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '16',
    photo: 'Captain_America.png',
    name: 'Captain America',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '17',
    photo: '4Fan.jpg',
    name: 'Les 4 Fantastique',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '18',
    photo: 'superman.jpg',
    name: 'Superman',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '19',
    photo: 'deadsthroke.jpg',
    name: 'Deadsthroke',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  },
  {
    id: '20',
    photo: 'doubleface.jpg',
    name: 'Double-Faces',
    ennemi: [] as HeroSimple[],
    allie: [] as HeroSimple[],
    isHumain: true
  }
];
